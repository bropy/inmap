import Image from "next/image";
import { Place } from "@/data/places";
import { FaSearch } from "react-icons/fa";
type Filters = {
  ramps?: boolean;
  tactileElements?: boolean;
  adaptedToilets?: boolean;
  wideEntrance?: boolean;
  visualImpairmentFriendly?: boolean;
  wheelchairAccessible?: boolean;
};

function SearchBar({
  places,
  onChange,
  searchText,
  setSelectedPlace,
}: {
  places: Place[];
  onChange: (search: string) => void;
  searchText: string;
  setSelectedPlace: (place: Place | null) => void;
}) {

  return (
    <div className="fixed w-full max-w-md mx-auto md:top-12 md:left-0 md:w-80  flex flex-col items-start justify-center z-[1000] p-4">
      <div className="flex items-center bg-gray-300 rounded-2xl shadow-md px-4 py-2 z-[1001] w-full mb-4 h-12">
        <input
          type="text"
          className="outline-none bg-transparent px-2 flex-grow"
          placeholder="Пошук..."
          value={searchText}
          onChange={(e) => onChange(e.target.value)}
        />
        <button className="ml-2">
          <FaSearch className="w-6 h-6"/>
        </button>
      </div>

      <div className="fixed bottom-0 left-0 w-full h-64 bg-white z-[999] p-4 overflow-y-auto shadow-t md:hidden">
        {places.map((place) => (
          <div
            key={place.id}
            className="bg-gray-100 shadow-sm rounded-md p-3 mb-2 cursor-pointer hover:bg-gray-200"
            onClick={() => setSelectedPlace(place)}
          >
            <h3 className="text-sm font-medium">{place.name}</h3>
          </div>
        ))}
      </div>

      <div className="hidden md:block w-full mt-2">
        {places.map((place) => (
          <div
            key={place.id}
            className="bg-gray-200 shadow-md rounded-md p-4 mt-2 w-full mb-2 cursor-pointer hover:bg-gray-300"
            onClick={() => setSelectedPlace(place)}
          >
            <h3 className="text-lg font-semibold">{place.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
