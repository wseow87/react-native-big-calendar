import { type Week } from 'calendarize';
import dayjs from 'dayjs';
import type { ICalendarEventBase, Mode, WeekNum } from '../interfaces';
import type { Palette } from '../theme/ThemeInterface';
export declare const DAY_MINUTES = 1440;
export declare const SIMPLE_DATE_FORMAT = "YYYY-MM-DD";
export declare function getDatesInMonth(date?: string | Date | dayjs.Dayjs, locale?: string): dayjs.Dayjs[];
export declare function getDatesInWeek(date?: string | Date | dayjs.Dayjs, weekStartsOn?: WeekNum, locale?: string): dayjs.Dayjs[];
export declare function getDatesInNextThreeDays(date?: string | Date | dayjs.Dayjs, locale?: string): dayjs.Dayjs[];
export declare function getDatesInNextOneDay(date?: string | Date | dayjs.Dayjs, locale?: string): dayjs.Dayjs[];
export declare function formatHour(hour: number, ampm?: boolean): string;
export declare function isToday(date: dayjs.Dayjs): boolean;
export declare function getRelativeTopInDay(date: dayjs.Dayjs, minHour?: number, hours?: number): number;
export declare function todayInMinutes(): number;
export declare function modeToNum(mode: Mode, current?: dayjs.Dayjs | Date, amount?: number): number;
export declare function formatStartEnd(start: Date, end: Date, format: string): string;
export declare function isAllDayEvent(start: Date, end: Date): boolean;
export declare function getCountOfEventsAtEvent(event: ICalendarEventBase, sortedEventList: ICalendarEventBase[]): number;
export declare function getOrderOfEvent(event: ICalendarEventBase, sortedEventList: ICalendarEventBase[]): number;
/**
 * Iterate over a sorted list of events and add the following properties:
 * - overlapPosition: position of the event in the stack of overlapping events
 * - overlapsCount: number of events that overlap with this event
 * @param events Sorted list of events by start time
 * @param eventsAreSorted indicates if the events are already sorted
 */
export declare function enrichEvents<T extends ICalendarEventBase>(events: T[], eventsAreSorted?: boolean): Record<string, T[]>;
export declare function getStyleForOverlappingEvent(eventPosition: number, overlapOffset: number, palettes: Palette[]): {};
export declare function getDatesInNextCustomDays(date?: string | Date | dayjs.Dayjs, weekStartsOn?: WeekNum, weekEndsOn?: WeekNum, locale?: string): dayjs.Dayjs[];
export declare function getEventSpanningInfo(event: ICalendarEventBase, date: dayjs.Dayjs, dayOfTheWeek: number, calendarWidth: number, showAdjacentMonths: boolean): {
    eventWidth: number;
    isMultipleDays: boolean;
    isMultipleDaysStart: boolean;
    eventWeekDuration: number;
};
export declare function getWeeksWithAdjacentMonths(targetDate: dayjs.Dayjs, weekStartsOn: WeekNum): Week[];
