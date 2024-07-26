import React from "react";
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
import { RiContactsLine } from "react-icons/ri";

interface CustomProps {
  control: any;
  fieldTypes: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  dateFormat?: string;
  showtimeselect?: Boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    control,
    fieldTypes,
    name,
    label,
    placeholder,
    disabled,
    dateFormat,
    showtimeselect,
  } = props;
  switch (fieldTypes) {
    case FormFieldType.INPUT:
      return (
        <div className="flex justify-center items-center pl-4 rounded-md border border-dark-500 bg-dark-400 ">
          <RiContactsLine />
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
