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

export const useSingleTripData = (id: number) => {
  const [tripData, setTripData] = useState<Trip[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trips/single/${id}`,
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
