import Image from "next/image";
import searchIcon from "@/assets/search.svg";
import { Place } from "@/data/places";
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
    <div className="fixed top-0 left-0 w-80 flex flex-col items-start justify-center z-[1000] p-4">
      <div className="flex items-center bg-gray-300 rounded-2xl shadow-md px-4 py-2 z-[1001] w-full mb-8 h-12">
        <input
          type="text"
          className="outline-none bg-transparent px-2 flex-grow"
          placeholder="Пошук..."
          value={searchText}
          onChange={(e) => onChange(e.target.value)}
        />
        <button className="ml-2">
          <Image src={searchIcon} alt="Search" className="w-6 h-6" />
        </button>
      </div>
      {places.map((place) => (
        <div
          key={place.id}
          className="bg-gray-200 shadow-md rounded-md p-4 mt-2 w-full mb-2"
          onClick={() => setSelectedPlace(place)}
        >
          <h3 className="text-lg font-semibold">{place.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default SearchBar;
