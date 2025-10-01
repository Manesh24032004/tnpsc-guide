import { FileText, Book } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from 'react-router-dom';

// Import images
import tamilBookImg from '@/assets/tamil-book.jpg';
import mathsBookImg from '@/assets/maths-book.jpg';
import scienceBookImg from '@/assets/science-book.jpg';
import socialBookImg from '@/assets/social-book.jpg';
import tamilPoetsImg from '@/assets/tamil-poets.jpg';

// Import individual poet images
import bharathiyarImg from '@/assets/poets/bharathiyar.jpg';
import bharathidasanImg from '@/assets/poets/bharathidasan.jpg';
import namakkalKavignarImg from '@/assets/poets/namakkal-kavignar.jpg';
import kannadasanImg from '@/assets/poets/kannadasan.jpg';
import uvSwaminathaIyerImg from '@/assets/poets/uv-swaminatha-iyer.jpg';

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

const poets = [
  { name: 'பாரதியார்', image: bharathiyarImg },
  { name: 'பாரதிதாசன்', image: bharathidasanImg },
  { name: 'நாமக்கல் கவிஞர்', image: namakkalKavignarImg },
  { name: 'உ. வே. சாமிநாதர்', image: uvSwaminathaIyerImg },
  { name: 'கண்ணதாசன்', image: kannadasanImg },
  { name: 'தேவநேய பவானர்', image: null },
  { name: 'பாவலரேறு பெருஞ்சித்திரனார்', image: null },
  { name: 'டி.கே. சிதம்பரனார்', image: null },
  { name: 'தெ. பொ. மீனாட்சிசுந்தரம்', image: null },
  { name: 'சி. இலக்குவனார்', image: null },
  { name: 'ஜி. யு. போப்', image: null },
  { name: 'வீரமாமுனிவர்', image: null },
  { name: 'குன்றக்குடி அடிகள்', image: null },
  { name: 'காயிதே மில்லத்', image: null },
  { name: 'தாரா பாரதி', image: null },
  { name: 'வேலு நாச்சியார்', image: null },
  { name: 'பட்டுக்கோட்டை கல்யாணசுந்தரம்', image: null },
];

export const ContentGrid = () => {
  const handleItemClick = (type: string, item: string) => {
    console.log(`Opening ${type}: ${item}`);
    // TODO: Implement PDF viewing/download functionality
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Previous Year Questions */}
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
        
        <ScrollArea className="h-80">
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

      {/* Poets/Scholars */}
      <Card className="p-6 h-fit animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center gap-4 p-2 border-b border-muted pb-4 mb-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg overflow-hidden shadow-soft">
            <img 
              src={tamilPoetsImg} 
              alt="Tamil poets"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">அறிஞர்கள்</h3>
            <p className="text-sm text-muted-foreground">Tamil scholars</p>
          </div>
        </div>
        
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {poets.map((poet, index) => (
              <Link
                key={index}
                to="/poets"
              >
                <div
                  className="bg-muted rounded-lg p-3 border-l-4 border-secondary cursor-pointer transition-all duration-300 hover:bg-secondary/20 hover:border-primary hover:shadow-soft flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    {poet.image ? (
                      <img 
                        src={poet.image} 
                        alt={poet.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-accent/20 flex items-center justify-center">
                        <span className="text-accent text-xs">👤</span>
                      </div>
                    )}
                  </div>
                  <div className="font-semibold text-foreground text-sm">{poet.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};