"use client";
import RegisterForm from "@/components/Form/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Registration = async ({ params: { userId } }: SearchParamProps) => {
//   const [user, setUser] = useState<User | null>(null);
//   useEffect(() => {
//     const get = async (userId: string) => {
//       const user = await getUser(userId);
//       setUser(user);
//     };

//     get(userId);
//   }, [userId]);
const user = await getUser(userId);

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
          <RegisterForm user={user} />
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
        src="/hospital.jpg"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Registration;
