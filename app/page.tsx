import Patient from "@/components/Form/PatientForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container gap-2 max-w-[496px]">
          <Image
            src="/logo.png"
            height={1000}
            width={2000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />
          <Patient />
          <div className="text-14-regular flex justify-between mt-20">
            <p className="justify-items-end xl:text-left text-dark-600">
              © 2024 MedBridge
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
