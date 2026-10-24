import api from "@/lib/api";
import { RestaurantCategory, MenuItem } from "@/types";

export const restaurantService = {
  listCategories: async (): Promise<RestaurantCategory[]> => {
    try {
      const res = await api.get<{
        data: { categories: RestaurantCategory[]; total: number };
      }>("/restaurant/categories", { params: { limit: 100 } });
      return res.data.data.categories;
    } catch {
      return [];
    }
  },

  listMenu: async (params?: {
    search?: string;
    categoryId?: string;
    veg?: boolean;
    featured?: boolean;
    isAvailable?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ items: MenuItem[]; total: number; totalPages: number }> => {
    try {
      const res = await api.get<{
        data: { items: MenuItem[]; total: number; totalPages: number };
      }>("/restaurant/menu", { params });
      return res.data.data;
    } catch {
      return { items: [], total: 0, totalPages: 0 };
    }
  },

  getFeaturedMenu: async (): Promise<MenuItem[]> => {
    try {
      const res = await api.get<{ data: { items: MenuItem[] } }>(
        "/restaurant/menu/featured"
      );
      return res.data.data.items;
    } catch {
      return [];
    }
  },

  getMenuHighlights: async (): Promise<import("@/types").MenuHighlightItem[]> => {
    try {
      const res = await api.get<{ data: { highlights: import("@/types").MenuHighlightItem[] } }>(
        "/restaurant/highlights"
      );
      return res.data.data.highlights || [];
    } catch {
      return [];
    }
  },
};
