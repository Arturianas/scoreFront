import { useEffect, useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

import CSVDownloadBtn from '@/components/CSVDownloadBtn'
import { downloadCSV } from '@/utils/csvFuncs'
import { transformData } from '@/utils/dataManipulationFuncs'

import useFetch from '../hooks/UseFetch.js'
import { formatDate, formatDateWithoutDashes } from '../utils/dateFuncs'

type DateType = string | Date | null
interface DateRange {
  startDate: DateType
  endDate: DateType
}

const Home = () => {
  const [value, setValue] = useState<DateRange | null>({
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date(new Date().setMonth(11)))
  })

  const handleValueChange = (newValue: DateRange | null) => {
    setValue(newValue)
  }

  const { data, loading, error, fetchData } = useFetch()

  useEffect(() => {
    if (!error && !loading && data.length) {
      const csvData = transformData(data)
      downloadCSV(csvData, 'data.csv')
    }
  }, [data, loading, error])

  const handleClick = async () => {
    const startDate = formatDateWithoutDashes(
      (value?.startDate as string) || ''
    )
    const endDate = formatDateWithoutDashes((value?.endDate as string) || '')
    const scrapeUrl = `scrape?startdate=${startDate}&enddate=${endDate}`
    fetchData(scrapeUrl)
  }

  console.log('env:' + import.meta.env.VITE_API_BASE_URL)

  return (
    <>
      <div className="my-10 flex items-start justify-center border-2 border-solid border-black">
        <div className="flex w-96 flex-col justify-center gap-y-3 py-3">
          <div>
            <h3 className="text-lg font-bold">Scrape NBA scores!</h3>
            <p className="">Please select date range:</p>
          </div>
          <Datepicker value={value} onChange={handleValueChange} />
          <div className="flex gap-x-5">
            <CSVDownloadBtn handleClick={handleClick} />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <span>{loading && 'loading...'}</span>
        <span className="text-red-500">
          {error && 'Error occured please try again'}
        </span>
      </div>
    </>
  )
}

export default Home
