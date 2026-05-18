import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

export const ARTICLE_HERO_IMAGE_WIDTHS = [
  2240, 1700, 1200, 992, 650, 375,
] as const;
export const ARTICLE_HERO_IMAGE_FORMAT = "webp" as const;
export const ARTICLE_HERO_IMAGE_QUALITY = 70 as const;
export const ARTICLE_HERO_IMAGE_SIZES = "100vw" as const;

type ArticleImage = {
  src: ImageMetadata;
  alt?: string;
  width?: number;
  height?: number;
};

export async function getArticleHeroPreloadCandidates(
  image: ArticleImage | undefined,
) {
  if (!image) {
    return [];
  }

  const transformedImages = await Promise.all(
    [...ARTICLE_HERO_IMAGE_WIDTHS].map((width) =>
      getImage({
        src: image.src,
        width,
        format: ARTICLE_HERO_IMAGE_FORMAT,
        quality: ARTICLE_HERO_IMAGE_QUALITY,
      }),
    ),
  );

  return transformedImages
    .map((transformedImage, index) => ({
      width: ARTICLE_HERO_IMAGE_WIDTHS[index],
      src: transformedImage.src,
    }))
    .sort((a, b) => (a.width ?? 2240) - (b.width ?? 2240));
}
