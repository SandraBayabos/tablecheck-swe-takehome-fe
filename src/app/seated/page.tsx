"use client";

import { useParty } from "@/hooks/useParty";
import { NextPage } from "next";
import Image from "next/image";
import StartNewQueueBtn from "@/components/queue/StartNewQueueBtn";

const Page: NextPage = () => {
  const { party } = useParty();
  return (
    <div className="flex flex-col items-center justify-center min-h-fit bg-brandBeige text-center">
      <h1 className="text-4xl font-bold text-brandDarkBrown pacifico mb-4">
        Enjoy Your Meal, {party?.name}!
      </h1>
      <p className="text-lg text-brandMediumBrown mb-6 fira-sans-condensed">
        Thank you for dining with us!
      </p>
      <div className="">
        <Image
          src="/images/table-rounded.png"
          alt="Table for two"
          width={300}
          height={300}
        />
      </div>
      <StartNewQueueBtn />
    </div>
  );
};

export default Page;
