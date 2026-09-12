/* Hallmark & Emil Kowalski Living Canvas Portfolio Editor · Dedicated Resume & Telemetry Architecture */

import React, { useEffect, useState } from "react"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import resumeDataFallback from "../content/resumeData.json"
import { supabase } from "../lib/supabaseClient"
import { maskPhoneInPdfDataUrl } from "../lib/pdfMasker"
import styles from "../styles/admin.module.css"

export default function HallmarkLivingCanvasAdmin() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  // Dedicated Module Navigation State: 'canvas' | 'resume' | 'seo'
  const [activeTab, setActiveTab] = useState("canvas")

  // Auth States
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState(null)
  const [authLoading, setAuthLoading] = useState(false)

  // Portfolio Living Data States
  const [portfolioData, setPortfolioData] = useState(resumeDataFallback)

  // PDF Resume State & History Ledger
  const [pdfDataUrl, setPdfDataUrl] = useState("")
  const [pdfFileName, setPdfFileName] = useState("Abdul_Raheem_Resume.pdf")
  const [pdfFileSize, setPdfFileSize] = useState("120 KB")
  const [pdfUpdatedAt, setPdfUpdatedAt] = useState("")
  const [pdfHistory, setPdfHistory] = useState([])

  // Visitor Download Telemetry Analytics State
  const [downloadAnalyticsLogs, setDownloadAnalyticsLogs] = useState([])

  const [toast, setToast] = useState({ show: false, message: "", type: "info" })
  const [saving, setSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // 15-Second Undo Safety Engine
  const [undoState, setUndoState] = useState(null)

  const router = useRouter()
  const basePath = router?.basePath || ""
  const profileSrc = `${basePath}/profile-160.webp`

  // Default SEO fallback structure
  const defaultSeo = {
    metaTitle: "Abdul Raheem · Software Engineer",
    metaDescription:
      "Software Engineer in Bengaluru with 2 years of backend experience in Java, Spring Boot, Python, Azure Cosmos DB, PostgreSQL, and Redis.",
    keywords:
      "Abdul Raheem, Software Engineer, Java, Spring Boot, Microservices, REST APIs, Python, FastAPI, Azure Cosmos DB, PostgreSQL, Redis, Distributed Systems, Bengaluru, India",
    ogTitle: "Abdul Raheem · Software Engineer Portfolio",
    ogDescription:
      "Software Engineer with 2 years of backend production experience in Java, Spring Boot, Python, Azure Cosmos DB, PostgreSQL, and Redis.",
    ogImage: "https://raheem.page/og-image.webp",
    canonicalUrl: "https://raheem.page/",
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) {
      loadContent()
    }
  }, [session])

  useEffect(() => {
    if (!undoState) return
    if (undoState.timeLeft <= 0) {
      setUndoState(null)
      return
    }
    const interval = setInterval(() => {
      setUndoState((prev) => {
        if (!prev) return null
        if (prev.timeLeft <= 1) return null
        return { ...prev, timeLeft: prev.timeLeft - 1 }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [undoState])

  function triggerToast(message, type = "success") {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: "", type: "info" }), 3500)
  }

  function handleTextareaResize(e) {
    if (e.target) {
      e.target.style.height = "auto"
      e.target.style.height = `${e.target.scrollHeight}px`
    }
  }

  async function loadContent() {
    try {
      // 1. Fetch Resume Data (Dedicated resume_history table vs portfolio_content)
      try {
        const { data: resumeRows, error: resumeErr } = await supabase
          .from("resume_history")
          .select("*")
          .order("created_at", { ascending: false })

        if (!resumeErr && resumeRows && resumeRows.length > 0) {
          const historyMapped = resumeRows.map((r) => ({
            id: r.id,
            fileName: r.file_name,
            fileSize: r.file_size,
            uploadedAt: r.created_at,
            url: r.url,
            active: r.is_active,
          }))
          setPdfHistory(historyMapped)

          const activeRow = resumeRows.find((r) => r.is_active) || resumeRows[0]
          setPdfDataUrl(activeRow.url)
          setPdfFileName(activeRow.file_name)
          setPdfFileSize(activeRow.file_size)
          setPdfUpdatedAt(activeRow.created_at)
        } else {
          // Fallback to portfolio_content section_key = 'pdf_resume'
          const { data: row } = await supabase
            .from("portfolio_content")
            .select("data, updated_at")
            .eq("section_key", "pdf_resume")
            .maybeSingle()

          if (row?.data) {
            setPdfDataUrl(row.data.url || "")
            setPdfFileName(row.data.fileName || "Abdul_Raheem_Resume.pdf")
            setPdfFileSize(row.data.fileSize || "120 KB")
            setPdfUpdatedAt(row.updated_at || "")
            setPdfHistory(row.data.history || [])
          }
        }
      } catch (err) {}

      // 2. Fetch Download Analytics Telemetry (resume_downloads vs portfolio_content)
      try {
        const { data: analyticsRows, error: analyticsErr } = await supabase
          .from("resume_downloads")
          .select("*")
          .order("timestamp", { ascending: false })

        if (!analyticsErr && analyticsRows && analyticsRows.length > 0) {
          setDownloadAnalyticsLogs(analyticsRows)
        } else {
          const { data: row } = await supabase
            .from("portfolio_content")
            .select("data")
            .eq("section_key", "resume_downloads")
            .maybeSingle()

          if (row?.data?.logs) {
            setDownloadAnalyticsLogs(row.data.logs)
          }
        }
      } catch (err) {}

      // 3. Fetch Portfolio Data
      const { data: rows, error } = await supabase
        .from("portfolio_content")
        .select("section_key, data, updated_at")

      if (!error && rows && rows.length > 0) {
        const merged = { seo: defaultSeo, ...resumeDataFallback }
        rows.forEach((r) => {
          if (r.section_key && r.data && r.section_key !== "pdf_resume" && r.section_key !== "resume_downloads") {
            merged[r.section_key] = r.data
          }
        })
        setPortfolioData(merged)
        setHasUnsavedChanges(false)
      } else {
        setPortfolioData((prev) => ({ seo: defaultSeo, ...prev }))
      }
    } catch (e) {}
  }

  async function handleLogin(e) {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError(null)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      setAuthError(error.message)
    } else {
      triggerToast("Authenticated into Living Portfolio Studio", "success")
    }
    setAuthLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setSession(null)
    triggerToast("Session terminated", "info")
  }

  async function saveAllToSupabase() {
    if (!session) {
      triggerToast("Unauthorized: You must log in to save changes.", "error")
      return
    }
    setSaving(true)
    try {
      const keys = [
        "profile",
        "coreSkills",
        "workExperiences",
        "projects",
        "education",
        "certifications",
        "publicationsAndActivities",
        "seo",
      ]

      for (const k of keys) {
        if (portfolioData[k]) {
          await supabase.from("portfolio_content").upsert(
            {
              section_key: k,
              data: portfolioData[k],
              updated_at: new Date().toISOString(),
            },
            { onConflict: "section_key" }
          )
        }
      }

      if (pdfDataUrl) {
        await supabase.from("portfolio_content").upsert(
          {
            section_key: "pdf_resume",
            data: {
              url: pdfDataUrl,
              fileName: pdfFileName,
              fileSize: pdfFileSize,
              history: pdfHistory,
            },
            updated_at: new Date().toISOString(),
          },
          { onConflict: "section_key" }
        )
      }

      triggerToast("✦ All changes saved to Supabase!", "success")
      setHasUnsavedChanges(false)
    } catch (err) {
      triggerToast(`Supabase Sync Error: ${err.message}`, "error")
    } finally {
      setSaving(false)
    }
  }

  async function savePdfToSupabase(dataUrl, fileName, fileSizeStr, updatedHistory) {
    if (!session) {
      triggerToast("Unauthorized: You must log in to upload resumes.", "error")
      return
    }
    setSaving(true)
    try {
      // 1. Try dedicated table resume_history
      const activeItem = updatedHistory.find((i) => i.active) || { id: `res-${Date.now()}` }
      const payload = {
        id: activeItem.id || `res-${Date.now()}`,
        file_name: fileName,
        file_size: fileSizeStr,
        url: dataUrl,
        is_active: true,
        created_at: new Date().toISOString(),
      }

      const { error: historyTableErr } = await supabase.from("resume_history").upsert(payload)

      // 2. Dual fallback to portfolio_content section_key = 'pdf_resume'
      await supabase.from("portfolio_content").upsert(
        {
          section_key: "pdf_resume",
          data: {
            url: dataUrl,
            fileName: fileName,
            fileSize: fileSizeStr,
            history: updatedHistory,
          },
          updated_at: new Date().toISOString(),
        },
        { onConflict: "section_key" }
      )

      triggerToast("✦ PDF resume saved to database.", "success")
      setHasUnsavedChanges(false)
    } catch (err) {
      triggerToast(`Supabase Save Error: ${err.message}`, "error")
    } finally {
      setSaving(false)
    }
  }

  function handlePdfFileUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    if (file.type !== "application/pdf") {
      triggerToast("Please select a valid .pdf file!", "error")
      return
    }

    const sizeFormatted = (file.size / 1024).toFixed(1) + " KB"
    const timestamp = new Date().toISOString()
    const newEntry = {
      id: `ver-${Date.now()}`,
      fileName: file.name,
      fileSize: sizeFormatted,
      uploadedAt: timestamp,
      url: "",
      active: true,
    }

    const reader = new FileReader()
    reader.onload = async (event) => {
      let dataUrl = event.target.result

      // 1. Mask phone number in PDF before storing
      try {
        dataUrl = await maskPhoneInPdfDataUrl(dataUrl)
      } catch (err) {}

      // 2. Upload to Supabase Storage bucket 'resumes' (with fallback to base64)
      let finalUrl = dataUrl
      try {
        const base64Data = dataUrl.split(',')[1]
        const byteCharacters = atob(base64Data)
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        const blob = new Blob([byteArray], { type: 'application/pdf' })

        const storagePath = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
        const { data: uploadData, error: uploadErr } = await supabase.storage
          .from('resumes')
          .upload(storagePath, blob, {
            upsert: true,
            contentType: 'application/pdf',
            cacheControl: '3600',
          })

        if (!uploadErr && uploadData?.path) {
          const { data: publicData } = supabase.storage
            .from('resumes')
            .getPublicUrl(uploadData.path)
          if (publicData?.publicUrl) {
            finalUrl = publicData.publicUrl
          }
        }
      } catch (err) {}

      newEntry.url = finalUrl

      const deactivatedHistory = pdfHistory.map((item) => ({
        ...item,
        active: false,
      }))
      const newHistory = [newEntry, ...deactivatedHistory]

      setPdfDataUrl(finalUrl)
      setPdfFileName(file.name)
      setPdfFileSize(sizeFormatted)
      setPdfUpdatedAt(timestamp)
      setPdfHistory(newHistory)

      savePdfToSupabase(finalUrl, file.name, sizeFormatted, newHistory)
    }
    reader.readAsDataURL(file)
  }

  function setActiveResumeVersion(historyId) {
    const updatedHistory = pdfHistory.map((item) => ({
      ...item,
      active: item.id === historyId,
    }))

    const selected = updatedHistory.find((item) => item.id === historyId)
    if (selected) {
      setPdfDataUrl(selected.url)
      setPdfFileName(selected.fileName)
      setPdfFileSize(selected.fileSize)
      setPdfUpdatedAt(selected.uploadedAt)
      setPdfHistory(updatedHistory)
      savePdfToSupabase(selected.url, selected.fileName, selected.fileSize, updatedHistory)
      triggerToast(`Activated version: ${selected.fileName}`, "info")
    }
  }

  function deleteResumeVersion(historyId) {
    const updatedHistory = pdfHistory.filter((item) => item.id !== historyId)
    setPdfHistory(updatedHistory)

    if (updatedHistory.length > 0) {
      const activeItem = updatedHistory.find((i) => i.active) || updatedHistory[0]
      activeItem.active = true
      setPdfDataUrl(activeItem.url)
      setPdfFileName(activeItem.fileName)
      setPdfFileSize(activeItem.fileSize)
      savePdfToSupabase(activeItem.url, activeItem.fileName, activeItem.fileSize, updatedHistory)
    }
    triggerToast("Removed version from history ledger", "info")
  }

  async function clearAnalyticsLogs() {
    setDownloadAnalyticsLogs([])
    try {
      await supabase.from("portfolio_content").upsert(
        {
          section_key: "resume_downloads",
          data: { logs: [] },
          updated_at: new Date().toISOString(),
        },
        { onConflict: "section_key" }
      )
      triggerToast("Cleared download telemetry logs", "info")
    } catch (err) {}
  }

  function updateField(section, key, value) {
    setPortfolioData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [key]: value,
      },
    }))
    setHasUnsavedChanges(true)
  }

  function updateArrayItem(section, index, key, value) {
    const updated = [...(portfolioData[section] || [])]
    if (updated[index]) {
      updated[index][key] = value
      setPortfolioData((prev) => ({
        ...prev,
        [section]: updated,
      }))
      setHasUnsavedChanges(true)
    }
  }

  function addItem(section, newItemTemplate) {
    const current = portfolioData[section] || []
    setPortfolioData((prev) => ({
      ...prev,
      [section]: [...current, newItemTemplate],
    }))
    setHasUnsavedChanges(true)
    triggerToast(`Added entry to ${section}`, "info")
  }

  function deleteItemWithUndo(section, index) {
    const currentList = portfolioData[section] || []
    const itemToDelete = currentList[index]
    if (!itemToDelete) return

    setUndoState({
      section,
      index,
      item: itemToDelete,
      timeLeft: 15,
    })

    const updated = currentList.filter((_, i) => i !== index)
    setPortfolioData((prev) => ({
      ...prev,
      [section]: updated,
    }))
    setHasUnsavedChanges(true)
  }

  function restoreDeletedItem() {
    if (!undoState) return
    const { section, index, item } = undoState

    const currentList = [...(portfolioData[section] || [])]
    currentList.splice(index, 0, item)

    setPortfolioData((prev) => ({
      ...prev,
      [section]: currentList,
    }))
    setUndoState(null)
    triggerToast("↺ Entry restored successfully!", "success")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#17181c] text-zinc-400 flex flex-col items-center justify-center font-mono space-y-4">
        <div className="w-5 h-5 border border-zinc-700 border-t-emerald-400 rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest text-zinc-500">
          Loading Living Portfolio Canvas...
        </span>
      </div>
    )
  }

  // --- AUTH GATE ---
  if (!session) {
    return (
      <>
        <Head>
          <title>Studio Gate · Portfolio Studio</title>
          <meta name="robots" content="noindex, nofollow, noarchive" />
          <meta name="googlebot" content="noindex, nofollow, noarchive" />
        </Head>
        <div className="min-h-screen bg-[#17181c] text-zinc-100 flex flex-col justify-between p-6 selection:bg-emerald-500/20 selection:text-emerald-300 font-sans">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded bg-emerald-500 text-zinc-950 font-extrabold text-xs flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                AR
              </div>
              <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                Living Canvas Editor Gate
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-600">
              SUPABASE AUTH · RLS SECURED
            </span>
          </div>

          <div className="max-w-md mx-auto w-full py-12 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase block">
                01 / Authentication
              </span>
              <h1 className="text-2xl font-semibold text-white tracking-tight">
                Living Canvas Editor
              </h1>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Log in to edit your portfolio directly on the living canvas and sync to Supabase.
              </p>
            </div>

            {authError && (
              <div className="p-3 border-l border-rose-500 bg-rose-500/10 text-rose-300 text-xs font-mono">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Identity Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900/80 border border-zinc-800 rounded px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400 transition font-mono"
                  placeholder="admin@raheem.page"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Secret Key
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400 transition font-mono pr-12"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-500 hover:text-zinc-300"
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-bold py-2 rounded text-xs font-mono transition"
                >
                  {authLoading ? "Authenticating..." : "Unlock Living Canvas →"}
                </button>
              </div>
            </form>
          </div>

          <div className="border-t border-zinc-800 pt-4 flex items-center justify-between text-[11px] font-mono text-zinc-600">
            <span>HALLMARK LIVING CANVAS EDITOR</span>
            <span>NEXT.JS + POSTGRES JSONB</span>
          </div>
        </div>
      </>
    )
  }

  const currentSeo = portfolioData.seo || defaultSeo

  return (
    <>
      <Head>
        <title>Living Canvas Studio · Abdul Raheem</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="googlebot" content="noindex, nofollow, noarchive" />
      </Head>

      <div className={`${styles.adminShell} nighty-night-shell selection:bg-emerald-500/20 selection:text-emerald-300`}>
        {/* Toast Notification */}
        {toast.show && (
          <div className="fixed top-16 right-6 z-50 px-4 py-2.5 rounded-md bg-zinc-100 text-zinc-950 text-xs font-mono shadow-xl flex items-center space-x-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{toast.message}</span>
          </div>
        )}

        {/* 15-SECOND UNDO RESTORE FLOATING TOAST */}
        {undoState && (
          <div className={styles.undoToast}>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>
              Removed entry from <strong>{undoState.section}</strong> ({undoState.timeLeft}s)
            </span>
            <button
              onClick={restoreDeletedItem}
              className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold px-3 py-1 rounded-full text-[10px] font-mono transition"
            >
              ↺ Undo / Restore
            </button>
          </div>
        )}

        {/* HEADER NAVIGATION RAIL WITH DEDICATED MODULE TABS */}
        <header className={`${styles.header} sticky top-0 z-40 bg-[#17181c]/95 backdrop-blur-md border-b border-zinc-800/80 px-6 py-3 flex items-center justify-between`}>
          
          {/* LEFT SIDE: LOGO + BRAND + DEDICATED MODULE SWITCHER */}
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-3">
              <div className={styles.badgeLogo}>
                AR
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-mono text-zinc-200 font-bold tracking-tight leading-none">
                  Living Canvas Studio
                </span>
                <span className="text-[10px] font-mono text-zinc-500 leading-none mt-1">
                  Workbench Control Panel
                </span>
              </div>
            </div>

            {/* DEDICATED MODULE TABS (LEFT ALIGNED) */}
            <div className="flex items-center space-x-1 bg-zinc-900/90 p-1 rounded-lg border border-zinc-800">
              <button
                onClick={() => setActiveTab("canvas")}
                className={`px-3 py-1 rounded-md text-xs font-mono transition ${
                  activeTab === "canvas"
                    ? "bg-zinc-800 text-white font-semibold border border-zinc-700/60 shadow"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>Living Canvas</span>
              </button>

              <button
                onClick={() => setActiveTab("resume")}
                className={`px-3 py-1 rounded-md text-xs font-mono transition ${
                  activeTab === "resume"
                    ? "bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/30 shadow"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>PDF Resume Manager</span>
              </button>

              <button
                onClick={() => setActiveTab("seo")}
                className={`px-3 py-1 rounded-md text-xs font-mono transition ${
                  activeTab === "seo"
                    ? "bg-zinc-800 text-white font-semibold border border-zinc-700/60 shadow"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>SEO & Meta</span>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: CLOUD SYNC + PRIMARY SAVE + ACTIONS */}
          <div className="flex items-center space-x-3.5">
            <div className="flex items-center space-x-2 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-md text-xs font-mono">
              <span className={`w-2 h-2 rounded-full ${saving ? "bg-amber-400 animate-ping" : hasUnsavedChanges ? "bg-amber-400" : "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"}`} />
              <span className="text-zinc-300 font-mono">
                {saving ? "Syncing..." : hasUnsavedChanges ? "Edits Pending" : "Supabase Synced"}
              </span>
            </div>

            <button
              onClick={saveAllToSupabase}
              disabled={saving}
              className={`${styles.primaryButton} bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-4 py-1.5 rounded-md text-xs font-mono tracking-wide transition active:scale-95 shadow-md border-none disabled:opacity-50`}
            >
              {saving ? "Saving..." : "Save Canvas →"}
            </button>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-zinc-400 hover:text-white transition ml-2"
              title="Open Live Website"
            >
              <span>View Site</span>
            </a>

            <button
              onClick={handleLogout}
              className="text-xs font-mono text-zinc-400 hover:text-rose-400 transition ml-1"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* MODULE 1: BESPOKE PDF RESUME VERSION CONTROL & DOWNLOAD TELEMETRY */}
        {/* ========================================================================= */}
        {activeTab === "resume" && (
          <div className="max-w-6xl mx-auto px-6 py-10 space-y-10 font-mono">
            {/* MODULE HEADER */}
            <div className="border-b border-zinc-800 pb-5 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] text-emerald-400 uppercase tracking-widest block font-mono">
                  RESUME VERSION CONTROL LEDGER
                </span>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  PDF Resume Management Console
                </h1>
              </div>

              <div className="flex items-center space-x-3">
                <label className="cursor-pointer bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-4 py-2 rounded-md text-xs font-mono transition shadow-md">
                  <span>Upload New PDF</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handlePdfFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* TOP 2-COLUMN CONTROL GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* CURRENT ACTIVE RESUME CARD */}
              <div className="md:col-span-1 bg-zinc-900/90 border border-zinc-800 rounded-xl p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Current Active Resume
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    LIVE ON SITE
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="text-white font-bold text-sm truncate">
                    {pdfFileName}
                  </div>
                  <div className="text-zinc-400 text-[11px]">
                    Size: {pdfFileSize || "120 KB"}
                  </div>
                  {pdfUpdatedAt && (
                    <div className="text-zinc-500 text-[10px]">
                      Updated: {new Date(pdfUpdatedAt).toLocaleString()}
                    </div>
                  )}
                </div>

                {pdfDataUrl && (
                  <div className="pt-2 border-t border-zinc-800 flex flex-col gap-2">
                    <a
                      href={pdfDataUrl}
                      download={pdfFileName}
                      className="w-full py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-center text-xs font-bold transition"
                    >
                      Download Active Resume
                    </a>
                  </div>
                )}
              </div>

              {/* LIVE EMBED PREVIEW */}
              <div className="md:col-span-2 bg-zinc-900/90 border border-zinc-800 rounded-xl p-6 space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Live PDF Preview
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">
                    Active Document
                  </span>
                </div>

                {pdfDataUrl ? (
                  <iframe
                    src={pdfDataUrl}
                    className="w-full h-[380px] border border-zinc-800 rounded-lg bg-zinc-950"
                    title="Live PDF Resume Preview"
                  />
                ) : (
                  <div className="w-full h-[380px] border border-dashed border-zinc-800 rounded-lg bg-zinc-950 flex items-center justify-center text-zinc-500 text-xs">
                    No active PDF uploaded yet.
                  </div>
                )}
              </div>
            </div>

            {/* RESUME VERSION HISTORY LEDGER TABLE */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Resume Version History ({pdfHistory.length})
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Audit log of all uploaded resume documents. Switch or restore any previous version.
                  </p>
                </div>
              </div>

              {pdfHistory.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-zinc-300 font-mono">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-500 uppercase tracking-wider text-[10px]">
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">File Name</th>
                        <th className="py-2.5 px-3">Size</th>
                        <th className="py-2.5 px-3">Date Uploaded</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {pdfHistory.map((item, idx) => (
                        <tr key={item.id || idx} className="hover:bg-zinc-800/40 transition">
                          <td className="py-3 px-3">
                            {item.active ? (
                              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                                ACTIVE
                              </span>
                            ) : (
                              <span className="text-[10px] text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
                                ARCHIVED
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 font-bold text-white truncate max-w-xs">
                            {item.fileName}
                          </td>
                          <td className="py-3 px-3 text-zinc-400">
                            {item.fileSize}
                          </td>
                          <td className="py-3 px-3 text-zinc-500 text-[11px]">
                            {item.uploadedAt ? new Date(item.uploadedAt).toLocaleString() : "Recent"}
                          </td>
                          <td className="py-3 px-3 text-right space-x-2">
                            {!item.active && (
                              <button
                                onClick={() => setActiveResumeVersion(item.id)}
                                className="text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1 rounded border border-emerald-500/30 transition"
                              >
                                Set Active
                              </button>
                            )}
                            <a
                              href={item.url}
                              download={item.fileName}
                              className="text-xs text-zinc-300 hover:text-white bg-zinc-800 px-2.5 py-1 rounded border border-zinc-700 transition"
                            >
                              Download
                            </a>
                            <button
                              onClick={() => deleteResumeVersion(item.id)}
                              className="text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 px-2 py-1 rounded border border-rose-500/30 transition"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-zinc-500">
                  No version history recorded yet. Upload a PDF above to create your first version snapshot!
                </div>
              )}
            </div>

            {/* VISITOR GEOLOCATION & DOWNLOAD TELEMETRY ANALYTICS TABLE */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Resume Download Analytics & Visitor Location Telemetry ({downloadAnalyticsLogs.length})
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Real-time log of recruiters and visitors who downloaded your resume with location coordinates.
                  </p>
                </div>

                {downloadAnalyticsLogs.length > 0 && (
                  <button
                    onClick={clearAnalyticsLogs}
                    className="text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 px-3 py-1 rounded border border-rose-500/30 transition"
                  >
                    Clear Logs
                  </button>
                )}
              </div>

              {downloadAnalyticsLogs.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-zinc-300 font-mono">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-500 uppercase tracking-wider text-[10px]">
                        <th className="py-2.5 px-3">Date & Time</th>
                        <th className="py-2.5 px-3">City / Country</th>
                        <th className="py-2.5 px-3">Coordinates (Lat, Long)</th>
                        <th className="py-2.5 px-3">Permission State</th>
                        <th className="py-2.5 px-3">Browser Device</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {downloadAnalyticsLogs.map((log, idx) => (
                        <tr key={log.id || idx} className="hover:bg-zinc-800/40 transition">
                          <td className="py-3 px-3 text-zinc-200">
                            {log.timestamp ? new Date(log.timestamp).toLocaleString() : "Just Now"}
                          </td>
                          <td className="py-3 px-3 font-bold text-emerald-400">
                            {log.city || "Unknown"}, {log.country || "Global"}
                          </td>
                          <td className="py-3 px-3 text-zinc-400 text-[11px]">
                            {log.latitude && log.longitude ? `${log.latitude.toFixed(4)}, ${log.longitude.toFixed(4)}` : "Approx IP"}
                          </td>
                          <td className="py-3 px-3">
                            <span className={`text-[10px] px-2 py-0.5 rounded uppercase ${log.permission === "granted" ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 font-bold" : "text-amber-400 bg-amber-500/10 border border-amber-500/30"}`}>
                              {log.permission || "granted"}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-zinc-500 text-[11px] truncate max-w-xs">
                            {log.user_agent}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-zinc-500">
                  No resume download events logged yet. When visitors click "Download Resume" on your site, their location & download telemetry will appear here!
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 2: DEDICATED SEO & META MANAGER PAGE */}
        {/* ========================================================================= */}
        {activeTab === "seo" && (
          <div className="max-w-6xl mx-auto px-6 py-10 space-y-8 font-mono">
            <div className="border-b border-zinc-800 pb-5 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] text-emerald-400 uppercase tracking-widest block font-mono">
                  SEARCH ENGINE OPTIMIZATION
                </span>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  SEO & Metadata Configuration Studio
                </h1>
              </div>

              <button
                onClick={saveAllToSupabase}
                className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-4 py-2 rounded-md text-xs font-mono transition"
              >
                Save SEO Settings →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* FORM METADATA INPUTS */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5 text-xs">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Metadata Tag Controls
                </h3>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 uppercase tracking-widest block text-[11px]">
                    Page Title Tag (&lt;title&gt;)
                  </label>
                  <input
                    type="text"
                    value={currentSeo.metaTitle || ""}
                    onChange={(e) => updateField("seo", "metaTitle", e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-400 font-mono block"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 uppercase tracking-widest block text-[11px]">
                    Search Meta Description
                  </label>
                  <textarea
                    rows={4}
                    value={currentSeo.metaDescription || ""}
                    onChange={(e) => updateField("seo", "metaDescription", e.target.value)}
                    onInput={handleTextareaResize}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-3 text-zinc-300 focus:outline-none focus:border-emerald-400 font-mono block"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 uppercase tracking-widest block text-[11px]">
                    Target Search Keywords
                  </label>
                  <textarea
                    rows={3}
                    value={currentSeo.keywords || ""}
                    onChange={(e) => updateField("seo", "keywords", e.target.value)}
                    onInput={handleTextareaResize}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-3 text-emerald-400 focus:outline-none focus:border-emerald-400 font-mono block"
                  />
                </div>
              </div>

              {/* LIVE GOOGLE SERP SEARCH PREVIEW CARD */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Live Google Search Result Preview
                </h3>

                <div className="bg-white text-zinc-900 rounded-lg p-5 space-y-2 shadow-xl font-sans">
                  <div className="text-[12px] text-[#202124] flex items-center space-x-1">
                    <span>https://raheem.page</span>
                    <span className="text-xs text-zinc-400">› abdul-raheem</span>
                  </div>
                  <h4 className="text-lg text-[#1a0dab] hover:underline font-normal cursor-pointer leading-snug">
                    {currentSeo.metaTitle || "Abdul Raheem · Backend Engineer"}
                  </h4>
                  <p className="text-xs text-[#4d5156] leading-relaxed">
                    {currentSeo.metaDescription ||
                      "Backend Engineer specializing in Java Spring Boot microservices, RESTful APIs, Azure SQL, and cloud deployments."}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2 text-xs">
                  <span className="text-emerald-400 font-bold block">
                    ✓ Google Indexation Checklist
                  </span>
                  <ul className="space-y-1 text-zinc-400 text-[11px]">
                    <li>• Canonical URL: <code className="text-zinc-200">https://raheem.page/</code></li>
                    <li>• IndexNow Instant Ping: <code className="text-zinc-200">Enabled</code></li>
                    <li>• LLM Summary Link: <code className="text-zinc-200">/llms.txt</code></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 3: MAIN HALLMARK LIVING CANVAS PORTFOLIO EDITOR */}
        {/* ========================================================================= */}
        {activeTab === "canvas" && (
          <>
            <div className="nighty-night-atmosphere" />
            <div className="nighty-night-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                
                {/* LIVING SIDEBAR PROFILE CARD */}
                <aside className="w-full lg:w-80 xl:w-96 shrink-0 self-start lg:sticky lg:top-20">
                  <div className="minimal-card p-6 flex flex-col gap-5 relative group border border-emerald-500/30 hover:border-emerald-500/60 transition">
                    <span className="absolute top-2 right-2 text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase">
                      Living Profile Card
                    </span>

                    {/* Profile Header */}
                    <div className="flex items-start gap-3.5 border-b border-(--color-border-subtle) pb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-(--color-border-subtle) mt-0.5">
                        <Image
                          src={profileSrc}
                          alt={portfolioData.profile.name || "Abdul Raheem"}
                          width={48}
                          height={48}
                          priority
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 w-full min-w-0">
                        <input
                          type="text"
                          value={portfolioData.profile.name || ""}
                          onChange={(e) => updateField("profile", "name", e.target.value)}
                          className="text-base font-bold text-(--color-text-primary) tracking-tight leading-snug bg-transparent focus:outline-none hover:bg-zinc-900/60 focus:bg-zinc-900/80 rounded py-1 px-1.5 w-full block transition"
                        />
                        <input
                          type="text"
                          value={portfolioData.profile.title || ""}
                          onChange={(e) => updateField("profile", "title", e.target.value)}
                          className="text-xs font-mono font-normal text-emerald-400 bg-transparent focus:outline-none hover:bg-zinc-900/60 focus:bg-zinc-900/80 rounded py-0.5 px-1.5 w-full block transition"
                        />
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-(--color-accent-green) font-medium pt-1 w-full min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-green) shrink-0" />
                          <input
                            type="text"
                            value={portfolioData.profile.status || ""}
                            onChange={(e) => updateField("profile", "status", e.target.value)}
                            className="bg-transparent text-emerald-400 focus:outline-none hover:bg-zinc-900/60 focus:bg-zinc-900/80 rounded py-0.5 px-1.5 w-full block transition"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bio Section */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                        Bio Narrative
                      </span>
                      <textarea
                        rows={4}
                        value={portfolioData.profile.bio || ""}
                        onChange={(e) => updateField("profile", "bio", e.target.value)}
                        onInput={handleTextareaResize}
                        className="text-xs text-(--color-text-secondary) leading-relaxed w-full bg-transparent focus:outline-none hover:bg-zinc-900/60 focus:bg-zinc-900/80 rounded p-1.5 block transition"
                      />
                    </div>

                    {/* Skills Cloud */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[11px] font-mono text-(--color-text-muted) uppercase tracking-wider">
                        Core Stack (Comma-Separated)
                      </span>
                      <textarea
                        rows={2}
                        value={(portfolioData.coreSkills || []).join(", ")}
                        onChange={(e) => {
                          const arr = e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                          setPortfolioData((prev) => ({ ...prev, coreSkills: arr }))
                          setHasUnsavedChanges(true)
                        }}
                        onInput={handleTextareaResize}
                        className="text-xs font-mono text-emerald-400 bg-transparent focus:outline-none hover:bg-zinc-900/60 focus:bg-zinc-900/80 rounded p-1.5 w-full block transition"
                      />
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(portfolioData.coreSkills || []).map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-(--color-surface-subtle) border border-(--color-border-subtle) text-(--color-text-secondary)"
                          >
                            #{skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* PDF Resume Actions */}
                    <div className="flex flex-col gap-2 pt-2 border-t border-(--color-border-subtle)">
                      {pdfDataUrl ? (
                        <a
                          href={pdfDataUrl}
                          download={pdfFileName}
                          className="w-full min-h-[44px] px-4 rounded-lg bg-(--color-accent-green)/10 hover:bg-(--color-accent-green)/20 border border-(--color-accent-green)/30 text-(--color-accent-green) text-xs font-mono font-semibold flex items-center justify-center transition"
                        >
                          <span>Download Resume</span>
                        </a>
                      ) : (
                        <label className="cursor-pointer w-full min-h-[44px] px-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono flex items-center justify-center transition border border-zinc-700">
                          <span>Upload Resume PDF</span>
                          <input
                            type="file"
                            accept="application/pdf"
                            onChange={handlePdfFileUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </aside>

                {/* MAIN LIVING SECTIONS CANVAS */}
                <main className="flex-1 w-full space-y-10 min-w-0">

                  {/* SECTION 1: WORK EXPERIENCES */}
                  <section id="experience" className="flex flex-col gap-4">
                    <div className="border-b border-(--color-border-subtle) pb-3 flex items-center justify-between">
                      <h2 className="text-base font-bold text-(--color-text-primary) tracking-tight">
                        Work Experience ({portfolioData.workExperiences?.length || 0})
                      </h2>
                      <button
                        onClick={() =>
                          addItem("workExperiences", {
                            id: `job-${Date.now()}`,
                            period: "Jan 2026 – Present",
                            role: "Senior Backend Engineer",
                            company: "Company Name",
                            companyUrl: "",
                            description:
                              "Built robust microservices and distributed API infrastructure.",
                            stack: ["Java", "Spring Boot", "PostgreSQL"],
                            featured: true,
                          })
                        }
                        className={`${styles.actionAddButton}`}
                      >
                        + Add Experience
                      </button>
                    </div>

                    <div className="flex flex-col divide-y divide-(--color-border-subtle)">
                      {(portfolioData.workExperiences || []).map((exp, idx) => (
                        <div key={idx} className="py-6 first:pt-2 last:pb-2 flex flex-col gap-3">
                          {/* HEADER ROW WITH CLEAN NON-OVERLAPPING ACTIONS */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
                            <div className="flex-1 flex flex-col gap-1 min-w-0">
                              <input
                                type="text"
                                value={exp.company || ""}
                                onChange={(e) => updateArrayItem("workExperiences", idx, "company", e.target.value)}
                                className="text-base font-bold text-(--color-text-primary) tracking-tight bg-transparent focus:outline-none hover:bg-zinc-900/60 focus:bg-zinc-900/80 rounded py-1 px-1.5 w-full block transition"
                                placeholder="Company Name"
                              />
                              <input
                                type="text"
                                value={exp.role || ""}
                                onChange={(e) => updateArrayItem("workExperiences", idx, "role", e.target.value)}
                                className="text-xs font-mono text-emerald-400 tracking-tight bg-transparent focus:outline-none hover:bg-zinc-900/60 focus:bg-zinc-900/80 rounded py-0.5 px-1.5 w-full block transition"
                                placeholder="Role Title"
                              />
                            </div>

                            <div className="flex items-center space-x-3 shrink-0 self-start sm:self-center">
                              <input
                                type="text"
                                value={exp.period || ""}
                                onChange={(e) => updateArrayItem("workExperiences", idx, "period", e.target.value)}
                                className="text-[11px] font-mono text-zinc-400 tabular-nums bg-transparent focus:outline-none hover:bg-zinc-900/60 focus:bg-zinc-900/80 rounded text-right py-1 px-2 w-36 block transition"
                                placeholder="Period"
                              />
                              <button
                                onClick={() => deleteItemWithUndo("workExperiences", idx)}
                                className="text-xs font-mono text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-2.5 py-1 rounded transition border border-rose-500/30 shrink-0"
                              >
                                ✕ Remove
                              </button>
                            </div>
                          </div>

                          <textarea
                            rows={3}
                            value={exp.description || ""}
                            onChange={(e) => updateArrayItem("workExperiences", idx, "description", e.target.value)}
                            onInput={handleTextareaResize}
                            className="text-xs text-(--color-text-secondary) leading-relaxed w-full bg-transparent focus:outline-none hover:bg-zinc-900/60 focus:bg-zinc-900/80 rounded p-1.5 block transition"
                            placeholder="Experience description..."
                          />
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* SECTION 2: PROJECTS */}
                  <section id="projects" className="flex flex-col gap-4">
                    <div className="border-b border-(--color-border-subtle) pb-3 flex items-center justify-between">
                      <h2 className="text-base font-bold text-(--color-text-primary) tracking-tight">
                        Featured Projects ({portfolioData.projects?.length || 0})
                      </h2>
                      <button
                        onClick={() =>
                          addItem("projects", {
                            id: `proj-${Date.now()}`,
                            period: "2026",
                            title: "New System Project",
                            description:
                              "Built a real-time distributed backend pipeline.",
                            repoUrl: "https://github.com/Raheem02",
                            stack: ["Python", "FastAPI", "PostgreSQL"],
                            featured: true,
                          })
                        }
                        className={`${styles.actionAddButton}`}
                      >
                        + Add Project
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(portfolioData.projects || []).map((proj, idx) => (
                        <div key={idx} className="minimal-card p-5 flex flex-col gap-3 relative group">
                          <div className="flex items-center justify-between gap-3 w-full border-b border-zinc-800/80 pb-2">
                            <input
                              type="text"
                              value={proj.title || ""}
                              onChange={(e) => updateArrayItem("projects", idx, "title", e.target.value)}
                              className="text-base font-bold text-(--color-text-primary) tracking-tight bg-transparent focus:outline-none hover:bg-zinc-900/60 focus:bg-zinc-900/80 rounded py-0.5 px-1.5 w-full block min-w-0 transition"
                              placeholder="Project Title"
                            />
                            <div className="flex items-center space-x-2 shrink-0">
                              <input
                                type="text"
                                value={proj.period || ""}
                                onChange={(e) => updateArrayItem("projects", idx, "period", e.target.value)}
                                className="text-[11px] font-mono text-zinc-400 bg-transparent focus:outline-none hover:bg-zinc-900/60 focus:bg-zinc-900/80 rounded text-right py-0.5 px-1.5 w-16 block transition"
                                placeholder="Year"
                              />
                              <button
                                onClick={() => deleteItemWithUndo("projects", idx)}
                                className="text-xs font-mono text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-2 py-0.5 rounded transition border border-rose-500/30 shrink-0"
                              >
                                ✕
                              </button>
                            </div>
                          </div>

                          <textarea
                            rows={3}
                            value={proj.description || ""}
                            onChange={(e) => updateArrayItem("projects", idx, "description", e.target.value)}
                            onInput={handleTextareaResize}
                            className="text-xs text-(--color-text-secondary) leading-relaxed bg-transparent focus:outline-none hover:bg-zinc-900/60 focus:bg-zinc-900/80 rounded p-1.5 w-full block transition"
                            placeholder="Project narrative..."
                          />
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* SECTION 3: EDUCATION & CERTIFICATIONS */}
                  <section id="education" className="flex flex-col gap-4">
                    <div className="border-b border-(--color-border-subtle) pb-3 flex items-center justify-between">
                      <h2 className="text-base font-bold text-(--color-text-primary) tracking-tight">
                        Education & Certifications
                      </h2>
                      <button
                        onClick={() =>
                          addItem("education", {
                            id: `edu-${Date.now()}`,
                            period: "2026 – 2028",
                            degree: "Specialized Degree / Certification",
                            institution: "University / Institute Name",
                            location: "Bengaluru, India",
                            cgpa: "CGPA 9.0",
                            url: "",
                          })
                        }
                        className={`${styles.actionAddButton}`}
                      >
                        + Add Degree
                      </button>
                    </div>

                    <div className="flex flex-col divide-y divide-(--color-border-subtle)">
                      {(portfolioData.education || []).map((edu, idx) => (
                        <div key={idx} className="py-4 first:pt-0 last:pb-0 flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-3 w-full">
                            <input
                              type="text"
                              value={edu.degree || ""}
                              onChange={(e) => updateArrayItem("education", idx, "degree", e.target.value)}
                              className="text-sm font-bold text-(--color-text-primary) bg-transparent focus:outline-none hover:bg-zinc-900/60 focus:bg-zinc-900/80 rounded py-1 px-1.5 w-full block min-w-0 transition"
                            />
                            <div className="flex items-center space-x-2 shrink-0">
                              <input
                                type="text"
                                value={edu.period || ""}
                                onChange={(e) => updateArrayItem("education", idx, "period", e.target.value)}
                                className="text-[11px] font-mono text-zinc-400 bg-transparent focus:outline-none hover:bg-zinc-900/60 focus:bg-zinc-900/80 rounded text-right py-1 px-1.5 w-24 block transition"
                              />
                              <button
                                onClick={() => deleteItemWithUndo("education", idx)}
                                className="text-xs font-mono text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-2 py-0.5 rounded transition border border-rose-500/30 shrink-0"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                          <input
                            type="text"
                            value={edu.institution || ""}
                            onChange={(e) => updateArrayItem("education", idx, "institution", e.target.value)}
                            className="text-xs font-medium text-emerald-400 bg-transparent focus:outline-none hover:bg-zinc-900/60 focus:bg-zinc-900/80 rounded py-0.5 px-1.5 w-full block transition"
                          />
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* SECTION 4: RESEARCH & PUBLICATIONS */}
                  <section className="flex flex-col gap-4">
                    <div className="border-b border-(--color-border-subtle) pb-3 flex items-center justify-between">
                      <h2 className="text-base font-bold text-(--color-text-primary) tracking-tight">
                        Research & Activities
                      </h2>
                      <button
                        onClick={() =>
                          addItem("publicationsAndActivities", {
                            id: `act-${Date.now()}`,
                            period: "Research",
                            title: "New Research Paper / Activity",
                            description: "Summary narrative of research findings...",
                          })
                        }
                        className={`${styles.actionAddButton}`}
                      >
                        + Add Research
                      </button>
                    </div>

                    <div className="flex flex-col divide-y divide-(--color-border-subtle)">
                      {(portfolioData.publicationsAndActivities || []).map((pub, idx) => (
                        <div key={idx} className="py-4 first:pt-0 last:pb-0 flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-3 w-full">
                            <input
                              type="text"
                              value={pub.title || ""}
                              onChange={(e) => updateArrayItem("publicationsAndActivities", idx, "title", e.target.value)}
                              className="text-sm font-bold text-(--color-text-primary) bg-transparent focus:outline-none hover:bg-zinc-900/60 focus:bg-zinc-900/80 rounded py-1 px-1.5 w-full block transition min-w-0"
                            />
                            <button
                              onClick={() => deleteItemWithUndo("publicationsAndActivities", idx)}
                              className="text-xs font-mono text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-2 py-0.5 rounded transition border border-rose-500/30 shrink-0"
                            >
                              ✕ Remove
                            </button>
                          </div>
                          <textarea
                            rows={2}
                            value={pub.description || ""}
                            onChange={(e) => updateArrayItem("publicationsAndActivities", idx, "description", e.target.value)}
                            onInput={handleTextareaResize}
                            className="text-xs text-(--color-text-secondary) leading-relaxed bg-transparent focus:outline-none hover:bg-zinc-900/60 focus:bg-zinc-900/80 rounded p-1.5 w-full block transition"
                          />
                        </div>
                      ))}
                    </div>
                  </section>

                </main>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
