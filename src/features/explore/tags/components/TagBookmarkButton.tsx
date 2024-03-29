import { useDeleteFavoriteTag, useGetTagInfo, usePostFavoriteTag } from "@/api/tag";
import { Button } from "@/common/components/Button";
import { Icon } from "@/common/components/Icon";
import { useToast } from "@/common/hooks";
import { useAuth, useTagCategoryContext } from "@/features/common";

interface Props {
  tagId: number;
}

const animation = "transition-colors duration-200 ease-in-out";
const TAG_DELAY = 1500;

export const TagBookmarkButton = ({ tagId }: Props) => {
  const { show, close } = useToast();
  const { validate } = useAuth();
  const { data: tagInfo } = useGetTagInfo(tagId);

  const { mutate: saveMutation } = usePostFavoriteTag();
  const { mutate: deleteMutation, onCancel } = useDeleteFavoriteTag(TAG_DELAY);
  const [, setIsOpenTagCategory] = useTagCategoryContext();

  const handleSaveBookmark = () => {
    saveMutation(
      { tagId: tagId, name: tagInfo.name },
      {
        onSuccess: () =>
          show(
            <>
              <div className="grow">태그를 북마크했어요!</div>
              <button
                className="justify-self-end text-14-semibold-140 leading-none text-gray-400"
                onClick={() => {
                  setIsOpenTagCategory(true);
                  close({ id: tagId, duration: 0 });
                }}
              >
                보러가기
              </button>
            </>,
            { duration: TAG_DELAY },
          ),
        onError: () => show("다시 시도해 주세요."),
      },
    );
  };

  const handleDeleteBookmark = async () => {
    show(
      <>
        <div className="grow">북마크한 태그를 해제했어요!</div>
        <button
          className="justify-self-end text-14-semibold-140 leading-none text-gray-400"
          onClick={() => {
            onCancel();
            close({ id: tagId, duration: 0 });
            show("삭제할 뻔한 태그를 살려냈어요!");
          }}
        >
          되돌리기
        </button>
      </>,
      { duration: TAG_DELAY },
    );
    deleteMutation(tagId, {
      onError: (err) => {
        if (err instanceof Error && err.name === "CanceledError") return;
        show("다시 시도해 주세요.");
      },
    });
  };

  const handleClick = tagInfo.isFav ? handleDeleteBookmark : handleSaveBookmark;

  return (
    <div className="fixed bottom-32 left-[50%] translate-x-[-50%] text-center">
      <Button
        id="bookmark"
        className={`ga-search-result-tag-bookmark-click ${
          tagInfo.isFav
            ? "bg-gray-200 text-gray-600 shadow-[0_0_20px_rgba(38,37,40,0.2)] active:bg-gray-300 active:text-gray-700"
            : "bg-gray-800 text-white active:bg-black active:text-white"
        } ${animation} flex h-53 w-143 justify-between rounded-50 px-24 py-16 text-14-semibold-140`}
        onClick={validate(handleClick)}
      >
        <Icon height={22} name="star" width={22} />
        태그 북마크
      </Button>
    </div>
  );
};
