import { cloudinaryLoader } from "config/cloudinary-loader";
import { memo } from "react";

import { Icon } from "@/common/components/Icon";
import { Photo } from "@/common/components/Photo";
import { useOverlay } from "@/common/hooks";
import { isEncodingError } from "@/common/utils";
import { MemeActionSheet, useMoveMemeDetail } from "@/features/common";
import type { Meme } from "@/types";

interface Props {
  meme: Meme & { priority?: boolean };
  onClick?: (id: number) => void;
}

export const MemeItem = memo(({ meme, onClick }: Props) => {
  const overlay = useOverlay();
  const { movePage } = useMoveMemeDetail();
  const { name, image, memeId } = meme;

  return (
    <div className="mb-15 flex w-[calc(50%-10px)] flex-col ">
      <button
        className="ga-meme-item-click"
        draggable={false}
        onClick={() => {
          onClick?.(memeId);
          movePage(memeId);
        }}
      >
        <Photo
          alt={name}
          className="rounded-16"
          draggable={false}
          height={image.images[0]?.imageHeight}
          loader={cloudinaryLoader}
          loading={meme.priority ? "eager" : "lazy"}
          sizes="200px"
          src={image.images[0]?.imageUrl}
          unoptimized={isEncodingError(image.images[0]?.imageUrl)}
          width={image.images[0]?.imageWidth}
        />
      </button>
      <div className="flex justify-between">
        <button
          className="ga-meme-item-click flex-1 py-4 text-start"
          onClick={() => {
            onClick?.(memeId);
            movePage(memeId);
          }}
        >
          <span className="text-12-medium-160 line-clamp-2">{name}</span>
        </button>
        <button
          className="ga-meme-item-add-click flex h-32 w-32 items-center justify-center"
          onClick={() => {
            overlay.open(({ isOpen, close }) => (
              <MemeActionSheet isOpen={isOpen} meme={meme} onClose={close} />
            ));
          }}
        >
          <Icon color="gray-600" height={20} name="meatball" width={20} />
        </button>
      </div>
    </div>
  );
});

MemeItem.displayName = "MemeItem";
