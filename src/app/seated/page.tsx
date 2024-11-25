"use client";

import { NextPage } from "next";
import Image from "next/image";
import { usePartyContext } from "@/contexts/PartyContext";

const Page: NextPage = () => {
  const { name } = usePartyContext();
  return (
    <div className="flex flex-col items-center justify-center min-h-fit bg-brandBeige text-center">
      <h1 className="text-4xl font-bold text-brandDarkBrown pacifico mb-4">
        Enjoy Your Meal, {name}!
      </h1>
      <p className="text-lg text-brandMediumBrown mb-6 fira-sans-condensed">
        Thank you for dining with us!
      </p>
      <div className="mb-8">
        <Image
          src="/images/table-rounded.png"
          alt="Table for two"
          width={350}
          height={350}
        />
      </div>
    </div>
  );
};

export default Page;
