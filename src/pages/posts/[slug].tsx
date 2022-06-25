import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useMemo } from "react";
import { getAllPostSlugs, getPostData } from "../../lib/posts";
import { getMDXComponent } from "mdx-bundler/client";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import moment from "moment";
import MetaDecorator from "../../components/MetaDecorator";
import Image from "next/image";
import PostLink from "../../components/Link";
import PostImage from "../../components/PostImage";
import NotFound from "../404";
import { Post } from "../../types";
import Link from "../../components/Link";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const postData = await getPostData(slug);

  return {
    props: postData ? { ...postData } : {},
    revalidate: 7200, // 2 hours
  };
};

const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllPostSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: true,
  };
};

const PostPage: NextPage<Post> = ({ code, frontmatter, readingTime, slug }) => {
  const router = useRouter();

  const Component = useMemo(
    () => (code ? getMDXComponent(code) : null),
    [code]
  );

  if (router.isFallback) {
    return <div className="relative mx-10vw">Loading...</div>;
  }

  if (!code) {
    return <NotFound />;
  }

  return (
    <>
      <MetaDecorator
        description={frontmatter.description}
        title={frontmatter.title}
      />
      <main className="relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto mb-12">
        <header className="col-span-full lg:col-span-10 lg:col-start-2 mb-6">
          <h2 className="leading-tight text-3xl md:text-4xl">
            {frontmatter.title}
          </h2>
          <p className="text-secondary md:text-lg">
            {moment(new Date(frontmatter.date)).format("MMMM Do[,] YYYY")}{" "}
            &ndash; {readingTime.text}
          </p>

          <div className="aspect-video w-full relative rounded-lg mt-10 overflow-hidden">
            <Image
              src={frontmatter.imageUrl}
              layout={"fill"}
              alt={frontmatter.title}
              objectFit="contain"
            />
          </div>
        </header>
        <div className="col-span-full lg:col-span-10 lg:col-start-2">
          <article className="relative w-full prose prose-light dark:prose-dark mb-6">
            {Component && (
              <Component
                components={{
                  // @ts-ignore
                  a: Link,
                  img: (props: any) => <PostImage {...props} slug={slug} />,
                }}
              />
            )}
            <hr />
            <h4>
              Written by{" "}
              {frontmatter.authors.slice(0, -1).join(", ") +
                " and " +
                frontmatter.authors.slice(-1)}
            </h4>
            <PostLink
              className="text-sm text-secondary hover:text-red-light duration-100"
              href={`https://github.com/DhrumanGupta/100-seconds-of-tech/edit/master/content/posts/${slug}.mdx`}
            >
              Edit on GitHub
            </PostLink>
          </article>
        </div>
      </main>
    </>
  );
};

export default PostPage;
export { getStaticPaths, getStaticProps };
