import api from "@/lib/api";
import { Settings } from "@/types";

export const settingsService = {
  getSettings: async (): Promise<Settings | null> => {
    try {
      const res = await api.get<{ data: { settings: Settings } }>("/settings");
      return res.data.data.settings;
    } catch {
      return null;
    }
  },
};
