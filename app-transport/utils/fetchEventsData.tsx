import axios from "axios";

export const fetchEventsData = async (): Promise<null> => {
  const id = localStorage.getItem("id");
  try {
    if (id) {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${id}`,
      );
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
  return null;
};
