import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

import { ExplorePageNavigation } from "@/common/components/Navigation";
import { NextSeo } from "@/common/components/NextSeo";
import { PullToRefresh } from "@/common/components/PullToRefresh";
import { MemeListSkeleton } from "@/common/components/Skeleton";
import { SSRSuspense } from "@/common/components/Suspense";
import { canonicalUrl, DEFAULT_DESCRIPTION, PATH, SITE_NAME } from "@/common/utils";
import { MemesByTagsContainer, TagBookmarkButton } from "@/features/explore/tags/components";

interface Props {
  tagName: string;
  tagId: number;
}

const ExploreByTagPage = ({
  tagName,
  tagId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { isFallback, asPath } = useRouter();
  const queryString = asPath.split("?")[1];
  const params = new URLSearchParams(queryString);

  if (isFallback) {
    const tagName = params.get("q");
    return <ExplorePageNavigation title={`${tagName ? `#${tagName}` : ""}`} />;
  }

  return (
    <>
      <NextSeo
        canonical={`${canonicalUrl}${PATH.getExploreByTagPath(tagId, tagName)}`}
        description={DEFAULT_DESCRIPTION}
        title={`'${tagName}' 밈`}
        openGraph={{
          siteName: SITE_NAME,
          imageUrl: `/api/og?tag=${tagName}`,
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      <ExplorePageNavigation title={`#${tagName}`} />

      <PullToRefresh>
        <SSRSuspense fallback={<MemeListSkeleton />}>
          <MemesByTagsContainer tag={tagName} />
        </SSRSuspense>
      </PullToRefresh>
      <SSRSuspense>
        <TagBookmarkButton tagId={tagId} />
      </SSRSuspense>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = (async ({ res, params, query }) => {
  res.setHeader("Cache-Control", "public, s-maxage=200, stale-while-revalidate=59");

  const tagName = query.q;
  const tagId = params?.tagId;

  if (typeof tagId !== "string" || typeof tagName !== "string") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tagName,
      tagId: Number(tagId),
    },
  };
}) satisfies GetServerSideProps<Props>;
export default ExploreByTagPage;
