import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useAuth } from "@/application/hooks";
import { IntroPageNavigation } from "@/components/common/Navigation";
import { MemeList, PopularTagList, SharedMemeList } from "@/components/home";
import { MemeSortDropDown } from "@/components/home/DropDown";
import { SearchInput } from "@/components/search";

const HomePage: NextPage = () => {
  const router = useRouter();
  const { isLogin } = useAuth();

  return (
    <>
      <IntroPageNavigation />
      <section className="pt-16" />
      <SearchInput
        placeholder="당신이 찾는 밈 여기 있다."
        onClick={() => {
          router.push("/search");
        }}
      />
      <PopularTagList />
      {isLogin && <SharedMemeList />}
      <MemeSortDropDown />
      <MemeList />
    </>
  );
};

export default HomePage;
