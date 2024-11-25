import { autoLogin } from "@/api/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useParty = () => {
  const queryClient = useQueryClient();
  const [retry, setRetry] = useState(true);
  const router = useRouter();

  const { data, isFetching, error } = useQuery({
    queryKey: ["currentParty"],
    enabled: retry,
    staleTime: 10000,
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    queryFn: async () => (await autoLogin()).data,
  });

  useEffect(() => {
    if (error) {
      queryClient.removeQueries(["currentParty"]);
      setRetry(false);
      // router.replace("/login");
    }
  }, [error]);

  return {
    party: data,
    error,
    isFetching,
  };
};
