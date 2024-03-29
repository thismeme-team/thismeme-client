import Image from "next/image";
import type { ComponentProps } from "react";
import { useEffect, useState } from "react";

/**
 * NOTE
 * ComponentProps<typeof Image> 으로 타입 선언하면
 * storybook jsdoc parse 오류 발생. interface 내부에 @deprecated 어노테이션이 있으면 문제 생기는 듯 보임
 * storybook v7으로 업그레이드 시 문제 발생하는지 확인해야 함
 */
interface Props extends Omit<ComponentProps<typeof Image>, "style"> {
  fallbackSrc?: string;
}
const base64Blur =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAEUlEQVR42mO8/Z8BAzAOZUEAQ+ESj6kXXm0AAAAASUVORK5CYII=";

const fallback = "/img/fallbackImage.png";

export const Photo = ({
  src,
  className = "",
  width,
  height,
  fallbackSrc = fallback,
  alt,
  ...props
}: Props) => {
  /**
   * FIX
   * storybook 환경에서 이미지가 min height 보다 작을 때
   * cover 속성이 적용 안돼서 밑에 회색 빈 공간이 생김
   * - 개발 페이지에선 정상 동작
   */
  const [isFailLoading, setIsFailLoading] = useState<React.SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);

  useEffect(() => {
    setIsFailLoading(null);
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden [&>img]:!static ${className}`}
      css={[width && height && { aspectRatio: `calc(${width} / ${height})` }]}
    >
      <Image
        fill
        alt={alt}
        blurDataURL={base64Blur}
        placeholder="blur"
        sizes=" "
        src={isFailLoading ? fallbackSrc : src}
        style={{ objectFit: "cover", transform: "translate3d(0, 0, 0)" }}
        onError={setIsFailLoading}
        {...props}
      />
    </div>
  );
};
