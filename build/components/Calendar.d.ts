import React from 'react';
import type { ICalendarEventBase } from '../interfaces';
import type { ThemeInterface } from '../theme/ThemeInterface';
import type { DeepPartial } from '../utils/utility-types';
import { type CalendarContainerProps } from './CalendarContainer';
export interface CalendarProps<T extends ICalendarEventBase> extends CalendarContainerProps<T> {
    theme?: DeepPartial<ThemeInterface>;
    isRTL?: boolean;
}
declare function _Calendar<T extends ICalendarEventBase>({ theme, isRTL, ...props }: CalendarProps<T>): React.JSX.Element;
export declare const Calendar: typeof _Calendar;
export {};
