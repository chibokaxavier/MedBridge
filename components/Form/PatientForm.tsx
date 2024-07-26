"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "../customFormField";
import { MdOutlineMail } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
const Patient = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi,there 👋</h1>
          <p className="text-dark-700">Book your first appointment</p>
        </section>
        <CustomFormField
          control={form.control}
          fieldTypes={FormFieldType.INPUT}
          name="name"
          label="Full Name"
          placeholder="John doe"
          icon={<RiContactsLine />}
        />
        <CustomFormField
          control={form.control}
          fieldTypes={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="Johndoe@gmail.com"
          icon={<MdOutlineMail />}
        />
        <CustomFormField
          control={form.control}
          fieldTypes={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone"
          placeholder="(234) 5678 91011"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default Patient;
