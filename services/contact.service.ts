import api from "@/lib/api";
import { ContactInfo, ContactInquiry } from "@/types";

export const contactService = {
  getContact: async (): Promise<ContactInfo | null> => {
    try {
      const res = await api.get<{ data: { contact: ContactInfo } }>("/contact");
      return res.data.data.contact;
    } catch {
      return null;
    }
  },

  createInquiry: async (data: {
    customerName: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<ContactInquiry> => {
    const res = await api.post<{ data: { inquiry: ContactInquiry } }>(
      "/contact/inquiry",
      data
    );
    return res.data.data.inquiry;
  },
};
