'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';

export default function CreateTweet() {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      setIsLoading(true);
      const res = await fetch('/api/tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          image,
        }),
      });

      if (!res.ok) throw new Error('Failed to create tweet');

      setText('');
      setImage('');
      router.refresh();
      toast.success('Tweet created!');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-b p-4">
      <textarea
        placeholder="What's happening?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full resize-none bg-transparent outline-none"
        rows={3}
      />
      {image && (
        <div className="relative mb-4 h-48">
          <Image
            src={image}
            alt="Tweet image"
            fill
            className="rounded-xl object-cover"
          />
          <button
            type="button"
            onClick={() => setImage('')}
            className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white"
          >
            ×
          </button>
        </div>
      )}
      <div className="flex items-center justify-between">
        <UploadButton<OurFileRouter>
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setImage(res?.[0]?.url || '');
            toast.success('Image uploaded!');
          }}
          onUploadError={(error: Error) => {
            toast.error('Error uploading image');
          }}
        />
        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className="rounded-full bg-blue-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            'Tweet'
          )}
        </button>
      </div>
    </form>
  );
} 