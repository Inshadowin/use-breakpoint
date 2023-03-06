import { defaultBreakpointsMap } from './compareBreakpoints';
import type { BreakpointsMapType } from './types';

export const getBreakpoint = <T extends string>(
  width: number,
  breakpointsMap: BreakpointsMapType<T> = defaultBreakpointsMap as BreakpointsMapType<T>
): T => {
  let resPoint: T = undefined;
  let resWidth = undefined;

  Object.entries(breakpointsMap).forEach(([point, pointWidth]: [T, number]) => {
    if (
      resWidth === undefined ||
      (width >= pointWidth && resWidth < pointWidth)
    ) {
      resWidth = pointWidth;
      resPoint = point;
    }
  });

  return resPoint;
};
