import React from 'react';
import type { AccessibilityProps, TextStyle, ViewStyle } from 'react-native';
import type { AllDayEventCellStyle, CalendarCellStyle, CalendarCellTextStyle, DateRangeHandler, EventCellStyle, EventRenderer, HeaderRenderer, HourRenderer, ICalendarEventBase, Mode, MonthHeaderRenderer, WeekNum } from '../interfaces';
export interface CalendarContainerProps<T extends ICalendarEventBase> {
    /**
     * To remove Hours Column from week View.
     */
    hideHours?: boolean;
    /**
     * Events to be rendered. This is a required prop.
     */
    events: T[];
    /**
     * The height of calendar component. This is a required prop.
     */
    height: number;
    /**
     * The height of each hour row.
     */
    hourRowHeight?: number;
    /**
     * Adjusts the indentation of events that occur during the same time period. Defaults to 20 on web and 8 on mobile.
     */
    overlapOffset?: number;
    /**
     * Custom style. It accepts styles or an array of styles, or a function that returns styles or an array of styles.
     */
    eventCellStyle?: EventCellStyle<T>;
    eventCellTextColor?: string;
    eventCellAccessibilityProps?: AccessibilityProps;
    allDayEventCellStyle?: AllDayEventCellStyle<T>;
    allDayEventCellTextColor?: string;
    allDayEventCellAccessibilityProps?: AccessibilityProps;
    calendarCellStyle?: CalendarCellStyle;
    calendarCellTextStyle?: CalendarCellTextStyle;
    calendarCellAccessibilityProps?: AccessibilityProps;
    calendarCellAccessibilityPropsForMonthView?: AccessibilityProps;
    calendarContainerStyle?: ViewStyle;
    headerContainerStyle?: ViewStyle;
    headerContainerAccessibilityProps?: AccessibilityProps;
    headerContentStyle?: ViewStyle;
    headerCellAccessibilityProps?: AccessibilityProps;
    dayHeaderStyle?: ViewStyle;
    dayHeaderHighlightColor?: string;
    weekDayHeaderHighlightColor?: string;
    bodyContainerStyle?: ViewStyle;
    renderEvent?: EventRenderer<T>;
    renderHeader?: HeaderRenderer<T>;
    renderHeaderForMonthView?: MonthHeaderRenderer;
    renderCustomDateForMonth?: (date: Date) => React.ReactElement | null;
    ampm?: boolean;
    date?: Date;
    locale?: string;
    hideNowIndicator?: boolean;
    showAdjacentMonths?: boolean;
    mode?: Mode;
    scrollOffsetMinutes?: number;
    showTime?: boolean;
    minHour?: number;
    maxHour?: number;
    swipeEnabled?: boolean;
    weekStartsOn?: WeekNum;
    onChangeDate?: DateRangeHandler;
    onLongPressCell?: (date: Date) => void;
    onPressCell?: (date: Date) => void;
    onPressDateHeader?: (date: Date) => void;
    onPressEvent?: (event: T) => void;
    weekEndsOn?: WeekNum;
    maxVisibleEventCount?: number;
    eventMinHeightForMonthView?: number;
    activeDate?: Date;
    headerComponent?: React.ReactElement | null;
    headerComponentStyle?: ViewStyle;
    hourStyle?: TextStyle;
    showAllDayEventCell?: boolean;
    sortedMonthView?: boolean;
    moreLabel?: string;
    isEventOrderingEnabled?: boolean;
    showWeekNumber?: boolean;
    weekNumberPrefix?: string;
    onPressMoreLabel?: (event: T[]) => void;
    disableMonthEventCellPress?: boolean;
    showVerticalScrollIndicator?: boolean;
    itemSeparatorComponent?: React.ComponentType<{
        highlighted: boolean;
    }> | null | undefined;
    /**
     * Callback when the user swipes horizontally.
     * Note: Memoize this callback to avoid un-necessary re-renders.
     * @param date The date where the user swiped to.
     */
    onSwipeEnd?: (date: Date) => void;
    /**
     * If provided, we will skip the internal process of building the enriched events by date dictionary.
     */
    enrichedEventsByDate?: Record<string, T[]>;
    /**
     * If true, the events will be enriched with the following properties:
     * - `overlapPosition`: position of the event in the stack of overlapping events
     * Default value is `false`.
     */
    enableEnrichedEvents?: boolean;
    /**
     * If true, skip the sorting of events improving the performance.
     * This parameter is ignored if `enableEnrichedEvents` is `false`.
     * Default value is `false`.
     */
    eventsAreSorted?: boolean;
    timeslots?: number;
    hourComponent?: HourRenderer;
    scheduleMonthSeparatorStyle?: TextStyle;
}
declare function _CalendarContainer<T extends ICalendarEventBase>({ events, height, hourRowHeight, ampm, date, allDayEventCellStyle, allDayEventCellTextColor, allDayEventCellAccessibilityProps, eventCellStyle, eventCellTextColor, eventCellAccessibilityProps, calendarCellAccessibilityPropsForMonthView, calendarCellStyle, calendarCellTextStyle, calendarCellAccessibilityProps, locale, hideNowIndicator, mode, overlapOffset, scrollOffsetMinutes, showTime, headerContainerStyle, headerContainerAccessibilityProps, headerContentStyle, headerCellAccessibilityProps, dayHeaderStyle, dayHeaderHighlightColor, weekDayHeaderHighlightColor, bodyContainerStyle, swipeEnabled, weekStartsOn, onChangeDate, onLongPressCell, onPressCell, onPressDateHeader, onPressEvent, renderEvent, renderHeader: HeaderComponent, renderHeaderForMonthView: HeaderComponentForMonthView, weekEndsOn, maxVisibleEventCount, eventMinHeightForMonthView, activeDate, headerComponent, headerComponentStyle, hourStyle, showAllDayEventCell, moreLabel, showAdjacentMonths, sortedMonthView, hideHours, minHour, maxHour, isEventOrderingEnabled, showWeekNumber, weekNumberPrefix, onPressMoreLabel, renderCustomDateForMonth, disableMonthEventCellPress, showVerticalScrollIndicator, itemSeparatorComponent, enrichedEventsByDate, enableEnrichedEvents, eventsAreSorted, onSwipeEnd, timeslots, hourComponent, scheduleMonthSeparatorStyle, }: CalendarContainerProps<T>): React.JSX.Element;
export declare const CalendarContainer: typeof _CalendarContainer;
export {};
