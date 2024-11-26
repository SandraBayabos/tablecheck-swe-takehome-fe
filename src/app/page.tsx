"use client";

import Queue from "@/components/queue/Queue";
import { useParty } from "@/hooks/useParty";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";

export default function Home() {
  const router = useRouter();

  const { party, isFetching } = useParty();

  if (isFetching && !party) {
    return <Loader />;
  }

  if (party && ["pending_check_in", "in_queue"].includes(party.status)) {
    return <Queue />;
  }

  if (party && ["seated", "finished"].includes(party.status)) {
    router.replace("/seated");
  }

  return null;
}
