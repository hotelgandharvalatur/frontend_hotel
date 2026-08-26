import api from "@/lib/api";
import { GalleryItem } from "@/types";

export const galleryService = {
  listGallery: async (params?: {
    type?: "image" | "video";
    category?: string;
    page?: number;
    limit?: number;
  }): Promise<{ items: GalleryItem[]; total: number; totalPages: number }> => {
    try {
      const res = await api.get<{
        data: { items: GalleryItem[]; total: number; totalPages: number };
      }>("/gallery", { params });
      return res.data.data;
    } catch {
      return { items: [], total: 0, totalPages: 0 };
    }
  },
};
