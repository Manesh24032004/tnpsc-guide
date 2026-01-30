/**
 * Image Service
 * 
 * Handles all image operations (Logos, Tamil Scholars, Book Covers, etc.)
 * Currently uses Supabase, can be swapped to MongoDB backend.
 */

import { supabase } from '@/integrations/supabase/client';
import { USE_MONGODB_BACKEND, MONGODB_API_URL, API_ENDPOINTS } from './config';
import { authService } from './authService';
import type { ImageRecord, ImageUploadRequest, ApiResponse } from './types';

class ImageService {
  private getHeaders() {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    const token = authService.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  // Get all images
  async getImages(category?: string): Promise<ApiResponse<ImageRecord[]>> {
    if (USE_MONGODB_BACKEND) {
      try {
        const url = category
          ? `${MONGODB_API_URL}${API_ENDPOINTS.IMAGES_BY_CATEGORY(category)}`
          : `${MONGODB_API_URL}${API_ENDPOINTS.IMAGES}`;
        
        const response = await fetch(url, { headers: this.getHeaders() });
        return await response.json();
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }

    // Supabase implementation - list from storage bucket
    try {
      const allImages: ImageRecord[] = [];
      const categories = ['logos', 'tamil-scholars', 'book-covers', 'poets', 'standards', 'subjects', 'carousel', 'general'];
      
      const categoriesToFetch = category ? [category.toLowerCase().replace(' ', '-')] : categories;

      for (const cat of categoriesToFetch) {
        const { data: files } = await supabase.storage
          .from('images')
          .list(cat, { limit: 100 });

        if (files) {
          for (const file of files) {
            if (file.id && !file.name.endsWith('/')) {
              const filePath = `${cat}/${file.name}`;
              const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

              allImages.push({
                _id: file.id,
                title: file.name.replace(/\.[^/.]+$/, ''),
                category: cat as ImageRecord['category'],
                fileName: file.name,
                filePath: filePath,
                fileSize: file.metadata?.size,
                url: publicUrl,
                createdAt: file.created_at || new Date().toISOString(),
              });
            }
          }
        }
      }

      return { success: true, data: allImages };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Upload image
  async uploadImage(request: ImageUploadRequest): Promise<ApiResponse<ImageRecord>> {
    if (USE_MONGODB_BACKEND) {
      try {
        const formData = new FormData();
        formData.append('file', request.file);
        formData.append('title', request.title);
        formData.append('category', request.category);
        if (request.description) formData.append('description', request.description);
        if (request.subcategory) formData.append('subcategory', request.subcategory);

        const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.IMAGE_UPLOAD}`, {
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
    const { file, title, category, description, subcategory } = request;
    const categoryFolder = category.toLowerCase().replace(' ', '-');
    const timestamp = Date.now();
    const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const ext = file.name.split('.').pop();
    const filePath = `${categoryFolder}/${sanitizedTitle}-${timestamp}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      return { success: false, error: uploadError.message };
    }

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return {
      success: true,
      data: {
        _id: `${timestamp}`,
        title,
        description,
        category: categoryFolder as ImageRecord['category'],
        subcategory,
        fileName: file.name,
        filePath,
        fileSize: file.size,
        url: publicUrl,
        createdAt: new Date().toISOString(),
      },
    };
  }

  // Delete image
  async deleteImage(filePath: string): Promise<ApiResponse<null>> {
    if (USE_MONGODB_BACKEND) {
      try {
        const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.IMAGES}`, {
          method: 'DELETE',
          headers: this.getHeaders(),
          body: JSON.stringify({ filePath }),
        });
        return await response.json();
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }

    // Supabase implementation
    const { error } = await supabase.storage
      .from('images')
      .remove([filePath]);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  // Get public URL for image
  getPublicUrl(filePath: string): string {
    if (USE_MONGODB_BACKEND) {
      return `${MONGODB_API_URL}/files/images/${filePath}`;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);
    return publicUrl;
  }
}

export const imageService = new ImageService();
