import {Link} from "react-router-dom";

export default function mainPage(){
    return (
      <>
        <div className="flex items-center text-black justify-center w-full h-lvh">
          mainPage
          <Link to="/map" className="ms-4 ">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Go to map
            </button>
          </Link>
        </div>
      </>
    );
}