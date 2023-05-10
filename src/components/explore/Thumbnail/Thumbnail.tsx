import { useRouter } from "next/router";

import { useClipboard, useGetThumbnail, useToast } from "@/application/hooks";
import { DOMAIN } from "@/application/util";
import { Photo } from "@/components/common/Photo";

interface Props {
  tag: string;
}
export const Thumbnail = ({ tag }: Props) => {
  const router = useRouter();
  const { writeText } = useClipboard();
  const toast = useToast();
  const { meme, totalCount } = useGetThumbnail(tag);
  const pageUrl = `${DOMAIN}${router.asPath}`;

  if (!meme || !totalCount) return null;

  return (
    <div className="flex gap-16 px-28 pt-16 pb-24">
      <Photo className="h-80 w-80 rounded-full" src={meme.image.images[0].imageUrl} />
      <div className="flex flex-1 flex-col items-center justify-center">
        <span className="text-14-semibold-140 text-gray-900">{totalCount}개 밈</span>
        <button
          className="w-full rounded-full bg-gray-800 py-8 text-14-semibold-140 text-white active:bg-black"
          onClick={() => {
            writeText(pageUrl, {
              onSuccess: () => {
                toast.show("밈을 담아서 링크를 복사했어요 :)");
              },
            });
          }}
        >
          공유하기
        </button>
        <p className="text-12-regular-160 text-gray-600">밈 보따리를 친구에게 공유하기</p>
      </div>
    </div>
  );
};
