import type { Breakpoint, BreakpointsMapType } from './types';

export const defaultBreakpointsMap: BreakpointsMapType = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
  '4xl': 2560,
};

export const compareBreakpoints = (
  compare: Breakpoint,
  current: Breakpoint
) => {
  const currentSize = defaultBreakpointsMap[current];
  const compareSize = defaultBreakpointsMap[compare];

  return currentSize >= compareSize ? 'fits' : 'smaller';
};
