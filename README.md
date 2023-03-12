# use-react-breakpoint

Package that allows to easily work app breakpoints
It provides couple of hooks to work with breakpoints

## Hooks

### useBreakpoint

hook that accepts `breakpoint` name and returns `fits` or `smaller`

```tsx
import { useBreakpoint } from 'use-react-breakpoint';

const showMenu = useBreakpoint('md') === 'fits';
const showMobileMenu = useBreakpoint('md') === 'smaller';
```

### useBreakpointFits

Same as `useBreakpoint`, but returns `true` if your screen size is greater of equal to breakpoint size

```tsx
import { useBreakpointFits } from 'use-react-breakpoint';

const showMenu = useBreakpointFits('md');
const showMobileMenu = !useBreakpointFits('md');
```

### useCurrentBreakpoint

Just a simple hook that returns current screen breakpoint

```tsx
import { useCurrentBreakpoint } from 'use-react-breakpoint';

const breakpoint = useCurrentBreakpoint(); // 'md', 'lg', 'xl', etc.
```

## Utilities:

Exposing some of the useful utils you might need

### Default Breakpoints

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

### compareBreakpoints

Utility that return `fits` or `smaller`
First param comparator, second param - comparable. So result defines if 2nd parameter is bigger or smaller than 1st

```js
compareBreakpoints('lg', 'md') === 'smaller';
```

## Overrides

You can override defaultBreakpointsMap with anything else
all hooks and utils accept it as last param

```tsx
import { defaultBreakpointsMap as defMap } from 'use-react-breakpoint';

const showMenu = useBreakpoint('md', { ...defMap, '5xl': 3400 }) === 'fits';

const isHugeScreen = useBreakpointFits('5xl', { ...defMap, '5xl': 3400 });

const current = useCurrentBreakpoint({ ...defMap, '5xl': 3400 });

const compare = compareBreakpoints('5xl', 'md', { ...defMap, '5xl': 3400 });
```
