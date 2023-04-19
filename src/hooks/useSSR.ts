import { useEffect, useState } from 'react';

const isBrowser = () => Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);

export function useSSR() {
  const [browser, setBrowser] = useState(false);

  useEffect(() => {
    setBrowser(isBrowser());
  }, []);

  return {
    isClient: browser,
    isServer: !browser,
    windowOrNull: browser ? window : null,
    documentOrNull: browser ? document : null,
  };
}
