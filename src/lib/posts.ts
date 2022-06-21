import path from "path";
import fs from "fs";
import { bundleMDX } from "mdx-bundler";
import { FrontMatter, PostMetaData, Post } from "../types";
import calculateReadingTime from "reading-time";
import matter from "gray-matter";

const contentPath = path.join("content", "posts");

const getAllPostSlugs = async (): Promise<string[]> => {
  return (await fs.promises.readdir(contentPath)).map((x) =>
    x.replace(/\.mdx?$/, "")
  );
};

const getPostData = async (slug: string): Promise<Post | null> => {
  const filePath = path.join(contentPath, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = await fs.promises.readFile(filePath, "utf-8");

  const { code, frontmatter } = await bundleMDX<FrontMatter>({
    source,
  });

  frontmatter.imageUrl = `/posts/${slug}/header.jpg`;

  if (typeof frontmatter.date !== "number") {
    frontmatter.date = frontmatter.date.getTime();
  }

  return {
    slug,
    frontmatter,
    readingTime: calculateReadingTime(code),
    code,
  };
};

async function getAllPostData(): Promise<Array<PostMetaData>> {
  const slugs = await getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug): Promise<PostMetaData | null> => {
      const filePath = path.join(contentPath, `${slug}.mdx`);
      if (!fs.existsSync(filePath)) {
        return null;
      }

      const fileContents = await fs.promises.readFile(filePath, "utf-8");
      const matterResult = matter(fileContents).data as FrontMatter;

      // since we can infer the image from the slug, we can add it to the frontmatter
      matterResult.imageUrl = `/posts/${slug}/header.jpg`;

      if (typeof matterResult.date !== "number") {
        matterResult.date = matterResult.date.getTime();
      }

      return {
        frontmatter: matterResult,
        slug,
        readingTime: calculateReadingTime(fileContents),
      };
    })
  );
  return posts.filter((x) => Boolean(x)) as Array<PostMetaData>;
}

export { getAllPostData, getAllPostSlugs, getPostData };
