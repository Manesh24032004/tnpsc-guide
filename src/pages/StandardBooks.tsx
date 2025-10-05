import { useParams, Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';

const subjectsByStandard: Record<string, { name: string; icon: string }[]> = {
  '6': [
    { name: 'Tamil', icon: '📚' },
    { name: 'Maths', icon: '🔢' },
    { name: 'Science', icon: '🔬' },
    { name: 'Social', icon: '🌍' },
  ],
  '7': [
    { name: 'Tamil', icon: '📚' },
    { name: 'Maths', icon: '🔢' },
    { name: 'Science', icon: '🔬' },
    { name: 'Social', icon: '🌍' },
  ],
  '8': [
    { name: 'Tamil', icon: '📚' },
    { name: 'Maths', icon: '🔢' },
    { name: 'Science', icon: '🔬' },
    { name: 'Social', icon: '🌍' },
  ],
  '9': [
    { name: 'Tamil', icon: '📚' },
    { name: 'Maths', icon: '🔢' },
    { name: 'Science', icon: '🔬' },
    { name: 'Social', icon: '🌍' },
  ],
  '10': [
    { name: 'Tamil', icon: '📚' },
    { name: 'Maths', icon: '🔢' },
    { name: 'Science', icon: '🔬' },
    { name: 'Social', icon: '🌍' },
  ],
  '11': [
    { name: 'Tamil', icon: '📚' },
    { name: 'Sirapu Tamil', icon: '✨' },
    { name: 'History', icon: '📜' },
    { name: 'Economics', icon: '💰' },
    { name: 'Political Science', icon: '⚖️' },
    { name: 'அரசியலும் இந்திய பண்பாடும்', icon: '🏛️' },
  ],
  '12': [
    { name: 'Tamil', icon: '📚' },
    { name: 'Sirapu Tamil', icon: '✨' },
    { name: 'History', icon: '📜' },
    { name: 'Economics', icon: '💰' },
    { name: 'Political Science', icon: '⚖️' },
    { name: 'அரசியலும் இந்திய பண்பாடும்', icon: '🏛️' },
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
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">{subject.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {subject.name}
                </h3>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{subject.name} Book.pdf</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button variant="default" size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
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