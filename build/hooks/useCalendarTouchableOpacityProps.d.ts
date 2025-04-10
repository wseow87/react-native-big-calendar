import type { AccessibilityProps, ViewStyle } from 'react-native';
import type { CalendarTouchableOpacityProps, EventCellStyle, ICalendarEventBase } from '../interfaces';
interface UseCalendarTouchableOpacityPropsProps<T extends ICalendarEventBase> {
    event: T;
    eventCellStyle?: EventCellStyle<T>;
    eventCellAccessibilityProps?: AccessibilityProps;
    onPressEvent?: (event: T) => void;
    injectedStyles?: ViewStyle[];
}
export declare function useCalendarTouchableOpacityProps<T extends ICalendarEventBase>({ event, eventCellStyle, eventCellAccessibilityProps: eventCellAccessiblityProps, injectedStyles, onPressEvent, }: UseCalendarTouchableOpacityPropsProps<T>): CalendarTouchableOpacityProps;
export {};
