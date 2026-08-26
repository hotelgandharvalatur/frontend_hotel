import api from "@/lib/api";
import { BanquetHall, BanquetBooking } from "@/types";

export const banquetService = {
  listHalls: async (): Promise<BanquetHall[]> => {
    try {
      const res = await api.get<{
        data: { halls: BanquetHall[]; total: number };
      }>("/banquet/halls", { params: { limit: 50 } });
      return res.data.data.halls;
    } catch {
      return [];
    }
  },

  getHallById: async (id: string): Promise<BanquetHall | null> => {
    try {
      const res = await api.get<{ data: { hall: BanquetHall } }>(
        `/banquet/halls/${id}`
      );
      return res.data.data.hall;
    } catch {
      return null;
    }
  },

  createBooking: async (data: {
    customerName: string;
    phone: string;
    email: string;
    hall: string;
    eventType: string;
    date: string;
    time: string;
    numberOfGuests: number;
    foodRequirement?: string;
    notes?: string;
  }): Promise<BanquetBooking> => {
    const res = await api.post<{ data: { booking: BanquetBooking } }>(
      "/banquet/book",
      data
    );
    return res.data.data.booking;
  },
};
