"use server";
import { Schema } from "../../../amplify/data/resource";
import { cookiesClient } from "../../../amplify-utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addPost = async (formData: FormData) => {
  const { data, errors } = await cookiesClient.models.Post.create({
    title: formData.get("title")?.toString() || "",
  });
  console.log("create post data", data, errors);
  redirect("/");
};
export const deletePost = async (id: string) => {
  const { data, errors } = await cookiesClient.models.Post.delete({
    id,
  });
  console.log("data deleted ", data, errors);
};
export const addComment = async (
  content: string,
  post: Schema["Post"]["type"],
  paramsId: string
) => {
  if (content.trim().length === 0) return;
  const { data: comment } = await cookiesClient.models.Comment.create({
    postId: post.id,
    content,
  });

  console.log("got comment", comment);
  revalidatePath(`/post/${paramsId}`);
};
export const deleteComment = async (formData: FormData) => {
  const id = formData.get("id")?.toString();
  if (!id) return;
  const { data: deletedComment } = await cookiesClient.models.Comment.delete({
    id,
  });
  console.log("deleted", deletedComment);
};
