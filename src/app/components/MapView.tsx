'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '@/utils/fixLeafletIcon';

import { useState } from 'react';
import { places, Place } from '@/data/places';
import PlaceSidebar from './PlaceSidebar';

type Filters = {
  ramps?: boolean;
  tactileElements?: boolean;
  adaptedToilets?: boolean;
  wideEntrance?: boolean;
  visualImpairmentFriendly?: boolean;
  wheelchairAccessible?: boolean;
};

function matchesFilters(place: Place, filters: Filters): boolean {
  return Object.entries(filters).every(([key, value]) => {
    if (!value) return true;
    return place.accessibility[key as keyof Filters] === true;
  });
}

export default function MapView({ filters }: { filters: Filters }) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const filteredPlaces = places.filter((place) => matchesFilters(place, filters));

  return (
    <div>
      <MapContainer
        center={[49.8397, 24.0297]}
        zoom={13}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredPlaces.map((place) => (
          <Marker
            key={place.id}
            position={place.position}
            eventHandlers={{
              click: () => setSelectedPlace(place),
            }}
          >
            <Popup>
              <strong>{place.name}</strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {selectedPlace && (
        <PlaceSidebar place={selectedPlace} onClose={() => setSelectedPlace(null)} />
      )}
    </div>
  );
}
