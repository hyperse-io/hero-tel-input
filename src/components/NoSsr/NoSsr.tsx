import type { ReactNode } from 'react';
import { useEffect, useLayoutEffect, useState } from 'react';

const useEnhancedEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type NoSsrProps = {
  /**
   * You can wrap a node.
   */
  children: ReactNode;
  /**
   * If `true`, the component will not only prevent server-side rendering.
   * It will also defer the rendering of the children into a different screen frame.
   * @default false
   */
  defer?: boolean;
  /**
   * The fallback content to display.
   * @default null
   */
  fallback?: ReactNode;
};

export function NoSsr(props: NoSsrProps) {
  const { children, defer = false, fallback = null } = props;
  const [mountedState, setMountedState] = useState(false);
  useEnhancedEffect(() => {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);

  useEffect(() => {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]);

  return <>{mountedState ? children : fallback}</>;
}
