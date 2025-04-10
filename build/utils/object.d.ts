import type { TextStyle, ViewStyle } from 'react-native';
import type { DeepPartial } from './utility-types';
export declare function objHasContent(obj: ViewStyle | TextStyle): boolean;
export declare function stringHasContent(string: string): boolean;
export declare function deepMerge<T extends object>(target: T, source: DeepPartial<T>): T;
