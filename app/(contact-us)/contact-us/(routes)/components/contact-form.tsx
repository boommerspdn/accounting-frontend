"use client";

import { useState } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(1, "ชื่อต้องมีอย่างน้อย 1 ตัวอักษร").max(23),
  email: z
    .string()
    .email("อีเมลไม่ถูกต้อง")
    .min(1, "อีเมลต้องมีอย่างน้อย 1 ตัวอักษร")
    .max(50),
  phone: z.string().min(1, "เบอร์โทรศัพท์ต้องมีอย่างน้อย 1 ตัวอักษร").max(23),
  company: z.string().max(23).optional(),
  message: z.string().min(1, "ข้อความต้องมีอย่างน้อย 1 ตัวอักษร"),
});

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    console.log(data);
    setTimeout(() => {
      form.reset();
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>ชื่อ</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="กรอกชื่อของคุณ" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>อีเมล</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="กรอกอีเมลของคุณ" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>เบอร์โทรศัพท์</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]+"
                    placeholder="กรอกเบอร์โทรศัพท์ของคุณ"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>
                  ชื่อบริษัท{" "}
                  <span className="text-destructive">(*ไม่จำเป็น)</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="กรอกชื่อบริษัทของคุณ" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>ข้อความ</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="กรอกข้อความที่ต้องการส่งหาเรา"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-custom-blue py-2 px-20 rounded-full text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : "ส่งข้อความ"}
          </button>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
