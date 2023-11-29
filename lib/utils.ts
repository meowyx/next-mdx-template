import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type Metadata = {
  slug: string;
  title: string;
  publishedOn: string;
};

type BlogContent = {
  frontmatter: Omit<Metadata, "slug">;
  content: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getBlogPostList() {
  const fileNames = await readDirectory("/content");

  const blogPosts = await Promise.all(
    fileNames.map(async (fileName) => {
      const rawContent = await readFile(`/content/${fileName}`);
      const { data: frontmatter } = matter(rawContent);

      return {
        slug: fileName.replace(".mdx", ""),
        ...frontmatter,
      } as Metadata;
    })
  );

  return blogPosts.sort((post1, post2) =>
    post1.publishedOn < post2.publishedOn ? 1 : -1
  );
}

export async function loadBlogPost(slug: string): Promise<BlogContent> {
  const rawContent = await readFile(`/content/${slug}.mdx`);

  const { data, content } = matter(rawContent);

  const frontmatter = data as Omit<Metadata, "slug">;

  return { frontmatter, content };
}

function readFile(localPath: string) {
  return fs.readFile(path.join(process.cwd(), localPath), "utf8");
}

function readDirectory(localPath: string) {
  return fs.readdir(path.join(process.cwd(), localPath));
}
