import { useParams, Link } from 'react-router-dom';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';

const subjectsByStandard: Record<string, { name: string; icon: string; books: string[] }[]> = {
  '6': [
    { name: 'Tamil Books', icon: '📚', books: ['Tamil Textbook', 'Tamil Grammar', 'Tamil Literature'] },
    { name: 'Science Books', icon: '🔬', books: ['Science Part 1', 'Science Part 2'] },
    { name: 'Social Books', icon: '🌍', books: ['History', 'Geography', 'Civics'] },
    { name: 'Maths', icon: '🔢', books: ['Mathematics Term 1', 'Mathematics Term 2'] },
  ],
  '7': [
    { name: 'Tamil Books', icon: '📚', books: ['Tamil Textbook', 'Tamil Grammar', 'Tamil Literature'] },
    { name: 'Science Books', icon: '🔬', books: ['Science Part 1', 'Science Part 2'] },
    { name: 'Social Books', icon: '🌍', books: ['History', 'Geography', 'Civics'] },
    { name: 'Maths', icon: '🔢', books: ['Mathematics Term 1', 'Mathematics Term 2'] },
  ],
  '8': [
    { name: 'Tamil Books', icon: '📚', books: ['Tamil Textbook', 'Tamil Grammar', 'Tamil Literature'] },
    { name: 'Science Books', icon: '🔬', books: ['Science Part 1', 'Science Part 2'] },
    { name: 'Social Books', icon: '🌍', books: ['History', 'Geography', 'Civics'] },
    { name: 'Maths', icon: '🔢', books: ['Mathematics Term 1', 'Mathematics Term 2'] },
  ],
  '9': [
    { name: 'Tamil Books', icon: '📚', books: ['Tamil Textbook', 'Tamil Grammar', 'Tamil Literature'] },
    { name: 'Science Books', icon: '🔬', books: ['Physics', 'Chemistry', 'Biology'] },
    { name: 'Social Books', icon: '🌍', books: ['History', 'Geography', 'Economics', 'Civics'] },
    { name: 'Maths', icon: '🔢', books: ['Mathematics Term 1', 'Mathematics Term 2'] },
  ],
  '10': [
    { name: 'Tamil Books', icon: '📚', books: ['Tamil Textbook', 'Tamil Grammar', 'Tamil Literature'] },
    { name: 'Science Books', icon: '🔬', books: ['Physics', 'Chemistry', 'Biology'] },
    { name: 'Social Books', icon: '🌍', books: ['History', 'Geography', 'Economics', 'Civics'] },
    { name: 'Maths', icon: '🔢', books: ['Mathematics Term 1', 'Mathematics Term 2'] },
  ],
  '11': [
    { name: 'Tamil Books', icon: '📚', books: ['Tamil Literature', 'Tamil Language'] },
    { name: 'Sirapu Tamil', icon: '✨', books: ['Special Tamil'] },
    { name: 'History Books', icon: '📜', books: ['Ancient History', 'Medieval History', 'Modern History'] },
    { name: 'Economics Books', icon: '💰', books: ['Micro Economics', 'Macro Economics'] },
    { name: 'Political Science', icon: '⚖️', books: ['Indian Government', 'Political Theory'] },
  ],
  '12': [
    { name: 'Tamil Books', icon: '📚', books: ['Tamil Literature', 'Tamil Language'] },
    { name: 'Sirapu Tamil', icon: '✨', books: ['Special Tamil'] },
    { name: 'History Books', icon: '📜', books: ['Ancient History', 'Medieval History', 'Modern History'] },
    { name: 'Economics Books', icon: '💰', books: ['Micro Economics', 'Macro Economics'] },
    { name: 'Political Science', icon: '⚖️', books: ['Indian Government', 'Political Theory'] },
  ],
};

const quotes = [
  'கல்வி கரையில் கற்போம்',
  'அறிவே சிறந்த ஆயுதம்',
  'படிப்பு ஒரு பயணம்',
  'கல்வியால் கண்டறிவோம்',
];

const StandardBooks = () => {
  const { grade } = useParams<{ grade: string }>();
  const subjects = subjectsByStandard[grade || '6'] || [];

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/books">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Standards
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {grade}th Standard Books
          </h1>
          <p className="text-lg italic text-primary/80">
            {quotes[Math.floor(Math.random() * quotes.length)]}
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {subjects.map((subject, index) => (
            <Card 
              key={subject.name}
              className="p-6 transition-all duration-300 hover:shadow-elegant hover:scale-105 border-2 border-accent/30 hover:border-primary animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">{subject.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {subject.name}
                </h3>
              </div>

              <div className="space-y-2">
                {subject.books.map((book) => (
                  <div 
                    key={book}
                    className="flex items-center gap-2 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                  >
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-sm">{book}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StandardBooks;