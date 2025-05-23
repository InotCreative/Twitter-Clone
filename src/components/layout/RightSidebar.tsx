'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RightSidebar() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <aside className="w-[350px] p-4">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search Twitter"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border bg-gray-100 px-12 py-3 outline-none focus:border-blue-500"
        />
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
      </form>
      <div className="mt-4 rounded-xl bg-gray-100 p-4">
        <h2 className="text-xl font-bold">Who to follow</h2>
        {/* We'll implement suggested users later */}
        <p className="mt-2 text-gray-600">
          Suggestions will appear here
        </p>
      </div>
    </aside>
  );
} 