import { GetStaticProps, NextPage } from "next";
import MetaDecorator from "../components/MetaDecorator";
import { getAllVideoData } from "../lib/videos";
import Image from "next/image";
import moment from "moment";
import Link from "../components/Link";
import { Video } from "../types";

export const getStaticProps: GetStaticProps<{ data: Video[] }> = async (
  context
) => {
  const data = await getAllVideoData();
  // sort posts by date so the most recent ones come at the top
  data.sort((a, b) => (a.date >= b.date ? -1 : 1));
  return {
    props: {
      data,
    },
    revalidate: 7200, // 2 hours
  };
};

const getKeywords = (metadata: Video[]): string[] => {
  const keywords: string[] = [];
  metadata.forEach((data) => {
    data.keywords?.forEach((keyword) => {
      if (!keywords.includes(keyword)) {
        keywords.push(keyword);
      }
    });
  });

  return keywords;
};

const Videos: NextPage<{ data: Video[] }> = ({ data }) => {
  return (
    <>
      <MetaDecorator
        title="Videos"
        description="Find all our short-form educative videos here!"
      />
      <main className="relative grid grid-cols-4 gap-x-6 md:grid-cols-8 xl:grid-cols-12 lg:gap-x-8 mx-auto max-w-7xl mb-64">
        {data.map((video) => (
          <div
            className={`card col-span-4 mb-12 group hover:cursor-pointer`}
            key={video.title}
          >
            <div className="relative w-full">
              <Link href={video.videoUrl} className="no-underline">
                <div className="w-full">
                  <div className="w-full h-auto aspect-video relative">
                    <Image
                      src={video.imageUrl}
                      layout={"fill"}
                      objectFit="contain"
                      alt={video.title}
                      className="rounded-t-md"
                    />
                  </div>
                  <p className={"px-4 mt-5 text-lg font-medium text-secondary"}>
                    {moment(new Date(video.date)).format("MMMM Do[,] YYYY")}{" "}
                  </p>
                  <h2
                    className={
                      "px-4 text-primary mt-0 duration-100 group-hover:text-red-light"
                    }
                  >
                    {video.title}
                  </h2>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export default Videos;
