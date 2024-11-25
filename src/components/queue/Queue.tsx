"use client";

import { useParty } from "@/hooks/useParty";
import { checkInParty } from "@/api/party";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { usePartyContext } from "@/contexts/PartyContext";

const Queue = () => {
  const { party } = useParty();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { name } = usePartyContext();

  const { mutate } = useMutation({
    mutationFn: async () => await checkInParty(),
    onSuccess: () => {
      toast.success("Checked in! Head to your assigned table!");
      router.push("/seated");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data || "Failed to check in");
    },
    onMutate: () => {
      toast.dismiss();
    },
  });

  const handleCheckIn = () => mutate();

  if (!party) return null;

  return (
    <div className="flex-1 items-center h-full justify-center px-6">
      {party.status === "pending_check_in" ? (
        <div className="bg-brandMediumPink rounded-2xl p-6 shadow-lg w-full max-w-sm text-center">
          <h1 className="pacifico text-brandDarkBrown text-3xl mb-4">
            You're Up, {name.toUpperCase()}!
          </h1>
          <p className="fira-sans-condensed text-brandBeige text-lg mb-6">
            Your table is ready. Tap below to check in.
          </p>
          <button
            onClick={handleCheckIn}
            className="bg-brandDarkBrown text-brandLightText py-3 px-6 rounded-full text-lg font-semibold shadow-md hover:bg-brandMediumBrown transition-all"
          >
            Check In
          </button>
        </div>
      ) : (
        <div className="bg-brandMediumPink rounded-2xl p-6 shadow-lg w-full max-w-sm text-center">
          <h1 className="pacifico text-brandDarkBrown text-3xl mb-4">
            Hey, {name}! You're in the Queue!
          </h1>
          <p className="fira-sans-condensed text-brandBeige text-2xl mb-2">
            Position:{" "}
          </p>
          <div className="font-bold text-brandDarkBrown text-8xl">
            {party.queuePosition}
          </div>
        </div>
      )}
    </div>
  );
};

export default Queue;
