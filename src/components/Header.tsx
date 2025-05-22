// src/components/Header.tsx
import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/24/outline'; 

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 sticky top-0 z-50 shadow-md"> {}
      <div className="container mx-auto flex flex-wrap justify-between items-center"> {}
        <Link href="/" className="text-xl font-bold mb-2 sm:mb-0"> {}
          MovieApp
        </Link>
        <nav>
          <ul className="flex flex-wrap space-x-2 sm:space-x-4 text-sm sm:text-base"> {}
            <li><Link href="/" className="hover:text-gray-300 px-2 py-1">Главная</Link></li>
            <li><Link href="/movies" className="hover:text-gray-300 px-2 py-1">Фильмы</Link></li>
            <li><Link href="/favorites" className="hover:text-gray-300 px-2 py-1">Избранное</Link></li>
            <li><Link href="/about" className="hover:text-gray-300 px-2 py-1">О приложении</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;