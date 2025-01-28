import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/Navbar';
import WeatherDashboard from '@/components/WeatherDashboard';
import { Toaster } from '@/components/ui/toaster';
import { Cloud, Search } from 'lucide-react';


function App() {
  const [city, setCity] = useState<string>('');

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <Navbar onCityChange={setCity} />
        <main className="container mx-auto px-4 py-8">
          {city && <WeatherDashboard city={city} />}
          {!city && (
            <div 
              className="min-h-[80vh] relative rounded-lg overflow-hidden"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2000&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative h-full flex flex-col items-center justify-center text-center p-8 space-y-8 animate-fade-in">
                <Cloud className="h-20 w-20 text-purple-500 animate-bounce" />
                
                  <h1 className="text-6xl font-bold text-white animate-slide-up">
                  HyperClima
                </h1>
                
                <p className="text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-200">
                  Your window to weather worldwide. Get real-time forecasts, hourly updates, 
                  and detailed insights about temperature, humidity, and wind conditions 
                  for any city around the globe.
                </p>
                <div className="flex items-center gap-2 text-gray-300 animate-slide-up delay-300">
                  <Search className="h-5 w-5" />
                  <span>Start by searching for your city above</span>
                </div>
              </div>
            </div>
          )}
        </main>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;

