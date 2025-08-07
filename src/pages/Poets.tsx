import { useState } from 'react';
import { Eye, User, Calendar, BookOpen, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';

const poetsData = [
  {
    id: 1,
    name: 'பாரதியார்',
    fullName: 'சுப்ரமணிய பாரதி',
    period: '1882-1921',
    category: 'Freedom Fighter & Poet',
    description: 'Great Tamil poet and independence activist known for his patriotic songs and progressive thoughts',
    famousWorks: ['கண்ணன் பாட்டு', 'பாரத மாதா', 'சுதேசி கீர்த்தனைகள்'],
    contribution: 'Women empowerment, National awakening, Social reform',
    birthPlace: 'Ettayapuram',
    image: '🎭',
    importance: 'High'
  },
  {
    id: 2,
    name: 'பாரதிதாசன்',
    fullName: 'காசி விஸ்வநாத சுப்ரமணியம்',
    period: '1891-1964',
    category: 'Revolutionary Poet',
    description: 'Revolutionary poet who advocated social justice and womens rights',
    famousWorks: ['இசையமுது', 'பிசிராந்தையார்', 'கம்பன் விறல்'],
    contribution: 'Social reform, Rationalism, Literary innovation',
    birthPlace: 'Puducherry',
    image: '🎭',
    importance: 'High'
  },
  {
    id: 3,
    name: 'நாமக்கல் கவிஞர்',
    fullName: 'வெங்கட்ராமன் ராமசாமி',
    period: '1888-1972',
    category: 'Patriotic Poet',
    description: 'Patriotic poet known for his inspiring poems during independence movement',
    famousWorks: ['இன்பத்தமிழ்', 'நலன்குரிய நாடு', 'ஆரியம் அழிந்ததென்று'],
    contribution: 'Patriotic literature, Social awakening',
    birthPlace: 'Namakkal',
    image: '🎭',
    importance: 'High'
  },
  {
    id: 4,
    name: 'தேவநேய பவானர்',
    fullName: 'தேவநேய பவானர்',
    period: '1902-1957',
    category: 'Tamil Scholar',
    description: 'Great Tamil scholar and advocate of pure Tamil',
    famousWorks: ['இசை மரபு', 'தமிழ் உரையாசிரியர்கள்', 'கலைமகள்'],
    contribution: 'Tamil purity movement, Scholarly works',
    birthPlace: 'Tiruchirappalli',
    image: '🎭',
    importance: 'Medium'
  },
  {
    id: 5,
    name: 'கண்ணதாசன்',
    fullName: 'ஆ. எல். சீனிவாசன்',
    period: '1927-1981',
    category: 'Lyricist & Poet',
    description: 'Legendary film lyricist and poet known as Kaviarasu',
    famousWorks: ['பாதை தெரியுது பார்', 'மன்னவன் வந்தநாள்', 'கல்லுக்குள் ஈரம்'],
    contribution: 'Film lyrics, Popular poetry',
    birthPlace: 'Sirkazhi',
    image: '🎭',
    importance: 'High'
  },
  {
    id: 6,
    name: 'உ. வே. சாமிநாதர்',
    fullName: 'உ. வே. சாமிநாத ஐயர்',
    period: '1855-1942',
    category: 'Tamil Scholar',
    description: 'Tamil scholar who published many classical Tamil texts',
    famousWorks: ['கம்ப ராமாயணம்', 'திருக்குறள் வியாக்கியானம்', 'சிலப்பதிகாரம்'],
    contribution: 'Classical text preservation, Scholarly commentary',
    birthPlace: 'Uttamadanapuram',
    image: '🎭',
    importance: 'High'
  }
];

const Poets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImportance, setSelectedImportance] = useState('All');
  
  const categories = ['All', ...Array.from(new Set(poetsData.map(poet => poet.category)))];
  const importance = ['All', 'High', 'Medium'];
  
  const filteredPoets = poetsData.filter(poet => {
    const matchesSearch = poet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         poet.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         poet.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || poet.category === selectedCategory;
    const matchesImportance = selectedImportance === 'All' || poet.importance === selectedImportance;
    
    return matchesSearch && matchesCategory && matchesImportance;
  });

  const handleViewDetails = (poet: typeof poetsData[0]) => {
    console.log('Viewing details for:', poet.name);
    // TODO: Implement detailed view or PDF with poet information
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">தமிழ் அறிஞர்கள்</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn about great Tamil poets, scholars, and writers who have contributed to Tamil literature and culture. 
            Essential knowledge for TNPSC examinations.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search poets, scholars, or works..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={selectedImportance} onValueChange={setSelectedImportance}>
                <SelectTrigger>
                  <SelectValue placeholder="Importance" />
                </SelectTrigger>
                <SelectContent>
                  {importance.map(imp => (
                    <SelectItem key={imp} value={imp}>{imp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Poets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPoets.map((poet, index) => (
            <Card 
              key={poet.id}
              className="p-6 transition-all duration-300 hover:shadow-elegant hover:scale-105 border-2 border-accent/30 hover:border-primary animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-soft text-2xl">
                  {poet.image}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {poet.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {poet.fullName}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{poet.period}</span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{poet.category}</Badge>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${getImportanceColor(poet.importance)}`}></div>
                      <Badge variant="outline" className="text-xs">{poet.importance}</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {poet.description}
              </p>

              {/* Famous Works */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Famous Works
                </h4>
                <div className="flex flex-wrap gap-1">
                  {poet.famousWorks.slice(0, 2).map((work, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {work}
                    </Badge>
                  ))}
                  {poet.famousWorks.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{poet.famousWorks.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4 p-3 bg-muted rounded-lg text-xs">
                <div>
                  <span className="font-medium">Birth Place:</span> {poet.birthPlace}
                </div>
                <div>
                  <span className="font-medium">Contribution:</span> {poet.contribution}
                </div>
              </div>

              {/* Action */}
              <Button
                variant="default"
                size="sm"
                className="w-full"
                onClick={() => handleViewDetails(poet)}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPoets.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No poets found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find relevant scholars.
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Poets;