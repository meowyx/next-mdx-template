import { getBlogPostList, loadBlogPost } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

type Props = {
  params: { slug: string };
};

// add any custom components here: h1, h2 replace standard html tags
// fr a custom react component add it Capitalized: <Animation />
const components = {
  h1: ({ children }: PropsWithChildren) => (
    <h1 style={{ color: "red" }}>{children}</h1>
  ),
};

export async function generateMetadata({ params }: Props) {
  const blogPost = await loadBlogPost(params.slug);

  return {
    title: blogPost.frontmatter.title,
  };
}

export default async function Home({ params: { slug } }: Props) {
  const blogPost = await loadBlogPost(slug);
  return (
    <>
      <h1>My Blog Posts</h1>
      <MDXRemote components={components} source={blogPost.content}></MDXRemote>
    </>
  );
}
