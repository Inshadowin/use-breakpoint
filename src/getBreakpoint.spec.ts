import { getBreakpoint } from './getBreakpoint';
import { defaultBreakpointsMap } from './compareBreakpoints';

describe('getBreakpoint', () => {
  it('should not break on negative px', () => {
    expect(getBreakpoint(-1)).toBe(undefined);
  });

  it('should not break on 0px', () => {
    expect(getBreakpoint(0)).toBe('xs');
  });

  it('should find first breakpoint', () => {
    expect(getBreakpoint(100)).toBe('xs');
  });

  it('should find last breakpoint', () => {
    expect(getBreakpoint(5000)).toBe('4xl');
  });

  it('should find breakpoint in middle', () => {
    expect(getBreakpoint(1600)).toBe('2xl');
  });

  it('should match by exact value of breakpoint in middle', () => {
    expect(getBreakpoint(1536)).toBe('2xl');
  });

  it('should match by exact value of breakpoint in middle - 1', () => {
    expect(getBreakpoint(1535)).toBe('xl');
  });

  it('should handle no overlap + custom bp', () => {
    expect(
      getBreakpoint(-10, { ...defaultBreakpointsMap, aa: -5, xl: 1280 })
    ).toBe(undefined);
  });

  it('should find overlap with custom bp', () => {
    expect(
      getBreakpoint(-10, { ...defaultBreakpointsMap, aa: -15, xl: 1280 })
    ).toBe('aa');
  });

  it('should handle wrong order of breakpoints', () => {
    expect(
      getBreakpoint(1535, { ...defaultBreakpointsMap, xl: 1280, xs: 0 })
    ).toBe('xl');
  });
});
