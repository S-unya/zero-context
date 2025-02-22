import { toString as mdastToString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

export function remarkReadingTime() {
  return (tree: Record<string, string>, file: {
    data: {
      astro: {
        frontmatter: {
          readingTime: string
        }
      }
    }
  }) => {
    const textOnPage = mdastToString(tree);
    const readingTime = getReadingTime(textOnPage, { wordsPerMinute: 300 });

    // readingTime.text will give minutes read as a friendly string,
    file.data.astro.frontmatter.readingTime = readingTime.text;
  };
}
