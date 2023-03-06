import { compareBreakpoints } from './compareBreakpoints';

describe('compareBreakpoints', () => {
  it('should compare by numbers', () => {
    expect(compareBreakpoints('lg', 'md')).toBe('smaller');
  });

  it('should compare with undefined', () => {
    expect(compareBreakpoints('lg', undefined)).toBe('smaller');
  });
});
