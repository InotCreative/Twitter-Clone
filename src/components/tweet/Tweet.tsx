'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Heart, MessageCircle, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-hot-toast';

interface TweetProps {
  tweet: {
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
  };
}

export default function Tweet({ tweet }: TweetProps) {
  const { data: session } = useSession();
  const [isLiking, setIsLiking] = useState(false);
  const [likes, setLikes] = useState(tweet._count.likes);
  const [isLiked, setIsLiked] = useState(
    tweet.likes.some((like) => like.userId === session?.user?.id)
  );

  const handleLike = async () => {
    if (!session) return;
    setIsLiking(true);

    try {
      const res = await fetch(`/api/tweets/${tweet.id}/like`, {
        method: isLiked ? 'DELETE' : 'POST',
      });

      if (!res.ok) throw new Error('Failed to like tweet');

      setIsLiked(!isLiked);
      setLikes(isLiked ? likes - 1 : likes + 1);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <article className="border-b p-4 hover:bg-gray-50">
      <div className="flex gap-4">
        <Link href={`/profile/${tweet.user.id}`}>
          <Image
            src={tweet.user.image}
            alt={tweet.user.name}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <Link
              href={`/profile/${tweet.user.id}`}
              className="font-semibold hover:underline"
            >
              {tweet.user.name}
            </Link>
            <span className="text-gray-500">·</span>
            <time className="text-gray-500">
              {formatDistanceToNow(new Date(tweet.createdAt))}
            </time>
          </div>
          <p className="mt-2 whitespace-pre-wrap">{tweet.text}</p>
          {tweet.image && (
            <div className="mt-3 rounded-xl">
              <Image
                src={tweet.image}
                alt="Tweet image"
                width={500}
                height={300}
                className="rounded-xl"
              />
            </div>
          )}
          <div className="mt-4 flex gap-10 text-gray-500">
            <button
              onClick={handleLike}
              disabled={isLiking || !session}
              className="flex items-center gap-2 transition-colors hover:text-red-600"
            >
              {isLiking ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Heart
                  className={`h-5 w-5 ${isLiked ? 'fill-red-600 text-red-600' : ''}`}
                />
              )}
              <span>{likes}</span>
            </button>
            <Link
              href={`/tweet/${tweet.id}`}
              className="flex items-center gap-2 transition-colors hover:text-blue-500"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{tweet._count.comments}</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
} 