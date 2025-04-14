'use client';

import Link from 'next/link';
import { MapPin, MessageCircle, Accessibility } from 'lucide-react';
import Image from 'next/image';

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-400 to-purple-500 p-4 pt-20">
      
      {/* Ілюстрація */}
      <Image
        src="/images/inclusiveGuys.png" // додай своє зображення в /public
        alt="Інклюзивна мапа"
        width={500}
        height={300}
        className="mb-8"
      />

      {/* Заголовок */}
      <h1 className="text-4xl font-bold text-center text-white mb-6">
        Ласкаво просимо до InMap!
      </h1>

      {/* Опис проєкту */}
      <p className="text-lg text-center text-white max-w-2xl mb-10">
        Проєкт, створений, аби допомагати, зрозуміти та підтримати. Тут ми надаємо вам вибір, стараємось забезпечити ваш комфорт під час пересування містом: тактильні елементи, пандуси, адаптовані туалети та інші необхідні аспекти маршруту.
      </p>

      {/* Секція карток */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mb-12">
        <FeatureCard
          Icon={MapPin}
          title="Пошук місць"
          text="Знаходьте доступні локації у вашому місті"
          color="text-blue-600"
        />
        <FeatureCard
          Icon={MessageCircle}
          title="Залишайте відгуки"
          text="Допоможіть іншим, ділячись власним досвідом"
          color="text-green-600"
        />
        <FeatureCard
          Icon={Accessibility}
          title="Інклюзивність"
          text="Сервіс створений з урахуванням потреб кожного"
          color="text-purple-600"
        />
      </div>

      {/* Кнопки переходу */}
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-20">
        <Link href="/map">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
            Перейти до мапи
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
            Увійти
          </button>
        </Link>
        <Link href="/register">
          <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
            Реєстрація
          </button>
        </Link>
      </div>

      {/* Футер */}
      <footer className="text-white text-center p-4 opacity-80">
        © {new Date().getFullYear()} InMap. Всі права захищено.
      </footer>
    </div>
  );
}

// Компонент картки фічі
function FeatureCard({ Icon, title, text, color }: { Icon: any, title: string, text: string, color: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col items-center text-center">
      <Icon className={`w-12 h-12 mb-4 ${color} transition-all duration-300`} />
      <h3 className="text-lg text-gray-800 font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}
