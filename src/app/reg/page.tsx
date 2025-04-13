'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (res.status === 201) {
      setSuccess(true);
      setTimeout(() => router.push('/login'), 1500); 
    } else {
      const data = await res.json().catch(() => null);
      setError(data?.message || 'Щось пішло не так');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Реєстрація</h2>

        {success && (
          <p className="text-green-600 text-sm mb-4 text-center">Успішно! Переадресація…</p>
        )}
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        >
          Зареєструватися
        </button>
      </form>
    </div>
  );
}
