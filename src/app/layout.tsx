import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
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
          colorPrimary: '#3B82F6', // Blue-500
          colorBackground: '#ffffff',
          colorInputBackground: '#f8fafc',
          colorInputText: '#1f2937',
          colorText: '#1f2937',
          colorTextSecondary: '#6b7280',
          borderRadius: '1rem',
          fontFamily: 'Inter, system-ui, sans-serif',
        },
        elements: {
          formButtonPrimary: 'bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition-all duration-300 shadow-lg',
          card: 'shadow-2xl border border-white/20 backdrop-blur-lg bg-white/90',
          headerTitle: 'font-cute bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
          footerActionLink: 'text-blue-600 hover:text-purple-600 transition-colors duration-300',
          socialButtonsBlockButton: 'border-2 border-gray-200 hover:border-blue-300 transition-all duration-300',
          dividerLine: 'bg-gradient-to-r from-transparent via-gray-300 to-transparent',
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
        <body className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-x-hidden`}>
          {/* Animated Background Elements */}
          <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
            <div className="absolute top-[10%] left-[5%] text-[120px] text-blue-500 animate-bounce" style={{ animationDelay: '0s', animationDuration: '6s' }}>🏋️</div>
            <div className="absolute top-[60%] right-[8%] text-[120px] text-purple-500 animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}>💪</div>
            <div className="absolute bottom-[20%] left-[15%] text-[120px] text-blue-500 animate-bounce" style={{ animationDelay: '4s', animationDuration: '6s' }}>🏃</div>
            <div className="absolute top-[30%] right-[25%] text-[120px] text-indigo-500 animate-pulse" style={{ animationDelay: '1s', animationDuration: '6s' }}>🚴</div>
            <div className="absolute bottom-[40%] right-[40%] text-[120px] text-sky-500 animate-bounce" style={{ animationDelay: '3s', animationDuration: '6s' }}>🎯</div>
          </div>

          {/* Floating Bubbles */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-20 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
            <div className="absolute top-40 right-20 w-12 h-12 bg-purple-200 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
            <div className="absolute bottom-40 left-20 w-20 h-20 bg-indigo-200 rounded-full opacity-15 animate-bounce" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
            <div className="absolute bottom-20 right-10 w-14 h-14 bg-sky-200 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '3s', animationDuration: '4s' }}></div>
            <div className="absolute top-1/2 left-1/3 w-18 h-18 bg-blue-300 rounded-full opacity-10 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '5s' }}></div>
          </div>
         
          {/* Main Layout Structure */}
          <div className="min-h-screen flex flex-col relative z-10">
            {/* Header - Always visible */}
            <Header />
           
            {/* Main Content */}
            <main className="flex-1 relative">
              {/* Content */}
              <div className="relative z-10">
                {children}
              </div>
            </main>
           
            {/* Footer - Always visible */}
            <Footer />
          </div>
         
          {/* Global Loading Overlay */}
          <div id="loading-overlay" className="fixed inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 opacity-0 pointer-events-none transition-opacity duration-500 z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
              <p className="text-white font-semibold text-xl" style={{ fontFamily: 'Comic Neue, cursive' }}>
                Loading your fitness journey... 🚀
              </p>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}