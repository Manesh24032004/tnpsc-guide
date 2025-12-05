import { useState } from 'react';
import { Menu, Search, GraduationCap, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Link, useLocation } from 'react-router-dom';

const navigationItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/ai-chat', label: 'TNPSC Wizard AI', icon: '🤖' },
  { href: '/tirukural', label: 'திருக்குறள்', icon: '📜' },
  { href: '/notes', label: 'Study Notes', icon: '📔' },
  { href: '/poets', label: 'தமிழ் அறிஞர்கள்', icon: '👤' },
  { href: '/about-tnpsc', label: 'About TNPSC', icon: 'ℹ️' },
  { href: '/admin', label: 'Admin Login', icon: '⚙️' },
];

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <nav className="bg-gradient-primary border-b-4 border-secondary sticky top-0 z-50 shadow-elegant">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="secondary" 
                size="default" 
                className="font-semibold shadow-soft hover:shadow-elegant transition-all duration-300 h-10 w-10 px-0"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <div className="flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=100&h=100&fit=crop" 
                    alt="TNPSC Logo" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <SheetTitle className="text-primary text-xl font-bold">
                    TNPSC Wizard
                  </SheetTitle>
                </div>
                <SheetDescription>
                  Quick access to all learning resources
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-3">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-gradient-secondary hover:shadow-soft ${
                      location.pathname === item.href 
                        ? 'bg-primary text-primary-foreground shadow-soft' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* Brand */}
          <Link 
            to="/" 
            className="text-primary-foreground text-3xl font-bold hover:scale-105 transition-transform duration-300 flex items-center gap-2"
          >
            <GraduationCap className="h-8 w-8" />
            <span className="hidden sm:inline">TNPSC Wizard</span>
            <span className="sm:hidden">TNPSC Wizard</span>
          </Link>

          {/* Search Bar and Notification */}
          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="relative w-48">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 text-sm h-10 bg-card border-2 border-accent/30 focus:border-secondary rounded-full transition-all duration-300 focus:shadow-soft"
              />
            </form>
            <Button variant="secondary" size="default" className="h-10 w-10 px-0 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">3</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};