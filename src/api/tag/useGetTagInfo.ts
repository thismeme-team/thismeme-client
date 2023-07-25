import type { QueryClient, UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "../core";

export const useGetTagInfo = (
  tagId: number,
  options: Pick<UseQueryOptions, "enabled"> = { enabled: true },
) => {
  return useQuery({
    queryKey: useGetTagInfo.queryKey(tagId),
    queryFn: () => useGetTagInfo.queryFn(tagId),
    staleTime: 0,
    ...options,
  });
};

useGetTagInfo.queryKey = (tagId: number) => ["getTagInfo", tagId] as const;

useGetTagInfo.queryFn = (tagId: number) => api.tags.getTagInfo(tagId);

useGetTagInfo.fetchQuery = (tagId: number, queryClient: QueryClient) =>
  queryClient.fetchQuery(useGetTagInfo.queryKey(tagId), () => useGetTagInfo.queryFn(tagId));