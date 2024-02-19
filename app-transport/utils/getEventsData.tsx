import { useEffect, useState } from "react";
import axios from "axios";

interface EventsData {
  start: Date;
  end: Date;
  resourceId: string;
}

export const useEventsData = (): EventsData | null => {
  const [eventsData, setEventsData] = useState<EventsData | null>(null);
  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`,
          );
          setEventsData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id]);

  return eventsData;
};
