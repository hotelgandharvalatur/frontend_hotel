import api from "@/lib/api";
import { CateringPackage, CateringInquiry } from "@/types";

export const cateringService = {
  listPackages: async (): Promise<CateringPackage[]> => {
    try {
      const res = await api.get<{
        data: { services: CateringPackage[]; total: number };
      }>("/catering/packages", { params: { limit: 50 } });
      return res.data.data.services;
    } catch {
      return [];
    }
  },

  createInquiry: async (data: {
    customerName: string;
    phone: string;
    email: string;
    eventDate: string;
    eventTime?: string;
    location: string;
    numberOfGuests: number;
    selectedPackage?: string;
    foodRequirements?: string;
    additionalRequirements?: string;
  }): Promise<CateringInquiry> => {
    const res = await api.post<{ data: { inquiry: CateringInquiry } }>(
      "/catering/inquiry",
      data
    );
    return res.data.data.inquiry;
  },
};
