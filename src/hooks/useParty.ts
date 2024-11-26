import { autoLogin } from "@/api/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useParty = () => {
  const queryClient = useQueryClient();
  const [retry, setRetry] = useState(true);
  const router = useRouter();

  const { data, isFetching, error, isError } = useQuery({
    queryKey: ["currentParty"],
    enabled: retry,
    staleTime: 5000,
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    queryFn: async () => (await autoLogin()).data,
  });

  useEffect(() => {
    if (!isFetching && !data && isError) {
      queryClient.removeQueries({ queryKey: ["currentParty"] });
      setRetry(false);
      router.replace("/start");
    }
  }, [error]);

  return {
    party: data,
    error,
    isError,
    isFetching,
  };
};
