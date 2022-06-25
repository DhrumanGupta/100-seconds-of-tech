import type { GetStaticProps, NextPage } from "next";
import ContentList from "../components/home/ContentList";
import MetaDecorator from "../components/MetaDecorator";
import Content from "../components/typography/content";
import { getAllPostData } from "../lib/posts";
import { getAllVideoData } from "../lib/videos";
import { PostMetaData, Video } from "../types";

interface Props {
  posts: PostMetaData[];
  videos: Video[];
}

export const getStaticProps: GetStaticProps = async (context) => {
  const postData = await getAllPostData();
  postData.sort((a, b) => (a.frontmatter.date >= b.frontmatter.date ? -1 : 1));

  const videoData = await getAllVideoData();
  videoData.sort((a, b) => (a.date >= b.date ? -1 : 1));

  return {
    props: {
      videos: videoData.splice(0, 3),
      posts: postData.splice(0, 3),
    },
    revalidate: 3600,
  };
};

const Home: NextPage<Props> = ({ videos, posts }) => {
  return (
    <>
      <MetaDecorator
        description="100 Seconds of Tech brings free, educative, short form content about
          programming and computer science, so you can learn something new every
          day."
      />
      <section className="mt-4">
        <h2>Learn something new every day in 100 seconds!</h2>
        <Content>
          100 Seconds of Tech brings free, educative, short form content about
          programming and computer science, so you can learn something new every
          day!
        </Content>
      </section>
      <section className="mt-16">
        <h2>Latest Videos</h2>
        <Content>
          Our 100 Second Videos introduce various concepts in efficient ways
        </Content>
        <ContentList
          content={videos.map((video) => ({
            to: video.videoUrl,
            name: video.title,
            image: video.imageUrl,
            description: video.description,
          }))}
        />
      </section>
      <section className="mt-16">
        <h2>Latest Posts</h2>
        <Content>
          Our posts explaian concepts in detail and extend beyond videos
        </Content>
        <ContentList
          content={posts.map((post) => ({
            to: `/posts/${post.slug}`,
            name: post.frontmatter.title,
            image: post.frontmatter.imageUrl,
            description: post.frontmatter.description,
          }))}
        />
      </section>
    </>
  );
};

export default Home;
