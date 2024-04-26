// filter.tsx
import React, { useState } from "react";
import SelectDepCountry from "./SelectDepCountry";
import SelectDestCountry from "./SelectDestCountry";
import DatePicker from "./DatePicker";
import SelectStatus from "./SelectStatus";
interface FilterProps {
  applyFilters: (filters: FilterValues) => void; // Define the type for applyFilters
  resetFilters: () => void;
}

interface FilterValues {
  departureCountry: string;
  destinationCountry: string;
  startDate: string; // Adjust the type as per your requirement
  status: string;
}

const Filter: React.FC<FilterProps> = ({ applyFilters, resetFilters }) => {
  const [departureCountry, setDepartureCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [startDate, setStartDate] = useState("");
  const [status, setStatus] = useState("");

  const handleApplyFilters = () => {
    // Call the applyFilters function with selected filter values
    const filters: FilterValues = {
      departureCountry,
      destinationCountry,
      startDate,
      status,
    };
    applyFilters(filters);
  };

  const handleResetFilters = () => {
    // Reset filter state
    setDepartureCountry("");
    setDestinationCountry("");
    setStartDate("");
    setStatus("");
    // Reset filters on parent component
    resetFilters();
  };

  return (
    <div className="m-2 max-w-screen-2xl">
      <div className="border-gray-200 rounded-xl border bg-white p-6 shadow-lg">
        <h2 className="text-lg font-bold text-stone-700">Apply filters</h2>
        <p className="mt-1 text-sm">Use filters to further refine search</p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col">
            {/* departure */}
            <SelectDepCountry
              selectedCountry={departureCountry}
              onCountryChange={(value: string) => setDepartureCountry(value)}
            />
          </div>
          <div className="flex flex-col">
            <SelectDestCountry
              selectedCountry={destinationCountry}
              onCountryChange={(value: string) => setDestinationCountry(value)}
            />
          </div>
          <div className="flex flex-col">
            <DatePicker
              selectedDate={startDate}
              onChange={(date: string) => setStartDate(date)}
            />
          </div>
          <div className="flex flex-col">
            <SelectStatus
              selectedStatus={status}
              onStatusChange={(value: string) => setStatus(value)}
            ></SelectStatus>
          </div>
        </div>

        <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
          <button
            onClick={handleResetFilters}
            className="bg-gray-200 text-gray-600 rounded-lg px-8 py-2 font-medium outline-none hover:opacity-90 focus:ring active:scale-95"
          >
            Reset
          </button>
          <button
            onClick={handleApplyFilters}
            className="rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none hover:opacity-90 focus:ring active:scale-95"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
