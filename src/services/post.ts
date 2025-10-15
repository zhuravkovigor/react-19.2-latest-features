import type { Post } from "../types/post";

type CreatePostData = {
  title: string;
  body: string;
  userId?: number;
};

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export async function createPost(postData: CreatePostData): Promise<Post> {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...postData,
      userId: postData.userId || 1,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create post: ${response.statusText}`);
  }

  return response.json();
}

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${API_BASE_URL}/posts?_limit=10`);

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`);
  }

  return response.json();
}
