'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';

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

  return (
    <style>{`
      #nprogress .bar {
        background: linear-gradient(90deg, #FF4D1C, #FFAD0D);
        height: 2.5px;
        box-shadow: 0 0 8px #FF4D1C, 0 0 4px #FFAD0D;
      }
      #nprogress .peg {
        box-shadow: 0 0 10px #FF4D1C, 0 0 5px #FF4D1C;
      }
    `}</style>
  );
}
