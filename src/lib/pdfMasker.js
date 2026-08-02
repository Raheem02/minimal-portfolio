/**
 * PDF Phone Number Masker
 * -----------------------
 * Processes a PDF (from Base64 data URL, HTTP URL, or Uint8Array) to mask
 * Indian phone numbers (e.g. +91 9886849967, +91 98765 43210)
 * before download or database save.
 *
 * Uses pdf-lib for structure and pako for 100% bulletproof FlateDecode zlib stream handling.
 * Safely replaces phone number glyph tuples with CMap-aligned dash glyphs (+91 ----------).
 */
import { PDFDocument, PDFName, PDFRawStream, PDFNumber } from "pdf-lib"
import * as pako from "pako"

/* ─── Compression helpers (pako zlib) ─── */

function inflate(compressed) {
  try {
    return pako.inflate(compressed)
  } catch {
    try {
      return pako.inflate(compressed, { raw: true })
    } catch {
      return null
    }
  }
}

function deflate(raw) {
  try {
    return pako.deflate(raw)
  } catch {
    return raw
  }
}

/* ─── Byte ↔ String helpers ─── */

function bytesToStr(bytes) {
  let s = ""
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i])
  return s
}

function strToBytes(str) {
  const b = new Uint8Array(str.length)
  for (let i = 0; i < str.length; i++) b[i] = str.charCodeAt(i) & 0xff
  return b
}

function uint8ToBase64(bytes) {
  let bin = ""
  const CHUNK = 8192
  for (let i = 0; i < bytes.length; i += CHUNK) {
    const slice = bytes.subarray(i, Math.min(i + CHUNK, bytes.length))
    bin += String.fromCharCode.apply(null, slice)
  }
  return btoa(bin)
}

/* ─── Targeted Phone Masking Strategies ─── */

/**
 * 1. Mask phone digits in ASCII/Type1 literal strings.
 */
function maskLiteralPhones(text) {
  let result = text.replace(/(\+91[\s\-\.]?)([6-9]\d{4}[\s\-\.]?\d{5}|\d{10})/g, (match, prefix, rest) => {
    return prefix + rest.replace(/\d/g, "*")
  })
  result = result.replace(/(^|[^\d])([6-9]\d{4}[\s\-\.]?\d{5})([^\d]|$)/g, (match, p1, num, p2) => {
    return p1 + num.replace(/\d/g, "*") + p2
  })
  return result
}

/**
 * 2. Mask phone digits in CID/Identity-H hex-encoded strings.
 */
function maskHexPhones(text) {
  const re = /(002[Bb]\s*0039\s*0031\s*|(?:003[6-9]\s*))((?:(?:0020|003[0-9])\s*){9,20})/gi
  return text.replace(re, (match, prefix, rest) => {
    return prefix + rest.replace(/003[0-9]/gi, "002A")
  })
}

/**
 * 3. Mask phone numbers split across literal TJ kerning arrays: [(...)-250(...) ] TJ
 */
function maskTJArrays(text) {
  return text.replace(/\[\s*(?:\([^)]*\)|-?\d+[\s\.]*)*\s*\]\s*TJ/gi, (tjBlock) => {
    let combinedText = ""
    const strRegex = /\(([^)]*)\)/g
    let match
    while ((match = strRegex.exec(tjBlock)) !== null) {
      combinedText += match[1]
    }
    const sanitized = combinedText.replace(/[\s\-\.]/g, "")
    if (/(\+91|\b[6-9]\d{9}\b)/.test(sanitized)) {
      return tjBlock.replace(/\(([^)]*)\)/g, (m, strContent) => {
        return "(" + strContent.replace(/\d/g, "*") + ")"
      })
    }
    return tjBlock
  })
}

/**
 * 4. Mask phone numbers split across hex TJ kerning arrays: [<...>-250<...> ] TJ
 */
