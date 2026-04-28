import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

type SeoImage = {
  src: ImageMetadata;
  alt?: string;
  width?: number;
  height?: number;
};

type SeoDataInput = {
  title?: string;
  description?: string;
  siteTitle: string;
  siteDescription: string;
  image?: SeoImage;
  currentUrl: URL;
  site?: URL;
  isArticle?: boolean;
  publishedTime?: Date;
  author?: string;
  tags?: string[];
};

function getAbsoluteUrlBase(currentUrl: URL, site?: URL) {
  return import.meta.env.PROD ? site ?? currentUrl : currentUrl;
}

async function getSocialImageUrl(image: SeoImage | undefined, currentUrl: URL, site?: URL) {
  if (!image) {
    return undefined;
  }

  const transformedImage = await getImage({
    src: image.src,
    width: image.width,
    height: image.height,
    format: image.src.format === "png" ? "png" : "jpg",
  });

  return new URL(
    transformedImage.src,
    getAbsoluteUrlBase(currentUrl, site),
  ).toString();
}

export async function getSeoData({
  title,
  description,
  siteTitle,
  siteDescription,
  image,
  currentUrl,
  site,
  isArticle = false,
  publishedTime,
  author,
  tags,
}: SeoDataInput) {
  const pageTitle = title ?? siteTitle;
  const fullTitle = pageTitle === siteTitle ? siteTitle : `${pageTitle} - ${siteTitle}`;

  return {
    canonicalUrl: currentUrl.toString(),
    description: description ?? siteDescription,
    fullTitle,
    imageAlt: image?.alt,
    imageHeight: image?.height,
    imageWidth: image?.width,
    isArticle,
    ogImage: await getSocialImageUrl(image, currentUrl, site),
    publishedTime: publishedTime?.toISOString(),
    author,
    tags: tags ?? [],
    twitterCard: image ? "summary_large_image" : "summary",
  };
}
