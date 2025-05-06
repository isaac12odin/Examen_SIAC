// pages/index.tsx
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/login',
    permanent: false,      
  },
});

export default function Home() {
  return null; 
}
