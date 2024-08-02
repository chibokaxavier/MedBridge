"use client";
import React, { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { FormFieldType } from "./Form/PatientForm";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomProps {
  control: any;
  fieldTypes: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  icon?: any;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState("");
  const {
    control,
    fieldTypes,
    name,
    label,
    placeholder,
    disabled,
    dateFormat,
    showTimeSelect,
    icon,
  } = props;
  switch (fieldTypes) {
    case FormFieldType.INPUT:
      return (
        <div className="flex justify-center items-center pl-4 rounded-md border border-dark-500 bg-dark-400 ">
          {icon}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
      break;

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={(field.value as string) || undefined}
            defaultCountry="US"
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 justify-center items-center  bg-dark-400 ">
          <FaCalendarAlt className="ml-2 h-4 w-4" />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldTypes, name, label, placeholder } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {fieldTypes !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
