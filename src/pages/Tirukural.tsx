import { useState } from 'react';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const adigaramList = [
  { id: 1, name: 'ஒழுக்கமுடைமை' },
  { id: 2, name: 'பொறையுடைமை' },
  { id: 3, name: 'ஊக்கமுடைமை' },
  { id: 4, name: 'விருந்தோம்பல்' },
  { id: 5, name: 'அறன் வலியுறுத்தல்' },
  { id: 6, name: 'ஈகை' },
  { id: 7, name: 'பெரியாரைத் துணைக்கோடல்' },
  { id: 8, name: 'வினைசெயல்வகை' },
  { id: 9, name: 'ஆவையஞ்சாமை' },
  { id: 10, name: 'கண்ணோட்டம்' },
  { id: 11, name: 'அன்புடைமை' },
  { id: 12, name: 'கல்வி' },
  { id: 13, name: 'நடுநிலைமை' },
  { id: 14, name: 'கூடாஒழுக்கம்' },
  { id: 15, name: 'கள்ளாமை' },
  { id: 16, name: 'செங்கோன்மை' },
  { id: 17, name: 'பண்புடைமை' },
  { id: 18, name: 'நாடு பறைதல்' },
  { id: 19, name: 'புறங்கூறாமை' },
  { id: 20, name: 'அருளுடைமை' },
];

const Tirukural = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAdigaram = adigaramList.filter(adigaram =>
    adigaram.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">திருக்குறள்</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
            திருவள்ளுவர் அருளிய அறநூல்
          </p>
          <p className="text-lg italic text-primary/80">
            "குறள் என்னும் குன்றேறி நின்றார் அறிவு"
          </p>
        </div>

        {/* History of Thiruvalluvar */}
        <Card className="mb-6 p-6 animate-slide-up max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-4">திருவள்ளுவர் வரலாறு</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              திருவள்ளுவர் தமிழ்நாட்டின் பெருமைமிக்க கவிஞர் ஆவார். இவர் கி.பி. முதல் நூற்றாண்டில் 
              வாழ்ந்ததாக கருதப்படுகிறது. திருவள்ளுவர் மயிலாப்பூரில் பிறந்ததாக வரலாற்று ஆசிரியர்கள் 
              குறிப்பிடுகின்றனர்.
            </p>
            <p>
              திருவள்ளுவரின் மனைவி வாசுகி. இவர்கள் மதுரையில் வாழ்ந்ததாகவும், திருவள்ளுவர் நெசவுத் 
              தொழில் செய்ததாகவும் கூறப்படுகிறது. திருவள்ளுவர் தமிழ், சமஸ்கிருதம், பிராகிருதம் போன்ற 
              மொழிகளில் புலமை பெற்றிருந்தார்.
            </p>
          </div>
        </Card>

        {/* History of Thirukkural */}
        <Card className="mb-6 p-6 animate-slide-up max-w-4xl mx-auto" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-bold text-primary mb-4">திருக்குறள் வரலாறு</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              திருக்குறள் உலகப் பொதுமறை எனப்படும். இது 1330 குறள்களைக் கொண்டது. ஒவ்வொரு குறளும் 
              இரண்டு வரிகளைக் கொண்டது. முதல் வரியில் நான்கு சீர்களும், இரண்டாம் வரியில் நான்கு 
              சீர்களும் உள்ளன.
            </p>
            <p>
              திருக்குறள் மூன்று பால்களாகப் பிரிக்கப்பட்டுள்ளது: அறத்துப்பால் (380 குறள்கள்), 
              பொருட்பால் (700 குறள்கள்), காமத்துப்பால் (250 குறள்கள்). ஒவ்வொரு பாலும் பல 
              அதிகாரங்களாகப் பிரிக்கப்பட்டுள்ளது.
            </p>
            <p>
              திருக்குறள் பல மொழிகளில் மொழிபெயர்க்கப்பட்டுள்ளது. இது தமிழ் இலக்கியத்தின் மிக 
              முக்கியமான படைப்புகளில் ஒன்று.
            </p>
          </div>
        </Card>

        {/* Search Adigaram */}
        <Card className="mb-6 p-6 animate-slide-up max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="தேடுக அதிகாரம்..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* 20 Adigaram */}
        <Card className="p-6 max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-2xl font-bold text-primary mb-4 text-center">20 அதிகாரங்கள்</h3>
          <ScrollArea className="h-96">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredAdigaram.map((adigaram) => (
                <div 
                  key={adigaram.id} 
                  className="p-4 bg-muted rounded-lg hover:bg-primary/20 hover:border-primary border-2 border-transparent transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-soft">
                      <span className="text-sm font-bold text-primary-foreground">{adigaram.id}</span>
                    </div>
                    <p className="font-semibold text-foreground">{adigaram.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tirukural;
