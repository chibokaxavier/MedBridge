import Patient from "@/components/Form/PatientForm";
import RegisterForm from "@/components/Form/RegisterForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Registration = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container gap-2 max-w-[496px]">
          <Image
            src="/Medbridge.png"
            height={1000}
            width={2000}
            alt="logo"
            className="mb-8 h-10 w-fit"
          />
          <RegisterForm />
          <div className="text-14-regular flex justify-between mt-10">
            <p className="justify-items-end xl:text-left text-dark-600">
              © 2024 MedBridge
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/registration.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[70%]"
      />
    </div>
  );
};

export default Registration;
