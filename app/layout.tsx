import './globals.css'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import {Roboto_Mono} from 'next/font/google'
import ProviderSession from './actions/ProviderSession'
import { Session } from 'next-auth'
import ToastProvider from './actions/ToastProvider'
import ReduxProvider from './redux/ReduxProvider'
import CreatePostModal from '@/app/components/modals/FieldModal/CreatePostModal'
import SideBar from './components/Navbar/SideBar'


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
const roboto=Roboto_Mono({subsets:[ "cyrillic", "cyrillic-ext"]})
export default function RootLayout({
  children,session
}: {
  children: React.ReactNode,
  session:Session
}) {
  console.log(roboto.className)
  return (
    <html lang="en">
      <body className={`${roboto.className} font-sans`}>
        <ReduxProvider>
        
        <ProviderSession session={session} >
        <ToastProvider/>
          <CreatePostModal/>
        {children}
        </ProviderSession>
        </ReduxProvider>
      </body>
    </html>
  );
}
