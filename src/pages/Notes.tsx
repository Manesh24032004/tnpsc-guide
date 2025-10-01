import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Card } from '@/components/ui/card';
import { FileText, BookOpen, Brain, History } from 'lucide-react';

const noteCategories = [
  {
    id: 1,
    title: 'General Tamil',
    icon: BookOpen,
    topics: ['இலக்கணம்', 'இலக்கியம்', 'பழமொழிகள்', 'புணர்ச்சி'],
    count: 45,
  },
  {
    id: 2,
    title: 'History Notes',
    icon: History,
    topics: ['பண்டைய வரலாறு', 'நடுக்கால வரலாறு', 'நவீன வரலாறு', 'இந்திய வரலாறு'],
    count: 38,
  },
  {
    id: 3,
    title: 'General Knowledge',
    icon: Brain,
    topics: ['அறிவியல்', 'புவியியல்', 'பொருளாதாரம்', 'அரசியல்'],
    count: 52,
  },
  {
    id: 4,
    title: 'Current Affairs',
    icon: FileText,
    topics: ['தேசிய செய்திகள்', 'சர்வதேச செய்திகள்', 'விளையாட்டு', 'விருதுகள்'],
    count: 67,
  },
];

const Notes = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">Study Notes</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
            Comprehensive notes for TNPSC preparation
          </p>
          <p className="text-lg italic text-primary/80">
            "அறிவுக் கூர்மை பயிற்சியால் வளரும்"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {noteCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.id}
                className="p-6 transition-all duration-300 hover:shadow-elegant hover:scale-105 border-2 border-accent/30 hover:border-primary animate-slide-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center shadow-soft flex-shrink-0">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {category.count} notes available
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {category.topics.map((topic, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 p-6 max-w-3xl mx-auto bg-gradient-primary text-primary-foreground animate-fade-in">
          <h3 className="text-xl font-bold mb-3">📚 Quick Tips for Note-Taking</h3>
          <ul className="space-y-2 text-primary-foreground/90">
            <li>✓ குறிப்புகளை தினமும் மதிப்பாய்வு செய்யுங்கள்</li>
            <li>✓ முக்கிய புள்ளிகளை சிறப்பாக குறிக்கவும்</li>
            <li>✓ தலைப்புகளை வகைப்படுத்தி வைக்கவும்</li>
            <li>✓ தொடர்ந்து புதுப்பித்துக் கொள்ளுங்கள்</li>
          </ul>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Notes;
