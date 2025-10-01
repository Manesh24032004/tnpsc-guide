import { GraduationCap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Link } from 'react-router-dom';

const standards = [
  { id: '6', name: '6th Standard', grade: '6', quote: 'கற்றல் முதல் செல்வம்' },
  { id: '7', name: '7th Standard', grade: '7', quote: 'அறிவே ஆற்றல்' },
  { id: '8', name: '8th Standard', grade: '8', quote: 'கல்வி கற்றல் நன்று' },
  { id: '9', name: '9th Standard', grade: '9', quote: 'கல்வியே சிறந்த செல்வம்' },
  { id: '10', name: '10th Standard', grade: '10', quote: 'அறிவுடையார் எல்லாம் உடையார்' },
  { id: '11', name: '11th Standard', grade: '11', quote: 'கல்வி அழகு' },
  { id: '12', name: '12th Standard', grade: '12', quote: 'கல்வி வளர்ச்சி' },
];

const Books = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">பாடப் புத்தகங்கள்</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
            Select your standard to access comprehensive study materials
          </p>
          <p className="text-lg italic text-primary/80">
            "கற்க கசடறக் கற்பவை கற்றபின் நிற்க அதற்குத் தக"
          </p>
        </div>

        {/* Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {standards.map((standard, index) => (
            <Link 
              key={standard.id}
              to={`/books/${standard.grade}`}
            >
              <Card 
                className="p-6 transition-all duration-300 hover:shadow-elegant hover:scale-105 border-2 border-accent/30 hover:border-primary animate-slide-up cursor-pointer h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                    <GraduationCap className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {standard.name}
                  </h3>
                  <p className="text-sm italic text-primary/70 mt-3">
                    {standard.quote}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Books;