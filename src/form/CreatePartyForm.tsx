"use client";

import { PartyResponse } from "@/api/auth";
import { createParty } from "@/api/party";
import { useParty } from "@/hooks/useParty";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const MAX_CAPACITY = 10;

const CreatePartyForm = () => {
  const { party } = useParty();

  const [partyName, setPartyName] = useState("");
  const [partySize, setPartySize] = useState(0);

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { name: string; size: number }) =>
      (await createParty(data)).data,
    onSuccess: (data: PartyResponse) => {
      toast.success("Party created! You've been added to the queue.");
      queryClient.setQueryData(["currentParty"], data);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.error ||
        "Something went wrong, please try again or speak to a host.";
      toast.error(errorMessage);
    },
    onMutate: () => {
      toast.dismiss();
    },
  });

  const handleInputPartyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPartyName(e.target.value);
  };

  const handleInputPartySize = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) > MAX_CAPACITY) {
      toast.error("Party size cannot exceed 10.", {
        id: "party-size-error",
      });
      return;
    }
    setPartySize(e.target.value === "" ? 0 : parseInt(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ name: partyName, size: partySize });
  };

  if (party) {
    router.replace("/");
  }

  return (
    <div className="w-full flex flex-col rounded-2xl bg-brandDarkBrown py-10 px-4">
      <h1 className="fira-sans-condensed font-semibold text-4xl mb-6 text-brandLightText">
        Create Party
      </h1>
      <form
        className="w-full flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <label className="fira-sans-condensed font-medium text-lg self-start text-brandLightText mb-2">
          Party Name
        </label>
        <input
          type="text"
          name="name"
          value={partyName}
          onChange={handleInputPartyName}
          className="w-full rounded-full bg-brandMediumPink mb-4 outline-none border-none focus:ring-0"
        />
        <label className="fira-sans-condensed font-medium text-lg self-start text-brandLightText mb-2">
          Party Size
        </label>
        <input
          type="number"
          name="size"
          value={partySize || ""}
          onChange={handleInputPartySize}
          className="w-full rounded-full bg-brandMediumPink mb-4 outline-none border-none focus:ring-0"
        />

        <button
          disabled={isPending}
          className="py-2 px-2 mt-2 rounded-full w-1/2 bg-brandBeige text-xl fira-sans-condensed font-semibold text-brandDarkBrown"
          type="submit"
        >
          {isPending ? "Hold on..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreatePartyForm;
