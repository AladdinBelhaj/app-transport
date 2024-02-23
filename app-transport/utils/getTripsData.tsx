import { useState, useEffect } from "react";
import axios from "axios";

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

export const useTripData = () => {
  const [tripData, setTripData] = useState<Trip[] | null>(null); // Type assertion added
  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trips/${id}`,
        );
        setTripData(response.data);
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
    };

    fetchData();

    return () => {};
  }, [id]);

  return tripData;
};

export const useAllTripsData = () => {
  const [allTripsData, setAllTripsData] = useState<Trip[] | null>(null);

  useEffect(() => {
    const fetchAllTrips = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trips/all`,
        );
        setAllTripsData(response.data);
      } catch (error) {
        console.error("Error fetching all trips data:", error);
      }
    };

    fetchAllTrips();

    return () => {};
  }, []);

  return allTripsData;
};
