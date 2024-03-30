export const PATH = {
  getExplorePage: () => "/explore",
  /**
   * 키워드 검색 결과 페이지
   * @param keyword - 키워드
   * @return /explore/keywords?q={encoded keyword}
   */
  getExploreByKeywordPath: (keyword: string) => {
    const encodedValue = encodeURIComponent(keyword);
    return `/explore/keywords?q=${encodedValue}`;
  },
  /**
   * 태그 검색 결과 페이지
   * @param tagId - 태그 ID
   * @param tagName - 태그 이름
   * @return /explore/tags/${tagId}?q={tagName}
   */
  getExploreByTagPath: (tagId: number, tagName: string) => {
    const encodedValue = encodeURIComponent(tagName);
    return `/explore/tags/${tagId}?q=${encodedValue}`;
  },

  getMainPage: "/",

  /**
   * 밈 상세 페이지
   * @param id - 밈 id
   * @param search - 검색헤더 값
   * @returns /memes/${meme id}?q={search}
   */
  getMemeDetailPage: (id: number, search?: string) => {
    if (!search) return `/memes/${id}`;

    const encodedValue = encodeURIComponent(search);
    return `/memes/${id}?q=${encodedValue}`;
  },

  /**
   * 밈 업로드 페이지
   */
  getUploadPage: () => "/upload",
};
