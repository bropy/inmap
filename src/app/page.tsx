'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, MessageCircle, Accessibility } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 pt-20">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">
        Ласкаво просимо до InMap!
      </h1>

      <p className="text-lg text-center text-gray-700 max-w-2xl mb-8">
        Проєкт, створений, аби допомагати, зрозуміти та підтримати. Тут ми надаємо вам вибір, стараємось забезпечити ваш комфорт під час пересування містом: тактильні елементи, пандуси, адаптовані туалети та інші необхідні аспекти маршруту.
      </p>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mb-12">
        <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center text-center">
          <MapPin className="w-10 h-10 text-blue-600 mb-2" />
          <h3 className="text-lg text-gray-800 font-semibold mb-1">Пошук місць</h3>
          <p className="text-sm text-gray-600">Знаходьте доступні локації у вашому місті</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center text-center">
          <MessageCircle className="w-10 h-10 text-green-600 mb-2" />
          <h3 className="text-lg text-gray-800 font-semibold mb-1">Залишайте відгуки</h3>
          <p className="text-sm text-gray-600">Допоможіть іншим, ділячись власним досвідом</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center text-center">
          <Accessibility className="w-10 h-10 text-purple-600 mb-2" />
          <h3 className="text-lg text-gray-800 font-semibold mb-1">Інклюзивність</h3>
          <p className="text-sm text-gray-600">Сервіс створений з урахуванням потреб кожного</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link href="/map">
          <button className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600">
            Перейти до мапи
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600">
            Увійти
          </button>
        </Link>
        <Link href="/reg">
          <button className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600">
            Реєстрація
          </button>
        </Link>
      </div>
    </div>
  );
}
