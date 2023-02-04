import { css } from "twin.macro";

import { Icon } from "@/components/common/Icon";

import { SharedMemeItem } from "./SharedMemeItem";

export const SharedMemeList = () => {
  return (
    <div className="pt-40">
      <div className="my-16 flex justify-between font-suit text-22-bold-140">
        @nickname 이 공유했던 밈
        <Icon
          name="chevronDown"
          css={css`
            transform: rotate(-90deg);
          `}
        />
      </div>
      <ul className="flex h-[60rem] overflow-x-scroll">
        <SharedMemeItem />
        <SharedMemeItem />
        <SharedMemeItem />
      </ul>
    </div>
  );
};
