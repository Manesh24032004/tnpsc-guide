import { useState, useRef, useEffect } from 'react';
import { Menu, Search, GraduationCap, Bell, LogOut, User } from 'lucide-react';
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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

const searchSuggestions = [
  { label: 'Syllabus', href: '/syllabus', icon: '📋' },
  { label: 'Previous Year Questions', href: '/previous-papers', icon: '📝' },
  { label: 'Books', href: '/books/standards', icon: '📚' },
  { label: 'திருக்குறள்', href: '/tirukural', icon: '📜' },
  { label: 'Study Notes', href: '/notes', icon: '📔' },
  { label: 'Tamil Scholars', href: '/poets', icon: '👤' },
];

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Welcome to TNPSC Wizard!', read: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const { user, isAdmin, signOut, loading } = useAuth();

  const getNavigationItems = () => {
    const baseItems = [
      { href: '/', label: 'Home', icon: '🏠' },
      { href: '/tirukural', label: 'திருக்குறள்', icon: '📜' },
      { href: '/notes', label: 'Study Notes', icon: '📔' },
      { href: '/poets', label: 'தமிழ் அறிஞர்கள்', icon: '👤' },
      { href: '/about-tnpsc', label: 'About TNPSC', icon: 'ℹ️' },
    ];

    if (!loading) {
      if (user) {
        if (isAdmin) {
          baseItems.push({ href: '/admin', label: 'Admin Dashboard', icon: '⚙️' });
        }
      } else {
        baseItems.push({ href: '/auth', label: 'Login / Register', icon: '🔐' });
      }
    }

    return baseItems;
  };

  const filteredSuggestions = searchSuggestions.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const match = searchSuggestions.find(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (match) {
        navigate(match.href);
        setSearchQuery('');
        setShowSuggestions(false);
      }
    }
  };

  const handleSuggestionClick = (href: string) => {
    navigate(href);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-primary border-b-4 border-secondary sticky top-0 z-50 shadow-elegant">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          {/* Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="secondary" 
                size="default" 
                className="font-semibold shadow-soft hover:shadow-elegant transition-all duration-300 h-9 w-9 sm:h-10 sm:w-10 px-0 flex-shrink-0"
              >
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 sm:w-80">
              <SheetHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                  </div>
                  <SheetTitle className="text-primary text-lg sm:text-xl font-bold">
                    TNPSC Wizard
                  </SheetTitle>
                </div>
                <SheetDescription className="text-sm">
                  Quick access to all learning resources
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-2">
                {getNavigationItems().map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-gradient-secondary hover:shadow-soft ${
                      location.pathname === item.href 
                        ? 'bg-primary text-primary-foreground shadow-soft' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <span className="text-base sm:text-lg">{item.icon}</span>
                    <span className="font-medium text-sm sm:text-base">{item.label}</span>
                  </Link>
                ))}
                
                {/* Logout in menu for logged in users */}
                {user && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-destructive/10 w-full text-left"
                  >
                    <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="font-medium text-sm sm:text-base">Logout</span>
                  </button>
                )}
              </div>
              
              {/* User info at bottom of menu */}
              {user && (
                <div className="absolute bottom-6 left-4 right-4 p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{user.email}</p>
                      <p className="text-xs text-muted-foreground">{isAdmin ? 'Admin' : 'User'}</p>
                    </div>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>

          {/* Brand */}
          <Link 
            to="/" 
            className="text-primary-foreground text-xl sm:text-2xl md:text-3xl font-bold hover:scale-105 transition-transform duration-300 flex items-center gap-1 sm:gap-2 flex-shrink-0"
          >
            <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
            <span className="inline">TNPSC Wizard</span>
          </Link>

          {/* Search Bar and Notification */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div ref={searchRef} className="relative w-32 sm:w-40 md:w-48">
              <form onSubmit={handleSearch}>
                <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground z-10" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="pl-7 sm:pl-10 pr-2 sm:pr-4 text-xs sm:text-sm h-9 sm:h-10 bg-card border-2 border-accent/30 focus:border-secondary rounded-full transition-all duration-300 focus:shadow-soft"
                />
              </form>
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && searchQuery && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-elegant z-50 overflow-hidden">
                  {filteredSuggestions.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleSuggestionClick(item.href)}
                      className="w-full flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 hover:bg-muted transition-colors text-left"
                    >
                      <span className="text-sm">{item.icon}</span>
                      <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Notifications */}
            <Popover open={showNotifications} onOpenChange={setShowNotifications}>
              <PopoverTrigger asChild>
                <Button variant="secondary" size="default" className="h-9 w-9 sm:h-10 sm:w-10 px-0 relative flex-shrink-0">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 sm:w-72 p-0" align="end">
                <div className="p-3 border-b border-border flex items-center justify-between">
                  <h4 className="font-semibold text-sm">Notifications</h4>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 border-b border-border last:border-0 ${
                          !notif.read ? 'bg-primary/5' : ''
                        }`}
                      >
                        <p className="text-sm">{notif.message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground text-sm">
                      No notifications
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  );
};
