# use-breakpoint

Package that allows to easily work app breakpoints

Example

```tsx
const showMenu = useBreakpoint('md') === 'fits';
const showMobileMenu = useBreakpoint('md') === 'smaller';
```

Default Breakpoints

```ts
export const defaultBreakpointsMap: BreakpointsMapType = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
  '4xl': 2560,
};
```

You can override

```tsx
import { defaultBreakpointsMap as defMap } from 'use-breakpoint';

const showMenu = useBreakpoint('md', { ...defMap, '5xl': 3400 }) === 'fits';
```
