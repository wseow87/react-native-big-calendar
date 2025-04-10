import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isoWeek from 'dayjs/plugin/isoWeek';
import * as React from 'react';
import React__default, { createContext, useContext, useRef } from 'react';
import InfinitePager from 'react-native-infinite-pager';
import { Platform, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback, View, ScrollView, Animated, TouchableHighlight, FlatList } from 'react-native';
import calendarize from 'calendarize';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var defaultTheme = {
    isRTL: false,
    palette: {
        primary: {
            main: 'rgb(66, 133, 244)',
            contrastText: '#fff',
        },
        nowIndicator: 'red',
        gray: {
            // 50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            // 400: '#bdbdbd',
            500: '#9e9e9e',
            // 600: '#757575',
            // 700: '#616161',
            800: '#424242',
            // 900: '#212121',
        },
        moreLabel: '#000000',
    },
    eventCellOverlappings: [
        { main: '#E26245', contrastText: '#fff' }, // orange
        { main: '#4AC001', contrastText: '#fff' }, // green
        { main: '#5934C7', contrastText: '#fff' }, // purple
    ],
    typography: {
        xs: {
            fontSize: 10,
        },
        sm: {
            fontSize: 12,
        },
        xl: {
            fontSize: 22,
        },
        moreLabel: {
            fontSize: 11,
            fontWeight: 'bold',
        },
    },
};

var ThemeContext = createContext(defaultTheme);
var useTheme = function () {
    var customTheme = useContext(ThemeContext);
    if (!customTheme) {
        return defaultTheme;
    }
    return customTheme;
};

function objHasContent(obj) {
    return !!Object.keys(obj).length;
}
function stringHasContent(string) {
    return !!string.length;
}
// biome-ignore lint/suspicious/noExplicitAny: expected
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}
function keys(obj) {
    return Object.keys(obj);
}
function deepMerge(target, source) {
    var _a, _b;
    var output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        for (var _i = 0, _c = keys(source); _i < _c.length; _i++) {
            var key = _c[_i];
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, (_a = {}, _a[key] = source[key], _a));
                // @ts-ignore
                else
                    output[key] = deepMerge(target[key], source[key]);
            }
            else {
                Object.assign(output, (_b = {}, _b[key] = source[key], _b));
            }
        }
    }
    return output;
}

var typedMemo = React__default.memo;

var MIN_HEIGHT = 1200;
var HOUR_GUIDE_WIDTH = 50;
var OVERLAP_OFFSET = Platform.OS === 'web' ? 20 : 8;
var OVERLAP_PADDING = Platform.OS === 'web' ? 3 : 0;
var eventCellCss = StyleSheet.create({
    style: {
        zIndex: 100,
        borderRadius: 3,
        padding: 4,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
        minWidth: '33%',
    },
});
/*
 * Utility-first CSS.
 */
var u = StyleSheet.create({
    /*
     * Flex
     */
    flex: {
        flexDirection: 'row',
    },
    'flex-row': {
        flexDirection: 'row',
    },
    'flex-row-reverse': {
        flexDirection: 'row-reverse',
    },
    'flex-column': {
        flexDirection: 'column',
    },
    'flex-column-reverse': {
        flexDirection: 'column-reverse',
    },
    'flex-1': {
        flex: 1,
    },
    'justify-between': {
        justifyContent: 'space-between',
    },
    'justify-center': {
        justifyContent: 'center',
    },
    'items-center': {
        alignItems: 'center',
    },
    'self-center': {
        alignSelf: 'center',
    },
    /*
     * Border
     */
    'border-l': {
        borderLeftWidth: 1,
    },
    'border-t': {
        borderTopWidth: 1,
    },
    'border-b': {
        borderBottomWidth: 1,
    },
    'border-b-2': {
        borderBottomWidth: 2,
    },
    'border-r': {
        borderRightWidth: 1,
    },
    /*
     * Spacing
     */
    'mt-2': {
        marginTop: 2,
    },
    'mt-4': {
        marginTop: 4,
    },
    'mt-6': {
        marginTop: 6,
    },
    'mb-6': {
        marginBottom: 6,
    },
    'mx-3': {
        marginLeft: 3,
        marginRight: 3,
    },
    'p-2': {
        padding: 2,
    },
    'p-8': {
        padding: 8,
    },
    'pt-2': {
        paddingTop: 2,
    },
    'py-2': {
        paddingVertical: 2,
    },
    'px-6': {
        paddingHorizontal: 6,
    },
    'pb-6': {
        paddingBottom: 6,
    },
    /*
     * Text
     */
    'text-center': {
        textAlign: 'center',
    },
    /*
     * Radius
     */
    rounded: {
        borderRadius: 3,
    },
    'rounded-full': {
        borderRadius: 9999,
    },
    /*
     * Z Index
     */
    'z-0': {
        zIndex: 0,
    },
    'z-10': {
        zIndex: 10,
    },
    'z-20': {
        zIndex: 20,
    },
    /*
     * Width
     */
    'w-20': {
        width: 20,
    },
    'w-36': {
        width: 36,
    },
    'w-50': {
        width: 50,
    },
    /*
     * Height
     */
    'h-36': {
        height: 36,
    },
    'h-50': {
        height: 50,
    },
    /*
     * Misc
     */
    'overflow-hidden': {
        overflow: 'hidden',
    },
    absolute: {
        position: 'absolute',
    },
    truncate: Platform.OS === 'web'
        ? {
            overflow: 'hidden',
            // textOverflow: 'ellipsis',
            // whiteSpace: 'nowrap',
        }
        : {},
});

var DAY_MINUTES = 1440;
var SIMPLE_DATE_FORMAT = 'YYYY-MM-DD';
function getDatesInMonth(date, locale) {
    if (date === void 0) { date = new Date(); }
    if (locale === void 0) { locale = 'en'; }
    var subject = dayjs(date);
    var days = Array(subject.daysInMonth())
        .fill(0)
        .map(function (_, i) {
        return subject.date(i + 1).locale(locale);
    });
    return days;
}
function getDatesInWeek(date, weekStartsOn, locale) {
    if (date === void 0) { date = new Date(); }
    if (weekStartsOn === void 0) { weekStartsOn = 0; }
    if (locale === void 0) { locale = 'en'; }
    var subject = dayjs(date);
    var subjectDOW = subject.day();
    var days = Array(7)
        .fill(0)
        .map(function (_, i) {
        return subject
            .add(i - (subjectDOW < weekStartsOn ? 7 + subjectDOW : subjectDOW) + weekStartsOn, 'day')
            .locale(locale);
    });
    return days;
}
function getDatesInNextThreeDays(date, locale) {
    if (date === void 0) { date = new Date(); }
    if (locale === void 0) { locale = 'en'; }
    var subject = dayjs(date).locale(locale);
    var days = Array(3)
        .fill(0)
        .map(function (_, i) {
        return subject.add(i, 'day');
    });
    return days;
}
function getDatesInNextOneDay(date, locale) {
    if (date === void 0) { date = new Date(); }
    if (locale === void 0) { locale = 'en'; }
    var subject = dayjs(date).locale(locale);
    var days = Array(1)
        .fill(0)
        .map(function (_, i) {
        return subject.add(i, 'day');
    });
    return days;
}
function formatHour(hour, ampm) {
    if (ampm === void 0) { ampm = false; }
    if (ampm) {
        if (hour === 0) {
            return '';
        }
        if (hour === 12) {
            return '12 PM';
        }
        if (hour > 12) {
            return "".concat(hour - 12, " PM");
        }
        return "".concat(hour, " AM");
    }
    return "".concat(hour, ":00");
}
function isToday(date) {
    var today = dayjs();
    return today.isSame(date, 'day');
}
function getRelativeTopInDay(date, minHour, hours) {
    if (minHour === void 0) { minHour = 0; }
    if (hours === void 0) { hours = 24; }
    var totalMinutesInRange = (DAY_MINUTES / 24) * hours;
    return (100 * ((date.hour() - minHour) * 60 + date.minute())) / totalMinutesInRange;
}
function todayInMinutes() {
    var today = dayjs();
    return today.diff(dayjs().startOf('day'), 'minute');
}
function modeToNum(mode, current, amount) {
    if (amount === void 0) { amount = 1; }
    if (mode === 'month') {
        if (!current) {
            throw new Error('You must specify current date if mode is month');
        }
        var currentDate = current instanceof Date ? dayjs(current) : current;
        return currentDate.add(amount, 'month').diff(currentDate, 'day');
    }
    switch (mode) {
        case 'day':
            return 1 * amount;
        case '3days':
            return 3 * amount;
        case 'week':
        case 'custom':
            return 7 * amount;
        default:
            throw new Error('undefined mode');
    }
}
function formatStartEnd(start, end, format) {
    return "".concat(dayjs(start).format(format), " - ").concat(dayjs(end).format(format));
}
function isAllDayEvent(start, end) {
    var _start = dayjs(start);
    var _end = dayjs(end);
    return _start.hour() === 0 && _start.minute() === 0 && _end.hour() === 0 && _end.minute() === 0;
}
function getCountOfEventsAtEvent(event, sortedEventList) {
    var count = 0;
    // Since the list is sorted, we can stop iterating once the start time exceeds the event's end time
    for (var _i = 0, sortedEventList_1 = sortedEventList; _i < sortedEventList_1.length; _i++) {
        var e = sortedEventList_1[_i];
        // If the current event starts after the end of the event we're checking, no need to proceed further
        if (e.start >= event.end) {
            break;
        }
        // Check for overlap
        if (e.end > event.start && e.start < event.end) {
            count++;
        }
    }
    return count;
}
function getOrderOfEvent(event, sortedEventList) {
    var eventStart = new Date(event.start).getTime();
    var eventEnd = new Date(event.end).getTime();
    // Helper functions to get start and end times
    var getStartTime = function (e) { return new Date(e.start).getTime(); };
    var getEndTime = function (e) { return new Date(e.end).getTime(); };
    // Binary search to find the first potentially overlapping event
    var left = 0;
    var right = sortedEventList.length - 1;
    var firstOverlapIndex = sortedEventList.length;
    while (left <= right) {
        var mid = Math.floor((left + right) / 2);
        var midEventEnd = getEndTime(sortedEventList[mid]);
        if (midEventEnd <= eventStart) {
            left = mid + 1;
        }
        else {
            firstOverlapIndex = mid;
            right = mid - 1;
        }
    }
    // Collect overlapping events starting from the firstOverlapIndex
    var overlappingEvents = [];
    for (var i = firstOverlapIndex; i < sortedEventList.length; i++) {
        var currentEvent = sortedEventList[i];
        var start = getStartTime(currentEvent);
        var end = getEndTime(currentEvent);
        if (start >= eventEnd) {
            break; // No further events will overlap
        }
        if ((eventStart >= start && eventStart < end) || (start >= eventStart && start < eventEnd)) {
            overlappingEvents.push({ event: currentEvent, start: start, end: end });
        }
    }
    // Sort overlapping events by start time and duration
    overlappingEvents.sort(function (a, b) {
        if (a.start === b.start) {
            return a.end - a.start - (b.end - b.start);
        }
        return a.start - b.start;
    });
    // Find the index of the given event in the sorted overlapping events
    var index = overlappingEvents.findIndex(function (_a) {
        var e = _a.event;
        return e === event;
    });
    return index === -1 ? 0 : index;
}
/**
 * Iterate over a sorted list of events and add the following properties:
 * - overlapPosition: position of the event in the stack of overlapping events
 * - overlapsCount: number of events that overlap with this event
 * @param events Sorted list of events by start time
 * @param eventsAreSorted indicates if the events are already sorted
 */
