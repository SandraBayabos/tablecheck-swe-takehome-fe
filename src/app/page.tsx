"use client";

import Image from "next/image";
import CreatePartyForm from "@/form/CreatePartyForm";
import { useRouter } from "next/navigation";
import { useParty } from "@/hooks/useParty";
import Queue from "@/components/queue/Queue";
import { AxiosError } from "axios";

export default function Home() {
  const router = useRouter();
  const isAuthenticated = true;

  const { party, isFetching, error } = useParty();

  if (isFetching) {
    return <></>;
  }

  if (["pending_check_in", "in_queue"].includes(party?.status)) {
    return <Queue />;
  }

  console.log({
    check: error,
  });

  if (error && (error as AxiosError).response?.status === 401) {
    console.log("hey");
    router.push("/login");
  }

  router.push("/login");
}
