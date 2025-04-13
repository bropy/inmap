"use client";

import { useState, useEffect, useCallback } from "react";
import { useMap, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import { FaDirections, FaTimes, FaWalking, FaBus, FaAccessibleIcon } from "react-icons/fa";
import { places } from "@/data/places";
import { busStops } from "@/data/bus-stopes.json"; // Make sure to import your bus stop data
import useTactilePaths from "@/hooks/useTactilePaths";

// Custom control button component for the map
function RoutePlannerControl() {
  const [showPlanner, setShowPlanner] = useState(false);
  const map = useMap();
  const tactilePaths = useTactilePaths();
  const [startPoint, setStartPoint] = useState<[number, number] | null>(null);
  const [endPoint, setEndPoint] = useState<[number, number] | null>(null);
  const [selectingPoint, setSelectingPoint] = useState<'start' | 'end' | null>(null);
  const [useTactilePathsOption, setUseTactilePathsOption] = useState(false);
  const [calculatedRoute, setCalculatedRoute] = useState<[number, number][] | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [suggestedBuses, setSuggestedBuses] = useState<BusSuggestion[]>([]);
  const [mapClickListener, setMapClickListener] = useState<((e: L.LeafletMouseEvent) => void) | null>(null);

  // Function to handle map clicks for selecting points
  const handleMapClick = useCallback((e: L.LeafletMouseEvent) => {
    if (!selectingPoint) return;
    
    const lat = e.latlng?.lat ?? 0;
    const lng = e.latlng?.lng ?? 0;

    if (selectingPoint === 'start') {
      setStartPoint([lat, lng]);
    } else if (selectingPoint === 'end') {
      setEndPoint([lat, lng]);
    }
    
    setSelectingPoint(null);
    // Remove the click listener after selection
    if (mapClickListener) {
      map.off('click', mapClickListener);
      setMapClickListener(null);
    }
  }, [selectingPoint, map, mapClickListener]);

  // Add or remove map click listener when selectingPoint changes
  useEffect(() => {
    if (selectingPoint) {
      // Set cursor to crosshair to indicate selection mode
      map.getContainer().style.cursor = 'crosshair';
      const listener = (e: L.LeafletMouseEvent) => handleMapClick(e);
      map.on('click', listener);
      setMapClickListener(listener);
    } else {
      // Reset cursor
      map.getContainer().style.cursor = '';
      if (mapClickListener) {
        map.off('click', mapClickListener);
        setMapClickListener(null);
      }
    }

    return () => {
      map.getContainer().style.cursor = '';
      if (mapClickListener) {
        map.off('click', mapClickListener);
      }
    };
  }, [selectingPoint, map, handleMapClick]);

  // Calculate route when both points are set
  useEffect(() => {
    if (startPoint && endPoint) {
      calculateRoute();
    }
  }, [startPoint, endPoint, useTactilePathsOption]);

  // Function to calculate route between points
  const calculateRoute = () => {
    if (!startPoint || !endPoint) return;

    // Find the closest tactile paths if enabled
    let routeCoordinates: [number, number][] = [];
    
    if (useTactilePathsOption && tactilePaths.length > 0) {
      // Try to incorporate tactile paths in the route
      // This is a simplified version - in a real app, you'd use a proper routing algorithm
      
      // Find closest points on tactile paths to start and end
      let closestPathToStart = null;
      let closestPathToEnd = null;
      let minDistStart = Infinity;
      let minDistEnd = Infinity;
      
      tactilePaths.forEach(path => {
        path.forEach(point => {
          const distToStart = L.latLng(startPoint).distanceTo(L.latLng(point));
          const distToEnd = L.latLng(endPoint).distanceTo(L.latLng(point));
          
          if (distToStart < minDistStart) {
            minDistStart = distToStart;
            closestPathToStart = path;
          }
          
          if (distToEnd < minDistEnd) {
            minDistEnd = distToEnd;
            closestPathToEnd = path;
          }
        });
      });
      
      // Create a route that incorporates tactile paths when possible
      if (closestPathToStart === closestPathToEnd && closestPathToStart) {
        // Both points are closest to the same path
        routeCoordinates = [startPoint, ...closestPathToStart, endPoint];
      } else if (closestPathToStart && closestPathToEnd) {
        // Connect between paths if they're different
        routeCoordinates = [
          startPoint, 
          ...closestPathToStart, 
          ...closestPathToEnd, 
          endPoint
        ];
      }
    } else {
      // Simple direct route if tactile paths aren't used
      routeCoordinates = [startPoint, endPoint];
    }
    
    setCalculatedRoute(routeCoordinates);
    
    // Calculate total distance
    let totalDistance = 0;
    for (let i = 0; i < routeCoordinates.length - 1; i++) {
      totalDistance += L.latLng(routeCoordinates[i])
        .distanceTo(L.latLng(routeCoordinates[i + 1]));
    }
    
    setDistance(Math.round(totalDistance));
    
    // Find and suggest bus routes
    suggestBusRoutes(startPoint, endPoint);
  };

  interface BusSuggestion {
    number: string;
    startStop: string;
    endStop: string;
    accessible: boolean;
    lowFloor: boolean;
    visualAnnouncements: boolean;
    tactileMarkings: boolean;
  }

  // Function to suggest bus routes between points
  const suggestBusRoutes = (start: [number, number], end: [number, number]) => {
    if (!busStops || !busStops.length) {
      setSuggestedBuses([]);
      return;
    }

    // Find nearby bus stops to start and end points
    const startLatLng = L.latLng(start);
    const endLatLng = L.latLng(end);
    
    // Find bus stops within 500 meters of start and end
    const nearStartStops = busStops.filter(stop => 
      startLatLng.distanceTo(L.latLng([stop.position[0], stop.position[1]])) < 500
    );
    
    const nearEndStops = busStops.filter(stop => 
      endLatLng.distanceTo(L.latLng([stop.position[0], stop.position[1]])) < 500
    );
    
    // Find bus routes that connect these stops
    const suggestions: BusSuggestion[] = [];
    
    nearStartStops.forEach(startStop => {
      nearEndStops.forEach(endStop => {
        if (startStop.id === endStop.id) return;
        
        // Find buses that serve both stops
        startStop.buses.forEach(bus => {
          const endHasSameBus = endStop.buses.some(endBus => 
            endBus.number === bus.number
          );
          
          if (endHasSameBus && !suggestions.some(s => s.number === bus.number)) {
            suggestions.push({
              number: bus.number,
              startStop: startStop.name,
              endStop: endStop.name,
              accessible: bus.disabilityAccess,
              lowFloor: bus.lowFloor,
              visualAnnouncements: bus.visualAnnouncements,
              tactileMarkings: bus.tactileMarkings
            });
          }
        });
      });
    });
    
    setSuggestedBuses(suggestions);
  };

  // Reset the route planner
  const resetRoute = () => {
    setStartPoint(null);
    setEndPoint(null);
    setCalculatedRoute(null);
    setDistance(null);
    setSuggestedBuses([]);
  };

  // Select a place from the predefined list
  interface Place {
    id: number;
    name: string;
    position: [number, number];
  }

  const selectPlace = (place: Place, pointType: 'start' | 'end') => {
    if (pointType === 'start') {
      setStartPoint(place.position);
    } else {
      setEndPoint(place.position);
    }
    setSelectingPoint(null);
  };

  return (
    <div className="top-10 right-10 z-40">
      {!showPlanner ? (
        <button 
          onClick={() => setShowPlanner(true)} 
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition"
          aria-label="Open route planner"
        >
          <FaDirections className="text-2xl" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Plan Your Route</h3>
            <button 
              onClick={() => {
                setShowPlanner(false);
                resetRoute();
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Start point selector */}
            <div className="flex items-center space-x-2">
              <div className="bg-green-500 rounded-full w-4 h-4"></div>
              <div className="flex-1">
                <div className="relative">
                  <button 
                    onClick={() => setSelectingPoint('start')}
                    className={`w-full p-2 border rounded text-left ${startPoint ? 'bg-green-50' : 'bg-gray-50'}`}
                  >
                    {startPoint ? 'Start point selected' : 'Select start point on map'}
                  </button>
                  
                  {selectingPoint === 'start' && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border rounded shadow-lg z-50 max-h-40 overflow-y-auto">
                      <div className="p-2 border-b font-semibold">Choose from places:</div>
                      {places.map(place => (
                        <button
                          key={place.id} 
                          className="w-full text-left p-2 hover:bg-gray-100 border-b"
                          onClick={() => selectPlace(place, 'start')}
                        >
                          {place.name}
                        </button>
                      ))}
                      <button
                        className="w-full text-left p-2 hover:bg-gray-100 text-blue-600"
                        onClick={() => {
                          // Keep selecting mode but close dropdown
                          document.addEventListener('click', () => {}, {once: true});
                        }}
                      >
                        Click on map instead
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* End point selector */}
            <div className="flex items-center space-x-2">
              <div className="bg-red-500 rounded-full w-4 h-4"></div>
              <div className="flex-1">
                <div className="relative">
                  <button 
                    onClick={() => setSelectingPoint('end')}
                    className={`w-full p-2 border rounded text-left ${endPoint ? 'bg-red-50' : 'bg-gray-50'}`}
                  >
                    {endPoint ? 'End point selected' : 'Select end point on map'}
                  </button>
                  
                  {selectingPoint === 'end' && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border rounded shadow-lg z-50 max-h-40 overflow-y-auto">
                      <div className="p-2 border-b font-semibold">Choose from places:</div>
                      {places.map(place => (
                        <button
                          key={place.id} 
                          className="w-full text-left p-2 hover:bg-gray-100 border-b"
                          onClick={() => selectPlace(place, 'end')}
                        >
                          {place.name}
                        </button>
                      ))}
                      <button
                        className="w-full text-left p-2 hover:bg-gray-100 text-blue-600"
                        onClick={() => {
                          // Keep selecting mode but close dropdown
                          document.addEventListener('click', () => {}, {once: true});
                        }}
                      >
                        Click on map instead
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Options */}
            <div className="flex items-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={useTactilePathsOption}
                  onChange={() => setUseTactilePathsOption(!useTactilePathsOption)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span>Use tactile paths when available</span>
              </label>
            </div>
            
            {/* Route information */}
            {distance && (
              <div className="mt-4 p-3 bg-gray-50 rounded">
                <div className="flex items-center space-x-2 mb-2">
                  <FaWalking className="text-gray-700" />
                  <span className="font-semibold">Distance: {(distance / 1000).toFixed(2)} km</span>
                </div>
                
                {suggestedBuses.length > 0 && (
                  <div>
                    <h4 className="font-semibold flex items-center mb-2">
                      <FaBus className="mr-2 text-gray-700" /> 
                      Suggested bus routes:
                    </h4>
                    <ul className="space-y-2">
                      {suggestedBuses.map((bus, index) => (
                        <li key={index} className="p-2 bg-white rounded border">
                          <div className="flex justify-between">
                            <span className="font-bold">Bus #{bus.number}</span>
                            {bus.accessible && (
                              <FaAccessibleIcon className="text-blue-600" title="Accessible" />
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            From: {bus.startStop} To: {bus.endStop}
                          </div>
                          <div className="mt-1 text-xs flex flex-wrap gap-1">
                            {bus.lowFloor && (
                              <span className="bg-green-100 text-green-800 px-1 rounded">Low Floor</span>
                            )}
                            {bus.visualAnnouncements && (
                              <span className="bg-blue-100 text-blue-800 px-1 rounded">Visual Announcements</span>
                            )}
                            {bus.tactileMarkings && (
                              <span className="bg-purple-100 text-purple-800 px-1 rounded">Tactile Markings</span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            {/* Actions */}
            <div className="flex space-x-2">
              <button 
                onClick={resetRoute}
                className="flex-1 bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300"
              >
                Reset
              </button>
              <button 
                onClick={() => setShowPlanner(false)}
                className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Display markers for selected points */}
      {startPoint && (
        <Marker 
          position={startPoint}
          icon={new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })}
        >
          <Popup>Start Point</Popup>
        </Marker>
      )}
      
      {endPoint && (
        <Marker 
          position={endPoint}
          icon={new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })}
        >
          <Popup>End Point</Popup>
        </Marker>
      )}
      
      {/* Display the calculated route */}
      {calculatedRoute && (
        <Polyline 
          positions={calculatedRoute} 
          color={useTactilePathsOption ? "orange" : "blue"} 
          weight={5} 
          dashArray={useTactilePathsOption ? "" : "5,10"}
        />
      )}
    </div>
  );
}

export default function RoutePlanner() {
  return <RoutePlannerControl />;
}