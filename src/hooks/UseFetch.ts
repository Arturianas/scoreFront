import { useCallback, useState } from 'react'

import { GameData } from '@/utils/dataManipulationFuncs'

import { axiosInstance } from './fetchConfig'

interface FetchResult {
  data: GameData[]
  loading: boolean
  error: null | Error
  fetchData: (url: string) => Promise<void>
}

const useFetch = (): FetchResult => {
  const [data, setData] = useState<GameData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async (url: string) => {
    setLoading(true)
    try {
      const res = await axiosInstance.get<GameData[]>(url)
      setData(res.data)
    } catch (err) {
      setError(err as Error)
    }
    setLoading(false)
  }, [])

  return { data, loading, error, fetchData }
}

export default useFetch
