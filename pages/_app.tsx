// pages/_app.tsx
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const isAuth = typeof window !== 'undefined' && localStorage.getItem('auth');
    const onLoginPage = router.pathname === '/login';

    if (!isAuth && !onLoginPage) {
      router.replace('/login');
    }
  }, [router.pathname]);

  return <Component {...pageProps} />;
}
