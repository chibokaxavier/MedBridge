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
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormvalidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormvalidation>>({
    resolver: zodResolver(UserFormvalidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async ({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormvalidation>) => {
    setisLoading(true);

    try {
      const userData = { name, email, phone };
      const user = await createUser(userData);
      if (user) {
        router.push(`/patients/${user.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  };
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
          placeholder="(234) 5678 9101"
        />
        <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
