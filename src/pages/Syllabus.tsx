import { useState } from 'react';
import { Download, Upload, FileText, BookOpen, ScrollText, ClipboardList } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { useToast } from '@/hooks/use-toast';

const syllabusCategories = [
  {
    id: 'g1',
    title: 'G-1 Syllabus',
    description: 'Group 1 Examination - Complete syllabus with all subjects and topics',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'g2',
    title: 'G-2/IIA Syllabus',
    description: 'Group 2 & IIA Examinations - Detailed syllabus and exam pattern',
    icon: ScrollText,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'g4',
    title: 'G-IV Syllabus',
    description: 'Group 4 Examination - Subject-wise syllabus and preparation guide',
    icon: ClipboardList,
    color: 'from-orange-500 to-red-500'
  }
];

const Syllabus = () => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({
    g1: null,
    g2: null,
    g4: null
  });

  const handleUpload = (categoryId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFiles(prev => ({ ...prev, [categoryId]: file }));
      toast({
        title: "PDF Uploaded",
        description: `${file.name} uploaded successfully`,
      });
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload a PDF file",
        variant: "destructive"
      });
    }
  };

  const handleDownload = (categoryId: string) => {
    const file = uploadedFiles[categoryId];
    if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: "Download Started",
        description: `Downloading ${file.name}`,
      });
    } else {
      toast({
        title: "No file available",
        description: "Please upload a PDF first",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">TNPSC தேர்வு பாடத்திட்டம்</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            "கற்றதனால் ஆய பயன் என்கொல் வாலறிவன் நற்றாள் தொழாஅர் எனில்"
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
            Upload and download official syllabus PDFs for TNPSC examinations
          </p>
        </div>

        {/* Syllabus Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {syllabusCategories.map((category, index) => {
            const Icon = category.icon;
            const hasFile = uploadedFiles[category.id];
            
            return (
              <Card 
                key={category.id}
                className="p-6 transition-all duration-300 hover:shadow-elegant hover:scale-105 border-2 border-accent/30 hover:border-primary animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header with Icon */}
                <div className="flex flex-col items-center mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center shadow-soft mb-4`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground text-center mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {category.description}
                  </p>
                </div>

                {/* File Status */}
                {hasFile && (
                  <div className="mb-4 p-3 bg-primary/10 rounded-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-foreground truncate">
                      {hasFile.name}
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-3">
                  <div>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handleUpload(category.id, e)}
                      className="hidden"
                      id={`upload-${category.id}`}
                    />
                    <label htmlFor={`upload-${category.id}`}>
                      <Button
                        variant="outline"
                        className="w-full"
                        asChild
                      >
                        <span className="cursor-pointer flex items-center justify-center">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload PDF
                        </span>
                      </Button>
                    </label>
                  </div>
                  
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => handleDownload(category.id)}
                    disabled={!hasFile}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground italic">
            "படிப்பே சிறந்த செல்வம்"
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Syllabus;