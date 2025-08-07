import { useState } from 'react';
import { Download, Eye, FileText, Calendar, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';

const papersData = [
  {
    id: 1,
    title: '2025 G-IV Question Paper',
    year: 2025,
    category: 'G-IV',
    subject: 'General Studies',
    examDate: '2025-01-15',
    fileSize: '1.2 MB',
    downloadCount: 850,
    hasAnswers: true,
    difficulty: 'Medium'
  },
  {
    id: 2,
    title: '2025 G-1 Previous Paper',
    year: 2025,
    category: 'G-1',
    subject: 'Administrative',
    examDate: '2025-01-10',
    fileSize: '2.1 MB',
    downloadCount: 650,
    hasAnswers: true,
    difficulty: 'Hard'
  },
  {
    id: 3,
    title: '2024 G-IV Question Paper',
    year: 2024,
    category: 'G-IV',
    subject: 'General Studies',
    examDate: '2024-12-20',
    fileSize: '1.5 MB',
    downloadCount: 1200,
    hasAnswers: true,
    difficulty: 'Medium'
  },
  {
    id: 4,
    title: '2024 G-2 Previous Paper',
    year: 2024,
    category: 'G-2',
    subject: 'Engineering',
    examDate: '2024-11-15',
    fileSize: '1.8 MB',
    downloadCount: 920,
    hasAnswers: false,
    difficulty: 'Hard'
  },
  {
    id: 5,
    title: '2024 G-1 Model Paper',
    year: 2024,
    category: 'G-1',
    subject: 'Administrative',
    examDate: '2024-10-25',
    fileSize: '2.3 MB',
    downloadCount: 780,
    hasAnswers: true,
    difficulty: 'Hard'
  },
  {
    id: 6,
    title: '2023 G-IV Previous Paper',
    year: 2023,
    category: 'G-IV',
    subject: 'General Studies',
    examDate: '2023-12-18',
    fileSize: '1.4 MB',
    downloadCount: 1500,
    hasAnswers: true,
    difficulty: 'Easy'
  }
];

const PreviousPapers = () => {
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  
  const years = ['All', ...Array.from(new Set(papersData.map(p => p.year))).sort((a, b) => b - a)];
  const categories = ['All', ...Array.from(new Set(papersData.map(p => p.category)))];
  
  let filteredPapers = papersData.filter(paper => {
    const yearMatch = selectedYear === 'All' || paper.year.toString() === selectedYear;
    const categoryMatch = selectedCategory === 'All' || paper.category === selectedCategory;
    return yearMatch && categoryMatch;
  });

  // Sort papers
  filteredPapers.sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.examDate).getTime() - new Date(a.examDate).getTime();
    if (sortBy === 'oldest') return new Date(a.examDate).getTime() - new Date(b.examDate).getTime();
    if (sortBy === 'downloads') return b.downloadCount - a.downloadCount;
    return 0;
  });

  const handleView = (paper: typeof papersData[0]) => {
    console.log('Viewing:', paper.title);
    // TODO: Implement PDF viewer
  };

  const handleDownload = (paper: typeof papersData[0]) => {
    console.log('Downloading:', paper.title);
    // TODO: Implement download functionality
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">Previous Year Papers</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Practice with authentic TNPSC examination papers from previous years. 
            Improve your preparation with real exam experience.
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8 animate-slide-up">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Filter Papers</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="downloads">Most Downloaded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedYear('All');
                  setSelectedCategory('All');
                  setSortBy('newest');
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPapers.map((paper, index) => (
            <Card 
              key={paper.id}
              className="p-6 transition-all duration-300 hover:shadow-elegant hover:scale-105 border-2 border-accent/30 hover:border-primary animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-soft">
                  <FileText className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {paper.title}
                  </h3>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="secondary">{paper.category}</Badge>
                    <Badge variant="outline">{paper.year}</Badge>
                    {paper.hasAnswers && (
                      <Badge className="bg-green-500 text-white">With Answers</Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(paper.examDate).toLocaleDateString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Subject: {paper.subject}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Difficulty:</span>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${getDifficultyColor(paper.difficulty)}`}></div>
                    <span className="text-sm font-medium">{paper.difficulty}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between text-xs text-muted-foreground mb-4 p-2 bg-muted rounded">
                <span>Size: {paper.fileSize}</span>
                <span>Downloads: {paper.downloadCount.toLocaleString()}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleView(paper)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDownload(paper)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No papers found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or check back later for new papers.
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default PreviousPapers;