import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Gamepad2, BookOpen } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-primary text-primary-foreground border-t-4 border-secondary mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-secondary mb-2">
              Web Assistant for TNPSC Aspirants
            </h3>
            <p className="text-primary-foreground/90">
              Simple learning for everyone!
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex gap-4 flex-wrap justify-center">
            <Button 
              asChild
              variant="secondary" 
              className="font-semibold shadow-soft hover:shadow-elegant transition-all duration-300"
            >
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="secondary" 
              className="font-semibold shadow-soft hover:shadow-elegant transition-all duration-300"
            >
              <Link to="/quiz" className="flex items-center gap-2">
                <Gamepad2 className="h-4 w-4" />
                Quiz
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="secondary" 
              className="font-semibold shadow-soft hover:shadow-elegant transition-all duration-300"
            >
              <Link to="/books" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Books
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};