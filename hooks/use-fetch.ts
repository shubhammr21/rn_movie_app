import { useCallback, useEffect, useState } from "react"

export const useFetch = <T>(
  fetchFunction: () => Promise<T>,
  autoFetch = true,
) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      setData(await fetchFunction())
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"))
    } finally {
      setLoading(false)
    }
  }, [fetchFunction])

  const reset = () => {
    setData(null)
    setLoading(false)
    setError(null)
  }

  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, loading, error, refetch: fetchData, reset }
}
