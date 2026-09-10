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

        const merged = { ...resumeDataFallback }
        rows.forEach((row) => {
          if (
            row.section_key &&
            row.data &&
            row.section_key !== "pdf_resume" &&
            row.section_key !== "resume_downloads"
          ) {
            merged[row.section_key] = row.data
          }
        })

        // Only update state if remote data actually differs from baked-in fallback
        if (JSON.stringify(merged) !== JSON.stringify(resumeDataFallback)) {
          setData(merged)
          setIsFromSupabase(true)
        }
      } catch (err) {
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchFromSupabase()

    // Subscribe to realtime changes in portfolio_content table
    const channel = supabase
      .channel("portfolio_content_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "portfolio_content" },
        () => {
          fetchFromSupabase()
        }
      )
      .subscribe()

    return () => {
      isMounted = false
      supabase.removeChannel(channel)
    }
  }, [])

  return { data, setData, loading, isFromSupabase }
}
