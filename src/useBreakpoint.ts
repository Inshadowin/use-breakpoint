import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';

import { getBreakpoint } from './getBreakpoint';
import { compareBreakpoints } from './compareBreakpoints';
import { defaultBreakpointsMap } from './compareBreakpoints';
import type { Breakpoint, BreakpointsMapType } from './types';

export const useCurrentBreakpoint = <T extends string = Breakpoint>(
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

export const useBreakpoint = <T extends string = Breakpoint>(
  point: T,
  breakpointsMap?: BreakpointsMapType<T>
) => {
  const currentBp = useCurrentBreakpoint<T>(
    (defaultBreakpointsMap as BreakpointsMapType<T>) ?? breakpointsMap
  );

  return compareBreakpoints<T>(point, currentBp, breakpointsMap);
};

export const useBreakpointFits = <T extends string = Breakpoint>(
  point: T,
  breakpointsMap?: BreakpointsMapType<T>
) => {
  return useBreakpoint(point, breakpointsMap) === 'fits';
};

export const useBreakpointChecker = <T extends string = Breakpoint>(
  breakpointsMap?: BreakpointsMapType<T>
) => {
  const current = useCurrentBreakpoint<T>(breakpointsMap);
  const checker = useMemo(() => {
    return new Proxy<{ [x in T]: boolean }>({} as any, {
      get: (_target, key: T) => compareBreakpoints(key, current) === 'fits',
    });
  }, [current]);

  return checker;
};
