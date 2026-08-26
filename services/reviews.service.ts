import api from "@/lib/api";
import { Review } from "@/types";

export const reviewsService = {
  listReviews: async (params?: {
    approved?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ reviews: Review[]; total: number; totalPages: number }> => {
    try {
      const res = await api.get<{
        data: { reviews: Review[]; total: number; totalPages: number };
      }>("/reviews", { params });
      return res.data.data;
    } catch {
      return { reviews: [], total: 0, totalPages: 0 };
    }
  },

  addReview: async (data: {
    customerName: string;
    rating: number;
    review: string;
  }): Promise<Review> => {
    const res = await api.post<{ data: { review: Review } }>("/reviews", data);
    return res.data.data.review;
  },
};
