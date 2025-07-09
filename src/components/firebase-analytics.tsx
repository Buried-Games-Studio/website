
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';

export function FirebaseAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (analytics) {
      const url = pathname + searchParams.toString();
      logEvent(analytics, 'page_view', {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
