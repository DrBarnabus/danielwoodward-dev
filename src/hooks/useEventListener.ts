import { useEffect, useRef } from 'react';

type EventMap = HTMLElementEventMap & DocumentEventMap & WindowEventMap & MediaQueryListEventMap;

export function useEventListener<K extends keyof EventMap>(
  targetElement: HTMLElement | Window | Document | MediaQueryList | null,
  type: K,
  listener: (event: EventMap[K]) => void
) {
  const listenerRef = useRef(listener);

  useEffect(() => {
    listenerRef.current = listener;
  }, [listener]);

  useEffect(() => {
    if (targetElement == null) {
      return;
    }

    const eventListener = (e: Event) => listenerRef.current(e as EventMap[K]);
    targetElement.addEventListener(type, eventListener);

    return () => targetElement.removeEventListener(type, eventListener);
  }, [type, targetElement]);
}
