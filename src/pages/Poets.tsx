import { useState } from 'react';
import { Download, Eye, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';

const poetsData = [
  { id: 1, name: 'பாரதியார்', pdfUrl: '' },
  { id: 2, name: 'பாரதிதாசன்', pdfUrl: '' },
  { id: 3, name: 'உ. வே. சாமிநாதர்', pdfUrl: '' },
  { id: 4, name: 'தொ. பொ. மீனாட்சிசுந்தரம்', pdfUrl: '' },
  { id: 5, name: 'சி.இலக்குவனார்', pdfUrl: '' },
  { id: 6, name: 'ஜி.யூ.போப்', pdfUrl: '' },
  { id: 7, name: 'தேவநேய பாவாணர்', pdfUrl: '' },
  { id: 8, name: 'பெருஞ்சித்திரனார்', pdfUrl: '' },
  { id: 9, name: 'வீரமாமுனிவர்', pdfUrl: '' },
  { id: 10, name: 'த.க.சி. சிதம்பரனார்', pdfUrl: '' },
  { id: 11, name: 'குன்றக்குடி ஆதிகள்', pdfUrl: '' },
  { id: 12, name: 'கண்ணதாசன்', pdfUrl: '' },
  { id: 13, name: 'கைதே மில்லத்', pdfUrl: '' },
  { id: 14, name: 'தாரா பாரதி', pdfUrl: '' },
  { id: 15, name: 'வேலுநாச்சியார்', pdfUrl: '' },
  { id: 16, name: 'பட்டுக்கோட்டை கல்யாணசுந்தரம்', pdfUrl: '' },
  { id: 17, name: 'முடியரசன்', pdfUrl: '' },
  { id: 18, name: 'தமிழொளி', pdfUrl: '' },
  { id: 19, name: 'உருத்திரங்கண்ணனார்', pdfUrl: '' },
  { id: 20, name: 'கி.வா. ஜகந்நாதன்', pdfUrl: '' },
];

const Poets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPoets = poetsData.filter(poet =>
    poet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (poet: typeof poetsData[0]) => {
    console.log('Viewing:', poet.name);
    // TODO: Implement PDF viewer
  };

  const handleDownload = (poet: typeof poetsData[0]) => {
    console.log('Downloading:', poet.name);
    // TODO: Implement PDF download
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">தமிழ் அறிஞர்கள்</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn about great Tamil poets, scholars, and writers
          </p>
        </div>

        {/* Search */}
        <Card className="p-6 mb-8 animate-slide-up max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search poets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Poets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPoets.map((poet, index) => (
            <Card 
              key={poet.id}
              className="p-6 transition-all duration-300 hover:shadow-elegant hover:scale-105 border-2 border-accent/30 hover:border-primary animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <h3 className="text-lg font-bold text-foreground mb-4 text-center">
                {poet.name}
              </h3>
              
              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleView(poet)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDownload(poet)}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPoets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No poets found matching your search.
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Poets;
