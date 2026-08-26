import api from "@/lib/api";
import { Branch } from "@/types";

export const branchesService = {
  listBranches: async (params?: {
    isActive?: boolean;
  }): Promise<Branch[]> => {
    try {
      const res = await api.get<{
        data: { branches: Branch[]; total: number };
      }>("/branches", { params });
      return res.data.data.branches;
    } catch {
      return [];
    }
  },
};
