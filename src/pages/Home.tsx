import { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

import { formatDate } from '../utils/dateFuncs'

type DateType = string | Date | number | null
interface DateRange {
  startDate: DateType
  endDate: DateType
}

const Home = () => {
  const [value, setValue] = useState<DateRange | null>({
    startDate: new Date(),
    endDate: new Date().setMonth(11)
  })

  const handleValueChange = (newValue: DateRange | null) => {
    console.log('newValue:', newValue)
    setValue(newValue)
  }

  return (
    <div>
      <Datepicker value={value} onChange={handleValueChange} />
    </div>
  )
}

export default Home
