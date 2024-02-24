"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useAllTripsData } from "../../../utils/getTripsData";
import { fetchTransporterData } from "../../../utils/fetchTransporterData";
import Link from "next/link";
import Filter from "./Filter";

interface Trip {
  id: number;
  departCountry: string;
  departState: string;
  destCountry: string;
  desState: string;
  departDate: string;
  arrivDate: string;
  maxWeight: string;
  description: string;
  transporterId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface FilterValues {
  departureCountry: string;
  destinationCountry: string;
  startDate: string;
}

const FindTripsPage = () => {
  const allTripData = useAllTripsData();
  const [tripData, setTripData] = useState<Trip[]>([]);
  const [filteredTripData, setFilteredTripData] = useState<Trip[]>([]);
  const [transporterNames, setTransporterNames] = useState<{
    [key: string]: string;
  }>({});
  const [filtersApplied, setFiltersApplied] = useState<boolean>(false);

  useEffect(() => {
    if (allTripData) {
      setTripData(allTripData);
    }
  }, [allTripData]);

  useEffect(() => {
    if (tripData) {
      tripData.forEach((trip) => {
        const transporterId = trip.transporterId;
        if (transporterId) {
          fetchTransporterData(transporterId)
            .then((transporterData: any) => {
              console.log("Transporter data:", transporterData);
              setTransporterNames((prevTransporterNames) => ({
                ...prevTransporterNames,
                [transporterId]: transporterData.fullname,
              }));
            })
            .catch((error) => {
              console.error("Error fetching transporter data:", error);
            });
        }
      });
    }
  }, [tripData]);

  const applyFilters = (filters: FilterValues) => {
    console.log(filters.departureCountry);
    console.log(filters.destinationCountry);
    console.log(filters.startDate);

    const tripsToFilter = allTripData || [];
    const filteredTrips = tripsToFilter.filter((trip) => {
      return (
        (!filters.departureCountry ||
          trip.departCountry === filters.departureCountry) &&
        (!filters.destinationCountry ||
          trip.destCountry === filters.destinationCountry) &&
        (!filters.startDate ||
          new Date(filters.startDate) >= new Date(trip.departDate))
      );
    });

    setFilteredTripData(filteredTrips);
    setFiltersApplied(true);
  };

  const resetFilters = () => {
    setFilteredTripData([]);
    setFiltersApplied(false);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Find Trips" />
      <Filter applyFilters={applyFilters} resetFilters={resetFilters} />

      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {filtersApplied && filteredTripData.length === 0 ? (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    Transporter
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Departure
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Start Date
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Arrival
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    End Date
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Weight Left
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={7} className="text-center">
                    No trips found.
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    Transporter
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Departure
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Start Date
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Arrival
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    End Date
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Weight Left
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {(filteredTripData.length > 0
                  ? filteredTripData
                  : tripData
                ).map((trip: Trip) => (
                  <tr key={trip.id}>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {transporterNames[trip.transporterId]}
                      </h5>
                      <p className="text-sm">
                        <Link
                          href={`/profile/${trip.transporterId}`}
                          className="text-blue-500 hover:underline"
                        >
                          Visit Profile
                        </Link>
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {trip.departCountry}
                      </h5>
                      <p className="text-sm">{trip.departState}</p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <h5 className="font-medium dark:text-white">
                        {trip.departDate.slice(0, 10)}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {trip.destCountry}
                      </h5>
                      <p className="text-sm">{trip.desState}</p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <h5 className="font-medium dark:text-white">
                        {trip.arrivDate.slice(0, 10)}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium dark:text-white">
                        {trip.maxWeight}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-8">
                      <div className="flex items-center space-x-3.5">
                        <button className="hover:text-primary">
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                              fill=""
                            />
                            <path
                              d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                              fill=""
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FindTripsPage;
