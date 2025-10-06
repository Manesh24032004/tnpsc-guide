import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Link } from 'react-router-dom';

const Books = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">பாடப் புத்தகங்கள்</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Access comprehensive study materials for all standards
          </p>
          <p className="text-lg italic text-primary/80 mb-8">
            "கற்க கசடறக் கற்பவை கற்றபின் நிற்க அதற்குத் தக"
          </p>
          
          <Link to="/books/standards">
            <Button 
              size="lg" 
              className="text-lg px-12 py-6 h-auto shadow-elegant hover:shadow-glow transition-all duration-300"
            >
              <BookOpen className="h-6 w-6 mr-3" />
              View All Standards
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Books;