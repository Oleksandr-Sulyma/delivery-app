'use client';

import { useEffect, useState } from 'react';
import { shopService } from '../services/api';

export default function Home() {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    shopService.getAllShops()
      .then((res) => {
        setShops(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Помилка завантаження магазинів:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Завантаження...</div>;

  return (
    <main style={{ padding: '20px', display: 'flow-root' }}>
    <h1>Магазини (дані з бекенду):</h1>
    <ul>
      {shops.map((shop) => (
        <li key={shop._id}>
          <strong>{shop.name}</strong> — {shop.address}
        </li>
      ))}
    </ul>
  </main>
  );
}