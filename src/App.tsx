import data from "./../celebrities.json";
import { ChangeEvent, useEffect, useState } from "react";
import { TCelebrity } from "./lib/_definitions";
import Celebrity from "./Components/Celebrity";

function App() {
  const [celebrities, setCelebrities] = useState<TCelebrity[]>(data);
  const [openedAccordian, setOpenedAccordian] = useState<number | null>(null);
  const [searching, setSearching] = useState<TCelebrity[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(()=>{
    if(searchTerm){
      const results = celebrities.filter(
        (cel) =>
          cel.first.toLowerCase().includes(searchTerm) ||
          cel.last.toLowerCase().includes(searchTerm)
      );
      setSearching(results);
    }
  },[celebrities])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearchTerm(search);
    if (search) {
      const results = celebrities.filter(
        (cel) =>
          cel.first.toLowerCase().includes(search) ||
          cel.last.toLowerCase().includes(search)
      );
      setSearching(results);
    } else {
      setSearching([]);
    }
  };

  return (
    <>
      <header className="w-full capitalize space-y-2 p-3">
        <h1 className="text-2xl font-bold text-center">Celebrities Data</h1>
        <div className="lg:w-1/2 m-auto space-y-2">
          <div className="mb-6">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus-visible:outline-none focus-visible:border focus-visible:border-zinc-800"
                placeholder="Search user..."
                required
                onChange={handleSearch}
              />
            </div>
          </div>
          {searchTerm && searching.length === 0 ? (
            <p className="text-center text-gray-500">No results found</p>
          ) : (
            (searching.length > 0 ? searching : celebrities).map(
              (celebrity: TCelebrity) => (
                <Celebrity
                  key={celebrity.id}
                  {...celebrity}
                  isOpen={openedAccordian === celebrity.id}
                  onChange={setOpenedAccordian}
                  setCelebrities={setCelebrities}
                />
              )
            )
          )}
        </div>
      </header>
    </>
  );
}

export default App;
