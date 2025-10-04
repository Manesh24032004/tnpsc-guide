import { FileText, Book, PlayCircle, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Import images
import tamilBookImg from '@/assets/tamil-book.jpg';
import mathsBookImg from '@/assets/maths-book.jpg';
import scienceBookImg from '@/assets/science-book.jpg';
import socialBookImg from '@/assets/social-book.jpg';

const previousYearQuestions = [
  { name: '2025 G-IV', year: '2025' },
  { name: '2025 G-1', year: '2025' },
  { name: '2024 G-IV', year: '2024' },
  { name: '2024 G-1', year: '2024' },
  { name: '2023 G-IV', year: '2023' },
];

const books = [
  { name: 'Tamil', subject: 'Language', image: tamilBookImg },
  { name: 'Maths', subject: 'Mathematics', image: mathsBookImg },
  { name: 'Science', subject: 'Science', image: scienceBookImg },
  { name: 'Social Science', subject: 'Social Studies', image: socialBookImg },
];

export const ContentGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
      {/* TNPSC Wizard Start Now */}
      <Card className="p-6 h-fit animate-slide-up bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/30">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-soft mx-auto mb-4">
            <PlayCircle className="h-8 w-8 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">TNPSC Wizard</h3>
          <p className="text-sm text-muted-foreground mb-4 italic">
            "கற்க கசடறக் கற்பவை கற்றபின் நிற்க அதற்குத் தக"
          </p>
          <Button className="w-full" size="lg">
            Start Now
          </Button>
        </div>
      </Card>

      {/* Explore Syllabus */}
      <Card className="p-6 h-fit animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-4 p-2 border-b border-muted pb-4 mb-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-soft">
            <BookOpen className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Explore Syllabus</h3>
            <p className="text-sm text-muted-foreground">பாடத்திட்டம்</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <Link to="/syllabus">
            <div className="bg-muted rounded-lg p-4 border-l-4 border-primary cursor-pointer transition-all duration-300 hover:bg-primary/20 hover:border-primary hover:shadow-soft">
              <div className="font-semibold text-foreground">G-1 Syllabus</div>
              <p className="text-xs text-muted-foreground mt-1">Group 1 Examination</p>
            </div>
          </Link>
          <Link to="/syllabus">
            <div className="bg-muted rounded-lg p-4 border-l-4 border-secondary cursor-pointer transition-all duration-300 hover:bg-secondary/20 hover:border-primary hover:shadow-soft">
              <div className="font-semibold text-foreground">G-2/IIA Syllabus</div>
              <p className="text-xs text-muted-foreground mt-1">Group 2 & IIA Examination</p>
            </div>
          </Link>
          <Link to="/syllabus">
            <div className="bg-muted rounded-lg p-4 border-l-4 border-accent cursor-pointer transition-all duration-300 hover:bg-accent/20 hover:border-primary hover:shadow-soft">
              <div className="font-semibold text-foreground">G-IV Syllabus</div>
              <p className="text-xs text-muted-foreground mt-1">Group 4 Examination</p>
            </div>
          </Link>
        </div>
      </Card>

      {/* Past Year Question Papers */}
      <Card className="p-6 h-fit animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center gap-4 p-2 border-b border-muted pb-4 mb-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-soft">
            <FileText className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Past Year Questions</h3>
            <p className="text-sm text-muted-foreground">Old exam papers</p>
          </div>
        </div>
        
        <ScrollArea className="h-[280px]">
          <div className="space-y-3">
            {previousYearQuestions.map((item, index) => (
              <Link 
                key={index}
                to="/previous-papers"
              >
                <div
                  className="bg-muted rounded-lg p-4 border-l-4 border-secondary cursor-pointer transition-all duration-300 hover:bg-secondary/20 hover:border-primary hover:shadow-soft"
                >
                  <div className="font-semibold text-foreground">{item.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Books */}
      <Card className="p-6 h-fit animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center gap-4 p-2 border-b border-muted pb-4 mb-4">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-soft">
            <Book className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Books</h3>
            <p className="text-sm text-muted-foreground">படிப்பதற்கான புத்தகங்கள்</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {books.map((book, index) => (
            <Link
              key={index}
              to="/books"
            >
              <div
                className="bg-card border-2 border-accent/30 rounded-lg p-4 text-center cursor-pointer transition-all duration-300 hover:border-secondary hover:bg-secondary/10 hover:shadow-soft"
              >
                <div className="w-12 h-12 mx-auto mb-2 rounded-lg overflow-hidden">
                  <img 
                    src={book.image} 
                    alt={`${book.name} book`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-foreground text-sm">{book.name}</h4>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
};
