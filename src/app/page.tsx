import Post from "@/components/Post";
import { cookiesClient, isAuthenticated } from "../../amplify-utils";
import { deletePost } from "./_actions/actions";

export default async function Home() {
  const isSignedIn = await isAuthenticated();
  const { data: posts } = await cookiesClient.models.Post.list({
    selectionSet: ["title", "id"],
    authMode: isSignedIn ? "userPool" : "identityPool",
  });
  console.log("posts", posts);

  return (
    <main className="flex flex-col items-center justify-between p-24 w-1/2 m-auto gap-4">
      <h1 className="text-2xl pb-10">
        List Of All Titles{!isSignedIn ? " (From All Users)" : ""}
      </h1>
      {posts?.map(async (post, idx) => (
        <Post
          onDelete={deletePost}
          post={post}
          key={idx}
          isSignedIn={isSignedIn}
        />
      ))}
    </main>
  );
}

