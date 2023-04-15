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

interface FormattedDates {
  startDate: string
  endDate: string
}

const Home = () => {
  const [value, setValue] = useState<DateRange | null>({
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date(new Date().setMonth(11)))
  })

  const [formattedDates, setFormattedDates] = useState<FormattedDates>()

  const handleValueChange = (newValue: DateRange | null) => {
    setValue(newValue)
  }

  const formatScrapingDates = () => {
    setFormattedDates({
      startDate: formatDateWithoutDashes((value?.startDate as string) || ''),
      endDate: formatDateWithoutDashes((value?.endDate as string) || '')
    })
  }

  const { data, loading, error, fetchData } = useFetch()
  // const handleClick = async () => {
  //   await formatScrapingDates()
  //   // if (!formattedDates) return

  //   const scrapeUrl = `scrape?startdate=${formattedDates?.startDate}&enddate=${formattedDates?.endDate}`
  //   await fetchData(scrapeUrl)

  //   // if (!error && !loading && data.length) {
  //   // console.log('success')
  //   const csvData = transformData(data)
  //   downloadCSV(csvData, 'data.csv')
  //   // }
  //   // console.log(data)
  // }

  useEffect(() => {
    if (!error && !loading && data.length) {
      const csvData = transformData(data)
      downloadCSV(csvData, 'data.csv')
      console.log('success')
    }
  }, [data, loading, error])

  const handleClick = async () => {
    await formatScrapingDates()
    // if (!formattedDates) return

    const scrapeUrl = `scrape?startdate=${formattedDates?.startDate}&enddate=${formattedDates?.endDate}`
    fetchData(scrapeUrl)
  }

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
            {/* <button
              type="button"
              className="your-button-styles-here"
              onClick={formatScrapingDates}
            >
              Format date
            </button> */}
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
