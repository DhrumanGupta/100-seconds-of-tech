import { GetStaticProps, NextPage } from "next";
import MetaDecorator from "../../components/MetaDecorator";
import { getAllPostData } from "../../lib/posts";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { PostMetaData } from "../../types";

export const getStaticProps: GetStaticProps<{ data: PostMetaData[] }> = async (
  context
) => {
  const postData = await getAllPostData();
  // sort posts by date so the most recent ones come at the top
  postData.sort((a, b) => (a.frontmatter.date >= b.frontmatter.date ? -1 : 1));
  return {
    props: {
      data: postData,
    },
    revalidate: 3600, // 1 hour
  };
};

const getKeywords = (metadata: PostMetaData[]): string[] => {
  const keywords: string[] = [];
  metadata.forEach((data) => {
    data.frontmatter?.keywords?.forEach((keyword) => {
      if (!keywords.includes(keyword)) {
        keywords.push(keyword);
      }
    });
  });

  return keywords;
};

const Posts: NextPage<{ data: PostMetaData[] }> = ({ data }) => {
  return (
    <>
      {/* <main className="relative mx-8vw md:mx-10vw"> */}
      <MetaDecorator
        title="Posts"
        description="Read our detailed posts about various technologies here!"
      />
      <div className="relative grid grid-cols-4 gap-x-6 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-8 mx-auto max-w-7xl mb-64">
        {data.map((postData) => (
          <div
            className={`card col-span-4 mb-12 group hover:cursor-pointer`}
            key={postData.slug}
          >
            <div className="relative w-full">
              <Link href={`/posts/${postData.slug}`}>
                <div className="focus:outline-none w-full no-underline">
                  <div className="w-full h-auto aspect-video relative">
                    <Image
                      src={postData.frontmatter.imageUrl}
                      layout={"fill"}
                      objectFit="contain"
                      alt={postData.frontmatter.title}
                      className="rounded-t-md"
                    />
                  </div>
                  <p className={"px-4 mt-5 text-lg font-medium text-secondary"}>
                    {moment(new Date(postData.frontmatter.date)).format(
                      "MMMM Do[,] YYYY"
                    )}{" "}
                    &ndash; {postData.readingTime.text}
                  </p>
                  <h2
                    className={
                      "px-4 text-primary mt-0 duration-100 group-hover:text-red-light"
                    }
                  >
                    {postData.frontmatter.title}
                  </h2>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* </main> */}
    </>
  );
};

export default Posts;
