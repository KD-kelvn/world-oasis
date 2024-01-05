import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
    mutate,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return {
    isLoading,
    error,
    settings,
    mutate,
  };
}
