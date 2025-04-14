'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white fixed top-0 left-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">

        <Link href="/" className="text-xl font-bold text-blue-900">
          InMap
        </Link>
        {!localStorage.getItem('token') && (
        <nav className="flex gap-4 text-sm sm:text-base">
          <Link href="/map" className="text-gray-700 hover:text-blue-900">
            Мапа
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-blue-900">
            Увійти
          </Link>
          <Link href="/reg" className="text-gray-700 hover:text-blue-900">
            Реєстрація
          </Link>
        </nav>
        )}
        {localStorage.getItem('token') && (
        <nav className="flex gap-4 text-sm sm:text-base">
          <Link href="/map" className="text-gray-700 hover:text-blue-900">
            Ви зареєстровані
          </Link>
        </nav>
        )}
      </div>
    </header>
  );
}
