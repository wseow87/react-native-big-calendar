import type dayjs from 'dayjs';
import * as React from 'react';
import type { AccessibilityProps } from 'react-native';
import type { EventCellStyle, EventRenderer, ICalendarEventBase } from '../interfaces';
interface CalendarEventProps<T extends ICalendarEventBase> {
    event: T;
    onPressEvent?: (event: T) => void;
    eventCellStyle?: EventCellStyle<T>;
    eventCellAccessibilityProps?: AccessibilityProps;
    renderEvent?: EventRenderer<T>;
    date: dayjs.Dayjs;
    dayOfTheWeek: number;
    calendarWidth: number;
    isRTL: boolean;
    eventMinHeightForMonthView: number;
    showAdjacentMonths: boolean;
}
declare function _CalendarEventForMonthView<T extends ICalendarEventBase>({ event, onPressEvent, eventCellStyle, eventCellAccessibilityProps, renderEvent, date, dayOfTheWeek, calendarWidth, isRTL, eventMinHeightForMonthView, showAdjacentMonths, }: CalendarEventProps<T>): React.JSX.Element;
export declare const CalendarEventForMonthView: typeof _CalendarEventForMonthView;
export {};
