# use-react-breakpoint

Package that allows to easily work app breakpoints

Example

```tsx
import { useBreakpoint } from 'use-react-breakpoint';

const showMenu = useBreakpoint('md') === 'fits';
const showMobileMenu = useBreakpoint('md') === 'smaller';
```

Or simpler version

```tsx
import { useBreakpointFits } from 'use-react-breakpoint';

const showMenu = useBreakpointFits('md');
const showMobileMenu = !useBreakpointFits('md');
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

You can override defaultBreakpointsMap with anything else

```tsx
import { defaultBreakpointsMap as defMap } from 'use-react-breakpoint';

const showMenu = useBreakpoint('md', { ...defMap, '5xl': 3400 }) === 'fits';
```
