import { useLayoutEffect, useRef, useState } from 'react';

import { compareBreakpoints } from './compareBreakpoints';
import { defaultBreakpointsMap } from './compareBreakpoints';
import type { Breakpoint, BreakpointsMapType } from './types';

const getBreakpoint = (
  breakpointsMap: BreakpointsMapType,
  width: number
): Breakpoint => {
  return (
    Object.entries(breakpointsMap)
      .map(([point, value]) => ({
        value,
        point: point as Breakpoint,
      }))
      .sort((one, two) => (one.value > two.value ? -1 : 1))
      .find(({ value }) => value <= width)?.point ?? 'xs'
  );
};

export const useBreakpoints = (breakpointsMap: BreakpointsMapType) => {
  const checkBreakpointRef = useRef(() => {
    return getBreakpoint(breakpointsMap, window.innerWidth);
  });
  const [breakpoint, setBreakpoint] = useState(checkBreakpointRef.current);

  useLayoutEffect(() => {
    const handleCheck = () => setBreakpoint(checkBreakpointRef.current());

    const observer = new ResizeObserver(handleCheck);
    observer.observe(document.body);

    return () => {
      observer.unobserve(document.body);
    };
  }, []);

  return breakpoint;
};

export const useBreakpoint = (
  point: Breakpoint,
  breakpointsMap = defaultBreakpointsMap
) => {
  const currentBp = useBreakpoints(breakpointsMap);

  return compareBreakpoints(point, currentBp);
};
