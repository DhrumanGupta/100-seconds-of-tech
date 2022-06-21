import { ReadTimeResults } from "reading-time";

enum Theme {
  Dark = "dark",
  Light = "light",
}

interface Post {
  slug: string;
  frontmatter: FrontMatter;
  readingTime: ReadTimeResults;
  code: string;
}

type PostMetaData = Omit<Post, "code">;

interface FrontMatter {
  title: string;
  description: string;
  imageUrl: string;
  keywords: string[];
  date: Date | number;
  authors: string[];
}

interface Video extends Omit<FrontMatter, "authors"> {
  videoUrl: string;
}

export { Theme };
export type { Video, Post, FrontMatter, PostMetaData };
