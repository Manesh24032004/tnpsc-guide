/**
 * Document Service
 * 
 * Handles all document operations (PDFs, Notes, Papers, etc.)
 * Currently uses Supabase, can be swapped to MongoDB backend.
 */

import { supabase } from '@/integrations/supabase/client';
import { USE_MONGODB_BACKEND, MONGODB_API_URL, API_ENDPOINTS } from './config';
import { authService } from './authService';
import type { Document, DocumentUploadRequest, ApiResponse, PaginatedResponse } from './types';

class DocumentService {
  private getHeaders() {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    const token = authService.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  // Get all documents
  async getDocuments(category?: string): Promise<ApiResponse<Document[]>> {
    if (USE_MONGODB_BACKEND) {
      try {
        const url = category
          ? `${MONGODB_API_URL}${API_ENDPOINTS.DOCUMENTS_BY_CATEGORY(category)}`
          : `${MONGODB_API_URL}${API_ENDPOINTS.DOCUMENTS}`;
        
        const response = await fetch(url, { headers: this.getHeaders() });
        return await response.json();
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }

    // Supabase implementation
    let query = supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      return { success: false, error: error.message };
    }

    // Map Supabase format to our API format
    const documents: Document[] = (data || []).map((doc) => ({
      _id: doc.id,
      title: doc.title,
      description: doc.description || undefined,
      category: doc.category as Document['category'],
      subcategory: doc.subcategory || undefined,
      filePath: doc.file_path,
      fileName: doc.file_name,
      fileSize: doc.file_size || undefined,
      downloadCount: doc.download_count || 0,
      uploadedBy: doc.uploaded_by || undefined,
      createdAt: doc.created_at,
      updatedAt: doc.updated_at,
    }));

    return { success: true, data: documents };
  }

  // Upload document
  async uploadDocument(request: DocumentUploadRequest): Promise<ApiResponse<Document>> {
    if (USE_MONGODB_BACKEND) {
      try {
        const formData = new FormData();
        formData.append('file', request.file);
        formData.append('title', request.title);
        formData.append('category', request.category);
        if (request.description) formData.append('description', request.description);
        if (request.subcategory) formData.append('subcategory', request.subcategory);

        const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.DOCUMENTS}`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${authService.getToken()}` },
          body: formData,
        });
        return await response.json();
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }

    // Supabase implementation
    const { file, title, description, category, subcategory } = request;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${category}/${fileName}`;

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file);

    if (uploadError) {
      return { success: false, error: uploadError.message };
    }

    // Insert metadata
    const { data, error: dbError } = await supabase
      .from('documents')
      .insert({
        title,
        description,
        category,
        subcategory,
        file_path: filePath,
        file_name: file.name,
        file_size: file.size,
      })
      .select()
      .single();

    if (dbError) {
      return { success: false, error: dbError.message };
    }

    return {
      success: true,
      data: {
        _id: data.id,
        title: data.title,
        description: data.description || undefined,
        category: data.category as Document['category'],
        subcategory: data.subcategory || undefined,
        filePath: data.file_path,
        fileName: data.file_name,
        fileSize: data.file_size || undefined,
        downloadCount: data.download_count || 0,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
    };
  }

  // Update document
  async updateDocument(id: string, updates: Partial<Document>): Promise<ApiResponse<Document>> {
    if (USE_MONGODB_BACKEND) {
      try {
        const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.DOCUMENTS}/${id}`, {
          method: 'PATCH',
          headers: this.getHeaders(),
          body: JSON.stringify(updates),
        });
        return await response.json();
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }

    // Supabase implementation
    const { data, error } = await supabase
      .from('documents')
      .update({
        title: updates.title,
        description: updates.description,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      data: {
        _id: data.id,
        title: data.title,
        description: data.description || undefined,
        category: data.category as Document['category'],
        subcategory: data.subcategory || undefined,
        filePath: data.file_path,
        fileName: data.file_name,
        fileSize: data.file_size || undefined,
        downloadCount: data.download_count || 0,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
    };
  }

  // Delete document
  async deleteDocument(id: string, filePath: string): Promise<ApiResponse<null>> {
    if (USE_MONGODB_BACKEND) {
      try {
        const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.DOCUMENTS}/${id}`, {
          method: 'DELETE',
          headers: this.getHeaders(),
        });
        return await response.json();
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }

    // Supabase implementation - delete from storage first
    const { error: storageError } = await supabase.storage
      .from('documents')
      .remove([filePath]);

    if (storageError) {
      return { success: false, error: storageError.message };
    }

    // Delete metadata
    const { error: dbError } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);

    if (dbError) {
      return { success: false, error: dbError.message };
    }

    return { success: true };
  }

  // Get public URL for document
  getPublicUrl(filePath: string): string {
    if (USE_MONGODB_BACKEND) {
      return `${MONGODB_API_URL}/files/${filePath}`;
    }

    const { data } = supabase.storage.from('documents').getPublicUrl(filePath);
    return data.publicUrl;
  }

  // Increment download count
  async incrementDownload(id: string): Promise<void> {
    if (USE_MONGODB_BACKEND) {
      await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.DOCUMENT_DOWNLOAD(id)}`, {
        method: 'POST',
        headers: this.getHeaders(),
      });
      return;
    }

    // Supabase - get current count and increment
    const { data } = await supabase
      .from('documents')
      .select('download_count')
      .eq('id', id)
      .single();

    if (data) {
      await supabase
        .from('documents')
        .update({ download_count: (data.download_count || 0) + 1 })
        .eq('id', id);
    }
  }
}

export const documentService = new DocumentService();
