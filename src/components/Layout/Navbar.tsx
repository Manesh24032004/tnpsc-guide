import { useState } from 'react';
import { Menu, Search, GraduationCap } from 'lucide-react';
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
  { href: '/uploads', label: 'Upload PDFs', icon: '📤' },
  { href: '/model-papers', label: 'Model Question Papers', icon: '📋' },
  { href: '/tirukural', label: 'திருக்குறள்', icon: '📜' },
  { href: '/tamil-syllabus', label: 'Tamil Syllabus Topics', icon: '📝' },
  { href: '/general-studies', label: 'General Studies Syllabus', icon: '🌟' },
  { href: '/maths-syllabus', label: 'Maths Syllabus', icon: '🔢' },
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
                size="sm" 
                className="font-semibold shadow-soft hover:shadow-elegant transition-all duration-300"
              >
                <Menu className="h-4 w-4 mr-2" />
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle className="text-primary text-xl font-bold">
                  Navigation Menu
                </SheetTitle>
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
            className="text-primary-foreground text-xl font-bold hover:scale-105 transition-transform duration-300 flex items-center gap-2"
          >
            <GraduationCap className="h-6 w-6" />
            <span className="hidden sm:inline">TNPSC wizard: Your magical guide to TNPSC success</span>
            <span className="sm:hidden">TNPSC wizard</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-2 border-accent/30 focus:border-secondary rounded-full transition-all duration-300 focus:shadow-soft"
            />
          </form>
        </div>
      </div>
    </nav>
  );
};