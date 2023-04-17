import Cookies from 'js-cookie';
import { type Dispatch, useCallback, useState } from 'react';

export function useCookie<T extends string>(
  name: string,
  defaultValue: T,
  options?: Cookies.CookieAttributes
): [T, Dispatch<T>, () => void] {
  const [value, setValue] = useState<T>(() => {
    const cookie = Cookies.get(name);
    if (cookie) {
      return cookie as T;
    }

    return defaultValue;
  });

  const updateCookie = useCallback(
    (newValue: T) => {
      Cookies.set(name, newValue, options);
      setValue(newValue);
    },
    [name, options]
  );

  const deleteCookie = useCallback(() => {
    Cookies.remove(name);
    setValue(defaultValue);
  }, [name, defaultValue]);

  return [value, updateCookie, deleteCookie];
}
