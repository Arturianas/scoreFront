// import { useState } from 'react'

// import { axiosInstance } from './fetchConfig'

// const useFetch = (url) => {
//   const [data, setData] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(false)

//   const fetchData = async () => {
//     setLoading(true)
//     try {
//       const res = await axiosInstance.get(url)
//       setData(res.data)
//     } catch (err) {
//       setError(err)
//     }
//     setLoading(false)
//   }
//   fetchData()

//   // const reFetch = async () => {
//   //   setLoading(true)
//   //   try {
//   //     const res = await axiosInstance.get(url)
//   //     setData(res.data)
//   //   } catch (err) {
//   //     setError(err)
//   //   }
//   //   setLoading(false)
//   // }

//   return { data, loading, error }
// }

// export default useFetch

import { useCallback, useState } from 'react'

import { axiosInstance } from './fetchConfig'

const useFetch = (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get(url)
      setData(res.data)
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }, [url])

  const reFetch = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get(url)
      setData(res.data)
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }

  return { data, loading, error, fetchData, reFetch }
}

export default useFetch
