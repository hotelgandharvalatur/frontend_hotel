import api from "@/lib/api";
import { AboutContent } from "@/types";

export const aboutService = {
  getAbout: async (): Promise<AboutContent | null> => {
    try {
      const res = await api.get<{ data: { about: AboutContent } }>("/about");
      return res.data.data.about;
    } catch {
      return null;
    }
  },
};
