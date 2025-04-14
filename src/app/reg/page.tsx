'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8000/api/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    console.log(JSON.stringify({ username, email, password }));
    const data = await res.json().catch(() => null);
    if (res.status === 201) {
      setSuccess(true);
      setTimeout(() => router.push('/login'), 1500); 
    } else {
      setError(data?.error || 'Щось пішло не так');
    }    
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500 px-4">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-xl max-w-sm w-full transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Реєстрація</h2>

        {success && (
          <p className="text-green-600 text-sm mb-4 text-center">Успішно! Переадресація…</p>
        )}
        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}

        <div className="relative mb-6">
          <FaUser className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Логін"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-10 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            required
          />
        </div>

        <div className="relative mb-6">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-10 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
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
            className="w-full px-10 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg shadow-md transform transition-transform hover:scale-105"
        >
          Зареєструватися
        </button>

        <div className="text-center mt-4 text-sm text-gray-500">
          <p>Вже маєте акаунт? 
            <span className="text-blue-500 cursor-pointer hover:underline">
              <a href="/login"> Увійдіть</a>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
