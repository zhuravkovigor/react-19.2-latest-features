import { use } from "react";
import type { Post } from "../../types/post";

type PostsListProps = {
  postsPromise: Promise<Post[]>;
};

export default function PostsList({ postsPromise }: PostsListProps) {
  const posts = use(postsPromise);

  return (
    <ul className="posts-list">
      {posts.map((post) => (
        <li key={post.id} className="post-item">
          <h3 className="post-title">{post.title}</h3>
          <p className="post-body">{post.body}</p>
        </li>
      ))}
    </ul>
  );
}
