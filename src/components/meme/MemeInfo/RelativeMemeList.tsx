import { css } from "twin.macro";

import { useAuth, useGetPopularMemes, useIntersect } from "@/application/hooks";
import { Masonry } from "@/components/common/Masonry";
import { MemeItem } from "@/components/meme/MemeItem";

export const RelativeMemeList = () => {
  const { data: memeList, isFetching, fetchNextPage } = useGetPopularMemes();
  const ref = useIntersect(async () => {
    fetchNextPage();
  });
  const { user } = useAuth();

  return (
    <>
      <h2 className="py-16 font-suit text-22-bold-140">
        {user?.name ? `@${user.name} ` : "당신"}이 찾는 연관 밈
      </h2>
      <div
        css={[
          css`
            width: 100%;
            min-height: 300px;
          `,
        ]}
      >
        <Masonry columns={2} defaultColumns={2} defaultHeight={450} defaultSpacing={9} spacing={9}>
          {memeList.map((meme) => (
            <MemeItem key={meme.memeId} meme={meme} />
          ))}
        </Masonry>
        <div className={`m-10 ${isFetching ? "hidden" : ""}`} ref={ref}></div>
      </div>
    </>
  );
};
