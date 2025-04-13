import Link from "next/link";

export default function MainPage() {
  return (
    <div className="flex items-center text-black justify-center w-full h-lvh">
      mainPage
      <Link href="/map" className="ms-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Go to map
        </button>
      </Link>
    </div>
  );
}
