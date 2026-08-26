import api from "@/lib/api";
import { Event, EventAvailability, EventRegistration } from "@/types";

export const eventsService = {
  listEvents: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
  }): Promise<{ events: Event[]; total: number; totalPages: number }> => {
    try {
      const res = await api.get<{
        data: { events: Event[]; total: number; totalPages: number };
      }>("/events", { params });
      return res.data.data;
    } catch {
      return { events: [], total: 0, totalPages: 0 };
    }
  },

  getEventById: async (id: string): Promise<Event | null> => {
    try {
      const res = await api.get<{ data: { event: Event } }>(`/events/${id}`);
      return res.data.data.event;
    } catch {
      return null;
    }
  },

  getFeaturedEvents: async (): Promise<Event[]> => {
    try {
      const res = await api.get<{ data: { events: Event[] } }>(
        "/events/featured"
      );
      return res.data.data.events;
    } catch {
      return [];
    }
  },

  getUpcomingEvents: async (): Promise<Event[]> => {
    try {
      const res = await api.get<{ data: { events: Event[] } }>(
        "/events/upcoming"
      );
      return res.data.data.events;
    } catch {
      return [];
    }
  },

  checkAvailability: async (id: string): Promise<EventAvailability | null> => {
    try {
      const res = await api.get<{
        data: { availability: EventAvailability };
      }>(`/events/${id}/availability`);
      return res.data.data.availability;
    } catch {
      return null;
    }
  },

  registerForEvent: async (
    id: string,
    data: {
      customerName: string;
      phone: string;
      email: string;
      numberOfGuests: number;
    }
  ): Promise<EventRegistration> => {
    const res = await api.post<{ data: { registration: EventRegistration } }>(
      `/events/${id}/register`,
      data
    );
    return res.data.data.registration;
  },
};
