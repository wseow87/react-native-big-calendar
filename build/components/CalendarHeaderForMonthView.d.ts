import dayjs from 'dayjs';
import * as React from 'react';
import { type AccessibilityProps, type ViewStyle } from 'react-native';
import type { WeekNum } from '../interfaces';
export interface CalendarHeaderForMonthViewProps {
    weekStartsOn: WeekNum;
    locale: string;
    style: ViewStyle;
    showWeekNumber?: boolean;
    weekNumberPrefix?: string;
    headerContainerAccessibilityProps?: AccessibilityProps;
    headerCellAccessibilityProps?: AccessibilityProps;
    dateRange: dayjs.Dayjs[];
}
declare function _CalendarHeaderForMonthView({ locale, weekStartsOn, style, showWeekNumber, weekNumberPrefix, headerContainerAccessibilityProps, headerCellAccessibilityProps, }: CalendarHeaderForMonthViewProps): React.JSX.Element;
export declare const CalendarHeaderForMonthView: typeof _CalendarHeaderForMonthView;
export {};
