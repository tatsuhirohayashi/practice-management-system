import { z } from "zod";

// レッスン予約フォームのバリデーションスキーマ
export const reserveFormSchema = z.object({
  lesson_location: z
    .string()
    .min(1, "レッスン場所は必須です")
    .max(50, "レッスン場所は50文字以内で入力してください"),
});

export type ReserveFormData = z.infer<typeof reserveFormSchema>;
