import { Content, Header, Item, Trigger } from "@radix-ui/react-accordion";
import { useRouter } from "next/router";

import { useDeleteFavoriteTag, useGetFavoriteTags } from "@/api/tag";
import { Icon } from "@/common/components/Icon";
import { Photo } from "@/common/components/Photo";
import { useToast } from "@/common/hooks";
import { PATH } from "@/common/utils";
import { useAuth } from "@/features/common";

import { CategoryTitle } from "./CategoryTitle";
import { useTagCategoryContext } from "./context";

const FAVORITE_ID = "북마크";
const TAG_DELETE_DELAY = 1500;
const FAVORITE_ICON = "/icon/star.svg";

export const FavoriteCategory = () => {
  const { isLogin } = useAuth();
  const router = useRouter();
  const { show, close } = useToast();
  const { favoriteTags } = useGetFavoriteTags({ enabled: isLogin });
  const [, setIsOpenTagCategory] = useTagCategoryContext();

  const { mutate: deleteFavoriteTag, onCancel } = useDeleteFavoriteTag(TAG_DELETE_DELAY);

  const onClickItem = (tagId: number, tagName: string) => {
    setIsOpenTagCategory(false);
    router.push(PATH.getExploreByTagPath(tagId, tagName));
  };

  const handleDeleteItem = async (tagId: number) => {
    show(
      (id) => (
        <>
          <div className="grow">태그가 삭제 되었습니다.</div>
          <button
            className="justify-self-end text-14-semibold-140 leading-none text-gray-400"
            onClick={() => {
              onCancel();
              close({ id, duration: 0 });
              show("태그 삭제를 취소 하였습니다.");
            }}
          >
            삭제 취소
          </button>
        </>
      ),
      { duration: TAG_DELETE_DELAY },
    );

    deleteFavoriteTag(tagId, {
      onError: (err) => {
        if (err instanceof Error && err.name === "CanceledError") return;
        show("태그 삭제가 실패하였습니다.");
      },
    });
  };

  if (!favoriteTags || !favoriteTags.length || !isLogin) return null;

  return (
    <>
      <CategoryTitle title={FAVORITE_ID} />
      <Item value={FAVORITE_ID}>
        <Header className="py-4">
          <Trigger className="flex w-full items-center justify-between gap-8 rounded-full px-4 py-12 text-16-semibold-140 [&>span>#chevronDown]:data-[state=open]:rotate-180">
            <Photo unoptimized alt="북마크" className="h-24 w-24 p-2" src={FAVORITE_ICON} />
            <span className="flex-grow text-left text-16-semibold-140">{FAVORITE_ID}</span>
            <span className="flex h-40 w-40 items-center justify-center rounded-full hover:bg-gray-100">
              <Icon
                aria-hidden
                className="transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]"
                id="chevronDown"
                name="chevronDown"
              />
            </span>
          </Trigger>
        </Header>
        <Content className="overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
          <ul className="flex flex-col pr-16 font-suit text-16-semibold-140">
            {favoriteTags.map((tag) => (
              <li className="flex w-full justify-between gap-6 pl-20" key={tag.tagId}>
                <button
                  className="w-full rounded-8 py-8 pl-16 hover:bg-primary-200"
                  onClick={() => onClickItem(tag.tagId, tag.name)}
                >
                  <div className="grow text-left">{tag.name}</div>
                </button>
                <button
                  className="flex h-40 w-40 items-center justify-center rounded-full hover:bg-gray-100 [&_*]:stroke-gray-600 [&_*]:hover:stroke-black"
                  onClick={() => handleDeleteItem(tag.tagId)}
                >
                  <Icon height={24} name="cancel" width={24} />
                </button>
              </li>
            ))}
          </ul>
        </Content>
      </Item>
    </>
  );
};
