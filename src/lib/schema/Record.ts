import { z } from "zod";

export const Record = z.object({
  name_surname: z.string().max(36),
  phone: z.string().max(10),
  need: z.enum(["Kurtarma", "Yemek", "Isınma", "Sağlık", "Diğer"]),
  loc_words: z.string(),
  nearest_place: z.string(),
  created_at: z.number(),
});

export type RecordType = z.infer<typeof Record>;
