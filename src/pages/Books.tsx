import { useState } from 'react';
import { Download, Eye, Book, BookOpen, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';

const booksData = [
  {
    id: 1,
    title: 'Tamil Literature & Grammar',
    subject: 'Tamil',
    description: 'Comprehensive guide to Tamil literature, grammar rules, and important authors',
    fileSize: '15.2 MB',
    pages: 340,
    downloadCount: 2100,
    rating: 4.8,
    category: 'Language',
    level: 'Intermediate',
    lastUpdated: '2024-01-20'
  },
  {
    id: 2,
    title: 'Mathematics for TNPSC',
    subject: 'Mathematics',
    description: 'Complete mathematical concepts with solved examples and practice questions',
    fileSize: '22.5 MB',
    pages: 450,
    downloadCount: 1890,
    rating: 4.7,
    category: 'Mathematics',
    level: 'Beginner to Advanced',
    lastUpdated: '2024-01-18'
  },
  {
    id: 3,
    title: 'General Science Handbook',
    subject: 'Science',
    description: 'Physics, Chemistry, and Biology concepts explained in simple language',
    fileSize: '18.7 MB',
    pages: 380,
    downloadCount: 1650,
    rating: 4.6,
    category: 'Science',
    level: 'Intermediate',
    lastUpdated: '2024-01-15'
  },
  {
    id: 4,
    title: 'Social Science Complete Guide',
    subject: 'Social Science',
    description: 'History, Geography, Economics, and Political Science for TNPSC preparation',
    fileSize: '25.1 MB',
    pages: 520,
    downloadCount: 2350,
    rating: 4.9,
    category: 'Social Studies',
    level: 'Comprehensive',
    lastUpdated: '2024-01-22'
  },
  {
    id: 5,
    title: 'Current Affairs Digest',
    subject: 'Current Affairs',
    description: 'Monthly compilation of important current affairs and recent developments',
    fileSize: '8.3 MB',
    pages: 180,
    downloadCount: 3200,
    rating: 4.5,
    category: 'Current Affairs',
    level: 'All Levels',
    lastUpdated: '2024-01-25'
  },
  {
    id: 6,
    title: 'Indian Constitution Simplified',
    subject: 'Polity',
    description: 'Easy understanding of Indian Constitution, fundamental rights and duties',
    fileSize: '12.4 MB',
    pages: 280,
    downloadCount: 1450,
    rating: 4.8,
    category: 'Polity',
    level: 'Beginner',
    lastUpdated: '2024-01-16'
  }
];

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  
  const categories = ['All', ...Array.from(new Set(booksData.map(book => book.category)))];
  const levels = ['All', ...Array.from(new Set(booksData.map(book => book.level)))];
  
  const filteredBooks = booksData.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || book.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleView = (book: typeof booksData[0]) => {
    console.log('Viewing:', book.title);
    // TODO: Implement PDF viewer
  };

  const handleDownload = (book: typeof booksData[0]) => {
    console.log('Downloading:', book.title);
    // TODO: Implement download functionality
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">TNPSC Study Books</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access comprehensive study materials and textbooks for all TNPSC examinations. 
            Download quality content to boost your preparation.
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
                  placeholder="Search books, subjects, or topics..."
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
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBooks.map((book, index) => (
            <Card 
              key={book.id}
              className="p-6 transition-all duration-300 hover:shadow-elegant hover:scale-105 border-2 border-accent/30 hover:border-primary animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-20 bg-gradient-primary rounded-lg flex items-center justify-center shadow-soft">
                  <BookOpen className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                    {book.title}
                  </h3>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="secondary">{book.category}</Badge>
                    <Badge variant="outline">{book.level}</Badge>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    {renderStars(book.rating)}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({book.rating})
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {book.description}
              </p>

              {/* Book Details */}
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4 p-3 bg-muted rounded-lg">
                <div>Pages: {book.pages}</div>
                <div>Size: {book.fileSize}</div>
                <div>Downloads: {book.downloadCount.toLocaleString()}</div>
                <div>Updated: {new Date(book.lastUpdated).toLocaleDateString()}</div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleView(book)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDownload(book)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Book className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No books found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find relevant books.
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Books;