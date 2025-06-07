"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import "./index.css";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const FormSchema = z.object({
  type: z.enum(["borrower", "lender"]), // from radio input
  title: z.string().min(1, { message: "Title is required" }),
  amount: z.coerce.number().gt(0, { message: "Amount must be greater than 0" }), // use `coerce` for number input
  username: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
  description: z.string().optional(), // optional textarea
});
export default function InputForm() {
  const [member, setMember] = useState<"Lender" | "Borrower">("Lender");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "borrower",
      title: "",
      amount: 0,
      username: "",
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Submitted Data:", data);
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="p-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>

                <div className="flex items-center gap-2">
                  <label htmlFor="borrower" className="block">
                    <input
                      type="radio"
                      id="borrower"
                      name="type"
                      value="borrower"
                      checked={field.value === "borrower"}
                      className="peer hidden"
                      onChange={() => {
                        field.onChange("borrower");
                        setMember("Lender");
                      }} // 👈 Borrower selected => member = Lender
                    />
                    <div className="h-[50px] border bg-amber-200 peer-checked:border-primary rounded-md flex items-center justify-center">
                      Borrow
                    </div>
                  </label>

                  <label htmlFor="lender" className="block ">
                    <input
                      type="radio"
                      id="lender"
                      name="type"
                      value="lender"
                      checked={field.value === "lender"}
                      className="peer hidden"
                      onChange={() => {
                        field.onChange("lender");
                        setMember("Borrower");
                      }} // 👈 Borrower selected => member = Lender
                    />
                    <div className="h-[50px] border bg-amber-200 peer-checked:border-primary rounded-md flex items-center justify-center">
                      Lend
                    </div>
                  </label>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter subject or title..."
                    {...field}
                    className="placeholder:text-sm"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    placeholder="Enter amount..."
                    className="placeholder:text-sm"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{member} email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter email..."
                    className="placeholder:text-sm"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description(optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your description..."
                    className="placeholder:text-sm"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
