import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Eye, Edit, Trash2, FileText, Users, LogOut, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

const Admin = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: '',
    file: null as File | null
  });

  // Mock data for uploaded documents
  const [documents] = useState([
    { id: 1, title: 'G-IV Syllabus 2025', category: 'syllabus', uploadDate: '2024-01-15', downloads: 150 },
    { id: 2, title: '2024 Previous Paper', category: 'previous-papers', uploadDate: '2024-01-10', downloads: 89 },
    { id: 3, title: 'Tamil Literature Book', category: 'books', uploadDate: '2024-01-08', downloads: 201 },
  ]);

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.file) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }
    
    // Handle file upload logic here
    toast({
      title: "File Uploaded Successfully",
      description: `${uploadForm.title} has been uploaded.`,
    });
    
    // Reset form
    setUploadForm({ title: '', description: '', category: '', file: null });
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-gradient-soft">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          {/* Back Button */}
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>

          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Welcome, {user?.email} • Manage documents and content
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2 w-fit"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          <Tabs defaultValue="upload" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="upload" className="text-xs sm:text-sm py-2">Upload</TabsTrigger>
              <TabsTrigger value="manage" className="text-xs sm:text-sm py-2">Manage</TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm py-2">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <Card className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload New Document
                </h2>
                
                <form onSubmit={handleFileUpload} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Document Title</Label>
                      <Input
                        id="title"
                        value={uploadForm.title}
                        onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                        placeholder="e.g., G-IV Syllabus 2025"
                        className="h-11"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={uploadForm.category} 
                        onValueChange={(value) => setUploadForm({ ...uploadForm, category: value })}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="syllabus">Syllabus</SelectItem>
                          <SelectItem value="previous-papers">Previous Papers</SelectItem>
                          <SelectItem value="books">Books</SelectItem>
                          <SelectItem value="poets">Poets/Scholars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                      placeholder="Brief description of the document"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="file">Select File</Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files?.[0] || null })}
                      className="h-11"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full h-11">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="manage">
              <Card className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Manage Documents
                </h2>
                
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base">{doc.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Uploaded: {doc.uploadDate} • Downloads: {doc.downloads}
                        </p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {doc.category}
                        </Badge>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <Card className="p-4 sm:p-6 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary">24</h3>
                  <p className="text-sm text-muted-foreground">Total Documents</p>
                </Card>
                
                <Card className="p-4 sm:p-6 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary">1,247</h3>
                  <p className="text-sm text-muted-foreground">Total Downloads</p>
                </Card>
                
                <Card className="p-4 sm:p-6 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-foreground" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary">3,891</h3>
                  <p className="text-sm text-muted-foreground">Page Views</p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Admin;
