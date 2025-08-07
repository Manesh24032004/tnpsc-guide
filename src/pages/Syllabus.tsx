import { useState } from 'react';
import { Download, Eye, BookOpen, ScrollText, ClipboardList } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';

const syllabusData = [
  {
    id: 1,
    title: 'G-1 Syllabus 2025',
    description: 'Complete syllabus for Group 1 examinations with detailed topics and weightage',
    icon: BookOpen,
    category: 'G-1',
    fileSize: '2.4 MB',
    downloadCount: 1250,
    lastUpdated: '2024-01-15',
    tags: ['Latest', 'Official']
  },
  {
    id: 2,
    title: 'G-2 Syllabus 2025',
    description: 'Updated Group 2 syllabus with current affairs and general studies',
    icon: ScrollText,
    category: 'G-2',
    fileSize: '1.8 MB',
    downloadCount: 890,
    lastUpdated: '2024-01-12',
    tags: ['Updated', 'Official']
  },
  {
    id: 3,
    title: 'G-IV Syllabus 2025',
    description: 'Group 4 examination syllabus covering all essential topics',
    icon: ClipboardList,
    category: 'G-IV',
    fileSize: '3.1 MB',
    downloadCount: 2100,
    lastUpdated: '2024-01-20',
    tags: ['Latest', 'Complete']
  }
];

const Syllabus = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'G-1', 'G-2', 'G-IV'];
  
  const filteredSyllabus = selectedCategory === 'All' 
    ? syllabusData 
    : syllabusData.filter(item => item.category === selectedCategory);

  const handleView = (syllabusItem: typeof syllabusData[0]) => {
    console.log('Viewing:', syllabusItem.title);
    // TODO: Implement PDF viewer
  };

  const handleDownload = (syllabusItem: typeof syllabusData[0]) => {
    console.log('Downloading:', syllabusItem.title);
    // TODO: Implement download functionality
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">TNPSC Syllabus</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Download official syllabus documents for all TNPSC examinations. 
            Stay updated with the latest curriculum and examination patterns.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8 animate-slide-up">
          <div className="flex gap-2 p-2 bg-card rounded-xl border-2 border-accent/30 shadow-soft">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Syllabus Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSyllabus.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={item.id}
                className="p-6 transition-all duration-300 hover:shadow-elegant hover:scale-105 border-2 border-accent/30 hover:border-primary animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-soft">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <div className="flex gap-2 mb-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Stats */}
                <div className="flex justify-between text-xs text-muted-foreground mb-4">
                  <span>Size: {item.fileSize}</span>
                  <span>Downloads: {item.downloadCount.toLocaleString()}</span>
                </div>
                <div className="text-xs text-muted-foreground mb-4">
                  Updated: {new Date(item.lastUpdated).toLocaleDateString()}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleView(item)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDownload(item)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredSyllabus.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No syllabus found
            </h3>
            <p className="text-muted-foreground">
              Try selecting a different category or check back later.
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Syllabus;