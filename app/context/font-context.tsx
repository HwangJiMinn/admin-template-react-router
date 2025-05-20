// ~/context/font-context.tsx
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { fonts } from '~/config/fonts';

type Font = (typeof fonts)[number];
type FontContextType = [Font | null, Dispatch<SetStateAction<Font | null>>];

const FontContext = createContext<FontContextType | undefined>(undefined);
FontContext.displayName = 'FontContext';

function withoutTransition(callback: () => void) {
  const css = document.createElement('style');
  css.appendChild(
    document.createTextNode(
      `* {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        -ms-transition: none !important;
        transition: none !important;
      }`,
    ),
  );
  document.head.appendChild(css);
  callback();
  setTimeout(() => {
    // force browser to redraw
    const _ = window.getComputedStyle(css).transition;
    document.head.removeChild(css);
  }, 0);
}

export function useCorrectCssTransition({ disableTransitions = false } = {}) {
  return useCallback(
    (callback: () => void) => {
      disableTransitions ? withoutTransition(callback) : callback();
    },
    [disableTransitions],
  );
}

export function useBroadcastChannel<T = string>(
  channelName: string,
  onMessage?: (event: MessageEvent<T>) => void,
): (data: T) => void {
  const channelRef = useRef<BroadcastChannel | null>(
    typeof window !== 'undefined' && 'BroadcastChannel' in window
      ? new BroadcastChannel(`${channelName}-channel`)
      : null,
  );

  useEffect(() => {
    const channel = channelRef.current;
    if (channel && onMessage) {
      channel.addEventListener('message', onMessage);
      return () => channel.removeEventListener('message', onMessage);
    }
  }, [onMessage]);

  return useCallback((data: T) => {
    channelRef.current?.postMessage(data);
  }, []);
}

export type FontProviderProps = {
  children: ReactNode;
  specifiedFont: Font;
  fontAction: string;
  disableTransitionOnFontChange?: boolean;
};

export function FontProvider({
  children,
  specifiedFont,
  fontAction,
  disableTransitionOnFontChange = false,
}: FontProviderProps) {
  const ensureCorrectTransition = useCorrectCssTransition({
    disableTransitions: disableTransitionOnFontChange,
  });

  const [font, setFont] = useState<Font | null>(() => {
    if (typeof window !== 'object') return specifiedFont;
    const saved = localStorage.getItem('font');
    return fonts.includes(saved as Font) ? (saved as Font) : specifiedFont;
  });

  const broadcastFontChange = useBroadcastChannel<Font>('font-change', (e) => {
    ensureCorrectTransition(() => setFont(e.data));
  });

  const mountRun = useRef(false);

  useEffect(() => {
    if (!font || !mountRun.current) {
      mountRun.current = true;
      return;
    }

    localStorage.setItem('font', font);
    fetch(fontAction, {
      method: 'POST',
      body: JSON.stringify({ font }),
    });

    ensureCorrectTransition(() => {
      const root = document.documentElement;
      root.classList.forEach((cls) => {
        if (cls.startsWith('font-')) root.classList.remove(cls);
      });
      root.classList.add(`font-${font}`);
      broadcastFontChange(font);
    });
  }, [font]);

  return <FontContext.Provider value={[font, setFont]}>{children}</FontContext.Provider>;
}

export function useFont(): FontContextType {
  const context = use(FontContext);
  if (!context) throw new Error('useFont must be used within a FontProvider');
  return context;
}

export function isFont(value: unknown): value is Font {
  return typeof value === 'string' && fonts.includes(value as Font);
}
