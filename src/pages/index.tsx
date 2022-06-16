import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import ContentList from "../components/home/ContentList";
import Content from "../components/typography/content";

const Home: NextPage = () => {
  return (
    <>
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
          content={[
            { to: "/stacks", name: "Stacks Explained" },
            { to: "/queues", name: "Queues Explained" },
            { to: "/binary-trees", name: "Binary Trees Explained" },
          ]}
        />
      </section>
      <section className="mt-16">
        <h2>Latest Videos</h2>
        <Content>
          Our posts explaian concepts in detail and extend beyond videos
        </Content>
        <ContentList
          content={[
            { to: "/recursion", name: "So what is Recursion?" },
            { to: "/typescript", name: "Is TypeScript Worh it?" },
            { to: "/binary-trees", name: "Binary Trees Explained" },
          ]}
        />
      </section>
    </>
  );
};

export default Home;
