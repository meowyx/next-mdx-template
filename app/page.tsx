import { getBlogPostList } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const blogPosts = await getBlogPostList();
  return (
    <>
      <h1>My Blog Posts</h1>
      <ul>
        {blogPosts.map((blogMetadata) => {
          return (
            <li key={blogMetadata.slug}>
              <Link href={`/${blogMetadata.slug}`}>{blogMetadata.title}</Link>
            </li>
          );
          return null;
        })}
      </ul>
    </>
  );
}
