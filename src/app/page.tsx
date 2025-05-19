// src/app/page.tsx
export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Добро пожаловать в MovieApp!</h1>
      <p className="text-lg mb-4">
        Это ваш персональный каталог фильмов. Здесь вы можете находить информацию
        о популярных фильмах, просматривать детали и добавлять понравившиеся
        фильмы в избранное.
      </p>
      <p className="text-lg">
        Используйте навигацию вверху, чтобы начать просмотр.
      </p>
      {}
    </div>
  );
}