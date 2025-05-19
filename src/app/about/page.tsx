// src/app/about/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'О приложении - MovieApp',
};

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">О приложении MovieApp</h1>
      <p className="mb-2">
        Это учебное приложение-каталог фильмов, созданное с использованием Next.js,
        TypeScript и Tailwind CSS.
      </p>
      <p className="mb-2">
        <strong>Цель проекта:</strong> продемонстрировать разработку одностраничного
        приложения (SPA) с использованием современных веб-технологий, включая
        роутинг, управление состоянием, работу с API и создание повторно
        используемых компонентов.
      </p>
      <h2 className="text-xl font-semibold mt-4 mb-2">Используемые технологии:</h2>
      <ul className="list-disc list-inside">
        <li>Next.js (React Framework)</li>
        <li>TypeScript</li>
        <li>Tailwind CSS</li>
        <li>The Movie Database (TMDB) API</li>
        <li>Zustand (State Management)</li>
        <li>Git & GitHub</li>
        <li>Vercel (для деплоя)</li>
      </ul>
      <p className="mt-4">
        Разработка ведется в рамках 4-дневного интенсива.
      </p>
    </div>
  );
}