import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
interface FilterSortProps {
  searchTerm: string | number | readonly string[] | undefined;
  setSearchTerm: (value: React.SetStateAction<string>) => void;
  haveExport?: boolean;
  haveFilter?: boolean;
  haveSort?: boolean;
  filterFactors?:string[]
// sorting not implemented
}
const FilterSort = ({
  searchTerm,
  setSearchTerm,
  haveExport,
  haveFilter,
  haveSort,
  filterFactors=['name','status']
}: FilterSortProps) => {
  const [openFilter, setOpenFilter] = useState(false);
  const handleFilter = () => {
    setOpenFilter((prev) => !prev);
  };
   

  return (
    <div>
      {/* Search, Filter, Sort Bar */}
      <div className="flex justify-between items-center mb-6 gap-4">
        {/* Search Input (Wider input with an icon inside) */}
        <div className="relative flex-grow max-w-lg">
          <input
            type="text"
            className="input input-bordered w-full bg-white pl-10 text-gray-700"
            placeholder="Search subscriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.448 4.39l3.411 3.411a1 1 0 01-1.414 1.414l-3.411-3.411A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Filter and Sort Buttons (Icon only, text aligned) */}
        <div className="flex space-x-2 text-gray-500 font-medium">
          <div className="relative">
            {haveExport && (
              <button className="btn bg-gray-700 border-none shadow-none text-white hover:bg-gray-500 hover:text-gray-50">
                <FontAwesomeIcon icon={faFileExport} />
                Export CSV
              </button>
            )}
            {haveFilter && (
              <>
                <button
                  onClick={handleFilter}
                  className="dropdown btn bg-transparent text-gray-600 border-0 shadow-none normal-case text-sm px-3 "
                >
                  <FontAwesomeIcon icon={faFilter} />
                  Filter
                </button>

                <ul
                  className={`${
                    openFilter ? "block" : "hidden"
                  } absolute w-52  -right-20 z-10 menu dropdown-content bg-white rounded-box z-1  p-2 shadow-lg`}
                >
                  {filterFactors.map((factor) => (
                    <li className="flex flex-row justify-between items-center">
                      <label htmlFor={factor}>{factor}</label>
                      <input
                        name={factor}
                        type="checkbox"
                        className=" checkbox checkbox-primary"
                      />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          {haveSort && (
            <button className="btn normal-case text-sm px-3 bg-transparent border-0 shadow-none text-gray-600"
      
            >
              <FontAwesomeIcon icon={faSort} />
              Sort
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSort;
