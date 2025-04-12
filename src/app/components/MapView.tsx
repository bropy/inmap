"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "@/utils/fixLeafletIcon";

import { useState, useEffect } from "react";
import { places, Place } from "@/data/places";
import PlaceSidebar from "./PlaceSidebar";
import SearchBar from "./SearchBar";

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

function CenterMapOnPlace({ position }: { position: [number, number] }) {
  const map = useMap();
  if (map) {
    map.flyTo(position, 16);
  }
  return null;
}

export default function MapView({ filters }: { filters: Filters }) {
  const [searchText, setSearchText] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const filteredPlaces = places.filter(
    (place) =>
      matchesFilters(place, filters) &&
      place.name.toLowerCase().includes(searchText.toLowerCase().trim())
  );

  useEffect(() => {
    setSelectedPlace(null);
  }, [searchText, filters]);

  return (
    <div>
      <SearchBar
        places={filteredPlaces}
        onChange={setSearchText}
        searchText={searchText}
        setSelectedPlace={setSelectedPlace}
      />

      <MapContainer
        center={[49.8397, 24.0297]}
        zoom={13}
        zoomControl={false}
        style={{ height: "100vh", width: "100%" }}
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
        {selectedPlace && (
          <CenterMapOnPlace position={selectedPlace.position} />
        )}
      </MapContainer>

      {selectedPlace && (
        <PlaceSidebar
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </div>
  );
}
