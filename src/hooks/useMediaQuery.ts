import { useEffect, useState } from 'react';
import { useEventListener } from './useEventListener';

export function useMediaQuery(query: string, defaultValue: boolean) {
  const [isMatch, setIsMatch] = useState(defaultValue);
  const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | null>(null);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    if (mediaQueryList.media === query) {
      setMediaQueryList(mediaQueryList);
      setIsMatch(mediaQueryList.matches);
    }
  }, [query]);

  useEventListener(mediaQueryList, 'change', (e) => {
    setIsMatch(e.matches);
  });

  return isMatch;
}
