import { useCallback } from "react";

import { delay } from "@/application/util";

import { LongPressBase } from "./LongPressBase";

interface Props {
  onClose: () => void;
}

export const MemeLongPress = ({ onClose }: Props) => {
  const delayClose = useCallback(async () => {
    await delay(650);
    onClose();
  }, [onClose]);

  return (
    <LongPressBase onClose={onClose}>
      <div className="m-auto w-245 rounded-10 border-[1px] border-[#D7D7DD] bg-white duration-1000">
        <ul>
          <li
            className="flex h-56 items-center px-12 py-16 text-18-bold-140 hover:bg-[#EDEFFF]"
            onPointerDown={delayClose}
          >
            보드에 저장하기
          </li>
          <li
            className="flex h-56 items-center px-12 py-16 text-18-bold-140 hover:bg-[#EDEFFF]"
            onPointerDown={delayClose}
          >
            이미지 다운로드
          </li>
          <li
            className="flex h-56 items-center px-12 py-16 text-18-bold-140 hover:bg-[#EDEFFF]"
            onPointerDown={delayClose}
          >
            공유하기
          </li>
        </ul>
      </div>
    </LongPressBase>
  );
};
