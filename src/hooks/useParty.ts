import { useQuery } from "@tanstack/react-query";
import { autoLogin } from "@/api/auth";

export const useParty = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["currentParty"],
    staleTime: 10000,
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    queryFn: async () => (await autoLogin()).data,
  });

  return {
    party: data,
    error,
    isFetching,
  };
};
