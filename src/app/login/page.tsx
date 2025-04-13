'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api-token-auth/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      router.push('/map'); 
    } else {
      setError('Невірний логін або пароль');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Вхід до системи</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Логін"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Увійти
        </button>
      </form>
    </div>
  );
}
