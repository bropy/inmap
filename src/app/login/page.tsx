'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock } from 'react-icons/fa';  

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    console.log(JSON.stringify({ username, password }));
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      router.push('/map');
    } else {
      setError('Невірний логін або пароль');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-yellow-400 to-purple-500 px-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-xl max-w-sm w-full transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Вхід до системи</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <div className="relative mb-6">
          <FaUser className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Логін"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full text-black px-10 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            required
          />
        </div>

        <div className="relative mb-6">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-black px-10 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md transform transition-transform hover:scale-105"
        >
          Увійти
        </button>

        <div className="text-center mt-4 text-sm text-gray-500">
          <p>Ще не маєте акаунта? 
            <span className="text-blue-500 cursor-pointer hover:underline">
              <a href="/reg"> Зареєструйтесь</a>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
