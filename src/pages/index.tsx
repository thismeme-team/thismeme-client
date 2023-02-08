import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Suspense } from "react";

import { useAuth } from "@/application/hooks";
import { withDelay } from "@/application/util";
import { IntroPageNavigation } from "@/components/common/Navigation";
import { PullToRefresh } from "@/components/common/PullToRefresh";
import { MemeList, PopularTagList, SharedMemeList } from "@/components/home";
import { MemeSortDropDown } from "@/components/home/DropDown";
import { SearchInput } from "@/components/search";

const HomePage: NextPage = () => {
  const router = useRouter();
  const { isLogin, user } = useAuth();

  return (
    <>
      <IntroPageNavigation />
      <PullToRefresh>
        <section className="pt-16" />
        <SearchInput
          placeholder="당신이 찾는 밈 여기 있다."
          onClick={() => {
            router.push("/search");
          }}
        />
        <Suspense>
          <PopularTagList />
        </Suspense>
        {isLogin && <SharedMemeList name={user?.name} />}
        <MemeSortDropDown />
        <Suspense>
          <MemeList />
        </Suspense>
      </PullToRefresh>
    </>
  );
};

export default HomePage;
