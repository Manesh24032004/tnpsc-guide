import { useState } from 'react';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, BookOpen, Brain, History, Eye, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface NoteTopic {
  name: string;
  pdfUrl: string;
}

interface NoteCategory {
  id: number;
  title: string;
  icon: typeof BookOpen;
  topics: NoteTopic[];
  count: number;
}

const noteCategories: NoteCategory[] = [
  {
    id: 1,
    title: 'General Tamil',
    icon: BookOpen,
    topics: [
      { name: 'இலக்கணம்', pdfUrl: '/pdfs/ilakkanam.pdf' },
      { name: 'இலக்கியம்', pdfUrl: '/pdfs/ilakkiyam.pdf' },
      { name: 'பழமொழிகள்', pdfUrl: '/pdfs/pazhamozhigal.pdf' },
      { name: 'புணர்ச்சி', pdfUrl: '/pdfs/punarchi.pdf' },
      { name: 'தொகைநூல்கள்', pdfUrl: '/pdfs/thogainoolkal.pdf' },
      { name: 'திருக்குறள்', pdfUrl: '/pdfs/thirukkural.pdf' },
    ],
    count: 45,
  },
  {
    id: 2,
    title: 'History Notes',
    icon: History,
    topics: [
      { name: 'பண்டைய வரலாறு', pdfUrl: '/pdfs/ancient-history.pdf' },
      { name: 'நடுக்கால வரலாறு', pdfUrl: '/pdfs/medieval-history.pdf' },
      { name: 'நவீன வரலாறு', pdfUrl: '/pdfs/modern-history.pdf' },
      { name: 'இந்திய வரலாறு', pdfUrl: '/pdfs/indian-history.pdf' },
      { name: 'தமிழக வரலாறு', pdfUrl: '/pdfs/tamilnadu-history.pdf' },
      { name: 'உலக வரலாறு', pdfUrl: '/pdfs/world-history.pdf' },
    ],
    count: 38,
  },
  {
    id: 3,
    title: 'General Knowledge',
    icon: Brain,
    topics: [
      { name: 'அறிவியல்', pdfUrl: '/pdfs/science.pdf' },
      { name: 'புவியியல்', pdfUrl: '/pdfs/geography.pdf' },
      { name: 'பொருளாதாரம்', pdfUrl: '/pdfs/economics.pdf' },
      { name: 'அரசியல்', pdfUrl: '/pdfs/polity.pdf' },
      { name: 'சுற்றுச்சூழல்', pdfUrl: '/pdfs/environment.pdf' },
      { name: 'கணிதம்', pdfUrl: '/pdfs/aptitude.pdf' },
    ],
    count: 52,
  },
  {
    id: 4,
    title: 'Current Affairs',
    icon: FileText,
    topics: [
      { name: 'தேசிய செய்திகள்', pdfUrl: '/pdfs/national-news.pdf' },
      { name: 'சர்வதேச செய்திகள்', pdfUrl: '/pdfs/international-news.pdf' },
      { name: 'விளையாட்டு', pdfUrl: '/pdfs/sports.pdf' },
      { name: 'விருதுகள்', pdfUrl: '/pdfs/awards.pdf' },
      { name: 'அறிவியல் & தொழில்நுட்பம்', pdfUrl: '/pdfs/science-tech.pdf' },
      { name: 'தமிழ்நாடு நடப்பு', pdfUrl: '/pdfs/tn-current.pdf' },
    ],
    count: 67,
  },
];

const Notes = () => {
  const [openCategories, setOpenCategories] = useState<number[]>([]);

  const toggleCategory = (id: number) => {
    setOpenCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleView = (topicName: string) => {
    toast.info(`${topicName} - PDF பார்வை விரைவில் கிடைக்கும்`);
  };

  const handleDownload = (topicName: string) => {
    toast.success(`${topicName} - PDF பதிவிறக்கம் தொடங்கியது`);
  };

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
            const isOpen = openCategories.includes(category.id);
            
            return (
              <Card 
                key={category.id}
                className="p-6 transition-all duration-300 hover:shadow-elegant border-2 border-accent/30 hover:border-primary animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Collapsible open={isOpen} onOpenChange={() => toggleCategory(category.id)}>
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
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="mt-1">
                        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </Button>
                    </CollapsibleTrigger>
                  </div>

                  <CollapsibleContent>
                    <div className="space-y-2">
                      {category.topics.map((topic, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center justify-between gap-2 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="text-sm">{topic.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleView(topic.name)}
                              className="h-8 w-8 p-0"
                              title="View"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownload(topic.name)}
                              className="h-8 w-8 p-0"
                              title="Download"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>

                  {!isOpen && (
                    <div className="space-y-2">
                      {category.topics.slice(0, 3).map((topic, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center justify-between gap-2 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="text-sm">{topic.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleView(topic.name)}
                              className="h-8 w-8 p-0"
                              title="View"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownload(topic.name)}
                              className="h-8 w-8 p-0"
                              title="Download"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {category.topics.length > 3 && (
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="w-full text-primary">
                            + {category.topics.length - 3} more topics
                          </Button>
                        </CollapsibleTrigger>
                      )}
                    </div>
                  )}
                </Collapsible>
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