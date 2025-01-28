import { useState } from 'react';
import { Cloud, Search, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/components/theme-provider';

interface NavbarProps {
  onCityChange: (city: string) => void;
}

export default function Navbar({ onCityChange }: NavbarProps) {
  const [searchInput, setSearchInput] = useState('');
  const { theme, setTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onCityChange(searchInput);
      setSearchInput('');
    }
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Cloud className="h-6 w-6" />
          <a href="/"><span className="text-xl font-bold">HyperClima</span></a>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for a city..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-8"
            />
          </div>
        </form>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
      </div>
    </nav>
  );
}