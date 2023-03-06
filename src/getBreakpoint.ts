import { defaultBreakpointsMap } from './compareBreakpoints';
import type { BreakpointsMapType } from './types';

export const getBreakpoint = <T extends string>(
  width: number,
  breakpointsMap: BreakpointsMapType<T> = defaultBreakpointsMap as BreakpointsMapType<T>
): T => {
  let resPoint: T = undefined;

  Object.entries(breakpointsMap).forEach(([point, pointWidth]: [T, number]) => {
    const resWidth = breakpointsMap[resPoint];

    if (
      resPoint === undefined ||
      (width >= pointWidth && resWidth < pointWidth) ||
      (width < pointWidth && resWidth >= pointWidth)
    ) {
      resPoint = point;
    }
  });

  return resPoint;
};
