import { defaultBreakpointsMap } from './compareBreakpoints';
import type { BreakpointsMapType } from './types';

export const getBreakpoint = <T extends string>(
  width: number,
  breakpointsMap: BreakpointsMapType<T> = defaultBreakpointsMap as BreakpointsMapType<T>
): T => {
  let minPoint: T = undefined;
  let minPointWidth: number = undefined;
  Object.entries(breakpointsMap).forEach(([point, pointWidth]: [T, number]) => {
    if (!minPoint) {
      minPoint = point;
      minPointWidth = pointWidth;

      return;
    }

    minPoint = pointWidth < minPointWidth ? point : minPoint;
  });

  let resPoint: T = minPoint;
  let resWidth = minPointWidth;
  Object.entries(breakpointsMap).forEach(([point, pointWidth]: [T, number]) => {
    if (width >= pointWidth && resWidth < pointWidth) {
      resWidth = pointWidth;
      resPoint = point;
    }
  });

  return resPoint ?? minPoint;
};
