'use client';

import { LazyMotion, domAnimation } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Loads framer-motion's animation features once, lazily. Components should
 * import { m } from 'framer-motion' (not motion) so the full runtime stays
 * out of every chunk. domAnimation (not domMax): the site uses no drag or
 * layout animations, and domMax ships both.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
