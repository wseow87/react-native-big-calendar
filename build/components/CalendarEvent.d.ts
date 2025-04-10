import type { AccessibilityProps } from 'react-native';
import type { EventCellStyle, EventRenderer, ICalendarEventBase, Mode } from '../interfaces';
interface CalendarEventProps<T extends ICalendarEventBase> {
    event: T;
    onPressEvent?: (event: T) => void;
    eventCellStyle?: EventCellStyle<T>;
    eventCellTextColor?: string;
    eventCellAccessibilityProps?: AccessibilityProps;
    showTime: boolean;
    eventCount?: number;
    eventOrder?: number;
    overlapOffset?: number;
    renderEvent?: EventRenderer<T>;
    ampm: boolean;
    mode?: Mode;
    maxHour?: number;
    minHour?: number;
    hours?: number;
}
declare function _CalendarEvent<T extends ICalendarEventBase>({ event, onPressEvent, eventCellStyle, eventCellAccessibilityProps, eventCellTextColor, showTime, eventCount, eventOrder, overlapOffset, renderEvent, ampm, mode, minHour, hours, }: CalendarEventProps<T>): JSX.Element;
export declare const CalendarEvent: typeof _CalendarEvent;
export {};