function enrichEvents(events, eventsAreSorted) {
    if (!events.length)
        return {};
    var groupEndTime = events[0].end;
    var overlapPosition = 0;
    var overlapCounting = 0;
    var overlapCountingPointers = [];
    // If events are not sorted, sort them by start time
    var baseEvents = eventsAreSorted
        ? events
        : events.sort(function (a, b) { return a.start.getTime() - b.start.getTime(); });
    var eventsWithOverlaps = baseEvents.map(function (event, index) {
        // If the event starts before the group end time, it overlaps
        if (event.start < groupEndTime) {
            // Update the group end time if this overlapping event ends after the current group end time
            if (event.end > groupEndTime) {
                groupEndTime = event.end;
            }
            overlapCounting++;
            // If this is the last event, we need to add the overlap counting to the overlap counting pointers
            if (index === baseEvents.length - 1) {
                overlapCountingPointers.push.apply(overlapCountingPointers, Array(overlapCounting).fill(overlapCounting));
            }
            //  Otherwise, it doesn't overlap and we reset the pointers
        }
        else {
            groupEndTime = event.end;
            overlapCountingPointers.push.apply(overlapCountingPointers, Array(overlapCounting).fill(overlapCounting));
            // If this is the last event, we need to add a "group" of 1 into the overlap counting pointers
            if (index === baseEvents.length - 1) {
                overlapCountingPointers.push(1);
            }
            overlapPosition = 0;
            overlapCounting = 1;
        }
        return __assign(__assign({}, event), { 
            // Add the overlap position to the event and increment by 1 for the next event
            overlapPosition: overlapPosition++ });
    });
    var eventsByDate = {};
    eventsWithOverlaps.forEach(function (event, index) {
        // Add overlap count to the event
        var enrichedEvent = __assign(__assign({}, event), { overlapCount: overlapCountingPointers[index] });
        var startDate = dayjs(enrichedEvent.start).format(SIMPLE_DATE_FORMAT);
        var endDate = dayjs(enrichedEvent.end).format(SIMPLE_DATE_FORMAT);
        if (!eventsByDate[startDate]) {
            eventsByDate[startDate] = [];
        }
        if (!eventsByDate[endDate]) {
            eventsByDate[endDate] = [];
        }
        if (startDate === endDate) {
            eventsByDate[startDate].push(enrichedEvent);
        }
        else {
            /**
             * In case of multi-day events, we need to create an event for each day setting the start
             * and end dates of the middle days to the start and end of the day.
             */
            // Add the event to the bucket of the start date
            eventsByDate[startDate].push(__assign(__assign({}, enrichedEvent), { end: dayjs(enrichedEvent.start).endOf('day').toDate() }));
            // Add events in the bucket of the middle dates
            var amountOfDaysBetweenDates = dayjs(enrichedEvent.start).diff(enrichedEvent.end, 'day');
            for (var i = 1; i <= amountOfDaysBetweenDates; i++) {
                var intermediateDate = dayjs(enrichedEvent.start).add(1, 'day');
                if (!eventsByDate[intermediateDate.format(SIMPLE_DATE_FORMAT)]) {
                    eventsByDate[intermediateDate.format(SIMPLE_DATE_FORMAT)] = [];
                }
                eventsByDate[intermediateDate.format(SIMPLE_DATE_FORMAT)].push(__assign(__assign({}, enrichedEvent), { start: intermediateDate.startOf('day').toDate() }));
            }
            // Add the event to the bucket of the end date
            eventsByDate[endDate].push(__assign(__assign({}, enrichedEvent), { start: dayjs(enrichedEvent.end).startOf('day').toDate() }));
        }
    });
    return eventsByDate;
}
function getStyleForOverlappingEvent(eventPosition, overlapOffset, palettes) {
    var overlapStyle = {};
    var offset = overlapOffset;
    var start = eventPosition * offset;
    var zIndex = 100 + eventPosition;
    var bgColors = palettes.map(function (p) { return p.main; });
    overlapStyle = {
        start: start + OVERLAP_PADDING,
        end: OVERLAP_PADDING,
        backgroundColor: bgColors[eventPosition % bgColors.length] || bgColors[0],
        zIndex: zIndex,
    };
    return overlapStyle;
}
function getDatesInNextCustomDays(date, weekStartsOn, weekEndsOn, locale) {
    if (date === void 0) { date = new Date(); }
    if (weekStartsOn === void 0) { weekStartsOn = 0; }
    if (weekEndsOn === void 0) { weekEndsOn = 6; }
    if (locale === void 0) { locale = 'en'; }
    var subject = dayjs(date);
    var subjectDOW = subject.day();
    var days = Array(weekDaysCount(weekStartsOn, weekEndsOn))
        .fill(0)
        .map(function (_, i) {
        return subject.add(i - subjectDOW + weekStartsOn, 'day').locale(locale);
    });
    return days;
}
// TODO: This method should be unit-tested
function weekDaysCount(weekStartsOn, weekEndsOn) {
    // handle reverse week
    if (weekEndsOn < weekStartsOn) {
        var daysCount = 1;
        var i = weekStartsOn;
        while (i !== weekEndsOn) {
            ++i;
            ++daysCount;
            if (i > 6) {
                i = 0;
            }
            // fallback for infinite
            if (daysCount > 7) {
                break;
            }
        }
        return daysCount;
    }
    // normal week
    if (weekEndsOn > weekStartsOn) {
        return weekEndsOn - weekStartsOn + 1;
    }
    // default
    return 1;
}
function getEventSpanningInfo(event, date, dayOfTheWeek, calendarWidth, showAdjacentMonths) {
    var dayWidth = calendarWidth / 7;
    // adding + 1 because durations start at 0
    var eventDuration = Math.floor(dayjs.duration(dayjs(event.end).endOf('day').diff(dayjs(event.start))).asDays()) + 1;
    var eventDaysLeft = Math.floor(dayjs.duration(dayjs(event.end).endOf('day').diff(date)).asDays()) + 1;
    var weekDaysLeft = 7 - dayOfTheWeek;
    var monthDaysLeft = date.endOf('month').date() - date.date();
    var isMultipleDays = eventDuration > 1;
    // This is to determine how many days from the event to show during a week
    var eventWeekDuration = !showAdjacentMonths && monthDaysLeft < 7 && monthDaysLeft < eventDaysLeft
        ? monthDaysLeft + 1
        : eventDaysLeft > weekDaysLeft
            ? weekDaysLeft
            : eventDaysLeft < eventDuration
                ? eventDaysLeft
                : eventDuration;
    var isMultipleDaysStart = isMultipleDays &&
        (date.isSame(event.start, 'day') ||
            (dayOfTheWeek === 0 && date.isAfter(event.start)) ||
            (!showAdjacentMonths && date.get('date') === 1));
    // - 6 to take in account the padding
    var eventWidth = dayWidth * eventWeekDuration - 6;
    return { eventWidth: eventWidth, isMultipleDays: isMultipleDays, isMultipleDaysStart: isMultipleDaysStart, eventWeekDuration: eventWeekDuration };
}
function getWeeksWithAdjacentMonths(targetDate, weekStartsOn) {
    var weeks = calendarize(targetDate.toDate(), weekStartsOn);
    var firstDayIndex = weeks[0].findIndex(function (d) { return d === 1; });
    var lastDay = targetDate.endOf('month').date();
    var lastDayIndex = weeks[weeks.length - 1].findIndex(function (d) { return d === lastDay; });
    weeks = weeks.map(function (week, iw) {
        return week.map(function (d, id) {
            if (d !== 0) {
                return d;
            }
            if (iw === 0) {
                return d - (firstDayIndex - id - 1);
            }
            return lastDay + (id - lastDayIndex);
        });
    });
    return weeks;
}

function useNow(enabled) {
    var _a = React__default.useState(dayjs()), now = _a[0], setNow = _a[1];
    React__default.useEffect(function () {
        if (!enabled) {
            return function () { };
        }
        var pid = setInterval(function () { return setNow(dayjs()); }, 60 * 1000);
        return function () { return clearInterval(pid); };
    }, [enabled]);
    return {
        now: now,
    };
}

function useCalendarTouchableOpacityProps(_a) {
    var event = _a.event, eventCellStyle = _a.eventCellStyle, _b = _a.eventCellAccessibilityProps, eventCellAccessiblityProps = _b === void 0 ? {} : _b, _c = _a.injectedStyles, injectedStyles = _c === void 0 ? [] : _c, onPressEvent = _a.onPressEvent;
    var getEventStyle = React__default.useMemo(function () { return (typeof eventCellStyle === 'function' ? eventCellStyle : function () { return eventCellStyle; }); }, [eventCellStyle]);
    var plainJsEvent = React__default.useMemo(function () { return (__assign(__assign({}, event), { start: dayjs(event.start).toDate(), end: dayjs(event.end).toDate() })); }, [event]);
    var _onPress = React__default.useCallback(function () {
        onPressEvent === null || onPressEvent === void 0 ? void 0 : onPressEvent(plainJsEvent);
    }, [onPressEvent, plainJsEvent]);
    var touchableOpacityProps = __assign({ delayPressIn: 20, key: "".concat(event.start.toISOString(), "_").concat(event.title), style: __spreadArray(__spreadArray([eventCellCss.style], injectedStyles, true), [getEventStyle(plainJsEvent)], false), onPress: _onPress, disabled: !onPressEvent || !!event.disabled }, eventCellAccessiblityProps);
    return touchableOpacityProps;
}

