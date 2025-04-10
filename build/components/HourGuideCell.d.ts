import type dayjs from 'dayjs';
import * as React from 'react';
import { type AccessibilityProps } from 'react-native';
import type { CalendarCellStyle } from '../interfaces';
interface HourGuideCellProps {
    cellHeight: number;
    onLongPress: (d: dayjs.Dayjs) => void;
    onPress: (d: dayjs.Dayjs) => void;
    date: dayjs.Dayjs;
    hour: number;
    index: number;
    calendarCellStyle?: CalendarCellStyle;
    calendarCellAccessibilityProps?: AccessibilityProps;
    timeslots: number;
}
export declare const HourGuideCell: React.MemoExoticComponent<({ cellHeight, onLongPress, onPress, date, hour, index, calendarCellStyle, calendarCellAccessibilityProps, timeslots, }: HourGuideCellProps) => React.JSX.Element>;
export {};
