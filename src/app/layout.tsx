import type { Metadata } from 'next'
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google'
import NextAuthProvider from '@/contexts/NextAuthProvider'
import { NotificationProvider } from '../contexts/NotificationContext'
import NotificationBar from '../contexts/NotificationBar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Droppy Ai',
  description: 'Droppy: Dropshipping AI Specialist',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <NextAuthProvider>
      <NotificationProvider>
        <html lang="en">
          <NotificationBar />
          <body className={inter.className}>{children}</body>
        </html>
      </NotificationProvider>
    </NextAuthProvider>
  )
}
