import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';

import { getBreakpoint } from './getBreakpoint';
import { compareBreakpoints } from './compareBreakpoints';
import { defaultBreakpointsMap as map } from './compareBreakpoints';
import type { Breakpoint, BreakpointsMapType } from './types';

export const useCurrentBreakpoint = <T extends Breakpoint = Breakpoint>(
  breakpointsMap?: BreakpointsMapType<T>
): T => {
  const [, startTransition] = useTransition();
  const checkBreakpointRef = useRef(() => {
    return getBreakpoint<T>(window.innerWidth, breakpointsMap);
  });
  const [breakpoint, setBreakpoint] = useState<T>(checkBreakpointRef.current);

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

export const useBreakpoint = <T extends Breakpoint = Breakpoint>(
  point: T,
  breakpointsMap?: BreakpointsMapType<T>
) => {
  const currentBp = useCurrentBreakpoint<T>(breakpointsMap ?? map);

  return compareBreakpoints<T>(point, currentBp, breakpointsMap);
};

export const useBreakpointFits = <T extends Breakpoint = Breakpoint>(
  point: T,
  breakpointsMap?: BreakpointsMapType<T>
) => {
  return useBreakpoint<T>(point, breakpointsMap) === 'fits';
};

export const useBreakpointChecker = <T extends Breakpoint = Breakpoint>(
  breakpointsMap?: BreakpointsMapType<T>
): { [x in T]: boolean } => {
  const current = useCurrentBreakpoint<T>(breakpointsMap);
  const checker = useMemo(() => {
    return new Proxy<{ [x in T]: boolean }>({} as { [x in T]: boolean }, {
      get: (_target, key: T) => compareBreakpoints(key, current) === 'fits',
    });
  }, [current]);

  return checker;
};
