# use-url-params

Package that allows to easily work with user settings, storing them to local storage

Pretty simple to use:

```tsx
import { useUserSettings } from 'use-url-params';

const Component = () => {
  const [view, setView] = useUserSettings('compact', 'main_page_view_type');

  return <View type={view} onTypeChange={setView} data={data} />;
};
```

Params as they are

```tsx
type UseUserSettingsType = <T>(
  defaultValue?: T | (() => T),
  key?: string,
  prefix?: string
) => [T, (value: T) => void];
```

Params:

- `defaultValue` - just like `useState` - you can provide with value or with getter function
- `key` - local storage key that will identify the setting
- `prefix` - default = `uus_p_`. if you need to specify prefix for your setting keys. Might be useful if you want to wrap this hook in your own like this:

```tsx
import { useUserSettings } from 'use-url-params';

export const useOurUserSettings = <T,>(
  defaultValue?: T | (() => T),
  key?: string
) => {
  return useUserSettings(defaultValue, key, 'my_project_1');
};
```
