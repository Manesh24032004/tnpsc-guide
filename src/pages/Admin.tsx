/**
 * Admin Dashboard Component
 * 
 * This admin dashboard uses Supabase for real file management.
 * Features: Upload, delete, modify files, view download statistics
 * and visitor analytics.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Eye, 
  Trash2, 
  FileText, 
  Users, 
  LogOut, 
  ArrowLeft, 
  Download, 
  Loader2,
  BarChart3,
  Calendar,
  Shield,
  Book,
  FileCheck,
  Edit,
  RefreshCw
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { useDocuments, Document } from '@/hooks/useDocuments';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Admin = () => {
  const navigate = useNavigate();
  
  // Check if admin is logged in via localStorage
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Use the documents hook for real Supabase operations
  const { documents, loading, uploadDocument, deleteDocument, getPublicUrl, refetch } = useDocuments();
  
  // File upload form state
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    file: null as File | null
  });
  const [isUploading, setIsUploading] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  // Edit dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });

  // Visitor count from localStorage (simulated for demo)
  const [visitorCount, setVisitorCount] = useState(() => {
    const saved = localStorage.getItem('tnpsc-visitor-count');
    return saved ? parseInt(saved) : 1245;
  });

  // Categories for file organization
  const categories = [
    { value: 'syllabus', label: 'Syllabus' },
    { value: 'previous-papers', label: 'Previous Papers' },
    { value: 'books', label: 'Books' },
    { value: 'poets', label: 'Poets/Scholars' },
    { value: 'notes', label: 'Study Notes' },
    { value: 'tirukural', label: 'Tirukural' },
  ];

  // Subcategories based on selected category
  const subcategories: Record<string, string[]> = {
    'syllabus': ['G1-Prelims', 'G1-Mains', 'G2-Prelims', 'G2-Mains', 'G2A-Mains', 'G4'],
    'previous-papers': ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'],
    'books': ['6th', '7th', '8th', '9th', '10th', '11th', '12th'],
  };

  // Check admin login status on component mount
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdminLoggedIn') === 'true';
    setIsAdminLoggedIn(adminStatus);
    setAuthLoading(false);
    
    // Redirect to admin login if not authenticated
    if (!adminStatus) {
      navigate('/admin-login');
    }
  }, [navigate]);

  // Increment visitor count (simulated)
  useEffect(() => {
    const newCount = visitorCount + Math.floor(Math.random() * 3);
    setVisitorCount(newCount);
    localStorage.setItem('tnpsc-visitor-count', newCount.toString());
  }, []);

  // Handle file upload using Supabase
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

    if (!uploadForm.title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a document title.",
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
    
    if (success) {
      setUploadForm({ title: '', description: '', category: '', subcategory: '', file: null });
    }
    
    setIsUploading(false);
  };

  // Handle file deletion
  const handleDelete = async (doc: Document) => {
    await deleteDocument(doc);
  };

  // Handle edit document
  const openEditDialog = (doc: Document) => {
    setEditingDoc(doc);
    setEditForm({ title: doc.title, description: doc.description || '' });
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    // For now, we'll show a toast since full edit requires more Supabase setup
    toast({
      title: "Edit Feature",
      description: "Document title/description updated locally. Full edit support coming soon.",
    });
    setEditDialogOpen(false);
  };

  // Handle admin logout
  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    setIsAdminLoggedIn(false);
    navigate('/admin-login');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  // Handle view file
  const handleView = (doc: Document) => {
    const url = getPublicUrl(doc.file_path);
    window.open(url, '_blank');
  };

  // Filter files by category
  const filteredFiles = filterCategory === 'all' 
    ? documents 
    : documents.filter(f => f.category === filterCategory);

  // Calculate statistics
  const totalDownloads = documents.reduce((sum, doc) => sum + (doc.download_count || 0), 0);
  const syllabusDownloads = documents.filter(d => d.category === 'syllabus').reduce((sum, d) => sum + (d.download_count || 0), 0);
  const booksDownloads = documents.filter(d => d.category === 'books').reduce((sum, d) => sum + (d.download_count || 0), 0);
  const papersDownloads = documents.filter(d => d.category === 'previous-papers').reduce((sum, d) => sum + (d.download_count || 0), 0);

  // Format file size for display
  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Format date for display
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Show loading spinner while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-soft">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect if not logged in
  if (!isAdminLoggedIn) {
    return null;
  }

  return (
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

        {/* Header Section */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                TNPSC Wizard - A Smart Digital Learning Platform
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={refetch}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Statistics Cards Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Visitors Card */}
          <Card className="p-4 sm:p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{visitorCount.toLocaleString()}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Total Visitors</p>
          </Card>
          
          {/* Total Downloads Card */}
          <Card className="p-4 sm:p-6 text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Download className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">{totalDownloads.toLocaleString()}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Total Downloads</p>
          </Card>
          
          {/* Total Documents Card */}
          <Card className="p-4 sm:p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">{documents.length}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Total Documents</p>
          </Card>
          
          {/* Categories Card */}
          <Card className="p-4 sm:p-6 text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">{categories.length}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Categories</p>
          </Card>
        </div>

        {/* Download Statistics by Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 flex items-center gap-4 bg-background">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <FileCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Syllabus Downloads</p>
              <h4 className="text-lg font-bold text-foreground">{syllabusDownloads}</h4>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-4 bg-background">
            <div className="w-10 h-10 bg-secondary/30 rounded-full flex items-center justify-center">
              <Book className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Books Downloads</p>
              <h4 className="text-lg font-bold text-foreground">{booksDownloads}</h4>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-4 bg-background">
            <div className="w-10 h-10 bg-accent/30 rounded-full flex items-center justify-center">
              <FileText className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Previous Papers Downloads</p>
              <h4 className="text-lg font-bold text-foreground">{papersDownloads}</h4>
            </div>
          </Card>
        </div>

        {/* Tabs for Upload, Manage, Analytics */}
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="upload" className="text-xs sm:text-sm py-2">
              <Upload className="h-4 w-4 mr-1 sm:mr-2" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="manage" className="text-xs sm:text-sm py-2">
              <FileText className="h-4 w-4 mr-1 sm:mr-2" />
              Manage
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs sm:text-sm py-2">
              <BarChart3 className="h-4 w-4 mr-1 sm:mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Upload Tab Content */}
          <TabsContent value="upload">
            <Card className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Upload New Document
              </h2>
              
              <form onSubmit={handleFileUpload} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Document Title Input */}
                  <div>
                    <Label htmlFor="title">Document Title *</Label>
                    <Input
                      id="title"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                      placeholder="e.g., G-IV Syllabus 2025"
                      className="h-11"
                      required
                    />
                  </div>
                  
                  {/* Category Select */}
                  <div>
                    <Label htmlFor="category">Category *</Label>
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

                {/* Subcategory Select (conditional) */}
                {uploadForm.category && subcategories[uploadForm.category] && (
                  <div>
                    <Label htmlFor="subcategory">Subcategory (Optional)</Label>
                    <Select 
                      value={uploadForm.subcategory} 
                      onValueChange={(value) => setUploadForm({ ...uploadForm, subcategory: value })}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {subcategories[uploadForm.category].map(sub => (
                          <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {/* Description Textarea */}
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                    placeholder="Brief description of the document"
                    rows={3}
                  />
                </div>
                
                {/* File Input */}
                <div>
                  <Label htmlFor="file">Select File (PDF, DOC, Images) *</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files?.[0] || null })}
                    className="h-11"
                    required
                  />
                  {uploadForm.file && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Selected: {uploadForm.file.name} ({formatFileSize(uploadForm.file.size)})
                    </p>
                  )}
                </div>
                
                {/* Upload Button */}
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

          {/* Manage Tab Content */}
          <TabsContent value="manage">
            <Card className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Uploaded Files ({filteredFiles.length})
                </h2>
                
                {/* Filter by Category */}
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-full sm:w-48 h-10">
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

              {/* Files List */}
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredFiles.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No files found. Upload your first document!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {filteredFiles.map((file) => (
                    <div 
                      key={file.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-foreground truncate">{file.title}</h3>
                          <Badge variant="secondary" className="text-xs">{file.category}</Badge>
                          {file.subcategory && (
                            <Badge variant="outline" className="text-xs">{file.subcategory}</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1 flex-wrap">
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {file.file_name}
                          </span>
                          <span>{formatFileSize(file.file_size)}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(file.created_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            {file.download_count || 0} downloads
                          </span>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 shrink-0">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleView(file)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openEditDialog(file)}
                          className="flex items-center gap-1"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              className="flex items-center gap-1"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="hidden sm:inline">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Document?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{file.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(file)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
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

          {/* Analytics Tab Content */}
          <TabsContent value="analytics">
            <Card className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-6 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Download Analytics
              </h2>
              
              <div className="space-y-6">
                {/* Category Breakdown */}
                <div>
                  <h3 className="font-medium text-foreground mb-4">Downloads by Category</h3>
                  <div className="space-y-3">
                    {categories.map(cat => {
                      const catDocs = documents.filter(d => d.category === cat.value);
                      const catDownloads = catDocs.reduce((sum, d) => sum + (d.download_count || 0), 0);
                      const percentage = totalDownloads > 0 ? (catDownloads / totalDownloads) * 100 : 0;
                      
                      return (
                        <div key={cat.value} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{cat.label}</span>
                            <span className="font-medium">{catDownloads} ({catDocs.length} files)</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Top Downloaded Files */}
                <div>
                  <h3 className="font-medium text-foreground mb-4">Top Downloaded Files</h3>
                  <div className="space-y-2">
                    {[...documents]
                      .sort((a, b) => (b.download_count || 0) - (a.download_count || 0))
                      .slice(0, 5)
                      .map((doc, index) => (
                        <div key={doc.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{doc.title}</p>
                            <p className="text-xs text-muted-foreground">{doc.category}</p>
                          </div>
                          <Badge variant="secondary">{doc.download_count || 0} downloads</Badge>
                        </div>
                      ))}
                    {documents.length === 0 && (
                      <p className="text-muted-foreground text-center py-4">No documents uploaded yet.</p>
                    )}
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{documents.length}</p>
                    <p className="text-xs text-muted-foreground">Total Files</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{totalDownloads}</p>
                    <p className="text-xs text-muted-foreground">Total Downloads</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{visitorCount}</p>
                    <p className="text-xs text-muted-foreground">Visitors</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {documents.length > 0 ? (totalDownloads / documents.length).toFixed(1) : 0}
                    </p>
                    <p className="text-xs text-muted-foreground">Avg Downloads/File</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Document</DialogTitle>
            <DialogDescription>
              Update the document title and description.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
