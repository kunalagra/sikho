"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
    const router = useRouter();

    const [value, setValue] = useState('');

  return (
    <div className="bg-lightpink-1">
      <div className="max-w-md mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <img 
            src="search.svg"
            />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border-white rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search courses..."
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
           onClick={() => router.push(`/explore?keyword=${value.toLowerCase()}`)}
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
