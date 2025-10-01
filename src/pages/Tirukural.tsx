import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const kuralSections = [
  { id: 1, name: 'அறத்துப்பால்', chapters: 38, kurals: 380 },
  { id: 2, name: 'பொருட்பால்', chapters: 70, kurals: 700 },
  { id: 3, name: 'காமத்துப்பால்', chapters: 25, kurals: 250 },
];

const Tirukural = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {kuralSections.map((section, index) => (
            <Card 
              key={section.id}
              className="p-6 transition-all duration-300 hover:shadow-elegant hover:scale-105 border-2 border-accent/30 hover:border-primary animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                  <span className="text-3xl text-primary-foreground font-bold">{section.id}</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {section.name}
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>அதிகாரங்கள்: {section.chapters}</p>
                  <p>குறள்கள்: {section.kurals}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-6 max-w-3xl mx-auto animate-fade-in">
          <h3 className="text-xl font-bold text-primary mb-4">சில முக்கிய குறள்கள்</h3>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-semibold text-foreground mb-2">அகர முதல எழுத்தெல்லாம் ஆதி</p>
                <p className="text-sm text-muted-foreground">பகவன் முதற்றே உலகு</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-semibold text-foreground mb-2">கற்க கசடறக் கற்பவை கற்றபின்</p>
                <p className="text-sm text-muted-foreground">நிற்க அதற்குத் தக</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-semibold text-foreground mb-2">செய்யாமல் செய்த உதவிக்கு வையகமும்</p>
                <p className="text-sm text-muted-foreground">வானகமும் ஆற்றல் அரிது</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-semibold text-foreground mb-2">இன்னா செய்தாரை ஒறுத்தல் அவர் நாண</p>
                <p className="text-sm text-muted-foreground">நன்னயம் செய்து விடல்</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-semibold text-foreground mb-2">அன்புடைமை ஆன்ற குடிப்பிறத்தல் இந்நான்கும்</p>
                <p className="text-sm text-muted-foreground">நன்கு என்னும் நாட்டின் நலன்</p>
              </div>
            </div>
          </ScrollArea>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tirukural;
