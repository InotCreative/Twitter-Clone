import { Suspense } from "react";
import Sidebar from "@/components/layout/Sidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import TweetFeed from "@/components/tweet/TweetFeed";
import CreateTweet from "@/components/tweet/CreateTweet";

export default function Home() {
  return (
    <div className="container mx-auto flex min-h-screen max-w-7xl gap-4">
      <Sidebar />
      <main className="flex-grow border-x">
        <h1 className="border-b p-4 text-xl font-bold">Home</h1>
        <CreateTweet />
        <Suspense fallback={<div>Loading tweets...</div>}>
          <TweetFeed />
        </Suspense>
      </main>
      <RightSidebar />
    </div>
  );
}