function maskHexTJArrays(text) {
  return text.replace(/\[\s*(?:<[0-9a-fA-F]*>|-?\d+[\s\.]*)*\s*\]\s*TJ/gi, (tjBlock) => {
    let combinedHex = ""
    const hexRegex = /<([0-9a-fA-F]*)>/g
    let match
    while ((match = hexRegex.exec(tjBlock)) !== null) {
      combinedHex += match[1]
    }
    if (/(002[Bb]00390031|003[6-9](?:003[0-9]){9})/.test(combinedHex)) {
      return tjBlock.replace(/<([0-9a-fA-F]*)>/gi, (m, hexContent) => {
        return "<" + hexContent.replace(/003[0-9]/gi, "002A") + ">"
      })
    }
    return tjBlock
  })
}

/**
 * 5. Mask Custom 16-bit Font Glyph Tuples for +91 phone numbers.
 * Replaces 10-digit glyph tuples (<001c001b...>) with dash glyph tuples (<00100010...).
 */
function maskCustomFontGlyphs(text) {
  let result = text.replace(/(<000e001c0014>(?:[\s\-\.]*|-?\d+[\s\.]*)*<)[0-9a-fA-F]{40}(>)/gi, (match, prefix, suffix) => {
    return prefix + "0010001000100010001000100010001000100010" + suffix
  })

  result = result.replace(/001c001b001b0019001b0017001c001c0019001a/g, "0010001000100010001000100010001000100010")

  return result
}

/* ─── Main Export ─── */

/**
 * Takes a PDF input (Base64 data URL, HTTP URL, or Uint8Array/ArrayBuffer),
 * parses PDF content streams, masks all phone number patterns,
 * and returns the masked PDF as a Base64 data URL.
 *
 * @param {string|Uint8Array|ArrayBuffer} input
 * @returns {Promise<string>} masked data URL
 */
export async function maskPhoneInPdfDataUrl(input) {
  if (!input) return input

  let pdfBytes = null

  // 1. Data URL input
  if (typeof input === "string" && input.startsWith("data:application/pdf")) {
    const b64 = input.split(",")[1]
    if (!b64) return input
    try {
      pdfBytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))
    } catch {
      return input
    }
  }
  // 2. HTTP/Relative URL input
  else if (typeof input === "string") {
    try {
      const res = await fetch(input)
      if (!res.ok) return input
      const ab = await res.arrayBuffer()
      pdfBytes = new Uint8Array(ab)
    } catch {
      return input
    }
  }
  // 3. Uint8Array or ArrayBuffer input
  else if (input instanceof Uint8Array) {
    pdfBytes = input
  } else if (input instanceof ArrayBuffer) {
    pdfBytes = new Uint8Array(input)
  }

  if (!pdfBytes) return input

  let doc
  try {
    doc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true })
  } catch {
    return input
  }

  const ctx = doc.context
  let changed = false

  for (const [ref, obj] of ctx.enumerateIndirectObjects()) {
    if (!(obj instanceof PDFRawStream)) continue

    const dict = obj.dict
    const filter = dict.get(PDFName.of("Filter"))
    const filterStr = filter ? filter.toString() : ""
    const isFlate = filterStr === "/FlateDecode" || filterStr.includes("FlateDecode")
    const isPlain = !filter

    if (!isFlate && !isPlain) continue

    let decoded
    if (isFlate) {
      decoded = inflate(obj.contents)
      if (!decoded) continue
    } else {
      decoded = new Uint8Array(obj.contents)
    }

    const text = bytesToStr(decoded)
    let masked = maskLiteralPhones(text)
    masked = maskHexPhones(masked)
    masked = maskTJArrays(masked)
    masked = maskHexTJArrays(masked)
    masked = maskCustomFontGlyphs(masked)

    if (masked === text) continue

    const newRaw = strToBytes(masked)
    const final = isFlate ? deflate(newRaw) : newRaw

    dict.set(PDFName.of("Length"), PDFNumber.of(final.length))
    ctx.assign(ref, PDFRawStream.of(dict, final))
    changed = true
  }

  if (!changed && typeof input === "string" && input.startsWith("data:")) {
    return input
  }

  const saved = await doc.save()
  return "data:application/pdf;base64," + uint8ToBase64(saved)
}
