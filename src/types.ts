export declare type Breakpoint =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl';

export type BreakpointsMapType<T extends string = Breakpoint> = {
  [x in T]: number;
};
