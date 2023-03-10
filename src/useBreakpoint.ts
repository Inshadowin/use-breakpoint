import { useLayoutEffect, useRef, useState, useTransition } from 'react';

import { getBreakpoint } from './getBreakpoint';
import { compareBreakpoints } from './compareBreakpoints';
import { defaultBreakpointsMap } from './compareBreakpoints';
import type { BreakpointsMapType } from './types';

export const useCurrentBreakpoint = <T extends string>(
  breakpointsMap?: BreakpointsMapType<T>
): T => {
  const [, startTransition] = useTransition();
  const checkBreakpointRef = useRef(() => {
    return getBreakpoint(window.innerWidth, breakpointsMap);
  });
  const [breakpoint, setBreakpoint] = useState(checkBreakpointRef.current);

  useLayoutEffect(() => {
    const handleCheck = () => {
      startTransition(() => setBreakpoint(checkBreakpointRef.current()));
    };

    const observer = new ResizeObserver(handleCheck);
    observer.observe(document.body);

    return () => {
      observer.unobserve(document.body);
    };
  }, []);

  return breakpoint;
};

export const useBreakpoint = <T extends string>(
  point: T,
  breakpointsMap?: BreakpointsMapType<T>
) => {
  const currentBp = useCurrentBreakpoint<T>(
    (defaultBreakpointsMap as BreakpointsMapType<T>) ?? breakpointsMap
  );

  return compareBreakpoints<T>(point, currentBp, breakpointsMap);
};

export const useBreakpointFits = <T extends string>(
  point: T,
  breakpointsMap?: BreakpointsMapType<T>
) => {
  return useBreakpoint(point, breakpointsMap) === 'fits';
};
