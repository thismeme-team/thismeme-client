import type { QueryClient, QueryFunctionContext } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";

import { api } from "../core";

const FIRST_PAGE_SIZE = 10;
const PAGE_SIZE = 20;

/**
 * tag 밈 검색 API
 * @param tag 검색할 tag
 */
export const useGetMemesByTag = (tag: string) => {
  const {
    data,
    isFetchingNextPage,
    isError,
    fetchNextPage: originalFetchNextPage,
  } = useInfiniteQuery({
    queryKey: useGetMemesByTag.queryKey(tag),
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      api.search.getMemesByTag({
        keyword: tag,
        offset: pageParam,
        limit: pageParam === 0 ? FIRST_PAGE_SIZE : PAGE_SIZE,
      }),
    select: (data) => {
      return {
        ...data,
        pages: data.pages.map((page, index) => {
          const isFirstPage = index === 0;
          return {
            ...page,
            memes: page.memes.map((meme, index) => ({
              ...meme,
              priority: isFirstPage && index < 4,
            })),
          };
        }),
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      const { count } = lastPage;
      const isFirstPage = allPages.length === 1;
      const pageSize = isFirstPage ? FIRST_PAGE_SIZE : PAGE_SIZE;
      const isLastPage = count < pageSize;
      const offset = count * (allPages.length - 1);
      return isLastPage ? undefined : offset + pageSize;
    },
    enabled: !!tag,
  });

  const fetchNextPage = isError
    ? ((() => {}) as typeof originalFetchNextPage)
    : originalFetchNextPage;
  const memes = data?.pages.flatMap(({ memes }) => memes) || [];
  const totalCount = data?.pages[0].totalCount;
  const isEmpty = !memes.length;

  return { data: memes, totalCount, isEmpty, isFetchingNextPage, fetchNextPage };
};

useGetMemesByTag.queryKey = (tag: string) => ["getMemesByTag", tag] as const;

useGetMemesByTag.fetchInfiniteQuery = (tag: string, queryClient: QueryClient) =>
  queryClient.fetchInfiniteQuery(useGetMemesByTag.queryKey(tag), ({ pageParam = 0 }) =>
    api.search.getMemesByTag({ keyword: tag, offset: pageParam, limit: PAGE_SIZE }),
  );
