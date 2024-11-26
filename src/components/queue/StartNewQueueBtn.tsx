import { deleteParty } from "@/api/party";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const StartNewQueueBtn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => await deleteParty(),
    onSuccess: () => {
      toast.success("Done! Create a new party.");
      queryClient.invalidateQueries({ queryKey: ["currentParty"] });
      queryClient.removeQueries({ queryKey: ["currentParty"] });
      router.replace("/start");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Failed to delete party");
    },
    onMutate: () => {
      toast.dismiss();
    },
  });

  const handleStartNewQueue = () => mutate();

  return (
    <div className="flex flex-col justify-center">
      <button
        className="mx-auto block py-2 px-6 mt-8 mb-2 rounded-full bg-brandMediumBrown text-xl fira-sans-condensed font-semibold text-brandDarkBrown"
        onClick={handleStartNewQueue}
        disabled={isPending}
      >
        {isPending ? "Working..." : "Start New Queue"}
      </button>
      <span className="text-xs fira-sans-condensed text-center">
        If you need to make changes to your party size, start a new queue.
        <br /> Note: You&apos;ll lose your current position.
      </span>
    </div>
  );
};

export default StartNewQueueBtn;
