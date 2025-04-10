import * as React from 'react';
import { type AccessibilityProps, type TextStyle } from 'react-native';
import type { HourRenderer } from '../interfaces';
interface HourGuideColumnProps {
    cellHeight: number;
    hour: number;
    ampm: boolean;
    hourStyle: TextStyle;
    calendarCellAccessibilityProps?: AccessibilityProps;
    hourComponent?: HourRenderer;
}
export declare const HourGuideColumn: React.MemoExoticComponent<({ cellHeight, hour, ampm, hourStyle, calendarCellAccessibilityProps, hourComponent: HourComponent, }: HourGuideColumnProps) => React.JSX.Element>;
export {};
