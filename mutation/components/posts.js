"use client";
import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import { updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { useOptimistic } from "react";

function Post({ post, action }) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id)}
              className={post.isLiked ? "liked" : ""}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  async function togglePostLikeStatus(postId, formData) {
    // "use server";
    await updatePostLikeStatus(postId, 2);
    revalidatePath("/", "layout");
  }
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPost, newPost) => {
      const newPostIndex = prevPost.findIndex((post) => post.id === newPost.id);
      if (newPostIndex === -1) {
        return prevPost.concat(newPost);
      }

      const updatedPost = { ...prevPost[newPostIndex] };

      updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
      updatedPost.isLiked = !updatedPost.isLiked;
      const newPosts = [...prevPost];
      newPosts[newPostIndex] = updatedPost;
      return newPosts;
    }
  );
  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }
  async function updatePost(postId) {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updateOptimisticPosts} />
        </li>
      ))}
    </ul>
  );
}
