import { useEffect, useState } from "react";
import axios from "axios";

export const useEventsData = () => {
  const [events, setEvents] = useState<any[]>([]);
  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${id}`,
        );

        const formattedEvents = response.data.map((event: any) => {
          const startDate = new Date(event.start);
          startDate.setDate(startDate.getDate() - 1);

          return {
            title: event.title,
            start: startDate.toISOString(),
            end: event.end,
            resourceId: event.resourceId,
          };
        });

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events data:", error);
      }
    };

    fetchEventsData();
  }, []);

  return events;
};
