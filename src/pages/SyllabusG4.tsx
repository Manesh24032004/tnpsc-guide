import { useState } from 'react';
import { ClipboardList, Download, Upload, FileText, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const SyllabusG4 = () => {
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
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

  const handleDownload = () => {
    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = uploadedFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: "Download Started",
        description: `Downloading ${uploadedFile.name}`,
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
        <Link to="/syllabus" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Syllabus
        </Link>

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">G-IV Syllabus</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Group 4 Examination - Subject-wise syllabus and preparation guide
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 transition-all duration-300 hover:shadow-elegant border-2 border-accent/30">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-soft mb-6">
                <ClipboardList className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground text-center mb-4">
                Upload & Download G-IV Syllabus PDF
              </h2>
            </div>

            {uploadedFile && (
              <div className="mb-6 p-4 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium truncate">
                  {uploadedFile.name}
                </span>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleUpload}
                  className="hidden"
                  id="upload-g4"
                />
                <label htmlFor="upload-g4">
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    asChild
                  >
                    <span className="cursor-pointer flex items-center justify-center">
                      <Upload className="h-5 w-5 mr-2" />
                      Upload G-IV Syllabus PDF
                    </span>
                  </Button>
                </label>
              </div>
              
              <Button
                variant="default"
                className="w-full"
                size="lg"
                onClick={handleDownload}
                disabled={!uploadedFile}
              >
                <Download className="h-5 w-5 mr-2" />
                Download G-IV Syllabus PDF
              </Button>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SyllabusG4;
