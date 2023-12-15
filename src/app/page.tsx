'use client';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation/Navigation';
import Hero from '@/components/Hero/Hero';
import Loading from '@/components/Loading/Loading';
import './globals.css';

const loaderDuration = 1500;

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), loaderDuration + 750);
  }, []);

  return (
    <>
      {loading ?
        <Loading duration={loaderDuration} /> :
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden">
          <Navigation />
          <Hero />
        </main>
      }
    </>
  )
};
