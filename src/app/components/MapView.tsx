"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "@/utils/fixLeafletIcon";

import { useState, useEffect, use } from "react";
import { Place } from "@/data/places";
import PlaceSidebar from "./PlaceSidebar";
import SearchBar from "./SearchBar";
import useTactilePaths from "@/hooks/useTactilePaths";
import BusStopLayer from "./BusStopLayer";
import RoutePlanner from "./RoutePlaner"; // Import the new RoutePlanner component

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
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const tactilePaths = useTactilePaths();
  const filteredPlaces = places.filter(
    (place) =>
      matchesFilters(place, filters) &&
      place.name.toLowerCase().includes(searchText.toLowerCase().trim())
  );

  useEffect(() => {
    setSelectedPlace(null);
  }, [searchText, filters]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/locations/");
      const data = await response.json();
      console.log(data);
      setPlaces(data);
    }
    fetchPlaces();
  },[]);



  return (
    <div className="bg-white relative min-h-screen md:pl-80 text-black">
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
        <div style={{zIndex: 1000, position: "absolute", top: 10, right: 10}}>
        <RoutePlanner />

        </div>

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
          </Marker>
        ))}
        {tactilePaths.map((path, idx) => (
          <Polyline key={idx} positions={path} color="orange" weight={5} />
        ))}

        <BusStopLayer />
        
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