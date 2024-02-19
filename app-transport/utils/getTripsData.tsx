import { useEffect, useState } from "react";
import axios from "axios";

interface TripData {
  fullname: string;
  phone: string;
  email: string;
  username: string;
  bio: string;
  isFirstLogin: string;
  picture: string;
}

export const useTripData = (): TripData | null => {
  const [tripData, setTripData] = useState<TripData | null>(null);
  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`,
          );
          setTripData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id]);

  return tripData;
};
