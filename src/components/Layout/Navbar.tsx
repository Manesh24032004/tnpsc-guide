import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  GraduationCap, 
  Menu, 
  Search, 
  Bell, 
  User,
  Home,
  BookOpen,
  FileText,
  Brain,
  Bot,
  Users,
  BookMarked,
  LogOut
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';

const menuItems = [
  { name: 'Home', href: '/home', icon: Home },
  { name: 'Wizard AI', href: '/ai-chat', icon: Bot, highlight: true },
  { name: 'Syllabus', href: '/syllabus', icon: BookOpen },
  { name: 'திருக்குறள்', href: '/tirukural', icon: BookMarked },
  { name: 'Tamil Scholars', href: '/poets', icon: Users },
  { name: 'Previous Papers', href: '/previous-papers', icon: FileText },
  { name: 'School Books', href: '/books/standards', icon: GraduationCap },
  { name: 'Study Notes', href: '/notes', icon: FileText },
  { name: 'Quiz', href: '/quiz', icon: Brain, highlight: true },
];

const searchSuggestions = [
  { label: 'Syllabus', href: '/syllabus' },
  { label: 'Previous Year Questions', href: '/previous-papers' },
  { label: 'Books', href: '/books/standards' },
  { label: 'திருக்குறள்', href: '/tirukural' },
  { label: 'Study Notes', href: '/notes' },
  { label: 'Tamil Scholars', href: '/poets' },
  { label: 'Quiz', href: '/quiz' },
  { label: 'Wizard AI', href: '/ai-chat' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Welcome to TNPSC Wizard!', read: false },
    { id: 2, message: 'New syllabus updated!', read: false },
  ]);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

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

  const filteredSuggestions = searchSuggestions.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const match = searchSuggestions.find(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (match) {
      navigate(match.href);
      setSearchQuery('');
      setShowSuggestions(false);
    } else {
      toast({
        title: "No results found",
        description: `No matching content for "${searchQuery}"`,
      });
    }
  };

  const handleSuggestionClick = (href: string) => {
    navigate(href);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-primary text-primary-foreground sticky top-0 z-50 shadow-elegant">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8" />
            <span className="text-2xl font-bold hidden sm:inline">TNPSC Wizard</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div ref={searchRef} className="hidden md:flex items-center flex-1 max-w-md mx-4 relative">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search syllabus, books, quiz..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="pl-10 h-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                />
              </div>
            </form>
            
            {/* Search Suggestions Dropdown */}
            {showSuggestions && searchQuery && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-elegant z-50 overflow-hidden">
                {filteredSuggestions.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleSuggestionClick(item.href)}
                    className="w-full flex items-center gap-2 px-4 py-3 hover:bg-muted transition-colors text-left text-foreground"
                  >
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {/* Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-primary-foreground hover:bg-primary-foreground/10">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 p-0">
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

            <ThemeToggle />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="p-2 font-semibold border-b">
                  {user?.email || 'User'}
                </div>
                <DropdownMenuItem asChild>
                  <Link to="/home" className="flex items-center">
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          item.highlight 
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                            : 'hover:bg-accent'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            {/* Notifications - Mobile */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-primary-foreground">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-64 p-0">
                <div className="p-3 border-b border-border flex items-center justify-between">
                  <h4 className="font-semibold text-sm">Notifications</h4>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 border-b border-border last:border-0 ${
                        !notif.read ? 'bg-primary/5' : ''
                      }`}
                    >
                      <p className="text-sm">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <ThemeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    Menu
                  </SheetTitle>
                </SheetHeader>
                
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="mt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </form>

                <div className="mt-6 space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          item.highlight 
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                            : 'hover:bg-accent'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                  
                  <div className="pt-4 border-t">
                    <div className="p-3 text-sm text-muted-foreground mb-2">
                      {user?.email || 'User'}
                    </div>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};