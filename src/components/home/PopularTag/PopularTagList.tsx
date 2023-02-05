import Link from "next/link";

import { useGetPopularTags } from "@/application/hooks";
import { PATH } from "@/application/util";
import { Chip } from "@/components/common/Chip";

export const PopularTagList = () => {
  const { tags } = useGetPopularTags();

  return (
    <ul className="mt-8 mb-40 flex overflow-x-scroll pb-36">
      {tags?.map((tag) => (
        <li className="shrink-0" key={tag.tagId}>
          <Link href={PATH.getExploreByTagPath(tag.name)}>
            <Chip className="ml-8" color="black" label={tag.name} size="medium" />
          </Link>
        </li>
      ))}
    </ul>
  );
};
