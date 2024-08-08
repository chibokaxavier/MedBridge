"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "../customFormField";
import { MdOutlineMail } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormvalidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";

const RegisterForm = ({ user }: any) => {
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1 "
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself</p>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal information</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control}
          fieldTypes={FormFieldType.INPUT}
          name="name"
          label="Full Name"
          placeholder="John doe"
          icon={<RiContactsLine />}
        />
        <div className="flex  w-full flex-col gap-6 xl:flex-row ">
          <div className="w-full xl:w-1/2">
            <CustomFormField
              control={form.control}
              fieldTypes={FormFieldType.INPUT}
              name="email"
              label="Email"
              placeholder="Johndoe@gmail.com"
              icon={<MdOutlineMail />}
            />
          </div>
          <div className="w-full xl:w-1/2">
            <CustomFormField
              control={form.control}
              fieldTypes={FormFieldType.PHONE_INPUT}
              name="phone"
              label="Phone"
              placeholder="(234) 5678 9101"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 xl:flex-row w-full">
          <div className="w-full xl:w-1/2">
            <CustomFormField
              control={form.control}
              fieldTypes={FormFieldType.DATE_PICKER}
              name="birthDate"
              label="Date of Birth"
            />
          </div>
          <div className="w-full xl:w-1/2">
            <CustomFormField
              fieldTypes={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer ">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 xl:flex-row w-full">
          <div className="w-full xl:w-1/2">
            <CustomFormField
              control={form.control}
              fieldTypes={FormFieldType.INPUT}
              name="address"
              label="Address"
              placeholder="14th street New York"
              icon={<MdOutlineMail />}
            />
          </div>
          <div className="w-full xl:w-1/2">
            <CustomFormField
              control={form.control}
              fieldTypes={FormFieldType.INPUT}
              name="occupation"
              label="Occupation"
              placeholder="Software Engineer"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 xl:flex-row w-full">
          <div className="w-full xl:w-1/2">
            <CustomFormField
              control={form.control}
              fieldTypes={FormFieldType.INPUT}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
            />
          </div>
          <div className="w-full xl:w-1/2">
            <CustomFormField
              control={form.control}
              fieldTypes={FormFieldType.PHONE_INPUT}
              name="emergencyPhoneNumber"
              label="Emergency phone number"
              placeholder="(234) 5678 9101"
            />
          </div>
        </div>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical information</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control}
          fieldTypes={FormFieldType.SELECT}
          name="primaryPhysician"
          label="Primary physician"
          placeholder="Select a physician"
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className="flex items-center cursor-pointer gap-2">
                <Image
                  src={doctor.image}
                  height={32}
                  width={32}
                  alt={doctor.name}
                  className="rounded-full border border-dark-500"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>
        <div className="flex flex-col gap-6 xl:flex-row w-full">
          <div className="w-full xl:w-1/2">
            <CustomFormField
              control={form.control}
              fieldTypes={FormFieldType.INPUT}
              name="insuranceProvider"
              label="Insurance provider"
              placeholder="BlueCross BlueShield"
            />
          </div>
          <div className="w-full xl:w-1/2">
            <CustomFormField
              control={form.control}
              fieldTypes={FormFieldType.INPUT}
              name="insurancePolicyNumber"
              label="Insurance policy number"
              placeholder="ABC123456789"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 xl:flex-row w-full">
          <div className="w-full xl:w-1/2">
            <CustomFormField
              control={form.control}
              fieldTypes={FormFieldType.TEXTAREA}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Eggs, Chocolate"
            />
          </div>
          <div className="w-full xl:w-1/2">
            <CustomFormField
              control={form.control}
              fieldTypes={FormFieldType.TEXTAREA}
              name="currentmedication"
              label="Current Medication"
              placeholder="Ibuprofen 200mg, Amlodipine 10mg"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 xl:flex-row w-full">
          <div className="w-full xl:w-1/2">
            <CustomFormField
              control={form.control}
              fieldTypes={FormFieldType.TEXTAREA}
              name="familyMedicalHistory"
              label="Family medical history"
              placeholder="Mother had brain cancer, Father had heart disease"
            />
          </div>
          <div className="w-full xl:w-1/2">
            <CustomFormField
              control={form.control}
              fieldTypes={FormFieldType.TEXTAREA}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="Appendectomy, Tonsillectomy"
            />
          </div>
        </div>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and verification</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control}
          fieldTypes={FormFieldType.SELECT}
          name="identificationType"
          label="Identification Type"
          placeholder="Select an identification type"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              <p>{type}</p>
            </SelectItem>
          ))}
        </CustomFormField>
        <CustomFormField
          control={form.control}
          fieldTypes={FormFieldType.INPUT}
          name="identificationNumber"
          label="Identification number"
          placeholder="123456789"
        />
        <CustomFormField
          fieldTypes={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Scanned copy of uploaded document"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>
        <CustomFormField
          fieldTypes={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to treatment"
        />
        <CustomFormField
          fieldTypes={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to disclosure of information"
        />
        <CustomFormField
          fieldTypes={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I consent to privacy policy"
        />
        <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
