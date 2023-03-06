import { defaultBreakpointsMap } from './compareBreakpoints';
import type { BreakpointsMapType } from './types';

export const getBreakpoint = <T extends string>(
  width: number,
  breakpointsMap: BreakpointsMapType<T> = defaultBreakpointsMap as BreakpointsMapType<T>
): T => {
  let nextBreakpoint: T | undefined = undefined;
  const breakpoints = Object.keys(breakpointsMap) as T[];

  for (let i = 0; i < breakpoints.length; i++) {
    const breakpoint = breakpoints[i];
    const breakpointWidth = breakpointsMap[breakpoint];

    if (
      breakpointWidth <= width &&
      (!nextBreakpoint || breakpointsMap[nextBreakpoint] < breakpointWidth)
    ) {
      nextBreakpoint = breakpoint;
    }
  }

  return nextBreakpoint;
};
