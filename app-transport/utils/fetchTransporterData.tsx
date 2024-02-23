import axios from "axios";

export const fetchTransporterData = async (transporterId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/transporters/${transporterId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching transporter data:", error);
    return null;
  }
};
