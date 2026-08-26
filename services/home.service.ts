import api from "@/lib/api";
import { HomeContent } from "@/types";

export const homeService = {
  getHome: async (): Promise<HomeContent | null> => {
    try {
      const res = await api.get<{ data: { home: HomeContent } }>("/home");
      return res.data.data.home;
    } catch {
      return null;
    }
  },
};
