import React from "react";
import { Button } from "./ui/button";
import Spinner from "./Spinner";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}
const SubmitButton = ({ isLoading, children, className }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={ className??"shad-primary-btn w-full "}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
