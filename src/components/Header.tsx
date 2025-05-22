// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { debounce } from 'lodash';

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const currentQuery = searchParams.get('query');
    if (currentQuery) {
      setSearchTerm(currentQuery);
    }
  }, [searchParams]);


  const debouncedSearch = useCallback(
    debounce((term: string) => {
      if (term.trim()) {
        router.push(`/search?query=${encodeURIComponent(term)}`);
      } else {
        if (window.location.pathname === '/search') {
             router.push('/movies');
        }
      }
    }, 500),
    [router]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    debouncedSearch(newTerm);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-3 sm:p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-y-3">
        <Link href="/" className="text-xl font-bold">
          MovieApp
        </Link>

        <form onSubmit={handleSearchSubmit} className="w-full order-last sm:order-none sm:w-auto sm:flex-grow sm:max-w-xs md:max-w-sm lg:max-w-md mx-0 sm:mx-4">
          <div className="relative">
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Поиск фильмов..."
              className={`w-full py-2 px-4 pr-10 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 transition-all duration-300 ${isSearchFocused ? 'focus:ring-blue-500' : 'focus:ring-gray-400'}`}
            />
            <button 
              type="submit" 
              className="absolute right-0 top-0 h-full px-3 text-gray-600 hover:text-blue-600"
              aria-label="Поиск"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
          </div>
        </form>

        <nav>
          <ul className="flex flex-wrap space-x-2 text-sm sm:text-base">
            <li><Link href="/movies" className="hover:text-gray-300 px-2 py-1 rounded-md transition-colors hover:bg-gray-700">Фильмы</Link></li>
            <li><Link href="/favorites" className="hover:text-gray-300 px-2 py-1 rounded-md transition-colors hover:bg-gray-700">Избранное</Link></li>
            <li><Link href="/about" className="hover:text-gray-300 px-2 py-1 rounded-md transition-colors hover:bg-gray-700">О нас</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;