function DefaultCalendarEventRenderer(_a) {
    var touchableOpacityProps = _a.touchableOpacityProps, event = _a.event, _b = _a.showTime, showTime = _b === void 0 ? true : _b, textColor = _a.textColor, ampm = _a.ampm;
    var theme = useTheme();
    var eventTimeStyle = { fontSize: theme.typography.xs.fontSize, color: textColor };
    var eventTitleStyle = { fontSize: theme.typography.sm.fontSize, color: textColor };
    return (React.createElement(TouchableOpacity, __assign({}, touchableOpacityProps), dayjs(event.end).diff(event.start, 'minute') < 32 && showTime ? (React.createElement(Text, { style: eventTitleStyle },
        event.title,
        ",",
        React.createElement(Text, { style: eventTimeStyle }, dayjs(event.start).format(ampm ? 'hh:mm a' : 'HH:mm')))) : (React.createElement(React.Fragment, null,
        React.createElement(Text, { style: eventTitleStyle }, event.title),
        showTime && (React.createElement(Text, { style: eventTimeStyle }, formatStartEnd(event.start, event.end, ampm ? 'h:mm a' : 'HH:mm'))),
        event.children && event.children))));
}

var getEventCellPositionStyle = function (start, end, minHour, hours) {
    var totalMinutesInRange = (DAY_MINUTES / 24) * hours;
    var durationInMinutes = dayjs(end).diff(start, 'minute');
    var relativeHeight = 100 * (1 / totalMinutesInRange) * durationInMinutes;
    var relativeTop = getRelativeTopInDay(dayjs(start), minHour, hours);
    var relativeTopOffset = (minHour * 60) / DAY_MINUTES;
    return {
        height: "".concat(relativeHeight, "%"),
        top: "".concat(relativeTop - relativeTopOffset, "%"),
    };
};
function _CalendarEvent(_a) {
    var event = _a.event, onPressEvent = _a.onPressEvent, eventCellStyle = _a.eventCellStyle, _b = _a.eventCellAccessibilityProps, eventCellAccessibilityProps = _b === void 0 ? {} : _b, eventCellTextColor = _a.eventCellTextColor, showTime = _a.showTime, _c = _a.eventCount, eventCount = _c === void 0 ? 1 : _c, _d = _a.eventOrder, eventOrder = _d === void 0 ? 0 : _d, _e = _a.overlapOffset, overlapOffset = _e === void 0 ? OVERLAP_OFFSET : _e, renderEvent = _a.renderEvent, ampm = _a.ampm, mode = _a.mode, _f = _a.minHour, minHour = _f === void 0 ? 0 : _f, _g = _a.hours, hours = _g === void 0 ? 24 : _g;
    var theme = useTheme();
    var palettes = React.useMemo(function () { return __spreadArray([theme.palette.primary], theme.eventCellOverlappings, true); }, [theme]);
    var touchableOpacityProps = useCalendarTouchableOpacityProps({
        event: event,
        eventCellStyle: eventCellStyle,
        eventCellAccessibilityProps: eventCellAccessibilityProps,
        onPressEvent: onPressEvent,
        injectedStyles: mode === 'schedule'
            ? [getStyleForOverlappingEvent(eventOrder, overlapOffset, palettes)]
            : [
                getEventCellPositionStyle(event.start, event.end, minHour, hours),
                getStyleForOverlappingEvent(eventOrder, overlapOffset, palettes),
                u.absolute,
                u['mt-2'],
                u['mx-3'],
            ],
    });
    var textColor = React.useMemo(function () {
        var fgColors = palettes.map(function (p) { return p.contrastText; });
        return fgColors[eventCount % fgColors.length] || fgColors[0];
    }, [eventCount, palettes]);
    if (renderEvent) {
        return renderEvent(event, touchableOpacityProps);
    }
    return (React.createElement(DefaultCalendarEventRenderer, { event: event, showTime: showTime, ampm: ampm, touchableOpacityProps: touchableOpacityProps, textColor: eventCellTextColor || textColor }));
}
var CalendarEvent = typedMemo(_CalendarEvent);

var _HourGuideCell = function (_a) {
    var cellHeight = _a.cellHeight, onLongPress = _a.onLongPress, onPress = _a.onPress, date = _a.date, hour = _a.hour, index = _a.index, calendarCellStyle = _a.calendarCellStyle, calendarCellAccessibilityProps = _a.calendarCellAccessibilityProps, timeslots = _a.timeslots;
    var theme = useTheme();
    var getCalendarCellStyle = React.useMemo(function () { return (typeof calendarCellStyle === 'function' ? calendarCellStyle : function () { return calendarCellStyle; }); }, [calendarCellStyle]);
    return (React.createElement(TouchableWithoutFeedback, __assign({ onLongPress: function () { return onLongPress(date.hour(hour).minute(0)); }, onPress: function () { return onPress(date.hour(hour).minute(0)); } }, calendarCellAccessibilityProps),
        React.createElement(View, { style: [
                u['border-l'],
                u['border-b'],
                {
                    borderColor: theme.palette.gray['200'],
                    height: cellHeight,
                    justifyContent: 'space-evenly',
                },
                __assign({}, getCalendarCellStyle(date.toDate(), index)),
            ] }, Array.from({ length: timeslots }, function (_, index) { return (React.createElement(View, { key: "".concat(index, "-").concat(date.toDate()), style: [
                u['border-l'],
                u['border-b'],
                {
                    borderColor: theme.palette.gray['100'],
                    height: 1,
                },
            ] })); }))));
};
var HourGuideCell = React.memo(_HourGuideCell);

var _HourGuideColumn = function (_a) {
    var cellHeight = _a.cellHeight, hour = _a.hour, ampm = _a.ampm, _b = _a.hourStyle, hourStyle = _b === void 0 ? {} : _b, _c = _a.calendarCellAccessibilityProps, calendarCellAccessibilityProps = _c === void 0 ? {} : _c, HourComponent = _a.hourComponent;
    var theme = useTheme();
    var textStyle = React.useMemo(function () { return ({ color: theme.palette.gray[500], fontSize: theme.typography.xs.fontSize }); }, [theme]);
    return (React.createElement(View, __assign({ style: { height: cellHeight } }, calendarCellAccessibilityProps), HourComponent ? (React.createElement(HourComponent, { hour: hour, ampm: ampm })) : (React.createElement(Text, { style: [objHasContent(hourStyle) ? hourStyle : textStyle, u['text-center']] }, formatHour(hour, ampm)))));
};
var HourGuideColumn = React.memo(_HourGuideColumn, function () { return true; });

