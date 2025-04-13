'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import FilterPanel from './components/FilterPanel';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from './components/mainPage';

const MapView = dynamic(() => import('./components/MapView'), { ssr: false });

export default function HomePage() {
  const [filters, setFilters] = useState({});

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/map"
          element={
            <main style={{ position: "relative" }}>
              <FilterPanel onChange={setFilters} />
              <MapView filters={filters} />
            </main>
          }
        />
      </Routes>
    </Router>
  );
}
