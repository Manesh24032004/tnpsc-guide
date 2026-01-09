/**
 * Admin Dashboard Component
 * 
 * This admin dashboard uses dummy data and frontend-only logic.
 * Real-time visitors, downloads, and file management
 * can be implemented using backend technologies
 * like Node.js / PHP and a database.
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
  Shield
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

// Interface for uploaded files
interface UploadedFile {
  id: string;
  name: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  size: number;
  uploadDate: string;
  downloads: number;
}

// Dummy statistics data (frontend only)
const DUMMY_STATS = {
  totalVisitors: 1245,
  totalDownloads: 368,
  activeUsers: 89,
  documentsViewed: 2456
};

const Admin = () => {
  const navigate = useNavigate();
  
  // Check if admin is logged in via localStorage
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  
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
  
  // Uploaded files stored in localStorage (frontend-only storage)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(() => {
    const saved = localStorage.getItem('admin-uploaded-files');
    return saved ? JSON.parse(saved) : [];
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
    setLoading(false);
    
    // Redirect to admin login if not authenticated
    if (!adminStatus) {
      navigate('/admin-login');
    }
  }, [navigate]);

  // Save uploaded files to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('admin-uploaded-files', JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  // Handle file upload (frontend-only, stores in localStorage)
  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation: Check if file is selected
    if (!uploadForm.file) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    // Validation: Check if category is selected
    if (!uploadForm.category) {
      toast({
        title: "Category Required",
        description: "Please select a category.",
        variant: "destructive",
      });
      return;
    }

    // Validation: Check if title is provided
    if (!uploadForm.title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a document title.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new file entry
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      name: uploadForm.file.name,
      title: uploadForm.title,
      description: uploadForm.description,
      category: uploadForm.category,
      subcategory: uploadForm.subcategory,
      size: uploadForm.file.size,
      uploadDate: new Date().toISOString(),
      downloads: 0
    };
    
    // Add to uploaded files list
    setUploadedFiles(prev => [newFile, ...prev]);
    
    // Reset form
    setUploadForm({ title: '', description: '', category: '', subcategory: '', file: null });
    setIsUploading(false);
    
    toast({
      title: "File Uploaded Successfully",
      description: `"${newFile.title}" has been added to the system.`,
    });
  };

  // Handle file deletion with confirmation
  const handleDelete = (file: UploadedFile) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== file.id));
    toast({
      title: "File Deleted",
      description: `"${file.title}" has been removed.`,
    });
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

  // Handle view file (simulated - opens alert since no real file)
  const handleView = (file: UploadedFile) => {
    toast({
      title: "View File",
      description: `Viewing "${file.title}" - In a real system, this would open the file.`,
    });
  };

  // Filter files by category
  const filteredFiles = filterCategory === 'all' 
    ? uploadedFiles 
    : uploadedFiles.filter(f => f.category === filterCategory);

  // Format file size for display
  const formatFileSize = (bytes: number) => {
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

  // Calculate total downloads from all files
  const totalDownloads = uploadedFiles.reduce((sum, file) => sum + file.downloads, 0) + DUMMY_STATS.totalDownloads;

  // Show loading spinner while checking auth
  if (loading) {
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
                Welcome, Admin • Manage documents and content
              </p>
            </div>
          </div>
          <Button 
            variant="destructive" 
            onClick={handleLogout}
            className="flex items-center gap-2 w-fit"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Statistics Cards Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* Total Visitors Card */}
          <Card className="p-4 sm:p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{DUMMY_STATS.totalVisitors.toLocaleString()}</h3>
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
            <h3 className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">{uploadedFiles.length}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Total Documents</p>
          </Card>
          
          {/* Documents Viewed Card */}
          <Card className="p-4 sm:p-6 text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">{DUMMY_STATS.documentsViewed.toLocaleString()}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Documents Viewed</p>
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
                
                {/* Category Filter */}
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
              
              {/* Files List */}
              {filteredFiles.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">No files uploaded yet</p>
                  <p className="text-sm">Upload your first document using the Upload tab</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFiles.map((file) => (
                    <div key={file.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4 hover:bg-muted/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        {/* File Title and Name */}
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                          <h3 className="font-semibold text-sm sm:text-base truncate">{file.title}</h3>
                        </div>
                        
                        {/* File Name */}
                        <p className="text-xs text-muted-foreground ml-7 truncate">{file.name}</p>
                        
                        {/* Description */}
                        {file.description && (
                          <p className="text-xs sm:text-sm text-muted-foreground ml-7 truncate mt-1">{file.description}</p>
                        )}
                        
                        {/* Badges and Meta Info */}
                        <div className="flex flex-wrap items-center gap-2 mt-2 ml-7">
                          <Badge variant="secondary" className="text-xs">
                            {file.category}
                          </Badge>
                          {file.subcategory && (
                            <Badge variant="outline" className="text-xs">
                              {file.subcategory}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(file.uploadDate)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            • {formatFileSize(file.size)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 ml-7 sm:ml-0">
                        {/* View Button */}
                        <Button variant="outline" size="sm" onClick={() => handleView(file)} title="View File">
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {/* Delete Button with Confirmation */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" title="Delete File">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Document</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{file.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(file)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
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
            {/* Category Breakdown */}
            <Card className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Documents by Category
              </h3>
              <div className="space-y-4">
                {categories.map(cat => {
                  const count = uploadedFiles.filter(f => f.category === cat.value).length;
                  const percentage = uploadedFiles.length > 0 ? (count / uploadedFiles.length) * 100 : 0;
                  return (
                    <div key={cat.value}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{cat.label}</span>
                        <span className="text-muted-foreground">{count} files</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-4 sm:p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Recent Uploads</h3>
              {uploadedFiles.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No recent activity</p>
              ) : (
                <div className="space-y-3">
                  {uploadedFiles.slice(0, 5).map(file => (
                    <div key={file.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.title}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(file.uploadDate)}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">{file.category}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* System Info Note */}
            <Card className="p-4 sm:p-6 mt-6 bg-muted/30">
              <p className="text-xs text-muted-foreground text-center">
                <strong>Note:</strong> This admin dashboard uses dummy data and frontend-only logic. 
                Real-time visitors, downloads, and file management can be implemented using backend 
                technologies like Node.js / PHP and a database.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;