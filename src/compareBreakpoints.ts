import type { Breakpoint, BreakpointsMapType } from './types';

export const defaultBreakpointsMap: BreakpointsMapType<any> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
  '4xl': 2560,
};

export const compareBreakpoints = <T extends string = Breakpoint>(
  compare: T,
  current?: T,
  breakpointsMap = defaultBreakpointsMap
) => {
  const currentSize = breakpointsMap[current] ?? 0;
  const compareSize = breakpointsMap[compare] ?? 0;

  return currentSize >= compareSize ? 'fits' : 'smaller';
};
