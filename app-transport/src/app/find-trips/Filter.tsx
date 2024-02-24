import React from "react";
import SelectDepCountry from "./SelectDepCountry";
import SelectDestCountry from "./SelectDestCountry";
import DatePicker from "./DatePicker";
const Filter = () => {
  return (
    <div className="m-2 max-w-screen-2xl">
      <div className="border-gray-200  rounded-xl border bg-white p-6 shadow-lg">
        <h2 className="text-lg font-bold text-stone-700">Apply filters</h2>
        <p className="mt-1 text-sm">Use filters to further refine search</p>
        {/* <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col">
            {/* departure */}
            <SelectDepCountry></SelectDepCountry>
          </div>
          <div className="flex flex-col">
            <SelectDestCountry></SelectDestCountry>
          </div>
          <div className="flex flex-col">
            <DatePicker></DatePicker>
          </div>
          {/* <div className="flex flex-col">
            <label
              htmlFor="status"
              className="text-sm font-medium text-stone-600"
            >
              Status
            </label>
            <select
              id="status"
              className="border-gray-200 mt-2 block w-full rounded-md border px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option>Dispached Out</option>
              <option>In Warehouse</option>
              <option>Being Brought In</option>
            </select>
          </div> */}
        </div>
        <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
          <button className="bg-gray-200 text-gray-600 rounded-lg px-8 py-2 font-medium outline-none hover:opacity-90 focus:ring active:scale-95">
            Reset
          </button>
          <button className="rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none hover:opacity-90 focus:ring active:scale-95">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
