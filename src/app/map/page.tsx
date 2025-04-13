'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import FilterPanel from '../components/FilterPanel';
import FilterPanelMobile from '../components/FilterPanelMobile';

const MapView = dynamic(() => import('../components/MapView'), { ssr: false });

export default function MapPage() {
  const [filters, setFilters] = useState({});

  return (
    <main style={{ position: 'relative' }}>
      <div className="hidden md:block">
        <FilterPanel onChange={setFilters} />
        </div>

        <div className="block md:hidden">
        <FilterPanelMobile onChange={setFilters} />
      </div>
      <MapView filters={filters} />
    </main>
  );
}