var styles = StyleSheet.create({
    nowIndicator: {
        position: 'absolute',
        zIndex: 10000,
        height: 2,
        width: '100%',
    },
});
function _CalendarBody(_a) {
    var containerHeight = _a.containerHeight, cellHeight = _a.cellHeight, dateRange = _a.dateRange, style = _a.style, onLongPressCell = _a.onLongPressCell, onPressCell = _a.onPressCell, events = _a.events, onPressEvent = _a.onPressEvent, eventCellTextColor = _a.eventCellTextColor, eventCellStyle = _a.eventCellStyle, _b = _a.eventCellAccessibilityProps, eventCellAccessibilityProps = _b === void 0 ? {} : _b, calendarCellStyle = _a.calendarCellStyle, _c = _a.calendarCellAccessibilityProps, calendarCellAccessibilityProps = _c === void 0 ? {} : _c, ampm = _a.ampm, showTime = _a.showTime, scrollOffsetMinutes = _a.scrollOffsetMinutes, hideNowIndicator = _a.hideNowIndicator, overlapOffset = _a.overlapOffset, renderEvent = _a.renderEvent, _d = _a.headerComponent, headerComponent = _d === void 0 ? null : _d, _e = _a.headerComponentStyle, headerComponentStyle = _e === void 0 ? {} : _e, _f = _a.hourStyle, hourStyle = _f === void 0 ? {} : _f, _g = _a.hideHours, hideHours = _g === void 0 ? false : _g, _h = _a.minHour, minHour = _h === void 0 ? 0 : _h, _j = _a.maxHour, maxHour = _j === void 0 ? 23 : _j, _k = _a.isEventOrderingEnabled, isEventOrderingEnabled = _k === void 0 ? true : _k, _l = _a.showWeekNumber, showWeekNumber = _l === void 0 ? false : _l, _m = _a.showVerticalScrollIndicator, showVerticalScrollIndicator = _m === void 0 ? false : _m, enrichedEventsByDate = _a.enrichedEventsByDate, _o = _a.enableEnrichedEvents, enableEnrichedEvents = _o === void 0 ? false : _o, _p = _a.eventsAreSorted, eventsAreSorted = _p === void 0 ? false : _p, _q = _a.timeslots, timeslots = _q === void 0 ? 0 : _q, hourComponent = _a.hourComponent;
    var scrollView = React.useRef(null);
    var now = useNow(!hideNowIndicator).now;
    var hours = Array.from({ length: maxHour - minHour + 1 }, function (_, i) { return minHour + i; });
    React.useEffect(function () {
        var timeout;
        if (scrollView.current && scrollOffsetMinutes && Platform.OS !== 'ios') {
            // We add delay here to work correct on React Native
            // see: https://stackoverflow.com/questions/33208477/react-native-android-scrollview-scrollto-not-working
            timeout = setTimeout(function () {
                if (scrollView === null || scrollView === void 0 ? void 0 : scrollView.current) {
                    scrollView.current.scrollTo({
                        y: (cellHeight * scrollOffsetMinutes) / 60,
                        animated: false,
                    });
                }
            }, Platform.OS === 'web' ? 0 : 10);
        }
        return function () {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [scrollOffsetMinutes, cellHeight]);
    var _onPressCell = React.useCallback(function (date) {
        onPressCell === null || onPressCell === void 0 ? void 0 : onPressCell(date.toDate());
    }, [onPressCell]);
    var _onLongPressCell = React.useCallback(function (date) {
        onLongPressCell === null || onLongPressCell === void 0 ? void 0 : onLongPressCell(date.toDate());
    }, [onLongPressCell]);
    var internalEnrichedEventsByDate = React.useMemo(function () {
        if (enableEnrichedEvents) {
            return enrichedEventsByDate || enrichEvents(events, eventsAreSorted);
        }
        return {};
    }, [enableEnrichedEvents, enrichedEventsByDate, events, eventsAreSorted]);
    var enrichedEvents = React.useMemo(function () {
        if (enableEnrichedEvents)
            return [];
        if (isEventOrderingEnabled) {
            // Events are being sorted once so we dont have to do it on each loop
            var sortedEvents_1 = events.sort(function (a, b) { return a.start.getDate() - b.start.getDate(); });
            return sortedEvents_1.map(function (event) { return (__assign(__assign({}, event), { overlapPosition: getOrderOfEvent(event, sortedEvents_1), overlapCount: getCountOfEventsAtEvent(event, sortedEvents_1) })); });
        }
        return events;
    }, [enableEnrichedEvents, events, isEventOrderingEnabled]);
    var _renderMappedEvent = React.useCallback(function (event, index) {
        return (React.createElement(CalendarEvent, { key: "".concat(index).concat(event.start).concat(event.title).concat(event.end), event: event, onPressEvent: onPressEvent, eventCellStyle: eventCellStyle, eventCellAccessibilityProps: eventCellAccessibilityProps, eventCellTextColor: eventCellTextColor, showTime: showTime, eventCount: event.overlapCount, eventOrder: event.overlapPosition, overlapOffset: overlapOffset, renderEvent: renderEvent, ampm: ampm, maxHour: maxHour, minHour: minHour, hours: hours.length }));
    }, [
        ampm,
        eventCellStyle,
        eventCellTextColor,
        eventCellAccessibilityProps,
        onPressEvent,
        overlapOffset,
        renderEvent,
        showTime,
        maxHour,
        minHour,
        hours.length,
    ]);
    var _renderEvents = React.useCallback(function (date) {
        if (enableEnrichedEvents) {
            return (internalEnrichedEventsByDate[date.format(SIMPLE_DATE_FORMAT)] || []).map(_renderMappedEvent);
        }
        return (React.createElement(React.Fragment, null,
            enrichedEvents
                .filter(function (_a) {
                var start = _a.start;
                return dayjs(start).isBetween(date.startOf('day'), date.endOf('day'), null, '[)');
            })
                .map(_renderMappedEvent),
            enrichedEvents
                .filter(function (_a) {
                var start = _a.start, end = _a.end;
                return dayjs(start).isBefore(date.startOf('day')) &&
                    dayjs(end).isBetween(date.startOf('day'), date.endOf('day'), null, '[)');
            })
                .map(function (event) { return (__assign(__assign({}, event), { start: dayjs(event.end).startOf('day') })); })
                .map(_renderMappedEvent),
            enrichedEvents
                .filter(function (_a) {
                var start = _a.start, end = _a.end;
                return dayjs(start).isBefore(date.startOf('day')) && dayjs(end).isAfter(date.endOf('day'));
            })
                .map(function (event) { return (__assign(__assign({}, event), { start: dayjs(event.end).startOf('day'), end: dayjs(event.end).endOf('day') })); })
                .map(_renderMappedEvent)));
    }, [_renderMappedEvent, enableEnrichedEvents, enrichedEvents, internalEnrichedEventsByDate]);
    var theme = useTheme();
    return (React.createElement(React.Fragment, null,
        headerComponent != null ? React.createElement(View, { style: headerComponentStyle }, headerComponent) : null,
        React.createElement(ScrollView, { style: [
                {
                    height: containerHeight - cellHeight * 3,
                },
                style,
            ], ref: scrollView, scrollEventThrottle: 32, showsVerticalScrollIndicator: showVerticalScrollIndicator, nestedScrollEnabled: true, contentOffset: Platform.OS === 'ios' ? { x: 0, y: scrollOffsetMinutes } : { x: 0, y: 0 } },
            React.createElement(View, { style: [u['flex-1'], theme.isRTL ? u['flex-row-reverse'] : u['flex-row']] },
                (!hideHours || showWeekNumber) && (React.createElement(View, { style: [u['z-20'], u['w-50']] }, hours.map(function (hour) { return (React.createElement(HourGuideColumn, { key: hour, cellHeight: cellHeight, hour: hour, ampm: ampm, hourStyle: hourStyle, calendarCellAccessibilityProps: calendarCellAccessibilityProps, hourComponent: hourComponent })); }))),
                dateRange.map(function (date) { return (React.createElement(View, { style: [u['flex-1'], u['overflow-hidden']], key: date.toString() },
                    hours.map(function (hour, index) { return (React.createElement(HourGuideCell, { key: hour, cellHeight: cellHeight, date: date, hour: hour, onLongPress: _onLongPressCell, onPress: _onPressCell, index: index, calendarCellStyle: calendarCellStyle, calendarCellAccessibilityProps: calendarCellAccessibilityProps, timeslots: timeslots })); }),
                    _renderEvents(date),
                    isToday(date) && !hideNowIndicator && (React.createElement(View, { style: [
                            styles.nowIndicator,
                            { backgroundColor: theme.palette.nowIndicator },
                            {
                                top: "".concat(getRelativeTopInDay(now, minHour, hours.length), "%"),
                            },
                        ] })))); })))));
}
var CalendarBody = typedMemo(_CalendarBody);

function _CalendarEventForMonthView(_a) {
    var event = _a.event, onPressEvent = _a.onPressEvent, eventCellStyle = _a.eventCellStyle, _b = _a.eventCellAccessibilityProps, eventCellAccessibilityProps = _b === void 0 ? {} : _b, renderEvent = _a.renderEvent, date = _a.date, dayOfTheWeek = _a.dayOfTheWeek, calendarWidth = _a.calendarWidth, isRTL = _a.isRTL, eventMinHeightForMonthView = _a.eventMinHeightForMonthView, showAdjacentMonths = _a.showAdjacentMonths;
    var theme = useTheme();
    var _c = React.useMemo(function () { return getEventSpanningInfo(event, date, dayOfTheWeek, calendarWidth, showAdjacentMonths); }, [date, dayOfTheWeek, event, calendarWidth, showAdjacentMonths]), eventWidth = _c.eventWidth, isMultipleDays = _c.isMultipleDays, isMultipleDaysStart = _c.isMultipleDaysStart, eventWeekDuration = _c.eventWeekDuration;
    var touchableOpacityProps = useCalendarTouchableOpacityProps({
        event: event,
        eventCellStyle: eventCellStyle,
        eventCellAccessibilityProps: eventCellAccessibilityProps,
        onPressEvent: onPressEvent,
        injectedStyles: [
            { backgroundColor: theme.palette.primary.main },
            isMultipleDaysStart && eventWeekDuration > 1
                ? {
                    position: 'absolute',
                    width: eventWidth,
                    zIndex: 10000,
                }
                : {},
            isRTL ? { right: 0 } : { left: 0 },
        ],
    });
    return (React.createElement(TouchableOpacity, { style: [{ minHeight: eventMinHeightForMonthView }, u['mt-2']], onPress: function () { return !event.disabled && (onPressEvent === null || onPressEvent === void 0 ? void 0 : onPressEvent(event)); } }, (!isMultipleDays && date.isSame(event.start, 'day')) ||
        (isMultipleDays && isMultipleDaysStart) ? (renderEvent ? (renderEvent(event, touchableOpacityProps)) : (React.createElement(View, __assign({}, touchableOpacityProps),
        React.createElement(Text, { style: [
                { color: theme.palette.primary.contrastText },
                theme.typography.xs,
                u.truncate,
                isRTL && { textAlign: 'right' },
            ], numberOfLines: 1 }, event.title)))) : null));
}
var CalendarEventForMonthView = typedMemo(_CalendarEventForMonthView);

function _CalendarBodyForMonthView(_a) {
    var containerHeight = _a.containerHeight, targetDate = _a.targetDate, style = _a.style, onLongPressCell = _a.onLongPressCell, onPressCell = _a.onPressCell, onPressDateHeader = _a.onPressDateHeader, events = _a.events, onPressEvent = _a.onPressEvent, eventCellStyle = _a.eventCellStyle, _b = _a.eventCellAccessibilityProps, eventCellAccessibilityProps = _b === void 0 ? {} : _b, calendarCellStyle = _a.calendarCellStyle, _c = _a.calendarCellAccessibilityPropsForMonthView, calendarCellAccessibilityPropsForMonthView = _c === void 0 ? {} : _c, _d = _a.calendarCellAccessibilityProps, calendarCellAccessibilityProps = _d === void 0 ? {} : _d, calendarCellTextStyle = _a.calendarCellTextStyle, hideNowIndicator = _a.hideNowIndicator, showAdjacentMonths = _a.showAdjacentMonths, renderEvent = _a.renderEvent, maxVisibleEventCount = _a.maxVisibleEventCount, weekStartsOn = _a.weekStartsOn, eventMinHeightForMonthView = _a.eventMinHeightForMonthView, moreLabel = _a.moreLabel, onPressMoreLabel = _a.onPressMoreLabel, sortedMonthView = _a.sortedMonthView, _e = _a.showWeekNumber, showWeekNumber = _e === void 0 ? false : _e, renderCustomDateForMonth = _a.renderCustomDateForMonth, disableMonthEventCellPress = _a.disableMonthEventCellPress;
    var now = useNow(!hideNowIndicator).now;
    var _f = React.useState(0), calendarWidth = _f[0], setCalendarWidth = _f[1];
    var _g = React.useState(0), calendarCellHeight = _g[0], setCalendarCellHeight = _g[1];
    var weeks = showAdjacentMonths
        ? getWeeksWithAdjacentMonths(targetDate, weekStartsOn)
        : calendarize(targetDate.toDate(), weekStartsOn);
    var minCellHeight = containerHeight / 5 - 30;
    var theme = useTheme();
    var getCalendarCellStyle = React.useMemo(function () { return (typeof calendarCellStyle === 'function' ? calendarCellStyle : function () { return calendarCellStyle; }); }, [calendarCellStyle]);
    var getCalendarCellTextStyle = React.useMemo(function () {
        return typeof calendarCellTextStyle === 'function'
            ? calendarCellTextStyle
            : function () { return calendarCellTextStyle; };
    }, [calendarCellTextStyle]);
    var getStartOfWeek = React.useCallback(function (date) {
        if (date.day() < weekStartsOn) {
            return date.add(weekStartsOn - date.day() - 7, 'days');
        }
        if (date.day() > weekStartsOn) {
            return date.add(weekStartsOn - date.day(), 'days');
        }
        return date;
    }, [weekStartsOn]);
    var sortedEvents = React.useCallback(function (day) {
        if (!sortedMonthView) {
            return events.filter(function (_a) {
                var start = _a.start, end = _a.end;
                return day.isBetween(dayjs(start).startOf('day'), dayjs(end).endOf('day'), null, '[)');
            });
        }
        /**
         * Better way to sort overlapping events that spans accross multiple days
         * For example, if you want following events
         * Event 1, start = 01/01 12:00, end = 02/01 12:00
         * Event 2, start = 02/01 12:00, end = 03/01 12:00
         * Event 3, start = 03/01 12:00, end = 04/01 12:00
         *
         * When drawing calendar in month view, event 3 should be placed at 3rd index for 03/01, because Event 2 are placed at 2nd index for 02/01 and 03/01
         *
         */
        var min = day.startOf('day');
        var max = day.endOf('day');
        /**
         * Start of week should consider weekStartOn parameter instead of relying on day.startOf('week') which is locale affected
         */
        var startOfWeek = getStartOfWeek(day);
        //filter all events that starts from the current week until the current day, and sort them by reverse starting time
        var filteredEvents = events
            .filter(function (_a) {
            var start = _a.start, end = _a.end;
            return dayjs(end).isAfter(startOfWeek) && dayjs(start).isBefore(max);
        })
            .sort(function (a, b) {
            if (dayjs(a.start).isSame(b.start, 'day')) {
                var aDuration = dayjs.duration(dayjs(a.end).diff(dayjs(a.start))).days();
                var bDuration = dayjs.duration(dayjs(b.end).diff(dayjs(b.start))).days();
                return aDuration - bDuration;
            }
            return b.start.getTime() - a.start.getTime();
        });
        /**
         * find the most relevant min date to filter the events
         * in the example:
         * 1. when rendering for 01/01, min date will be 01/01 (start of day for event 1)
         * 2. when rendering for 02/01, min date will be 01/01 (start of day for event 1)
         * 3. when rendering for 03/01, min date will be 01/01 (start of day for event 1)
         * 4. when rendering for 04/01, min date will be 01/01 (start of day for event 1)
         * 5. when rendering for 05/01, min date will be 05/01 (no event overlaps with 05/01)
         */
        for (var _i = 0, filteredEvents_1 = filteredEvents; _i < filteredEvents_1.length; _i++) {
            var _a = filteredEvents_1[_i], start = _a.start, end = _a.end;
            if (dayjs(end).isAfter(min) && dayjs(start).isBefore(min)) {
                min = dayjs(start).startOf('day');
            }
        }
        filteredEvents = filteredEvents
            .filter(function (_a) {
            var start = _a.start, end = _a.end;
            return dayjs(end).endOf('day').isAfter(min) && dayjs(start).isBefore(max);
        })
            .reverse();
        /**
         * We move eligible event to the top
         * For example, when rendering for 03/01, Event 3 should be moved to the top, since there is a gap left by Event 1
         */
        var finalEvents = [];
        var tmpDay = startOfWeek;
        //re-sort events from the start of week until the calendar cell date
        //optimize sorting of event nodes and make sure that no empty gaps are left on top of calendar cell
        while (!tmpDay.isAfter(day)) {
            for (var _b = 0, filteredEvents_2 = filteredEvents; _b < filteredEvents_2.length; _b++) {
                var event = filteredEvents_2[_b];
                if (dayjs(event.end).isBefore(tmpDay.startOf('day')) ||
                    dayjs(event.end).isSame(tmpDay.startOf('day'))) {
                    var eventToMoveUp = filteredEvents.find(function (e) {
                        return dayjs(e.start).startOf('day').isSame(tmpDay.startOf('day'));
                    });
                    if (eventToMoveUp !== undefined) {
                        //remove eventToMoveUp from finalEvents first
                        if (finalEvents.indexOf(eventToMoveUp) > -1) {
                            finalEvents.splice(finalEvents.indexOf(eventToMoveUp), 1);
                        }
                        if (finalEvents.indexOf(event) > -1) {
                            finalEvents.splice(finalEvents.indexOf(event), 1, eventToMoveUp);
                        }
                        else {
                            finalEvents.push(eventToMoveUp);
                        }
                    }
                }
                else if (finalEvents.indexOf(event) === -1) {
                    finalEvents.push(event);
                }
            }
            tmpDay = tmpDay.add(1, 'day');
        }
        return finalEvents;
    }, [events, sortedMonthView, getStartOfWeek]);
    var renderDateCell = function (date, index) {
        if (date && renderCustomDateForMonth) {
            return renderCustomDateForMonth(date.toDate());
        }
        return (React.createElement(Text, { style: [
                { textAlign: 'center' },
                theme.typography.sm,
                {
                    color: (date === null || date === void 0 ? void 0 : date.format(SIMPLE_DATE_FORMAT)) === now.format(SIMPLE_DATE_FORMAT)
                        ? theme.palette.primary.main
                        : (date === null || date === void 0 ? void 0 : date.month()) !== targetDate.month()
                            ? theme.palette.gray['500']
                            : theme.palette.gray['800'],
                },
                __assign({}, getCalendarCellTextStyle(date === null || date === void 0 ? void 0 : date.toDate(), index)),
            ] }, date === null || date === void 0 ? void 0 : date.format('D')));
    };
    return (React.createElement(View, { style: [
            {
                height: containerHeight,
            },
            u['flex-column'],
            u['flex-1'],
            u['border-b'],
            u['border-l'],
            u['border-r'],
            u.rounded,
            { borderColor: theme.palette.gray['200'] },
            style,
        ], onLayout: function (_a) {
            var layout = _a.nativeEvent.layout;
            setCalendarWidth(layout.width);
        } }, weeks.map(function (week, i) { return (React.createElement(View, { key: "".concat(i, "-").concat(week.join('-')), style: [
            u['flex-1'],
            theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
            Platform.OS === 'android' && style, // TODO: in Android, backgroundColor is not applied to child components
            {
                minHeight: minCellHeight,
            },
        ] },
        showWeekNumber ? (React.createElement(View, __assign({ style: [
                i > 0 && u['border-t'],
                { borderColor: theme.palette.gray['200'] },
                u['p-2'],
                u['w-20'],
                u['flex-column'],
                {
                    minHeight: minCellHeight,
                },
            ], key: 'weekNumber' }, calendarCellAccessibilityProps),
            React.createElement(Text, { style: [
                    { textAlign: 'center' },
                    theme.typography.sm,
                    {
                        color: theme.palette.gray['800'],
                    },
                ] }, week.length > 0
                ? targetDate.date(week[0]).startOf('week').add(4, 'days').isoWeek()
                : ''))) : null,
        week
            .map(function (d) {
            return showAdjacentMonths ? targetDate.date(d) : d > 0 ? targetDate.date(d) : null;
        })
            .map(function (date, ii) { return (React.createElement(TouchableOpacity, __assign({ onLongPress: function () { return date && onLongPressCell && onLongPressCell(date.toDate()); }, onPress: function () { return date && onPressCell && onPressCell(date.toDate()); }, style: [
                i > 0 && u['border-t'],
                theme.isRTL && (ii > 0 || showWeekNumber) && u['border-r'],
                !theme.isRTL && (ii > 0 || showWeekNumber) && u['border-l'],
                { borderColor: theme.palette.gray['200'] },
                u['p-2'],
                u['flex-1'],
                u['flex-column'],
                {
                    minHeight: minCellHeight,
                    zIndex: ii * -1,
                },
                __assign({}, getCalendarCellStyle(date === null || date === void 0 ? void 0 : date.toDate(), i)),
            ], key: "".concat(ii, "-").concat(date === null || date === void 0 ? void 0 : date.toDate()), onLayout: function (_a) {
                var layout = _a.nativeEvent.layout;
                // Only set calendarCellHeight once because they are all same
                // Only set calendarCellHeight if disableMonthEventCellPress is true, since calendarCellHeihgt is only used when disableMonthEventCellPress is true
                return i === 0 &&
                    ii === 0 &&
                    disableMonthEventCellPress &&
                    setCalendarCellHeight(layout.height);
            } }, calendarCellAccessibilityPropsForMonthView),
            React.createElement(TouchableOpacity, __assign({ onPress: function () {
                    return date &&
                        (onPressDateHeader
                            ? onPressDateHeader(date.toDate())
                            : onPressCell === null || onPressCell === void 0 ? void 0 : onPressCell(date.toDate()));
                }, onLongPress: function () {
                    return date &&
                        (onPressDateHeader
                            ? onPressDateHeader(date.toDate())
                            : onLongPressCell === null || onLongPressCell === void 0 ? void 0 : onLongPressCell(date.toDate()));
                } }, calendarCellAccessibilityProps), renderDateCell(date, i)),
            //Calendar body will re-render after calendarWidth/calendarCellHeight is set from layout event, prevent expensive operation during first render
            calendarWidth > 0 &&
                (!disableMonthEventCellPress || calendarCellHeight > 0) &&
                date &&
                sortedEvents(date).reduce(function (elements, event, index, events) { return __spreadArray(__spreadArray([], elements, true), [
                    index > maxVisibleEventCount ? null : index === maxVisibleEventCount ? (React.createElement(Text, { key: "".concat(index, "-").concat(event.start, "-").concat(event.title, "-").concat(event.end), style: [
                            theme.typography.moreLabel,
                            { marginTop: 2, color: theme.palette.moreLabel },
                        ], onPress: function () { return onPressMoreLabel === null || onPressMoreLabel === void 0 ? void 0 : onPressMoreLabel(events, date.toDate()); } }, moreLabel.replace('{moreCount}', "".concat(events.length - maxVisibleEventCount)))) : (React.createElement(CalendarEventForMonthView, { key: "".concat(index, "-").concat(event.start, "-").concat(event.title, "-").concat(event.end), event: event, eventCellStyle: eventCellStyle, eventCellAccessibilityProps: eventCellAccessibilityProps, onPressEvent: onPressEvent, renderEvent: renderEvent, date: date, dayOfTheWeek: ii, calendarWidth: calendarWidth, isRTL: theme.isRTL, eventMinHeightForMonthView: eventMinHeightForMonthView, showAdjacentMonths: showAdjacentMonths })),
                ], false); }, []),
            disableMonthEventCellPress &&
                calendarCellHeight > 0 && ( //if calendarCellHeight has not been set from layout event, then don't render the element since it will be 0 height
            /* In this case, we render `TouchableGradually` on the date cell to prevent event cell's touch events from being called. */
            React.createElement(TouchableGradually, __assign({ style: {
                    height: calendarCellHeight,
                    width: Math.floor(calendarWidth / 7),
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }, onLongPress: function () { return date && onLongPressCell && onLongPressCell(date.toDate()); }, onPress: function () { return date && onPressCell && onPressCell(date.toDate()); } }, calendarCellAccessibilityProps))))); }))); })));
}
var CalendarBodyForMonthView = typedMemo(_CalendarBodyForMonthView);
/**
 * A utility component which prevents event cells from being pressed in Month View.
 */
function TouchableGradually(_a) {
    var onLongPress = _a.onLongPress, onPress = _a.onPress, style = _a.style;
    var backgroundColor = React.useRef(new Animated.Value(0)).current;
    var handlePressIn = function () {
        Animated.timing(backgroundColor, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };
    var handlePressOut = function () {
        Animated.timing(backgroundColor, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };
    return (React.createElement(TouchableHighlight, { onLongPress: onLongPress, onPressIn: handlePressIn, onPressOut: handlePressOut, onPress: onPress, underlayColor: "transparent", style: style },
        React.createElement(Animated.View, { style: [
                {
                    backgroundColor: backgroundColor.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.2)'],
                    }),
                },
                style,
            ] })));
}

function _CalendarHeader(_a) {
    var dateRange = _a.dateRange, cellHeight = _a.cellHeight, style = _a.style, allDayEventCellStyle = _a.allDayEventCellStyle, allDayEventCellTextColor = _a.allDayEventCellTextColor, allDayEvents = _a.allDayEvents, onPressDateHeader = _a.onPressDateHeader, onPressEvent = _a.onPressEvent, activeDate = _a.activeDate, _b = _a.headerContentStyle, headerContentStyle = _b === void 0 ? {} : _b, _c = _a.dayHeaderStyle, dayHeaderStyle = _c === void 0 ? {} : _c, _d = _a.dayHeaderHighlightColor, dayHeaderHighlightColor = _d === void 0 ? '' : _d, _e = _a.weekDayHeaderHighlightColor, weekDayHeaderHighlightColor = _e === void 0 ? '' : _e, _f = _a.showAllDayEventCell, showAllDayEventCell = _f === void 0 ? true : _f, _g = _a.hideHours, hideHours = _g === void 0 ? false : _g, _h = _a.showWeekNumber, showWeekNumber = _h === void 0 ? false : _h, _j = _a.weekNumberPrefix, weekNumberPrefix = _j === void 0 ? '' : _j, _k = _a.allDayEventCellAccessibilityProps, allDayEventCellAccessibilityProps = _k === void 0 ? {} : _k, _l = _a.headerContainerAccessibilityProps, headerContainerAccessibilityProps = _l === void 0 ? {} : _l, _m = _a.headerCellAccessibilityProps, headerCellAccessibilityProps = _m === void 0 ? {} : _m;
    var _onPressHeader = React.useCallback(function (date) {
        onPressDateHeader === null || onPressDateHeader === void 0 ? void 0 : onPressDateHeader(date);
    }, [onPressDateHeader]);
    var _onPressEvent = React.useCallback(function (event) {
        onPressEvent === null || onPressEvent === void 0 ? void 0 : onPressEvent(event);
    }, [onPressEvent]);
    var theme = useTheme();
    var borderColor = { borderColor: theme.palette.gray['200'] };
    var primaryBg = { backgroundColor: theme.palette.primary.main };
    return (React.createElement(View, __assign({ style: [
            showAllDayEventCell ? u['border-b-2'] : {},
            showAllDayEventCell ? borderColor : {},
            theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
            style,
        ] }, headerContainerAccessibilityProps),
        (!hideHours || showWeekNumber) && (React.createElement(View, { style: [u['z-10'], u['w-50'], u['pt-2'], borderColor] }, showWeekNumber ? (React.createElement(View, __assign({ style: [
                { height: cellHeight },
                objHasContent(headerContentStyle) ? headerContentStyle : u['justify-between'],
            ] }, headerCellAccessibilityProps),
            React.createElement(Text, { style: [
                    theme.typography.xs,
                    u['text-center'],
                    {
                        color: theme.palette.gray['500'],
                    },
                ] }, weekNumberPrefix),
            React.createElement(View, { style: objHasContent(dayHeaderStyle) ? dayHeaderStyle : [u['mb-6']] },
                React.createElement(Text, { style: [
                        {
                            color: theme.palette.gray['800'],
                        },
                        theme.typography.xl,
                        u['text-center'],
                    ] }, dateRange.length > 0
                    ? dateRange[0].startOf('week').add(4, 'days').isoWeek()
                    : '')))) : null)),
        dateRange.map(function (date) {
            var shouldHighlight = activeDate ? date.isSame(activeDate, 'date') : isToday(date);
            return (React.createElement(TouchableOpacity, __assign({ style: [u['flex-1'], u['pt-2']], onPress: function () { return _onPressHeader(date.toDate()); }, disabled: onPressDateHeader === undefined, key: date.toString() }, headerCellAccessibilityProps),
                React.createElement(View, { style: [
                        { height: cellHeight },
                        objHasContent(headerContentStyle) ? headerContentStyle : u['justify-between'],
                    ] },
                    React.createElement(Text, { style: [
                            theme.typography.xs,
                            u['text-center'],
                            {
                                color: shouldHighlight
                                    ? stringHasContent(weekDayHeaderHighlightColor)
                                        ? weekDayHeaderHighlightColor
                                        : theme.palette.primary.main
                                    : theme.palette.gray['500'],
                            },
                        ] }, date.format('ddd')),
                    React.createElement(View, { style: objHasContent(dayHeaderStyle)
                            ? dayHeaderStyle
                            : shouldHighlight
                                ? [
                                    primaryBg,
                                    u['h-36'],
                                    u['w-36'],
                                    u['pb-6'],
                                    u['rounded-full'],
                                    u['items-center'],
                                    u['justify-center'],
                                    u['self-center'],
                                    u['z-20'],
                                ]
                                : [u['mb-6']] },
                        React.createElement(Text, { style: [
                                {
                                    color: shouldHighlight
                                        ? stringHasContent(dayHeaderHighlightColor)
                                            ? dayHeaderHighlightColor
                                            : theme.palette.primary.contrastText
                                        : theme.palette.gray['800'],
                                },
                                theme.typography.xl,
                                u['text-center'],
                                Platform.OS === 'web' &&
                                    shouldHighlight &&
                                    !stringHasContent(dayHeaderHighlightColor) &&
                                    u['mt-6'],
                            ] }, date.format('D')))),
                showAllDayEventCell ? (React.createElement(View, { style: [
                        u['border-l'],
                        { borderColor: theme.palette.gray['200'] },
                        { height: cellHeight },
                    ] }, allDayEvents.map(function (event, index) {
                    if (!dayjs(date).isBetween(event.start, event.end, 'day', '[]')) {
                        return null;
                    }
                    var getEventStyle = typeof allDayEventCellStyle === 'function'
                        ? allDayEventCellStyle
                        : function () { return allDayEventCellStyle; };
                    return (React.createElement(TouchableOpacity, __assign({ style: [eventCellCss.style, primaryBg, u['mt-2'], getEventStyle(event)], key: "".concat(index, "-").concat(event.start, "-").concat(event.title, "-").concat(event.end), onPress: function () { return _onPressEvent(event); } }, allDayEventCellAccessibilityProps),
                        React.createElement(Text, { style: {
                                fontSize: theme.typography.sm.fontSize,
                                color: allDayEventCellTextColor || theme.palette.primary.contrastText,
                            } }, event.title)));
                }))) : null));
        })));
}
var CalendarHeader = typedMemo(_CalendarHeader);

function _CalendarHeaderForMonthView(_a) {
    var locale = _a.locale, weekStartsOn = _a.weekStartsOn, style = _a.style, _b = _a.showWeekNumber, showWeekNumber = _b === void 0 ? false : _b, _c = _a.weekNumberPrefix, weekNumberPrefix = _c === void 0 ? '' : _c, _d = _a.headerContainerAccessibilityProps, headerContainerAccessibilityProps = _d === void 0 ? {} : _d, _e = _a.headerCellAccessibilityProps, headerCellAccessibilityProps = _e === void 0 ? {} : _e;
    var dates = getDatesInWeek(new Date(), weekStartsOn, locale);
    var todayWeekNum = dayjs().day();
    var theme = useTheme();
    return (React.createElement(View, __assign({ style: [
            u['border-b'],
            { borderColor: theme.palette.gray['100'] },
            theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
            style,
        ] }, headerContainerAccessibilityProps),
        showWeekNumber ? (React.createElement(View, __assign({ style: [u['w-20'], { paddingTop: 2 }], key: 'weekNumber' }, headerCellAccessibilityProps),
            React.createElement(View, { style: { flex: 1, height: 30 } },
                React.createElement(Text, { style: [
                        u['text-center'],
                        {
                            color: theme.palette.gray['800'],
                        },
                    ] }, weekNumberPrefix !== undefined ? weekNumberPrefix : '')))) : null,
        dates.map(function (date) { return (React.createElement(View, __assign({ style: { flex: 1, paddingTop: 2 }, key: date.toISOString() }, headerCellAccessibilityProps),
            React.createElement(View, { style: { height: 30 } },
                React.createElement(Text, { style: [
                        u['text-center'],
                        {
                            color: todayWeekNum === date.day()
                                ? theme.palette.primary.main
                                : theme.palette.gray['800'],
                        },
                    ] }, date.format('ddd'))))); })));
}
var CalendarHeaderForMonthView = typedMemo(_CalendarHeaderForMonthView);

function _Schedule(_a) {
    var events = _a.events, ampm = _a.ampm, onPressEvent = _a.onPressEvent, eventCellStyle = _a.eventCellStyle, _b = _a.eventCellAccessibilityProps, eventCellAccessibilityProps = _b === void 0 ? {} : _b, showTime = _a.showTime, isEventOrderingEnabled = _a.isEventOrderingEnabled, overlapOffset = _a.overlapOffset, renderEvent = _a.renderEvent, containerHeight = _a.containerHeight, style = _a.style, activeDate = _a.activeDate, _c = _a.weekDayHeaderHighlightColor, weekDayHeaderHighlightColor = _c === void 0 ? '' : _c, _d = _a.dayHeaderHighlightColor, dayHeaderHighlightColor = _d === void 0 ? '' : _d, itemSeparatorComponent = _a.itemSeparatorComponent, locale = _a.locale, _e = _a.calendarCellAccessibilityProps, calendarCellAccessibilityProps = _e === void 0 ? {} : _e, scheduleMonthSeparatorStyle = _a.scheduleMonthSeparatorStyle;
    var theme = useTheme();
    /**
     * Bind default style for eventCellStyle.
     */
    var eventStyles = React__default.useCallback(function (event) {
        // This default style  need for Schedule view
        var defaultEventStyle = __assign(__assign({}, u['flex-column']), u['h-50']);
        if (Array.isArray(eventCellStyle)) {
            return __spreadArray(__spreadArray([], [defaultEventStyle], false), eventCellStyle, true);
        }
        if (typeof eventCellStyle === 'object') {
            return __assign(__assign({}, defaultEventStyle), eventCellStyle);
        }
        if (typeof eventCellStyle === 'function') {
            var output = eventCellStyle(event);
            if (Array.isArray(output)) {
                return __spreadArray(__spreadArray([], [defaultEventStyle], false), output, true);
            }
            if (typeof output === 'object') {
                return __assign(__assign({}, defaultEventStyle), output);
            }
        }
        return defaultEventStyle;
    }, [eventCellStyle]);
    /**
     * Group by events by start date.
     */
    var getItem = React__default.useMemo(function () {
        var groupedData = events
            .sort(function (a, b) { return dayjs(a.start).diff(b.start); })
            .reduce(function (result, item) {
            var startDate = dayjs(item.start).format(SIMPLE_DATE_FORMAT);
            if (!result[startDate]) {
                result[startDate] = [];
            }
            result[startDate].push(item);
            return result;
        }, {});
        return Object.values(groupedData);
    }, [events]);
    var renderMonthSeparator = function (date) { return (React__default.createElement(View, { style: { width: '100%' } },
        React__default.createElement(Text, { style: [
                { color: theme.palette.primary.main, textAlign: 'center', paddingVertical: 6 },
                scheduleMonthSeparatorStyle,
            ] }, date.format('MMMM YYYY')))); };
    var renderFlatListItem = function (eventGroup, index) {
        var date = dayjs(eventGroup[0].start).locale(locale);
        var shouldHighlight = activeDate ? date.isSame(activeDate, 'date') : isToday(date);
        var isNewMonth = index === 0 || !dayjs(eventGroup[0].start).isSame(getItem[index - 1][0].start, 'month');
        return (React__default.createElement(View, { style: [u.flex, { padding: 2, flexWrap: 'wrap' }] },
            isNewMonth && renderMonthSeparator(date),
            React__default.createElement(View, { style: [u.flex, u['justify-center'], { width: '20%' }] },
                React__default.createElement(View, __assign({ style: [
                        { width: 60, height: 60, borderRadius: 30 },
                        u.flex,
                        u['justify-center'],
                        u['items-center'],
                        u['flex-column-reverse'],
                    ] }, calendarCellAccessibilityProps),
                    React__default.createElement(Text, { style: [
                            {
                                color: shouldHighlight
                                    ? stringHasContent(dayHeaderHighlightColor)
                                        ? dayHeaderHighlightColor
                                        : theme.palette.primary.main
                                    : theme.palette.gray['800'],
                            },
                            theme.typography.xl,
                            u['text-center'],
                            Platform.OS === 'web' &&
                                shouldHighlight &&
                                !stringHasContent(dayHeaderHighlightColor) &&
                                u['mt-6'],
                        ] }, date.format('D')),
                    React__default.createElement(Text, { style: [
                            theme.typography.xs,
                            {
                                color: shouldHighlight
                                    ? stringHasContent(weekDayHeaderHighlightColor)
                                        ? weekDayHeaderHighlightColor
                                        : theme.palette.primary.main
                                    : theme.palette.gray['500'],
                            },
                        ] }, date.format('ddd')))),
            React__default.createElement(View, { style: [u.flex, u['flex-column'], { width: '75%' }] }, eventGroup.map(function (event, index) {
                return (React__default.createElement(View, { style: [u['flex-1'], u['overflow-hidden'], { marginTop: 2, marginBottom: 2 }], key: "".concat(index, "-").concat(event.start, "-").concat(event.title, "-").concat(event.end) },
                    React__default.createElement(CalendarEvent, { key: "".concat(index).concat(event.start).concat(event.title).concat(event.end), event: event, onPressEvent: onPressEvent, eventCellStyle: eventStyles, eventCellAccessibilityProps: eventCellAccessibilityProps, showTime: showTime, eventCount: isEventOrderingEnabled ? getCountOfEventsAtEvent(event, events) : undefined, eventOrder: isEventOrderingEnabled ? getOrderOfEvent(event, events) : undefined, overlapOffset: overlapOffset, renderEvent: renderEvent, ampm: ampm, mode: "schedule" })));
            }))));
    };
    return (React__default.createElement(View, { style: __assign(__assign({}, style), { height: containerHeight }) },
        React__default.createElement(FlatList, { data: getItem, renderItem: function (_a) {
                var item = _a.item;
                return renderFlatListItem(item, getItem.indexOf(item));
            }, ItemSeparatorComponent: itemSeparatorComponent, keyExtractor: function (_, index) { return index.toString(); } })));
}
var Schedule = typedMemo(_Schedule);

function _CalendarContainer(_a) {
    var events = _a.events, height = _a.height, hourRowHeight = _a.hourRowHeight, _b = _a.ampm, ampm = _b === void 0 ? false : _b, date = _a.date, _c = _a.allDayEventCellStyle, allDayEventCellStyle = _c === void 0 ? {} : _c, _d = _a.allDayEventCellTextColor, allDayEventCellTextColor = _d === void 0 ? '' : _d, _e = _a.allDayEventCellAccessibilityProps, allDayEventCellAccessibilityProps = _e === void 0 ? {} : _e, eventCellStyle = _a.eventCellStyle, _f = _a.eventCellTextColor, eventCellTextColor = _f === void 0 ? '' : _f, _g = _a.eventCellAccessibilityProps, eventCellAccessibilityProps = _g === void 0 ? {} : _g, _h = _a.calendarCellAccessibilityPropsForMonthView, calendarCellAccessibilityPropsForMonthView = _h === void 0 ? {} : _h, calendarCellStyle = _a.calendarCellStyle, calendarCellTextStyle = _a.calendarCellTextStyle, _j = _a.calendarCellAccessibilityProps, calendarCellAccessibilityProps = _j === void 0 ? {} : _j, _k = _a.locale, locale = _k === void 0 ? 'en' : _k, _l = _a.hideNowIndicator, hideNowIndicator = _l === void 0 ? false : _l, _m = _a.mode, mode = _m === void 0 ? 'week' : _m, overlapOffset = _a.overlapOffset, _o = _a.scrollOffsetMinutes, scrollOffsetMinutes = _o === void 0 ? 0 : _o, _p = _a.showTime, showTime = _p === void 0 ? true : _p, _q = _a.headerContainerStyle, headerContainerStyle = _q === void 0 ? {} : _q, _r = _a.headerContainerAccessibilityProps, headerContainerAccessibilityProps = _r === void 0 ? {} : _r, _s = _a.headerContentStyle, headerContentStyle = _s === void 0 ? {} : _s, _t = _a.headerCellAccessibilityProps, headerCellAccessibilityProps = _t === void 0 ? {} : _t, _u = _a.dayHeaderStyle, dayHeaderStyle = _u === void 0 ? {} : _u, _v = _a.dayHeaderHighlightColor, dayHeaderHighlightColor = _v === void 0 ? '' : _v, _w = _a.weekDayHeaderHighlightColor, weekDayHeaderHighlightColor = _w === void 0 ? '' : _w, _x = _a.bodyContainerStyle, bodyContainerStyle = _x === void 0 ? {} : _x, _y = _a.swipeEnabled, swipeEnabled = _y === void 0 ? true : _y, _z = _a.weekStartsOn, weekStartsOn = _z === void 0 ? 0 : _z, onChangeDate = _a.onChangeDate, onLongPressCell = _a.onLongPressCell, onPressCell = _a.onPressCell, onPressDateHeader = _a.onPressDateHeader, onPressEvent = _a.onPressEvent, renderEvent = _a.renderEvent, _0 = _a.renderHeader, HeaderComponent = _0 === void 0 ? CalendarHeader : _0, _1 = _a.renderHeaderForMonthView, HeaderComponentForMonthView = _1 === void 0 ? CalendarHeaderForMonthView : _1, _2 = _a.weekEndsOn, weekEndsOn = _2 === void 0 ? 6 : _2, _3 = _a.maxVisibleEventCount, maxVisibleEventCount = _3 === void 0 ? 3 : _3, _4 = _a.eventMinHeightForMonthView, eventMinHeightForMonthView = _4 === void 0 ? 22 : _4, activeDate = _a.activeDate, _5 = _a.headerComponent, headerComponent = _5 === void 0 ? null : _5, _6 = _a.headerComponentStyle, headerComponentStyle = _6 === void 0 ? {} : _6, _7 = _a.hourStyle, hourStyle = _7 === void 0 ? {} : _7, _8 = _a.showAllDayEventCell, showAllDayEventCell = _8 === void 0 ? true : _8, _9 = _a.moreLabel, moreLabel = _9 === void 0 ? '{moreCount} More' : _9, _10 = _a.showAdjacentMonths, showAdjacentMonths = _10 === void 0 ? true : _10, _11 = _a.sortedMonthView, sortedMonthView = _11 === void 0 ? true : _11, _12 = _a.hideHours, hideHours = _12 === void 0 ? false : _12, _13 = _a.minHour, minHour = _13 === void 0 ? 0 : _13, _14 = _a.maxHour, maxHour = _14 === void 0 ? 23 : _14, isEventOrderingEnabled = _a.isEventOrderingEnabled, _15 = _a.showWeekNumber, showWeekNumber = _15 === void 0 ? false : _15, _16 = _a.weekNumberPrefix, weekNumberPrefix = _16 === void 0 ? '' : _16, onPressMoreLabel = _a.onPressMoreLabel, renderCustomDateForMonth = _a.renderCustomDateForMonth, _17 = _a.disableMonthEventCellPress, disableMonthEventCellPress = _17 === void 0 ? false : _17, _18 = _a.showVerticalScrollIndicator, showVerticalScrollIndicator = _18 === void 0 ? false : _18, _19 = _a.itemSeparatorComponent, itemSeparatorComponent = _19 === void 0 ? null : _19, enrichedEventsByDate = _a.enrichedEventsByDate, _20 = _a.enableEnrichedEvents, enableEnrichedEvents = _20 === void 0 ? false : _20, _21 = _a.eventsAreSorted, eventsAreSorted = _21 === void 0 ? false : _21, onSwipeEnd = _a.onSwipeEnd, _22 = _a.timeslots, timeslots = _22 === void 0 ? 0 : _22, hourComponent = _a.hourComponent, _23 = _a.scheduleMonthSeparatorStyle, scheduleMonthSeparatorStyle = _23 === void 0 ? {} : _23;
    // To ensure we have proper effect callback, use string to date comparision.
    var dateString = date === null || date === void 0 ? void 0 : date.toString();
    var calendarRef = useRef(null);
    var _24 = React__default.useState(function () { return dayjs(date); }), targetDate = _24[0], setTargetDate = _24[1];
    React__default.useEffect(function () {
        if (dateString) {
            setTargetDate(dayjs(dateString));
        }
    }, [dateString]); // if setting `[date]`, it will triggered twice
    React__default.useEffect(function () {
        var _a;
        (_a = calendarRef.current) === null || _a === void 0 ? void 0 : _a.setPage(0, { animated: false });
    }, []);
    var allDayEvents = React__default.useMemo(function () { return events.filter(function (event) { return isAllDayEvent(event.start, event.end); }); }, [events]);
    var daytimeEvents = React__default.useMemo(function () { return events.filter(function (event) { return !isAllDayEvent(event.start, event.end); }); }, [events]);
    var getDateRange = React__default.useCallback(function (date) {
        switch (mode) {
            case 'month':
                return getDatesInMonth(date, locale);
            case 'week':
                return getDatesInWeek(date, weekStartsOn, locale);
            case '3days':
                return getDatesInNextThreeDays(date, locale);
            case 'day':
                return getDatesInNextOneDay(date, locale);
            case 'custom':
                return getDatesInNextCustomDays(date, weekStartsOn, weekEndsOn, locale);
            case 'schedule': // TODO: this will update
                return getDatesInMonth(date, locale);
            default:
                throw new Error("[react-native-big-calendar] The mode which you specified \"".concat(mode, "\" is not supported."));
        }
    }, [mode, locale, weekEndsOn, weekStartsOn]);
    if (minHour < 0) {
        throw new Error('minHour should be 0 or greater');
    }
    if (maxHour > 23) {
        throw new Error('maxHour should be less that 24');
    }
    if (minHour >= maxHour) {
        throw new Error('minHour should be less than maxHour');
    }
    var cellHeight = React__default.useMemo(function () { return hourRowHeight || Math.max(height - 30, MIN_HEIGHT) / 24; }, [height, hourRowHeight]);
    var theme = useTheme();
    var onSwipeHorizontal = React__default.useCallback(function (direction) {
        if (!swipeEnabled) {
            return;
        }
        var nextTargetDate;
        if ((direction === 'LEFT' && !theme.isRTL) || (direction === 'RIGHT' && theme.isRTL)) {
            nextTargetDate = targetDate.add(modeToNum(mode, targetDate), 'day');
        }
        else {
            if (mode === 'month') {
                nextTargetDate = targetDate.add(targetDate.date() * -1, 'day');
            }
            else {
                nextTargetDate = targetDate.add(modeToNum(mode, targetDate) * -1, 'day');
            }
        }
        setTargetDate(nextTargetDate);
        onSwipeEnd === null || onSwipeEnd === void 0 ? void 0 : onSwipeEnd(nextTargetDate.toDate());
    }, [swipeEnabled, theme.isRTL, onSwipeEnd, targetDate, mode]);
    React__default.useEffect(function () {
        if (dateString && onChangeDate) {
            var dateRange = getDateRange(dateString);
            onChangeDate([dateRange[0].toDate(), dateRange[dateRange.length - 1].toDate()]);
        }
    }, [dateString, onChangeDate, getDateRange]);
    var getCurrentDate = React__default.useCallback(function (page) {
        return targetDate.add(modeToNum(mode, targetDate, page), 'day');
    }, [mode, targetDate]);
    var commonProps = {
        cellHeight: cellHeight,
        dateRange: getDateRange(targetDate),
        mode: mode,
        onPressEvent: onPressEvent,
        hideHours: hideHours,
        showWeekNumber: showWeekNumber,
    };
    if (mode === 'month') {
        var headerProps_1 = {
            style: headerContainerStyle,
            headerContainerAccessibilityProps: headerContainerAccessibilityProps,
            locale: locale,
            weekStartsOn: weekStartsOn,
            headerContentStyle: headerContentStyle,
            headerCellAccessibilityProps: headerCellAccessibilityProps,
            dayHeaderStyle: dayHeaderStyle,
            dayHeaderHighlightColor: dayHeaderHighlightColor,
            weekDayHeaderHighlightColor: weekDayHeaderHighlightColor,
            showAllDayEventCell: showAllDayEventCell,
            showWeekNumber: showWeekNumber,
            weekNumberPrefix: weekNumberPrefix,
        };
        return (React__default.createElement(InfinitePager, { ref: calendarRef, style: { flex: 1 }, pageWrapperStyle: { flex: 1 }, renderPage: function (_a) {
                var index = _a.index;
                return (React__default.createElement(React__default.Fragment, null,
                    React__default.createElement(HeaderComponentForMonthView, __assign({}, headerProps_1, { dateRange: getDateRange(getCurrentDate(index)) })),
                    React__default.createElement(CalendarBodyForMonthView, __assign({}, commonProps, { style: bodyContainerStyle, containerHeight: height, events: __spreadArray(__spreadArray([], daytimeEvents, true), allDayEvents, true), eventCellStyle: eventCellStyle, eventCellAccessibilityProps: eventCellAccessibilityProps, calendarCellStyle: calendarCellStyle, calendarCellAccessibilityProps: calendarCellAccessibilityProps, calendarCellAccessibilityPropsForMonthView: calendarCellAccessibilityPropsForMonthView, calendarCellTextStyle: calendarCellTextStyle, weekStartsOn: weekStartsOn, hideNowIndicator: hideNowIndicator, showAdjacentMonths: showAdjacentMonths, onLongPressCell: onLongPressCell, onPressCell: function (date) {
                            var _a;
                            onPressCell === null || onPressCell === void 0 ? void 0 : onPressCell(date);
                            (_a = calendarRef.current) === null || _a === void 0 ? void 0 : _a.setPage(0, { animated: true });
                        }, onPressDateHeader: onPressDateHeader, onPressEvent: onPressEvent, renderEvent: renderEvent, targetDate: getCurrentDate(index), maxVisibleEventCount: maxVisibleEventCount, eventMinHeightForMonthView: eventMinHeightForMonthView, sortedMonthView: sortedMonthView, moreLabel: moreLabel, onPressMoreLabel: onPressMoreLabel, renderCustomDateForMonth: renderCustomDateForMonth, disableMonthEventCellPress: disableMonthEventCellPress }))));
            }, onPageChange: function (page) { return onSwipeEnd === null || onSwipeEnd === void 0 ? void 0 : onSwipeEnd(getCurrentDate(page).toDate()); }, pageBuffer: 2 }));
    }
    var headerProps = __assign(__assign({}, commonProps), { style: headerContainerStyle, headerContainerAccessibilityProps: headerContainerAccessibilityProps, locale: locale, allDayEventCellStyle: allDayEventCellStyle, allDayEventCellTextColor: allDayEventCellTextColor, allDayEvents: allDayEvents, allDayEventCellAccessibilityProps: allDayEventCellAccessibilityProps, onPressDateHeader: onPressDateHeader, activeDate: activeDate, headerContentStyle: headerContentStyle, headerCellAccessibilityProps: headerCellAccessibilityProps, dayHeaderStyle: dayHeaderStyle, dayHeaderHighlightColor: dayHeaderHighlightColor, weekDayHeaderHighlightColor: weekDayHeaderHighlightColor, showAllDayEventCell: showAllDayEventCell, weekNumberPrefix: weekNumberPrefix });
    if (mode === 'schedule') {
        return (React__default.createElement(Schedule, __assign({ events: __spreadArray(__spreadArray([], daytimeEvents, true), allDayEvents, true) }, headerProps, { style: bodyContainerStyle, containerHeight: height, eventCellStyle: eventCellStyle, calendarCellStyle: calendarCellStyle, calendarCellAccessibilityProps: calendarCellAccessibilityProps, hideNowIndicator: hideNowIndicator, overlapOffset: overlapOffset, scrollOffsetMinutes: scrollOffsetMinutes, ampm: ampm, showTime: showTime, onLongPressCell: onLongPressCell, onPressCell: onPressCell, onPressEvent: onPressEvent, onSwipeHorizontal: onSwipeHorizontal, renderEvent: renderEvent, headerComponent: headerComponent, headerComponentStyle: headerComponentStyle, hourStyle: hourStyle, isEventOrderingEnabled: isEventOrderingEnabled, showVerticalScrollIndicator: showVerticalScrollIndicator, itemSeparatorComponent: itemSeparatorComponent, scheduleMonthSeparatorStyle: scheduleMonthSeparatorStyle })));
    }
    return (React__default.createElement(InfinitePager, { ref: calendarRef, renderPage: function (_a) {
            var index = _a.index;
            return (React__default.createElement(React__default.Fragment, null,
                React__default.createElement(HeaderComponent, __assign({}, headerProps, { dateRange: getDateRange(getCurrentDate(index)) })),
                React__default.createElement(CalendarBody, __assign({}, commonProps, { dateRange: getDateRange(getCurrentDate(index)), style: bodyContainerStyle, containerHeight: height, events: daytimeEvents, eventCellStyle: eventCellStyle, eventCellAccessibilityProps: eventCellAccessibilityProps, eventCellTextColor: eventCellTextColor, calendarCellStyle: calendarCellStyle, calendarCellAccessibilityProps: calendarCellAccessibilityProps, hideNowIndicator: hideNowIndicator, overlapOffset: overlapOffset, scrollOffsetMinutes: scrollOffsetMinutes, ampm: ampm, minHour: minHour, maxHour: maxHour, showTime: showTime, onLongPressCell: onLongPressCell, onPressCell: function (date) {
                        var _a;
                        onPressCell === null || onPressCell === void 0 ? void 0 : onPressCell(date);
                        if (mode !== 'day') {
                            (_a = calendarRef.current) === null || _a === void 0 ? void 0 : _a.setPage(0, { animated: true });
                        }
                    }, onPressEvent: onPressEvent, renderEvent: renderEvent, headerComponent: headerComponent, headerComponentStyle: headerComponentStyle, hourStyle: hourStyle, isEventOrderingEnabled: isEventOrderingEnabled, showVerticalScrollIndicator: showVerticalScrollIndicator, enrichedEventsByDate: enrichedEventsByDate, enableEnrichedEvents: enableEnrichedEvents, eventsAreSorted: eventsAreSorted, timeslots: timeslots, hourComponent: hourComponent }))));
        }, onPageChange: function (page) { return onSwipeEnd === null || onSwipeEnd === void 0 ? void 0 : onSwipeEnd(getCurrentDate(page).toDate()); }, pageBuffer: 2 }));
}
var CalendarContainer = typedMemo(_CalendarContainer);

dayjs.extend(isBetween);
function _Calendar(_a) {
    var _b = _a.theme, theme = _b === void 0 ? defaultTheme : _b, isRTL = _a.isRTL, props = __rest(_a, ["theme", "isRTL"]);
    var _theme = deepMerge(defaultTheme, theme);
    // TODO: Old prop support. This should be included in custom theme itself.
    if (isRTL !== undefined) {
        _theme.isRTL = isRTL;
    }
    return (React__default.createElement(ThemeContext.Provider, { value: _theme },
        React__default.createElement(CalendarContainer, __assign({}, props))));
}
var Calendar = typedMemo(_Calendar);

dayjs.extend(duration);
dayjs.extend(isBetween);
dayjs.extend(isoWeek);

export { Calendar, CalendarBody, CalendarBodyForMonthView, CalendarEvent, CalendarEventForMonthView, CalendarHeader, CalendarHeaderForMonthView, DAY_MINUTES, DefaultCalendarEventRenderer, HOUR_GUIDE_WIDTH, MIN_HEIGHT, OVERLAP_OFFSET, OVERLAP_PADDING, SIMPLE_DATE_FORMAT, ThemeContext, deepMerge, defaultTheme, enrichEvents, eventCellCss, formatHour, formatStartEnd, getCountOfEventsAtEvent, getDatesInMonth, getDatesInNextCustomDays, getDatesInNextOneDay, getDatesInNextThreeDays, getDatesInWeek, getEventSpanningInfo, getOrderOfEvent, getRelativeTopInDay, getStyleForOverlappingEvent, getWeeksWithAdjacentMonths, isAllDayEvent, isToday, modeToNum, objHasContent, stringHasContent, todayInMinutes, typedMemo, u, useTheme };
//# sourceMappingURL=index.es.js.map
