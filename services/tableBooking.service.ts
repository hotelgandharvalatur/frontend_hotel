import api from "@/lib/api";
import { TableBooking } from "@/types";

export interface CreateTableBookingInput {
  customerName: string;
  name?: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  numberOfGuests: number;
  guests?: number;
  specialRequests?: string;
  notes?: string;
}

export const tableBookingService = {
  createBooking: async (data: CreateTableBookingInput): Promise<TableBooking> => {
    const res = await api.post<{ data: { booking: TableBooking } }>(
      "/bookings",
      data
    );
    return res.data.data.booking;
  },

  getBookingById: async (id: string): Promise<TableBooking | null> => {
    try {
      const res = await api.get<{ data: { booking: TableBooking } }>(
        `/bookings/${id}`
      );
      return res.data.data.booking;
    } catch {
      return null;
    }
  },
};

export default tableBookingService;
