"use client";

import { toast } from "sonner";
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
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { images } from "@/constants/images";
import "./index.css";
import { FormSchemaType, useInputForm } from "./addActivity.hooks";
import { BiChevronLeft } from "react-icons/bi";
import { useRouter } from "next/navigation";

export default function InputForm() {
  const form = useInputForm();
  const router = useRouter();

  function onSubmit(data: FormSchemaType) {
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
    <>
      <div className="border-b-1  relative p-5">
        <button
          className="absolute left-5 top-3.5 h-[40px] w-[40px] cursor-pointer"
          onClick={() => router.push("/")}
        >
          <BiChevronLeft size={28} />
        </button>
        <h5 className="text-lg font-medium text-center">Add New Transaction</h5>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 p-5 pb-20"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What are you tracking?</FormLabel>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {["borrower", "lender"].map((role) => (
                    <label
                      htmlFor={role}
                      className="block cursor-pointer h-full"
                      key={role}
                    >
                      <input
                        type="radio"
                        id={role}
                        name="type"
                        value={role}
                        checked={field.value === role}
                        className="peer hidden"
                        onChange={() => field.onChange(role)}
                      />
                      <div className="flex-col border-2 peer-checked:bg-secondary peer-checked:border-primary rounded-md flex items-center justify-center p-5 gap-5 peer-checked:text-white h-full w-full">
                        <Image
                          src={
                            role === "borrower" ? images.Borrow : images.Lend
                          }
                          alt={`${role} money`}
                          height={32}
                          width={100}
                        />

                        <div className="flex items-center flex-col gap-2">
                          <h5 className="font-medium text-lg">
                            {role === "borrower" ? "Borrow" : "Lend"}
                          </h5>

                          <p className=" text-pretty text-center text-sm">
                            {role === "borrower"
                              ? "You borrowed money from someone. Track what you need to pay."
                              : "You lent money to someone. Track what they owe you."}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
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
                    {...field}
                    className="placeholder:text-sm !focus:border-[var(--primary)]
                    "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shareTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Share with (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter email..."
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your description..."
                    {...field}
                    className="placeholder:text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-[42px]">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
