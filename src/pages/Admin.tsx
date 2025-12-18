import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Eye, Trash2, FileText, Users, LogOut, ArrowLeft, Download, Loader2 } from 'lucide-react';
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
import { useDocuments } from '@/hooks/useDocuments';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Admin = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const { documents, loading, uploadDocument, deleteDocument, getPublicUrl } = useDocuments();
  
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    file: null as File | null
  });
  const [isUploading, setIsUploading] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    { value: 'syllabus', label: 'Syllabus' },
    { value: 'previous-papers', label: 'Previous Papers' },
    { value: 'books', label: 'Books' },
    { value: 'poets', label: 'Poets/Scholars' },
    { value: 'notes', label: 'Study Notes' },
    { value: 'tirukural', label: 'Tirukural' },
  ];

  const subcategories: Record<string, string[]> = {
    'syllabus': ['G1-Prelims', 'G1-Mains', 'G2-Prelims', 'G2-Mains', 'G2A-Mains', 'G4'],
    'previous-papers': ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'],
    'books': ['6th', '7th', '8th', '9th', '10th', '11th', '12th'],
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.file) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    if (!uploadForm.category) {
      toast({
        title: "Category Required",
        description: "Please select a category.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const success = await uploadDocument(
      uploadForm.file,
      uploadForm.title,
      uploadForm.description,
      uploadForm.category,
      uploadForm.subcategory || undefined
    );
    setIsUploading(false);

    if (success) {
      setUploadForm({ title: '', description: '', category: '', subcategory: '', file: null });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleView = (filePath: string) => {
    const url = getPublicUrl(filePath);
    window.open(url, '_blank');
  };

  const handleDelete = async (doc: any) => {
    await deleteDocument(doc);
  };

  const filteredDocs = filterCategory === 'all' 
    ? documents 
    : documents.filter(d => d.category === filterCategory);

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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
                        onValueChange={(value) => setUploadForm({ ...uploadForm, category: value, subcategory: '' })}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {uploadForm.category && subcategories[uploadForm.category] && (
                    <div>
                      <Label htmlFor="subcategory">Subcategory</Label>
                      <Select 
                        value={uploadForm.subcategory} 
                        onValueChange={(value) => setUploadForm({ ...uploadForm, subcategory: value })}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select subcategory (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {subcategories[uploadForm.category].map(sub => (
                            <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
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
                    <Label htmlFor="file">Select PDF File</Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files?.[0] || null })}
                      className="h-11"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full h-11" disabled={isUploading}>
                    {isUploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Document
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="manage">
              <Card className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Manage Documents ({filteredDocs.length})
                  </h2>
                  
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : filteredDocs.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No documents found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredDocs.map((doc) => (
                      <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base truncate">{doc.title}</h3>
                          {doc.description && (
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">{doc.description}</p>
                          )}
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {doc.category}
                            </Badge>
                            {doc.subcategory && (
                              <Badge variant="outline" className="text-xs">
                                {doc.subcategory}
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {formatDate(doc.created_at)} • {formatFileSize(doc.file_size)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <Download className="h-3 w-3" />
                            {doc.download_count} downloads
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleView(doc.file_path)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Document</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{doc.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(doc)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <Card className="p-4 sm:p-6 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary">{documents.length}</h3>
                  <p className="text-sm text-muted-foreground">Total Documents</p>
                </Card>
                
                <Card className="p-4 sm:p-6 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="h-5 w-5 sm:h-6 sm:w-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary">
                    {documents.reduce((sum, doc) => sum + doc.download_count, 0)}
                  </h3>
                  <p className="text-sm text-muted-foreground">Total Downloads</p>
                </Card>
                
                <Card className="p-4 sm:p-6 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-foreground" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary">
                    {categories.filter(cat => documents.some(d => d.category === cat.value)).length}
                  </h3>
                  <p className="text-sm text-muted-foreground">Categories Used</p>
                </Card>
              </div>

              {/* Category breakdown */}
              <Card className="p-4 sm:p-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Documents by Category</h3>
                <div className="space-y-3">
                  {categories.map(cat => {
                    const count = documents.filter(d => d.category === cat.value).length;
                    const percentage = documents.length > 0 ? (count / documents.length) * 100 : 0;
                    return (
                      <div key={cat.value}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{cat.label}</span>
                          <span className="text-muted-foreground">{count} docs</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Admin;
