// src/hooks/useInputForm.ts
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const FormSchema = z.object({
  type: z.enum(["borrower", "lender"]),
  title: z.string().min(1, { message: "Title is required" }),
  amount: z.union([
    z.string().regex(/^\s*$/, { message: "Amount is required" }),
    z.coerce.number().gt(0, { message: "Amount must be greater than 0" }),
  ]),
  shareTo: z.string().optional(),
  description: z.string().optional(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;

export function useInputForm() {
  return useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "borrower",
      title: "",
      amount: "",
      shareTo: "",
      description: "",
    },
  });
}
