import { useQuery } from "@tanstack/react-query";

import { type THistoryByUidConfig, getHistoryByUid } from "./gethistoryByUid";

export const useGetHistoryByUidQuery = ({ config, params }: THistoryByUidConfig) =>
  useQuery({
    queryKey: ["getHistoryByUid"],
    queryFn: () => getHistoryByUid({ config, params })
  });
