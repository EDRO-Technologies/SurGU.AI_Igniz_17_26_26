import { useQuery } from "@tanstack/react-query";

import { getProfile } from "./getProfile";

export const useGetProfileQuery = ({ config }: QuerySettings<typeof getProfile>) =>
  useQuery({
    queryKey: ["getProfile"],
    queryFn: () => getProfile({ config })
  });
