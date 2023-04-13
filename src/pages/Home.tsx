import { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

import { formatDate, formatDateWithoutDashes } from '../utils/dateFuncs'

type DateType = string | Date | number | null
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
    console.log('newValue:', newValue)
    setValue(newValue)
  }

  const formatScrapingDates = () => {
    setFormattedDates({
      startDate: formatDateWithoutDashes((value?.startDate as string) || ''),
      endDate: formatDateWithoutDashes((value?.endDate as string) || '')
    })
  }

  return (
    <div className="container-sm my-10 flex items-start justify-center border-2 border-solid border-black">
      <div className="flex w-96 flex-col justify-center gap-y-3 py-3">
        <div>
          <h3 className="text-lg font-bold">Scrape NBA scores!</h3>
          <p className="">Please select date range:</p>
        </div>
        <Datepicker value={value} onChange={handleValueChange} />
        <div className="flex gap-x-5">
          <button
            type="button"
            className="hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 inline-block rounded bg-[#000] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            onClick={formatScrapingDates}
          >
            Format date
          </button>
          <button
            type="button"
            className="hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 inline-block rounded bg-[#000] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Get scores
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
