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

type MetaData = Omit<Post, "code">;

interface FrontMatter {
  title: string;
  description: string;
  imageUrl: string;
  keywords: string[];
  date: Date | number;
}

interface Video extends FrontMatter {
  videoUrl: string;
}

export { Theme };
export type { Video, Post, FrontMatter, MetaData };
