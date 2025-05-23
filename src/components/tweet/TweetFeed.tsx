'use client';

import { useEffect, useState } from 'react';
import Tweet from './Tweet';
import { Loader2 } from 'lucide-react';

interface Tweet {
  id: string;
  text: string;
  image?: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
  _count: {
    likes: number;
    comments: number;
  };
  likes: { userId: string }[];
}

export default function TweetFeed() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const res = await fetch('/api/tweets');
        const data = await res.json();
        setTweets(data);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTweets();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (tweets.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No tweets yet. Be the first to tweet!
      </div>
    );
  }

  return (
    <div>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
} 