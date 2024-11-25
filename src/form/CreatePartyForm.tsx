"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createParty } from "@/api/party";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { usePartyContext } from "@/contexts/PartyContext";

const CreatePartyForm = () => {
  const [partyName, setPartyName] = useState("");
  const [partySize, setPartySize] = useState(0);
  const MAX_CAPACITY = 10;

  const queryClient = useQueryClient();
  const router = useRouter();
  const { setName } = usePartyContext();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { name: string; size: number }) =>
      await createParty(data),
    onSuccess: () => {
      setName(partyName);
      toast.success("Party created! You've been added to the queue.");
      queryClient.invalidateQueries({ queryKey: ["currentParty"] });
      router.push("/");
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
      toast.error("Party size cannot exceed 10.");
      return;
    }
    setPartySize(e.target.value === "" ? 0 : parseInt(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ name: partyName, size: partySize });
  };

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
          className="py-2 px-2 mt-2 rounded-full w-1/2 bg-brandBeige text-xl fira-sans-condensed font-semibold text-brandDarkBrown"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePartyForm;
