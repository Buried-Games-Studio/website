'use client';

import { LazyMotion, domMax } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Loads framer-motion's animation features once, lazily. Components should
 * import { m } from 'framer-motion' (not motion) so the full runtime stays
 * out of every chunk.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domMax}>{children}</LazyMotion>;
}
