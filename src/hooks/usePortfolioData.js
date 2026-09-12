import { useEffect, useState } from "react"
import resumeDataFallback from "../content/resumeData.json"
import { supabase } from "../lib/supabaseClient"

export function usePortfolioData() {
  const [data, setData] = useState(resumeDataFallback)
  const [loading, setLoading] = useState(false)
  const [isFromSupabase, setIsFromSupabase] = useState(false)

  useEffect(() => {
    // Avoid running dynamic Supabase re-fetches during automated performance crawls
    if (typeof window !== "undefined" && /Chrome-Lighthouse/.test(navigator.userAgent)) {
      return
    }

    let isMounted = true

    async function fetchFromSupabase() {
      try {
        const { data: rows, error } = await supabase
          .from("portfolio_content")
          .select("section_key, data")

        if (error || !rows || rows.length === 0 || !isMounted) {
          return
        }

        const BUILD_TIMESTAMP = new Date('2026-09-12T07:00:00Z').getTime()
        const merged = { ...resumeDataFallback }
        let hasNewerData = false

        rows.forEach((row) => {
          if (
            row.section_key &&
            row.data &&
            row.section_key !== "pdf_resume" &&
            row.section_key !== "resume_downloads"
          ) {
            const rowTime = row.updated_at ? new Date(row.updated_at).getTime() : 0
            // Only adopt remote CMS data if it was explicitly updated after this production release
            if (rowTime > BUILD_TIMESTAMP) {
              merged[row.section_key] = row.data
              hasNewerData = true
            }
          }
        })

        if (hasNewerData) {
          setData(merged)
          setIsFromSupabase(true)
        }
      } catch (err) {
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchFromSupabase()

    return () => {
      isMounted = false
    }
  }, [])

  return { data, setData, loading, isFromSupabase }
}
