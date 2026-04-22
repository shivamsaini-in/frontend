'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import { brand } from '@/config/theme-config/tokens';

NProgress.configure({ showSpinner: false, speed: 300, minimum: 0.08 });

export function TopLoadingBar() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      NProgress.done();
      prevPath.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => NProgress.done(), 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  /* Colors from theme.config.json → brand.primary / brand.accent */
  return (
    <style>{`
      #nprogress .bar {
        background: linear-gradient(90deg, ${brand.primary}, ${brand.accent});
        height: 2.5px;
        box-shadow: 0 0 8px ${brand.primary}, 0 0 4px ${brand.accent};
      }
      #nprogress .peg {
        box-shadow: 0 0 10px ${brand.primary}, 0 0 5px ${brand.primary};
      }
    `}</style>
  );
}
