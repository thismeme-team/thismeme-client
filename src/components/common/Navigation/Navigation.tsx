import type { ReactNode } from "react";

import Back from "/public/icon/back.svg";
import Delete from "/public/icon/cancel.svg";
import Logo from "/public/icon/logo.svg";
import SideMenu from "/public/icon/menu.svg";
import { Menu } from "@/components/common/Navigation/Menu";

import { Profile } from "./Profile";

interface Props {
  page: "intro" | "search" | "result" | "detail" | "test";
  left?: ReactNode;
  title?: ReactNode | string;
  right?: ReactNode;
}

// TODO svg icon 들 common/Navigation/ 폴더에 컴포넌트화 후 핸들러 함수 전달
const NAVIGATION_PROPS: { [key in Props["page"]]: Omit<Props, "page"> } = {
  intro: {
    left: <Logo />,
    right: (
      <>
        <Profile />
        <Menu />
      </>
    ),
  },
  search: {
    title: "밈 찾기",
    right: <Delete />,
  },
  result: {
    left: <Back />,
    title: "검색어 들어갈 곳",
    right: (
      <>
        <Profile />
        <SideMenu />
      </>
    ),
  },
  detail: {
    left: <Back />,
    right: (
      <>
        <Profile />
        <Menu />
      </>
    ),
  },
  test: {
    left: <Menu />,
  },
};

export const Navigation = ({
  page,
  left = NAVIGATION_PROPS[page].left,
  right = NAVIGATION_PROPS[page].right,
  title = NAVIGATION_PROPS[page].title,
}: Props) => {
  return (
    <header className="sticky top-0 z-[1000] flex h-50 w-full items-center justify-between gap-16 bg-white">
      <div>{left}</div>
      {title && (
        <span className="absolute flex h-full w-full items-center justify-center text-18-bold-140">
          {title}
        </span>
      )}
      <div className="grid auto-cols-[3.2rem] grid-flow-col place-items-center gap-8">{right}</div>
    </header>
  );
};
