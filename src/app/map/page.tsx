'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import FilterPanel from '../components/FilterPanel';

const MapView = dynamic(() => import('../components/MapView'), { ssr: false });

export default function MapPage() {
  const [filters, setFilters] = useState({});

  return (
    <main style={{ position: 'relative' }}>
      <FilterPanel onChange={setFilters} />
      <MapView filters={filters} />
    </main>
  );
}
