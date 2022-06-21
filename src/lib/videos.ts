import path from "path";
import fs from "fs";
import { FrontMatter, Video } from "../types";

const contentPath = path.join("content", "videos");

const getAllVideoSlugs = async (): Promise<string[]> => {
  return (await fs.promises.readdir(contentPath)).map((x) =>
    x.replace(/\.json?$/, "")
  );
};

const getVideoData = async (slug: string): Promise<Video | null> => {
  const filePath = path.join(contentPath, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = await fs.promises.readFile(filePath, "utf-8");

  const data = JSON.parse(source) as Video;

  data.imageUrl = `/videos/${slug}/header.jpg`;

  if (typeof data.date !== "number") {
    data.date = new Date(data.date).getTime();
  }

  return data;
};

const getAllVideoData = async (): Promise<Array<Video>> => {
  const slugs = await getAllVideoSlugs();
  const videos = await Promise.all(
    slugs.map(async (slug): Promise<Video | null> => {
      const filePath = path.join(contentPath, `${slug}.json`);
      if (!fs.existsSync(filePath)) {
        return null;
      }

      const fileContents = await fs.promises.readFile(filePath, "utf-8");
      const data = JSON.parse(fileContents) as Video;

      data.imageUrl = `/videos/${slug}/header.jpg`;

      if (typeof data.date !== "number") {
        data.date = new Date(data.date).getTime();
      }

      return data;
    })
  );

  return videos.filter((x) => Boolean(x)) as Array<Video>;
};

export { getAllVideoSlugs, getVideoData, getAllVideoData };
