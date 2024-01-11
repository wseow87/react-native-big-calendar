import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'
import weekOfYear from 'dayjs/plugin/weekOfYear'

import { Calendar } from './components/Calendar'

dayjs.extend(duration)
dayjs.extend(isBetween)
dayjs.extend(weekOfYear)

export * from './components/Calendar'
export * from './components/CalendarBody'
export * from './components/CalendarBodyForMonthView'
export * from './components/CalendarEvent'
export * from './components/CalendarEventForMonthView'
export * from './components/CalendarHeader'
export * from './components/CalendarHeaderForMonthView'
export * from './components/DefaultCalendarEventRenderer'

export * from './commonStyles'
export * from './interfaces'
export * from './theme/ThemeContext'
export * from './theme/ThemeInterface'
export * from './theme/defaultTheme'
export * from './utils/datetime'
export * from './utils/object'
export * from './utils/react'

export * from './interfaces'

/* eslint-disable */
export default Calendar
