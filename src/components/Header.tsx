// src/components/Header.tsx
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          MovieApp
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:text-gray-300">Главная</Link></li>
            <li><Link href="/movies" className="hover:text-gray-300">Фильмы</Link></li> {}
            <li><Link href="/favorites" className="hover:text-gray-300">Избранное</Link></li> {}
            <li><Link href="/about" className="hover:text-gray-300">О приложении</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;