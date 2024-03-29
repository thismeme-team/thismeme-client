import type { QueryClient } from "@tanstack/react-query";

import { api, useSuspendedQuery } from "../core";

export const useGetTagInfo = (tagId: number) => {
  return useSuspendedQuery({
    queryKey: useGetTagInfo.queryKey(tagId),
    queryFn: () => useGetTagInfo.queryFn(tagId),
    staleTime: Infinity,
  });
};

useGetTagInfo.queryKey = (tagId: number) => ["getTagInfo", tagId] as const;

useGetTagInfo.queryFn = (tagId: number) => api.tags.getTagInfo(tagId);

useGetTagInfo.fetchQuery = (tagId: number, queryClient: QueryClient) =>
  queryClient.fetchQuery(useGetTagInfo.queryKey(tagId), () => useGetTagInfo.queryFn(tagId));
