import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'GymMy - Your Cute AI Fitness Trainer',
  description: 'Transform your fitness journey with personalized workouts, nutrition plans, and gamified achievements. Your adorable AI trainer is here to make fitness fun!',
  keywords: 'fitness, AI trainer, workouts, nutrition, health, gamification',
  authors: [{ name: 'Shubham' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#FF69B4',
          colorBackground: '#ffffff',
          colorInputBackground: '#f8fafc',
          colorInputText: '#1f2937',
          colorText: '#1f2937',
          colorTextSecondary: '#6b7280',
          borderRadius: '0.75rem',
          fontFamily: 'Inter, system-ui, sans-serif',
        },
        elements: {
          formButtonPrimary: 'bg-gradient-to-r from-cute-pink to-cute-peach hover:scale-105 transition-all duration-300',
          card: 'shadow-2xl',
          headerTitle: 'font-cute',
          footerActionLink: 'text-cute-pink hover:text-cute-sky',
        },
      }}
    >
      <html lang="en">
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-50 to-slate-100`}>
          {/* Navigation Sidebar - Only for signed-in users on dashboard pages */}
          <Navigation />
          
          {/* Main Layout Structure */}
          <div className="min-h-screen flex flex-col">
            {/* Header - Always visible */}
            <Header />
           
            {/* Main Content */}
            <main className="flex-1 relative">
              {/* Background Elements - Only for non-landing pages */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-10 w-32 h-32 bg-cute-pink rounded-full opacity-5 animate-pulse-slow"></div>
                <div className="absolute bottom-20 left-10 w-24 h-24 bg-cute-lavender rounded-full opacity-10 animate-bounce-soft"></div>
                <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-cute-mint rounded-full opacity-5 animate-wiggle"></div>
              </div>
             
              {/* Content */}
              <div className="relative z-10">
                {children}
              </div>
            </main>
           
            {/* Footer - Always visible */}
            <Footer />
          </div>
         
          {/* Global Loading Overlay */}
          <div id="loading-overlay" className="fixed inset-0 bg-gradient-to-br from-cute-pink via-cute-peach to-cute-lavender opacity-0 pointer-events-none transition-opacity duration-500 z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
              <p className="text-white font-cute text-xl">Loading your fitness journey... 🚀</p>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}