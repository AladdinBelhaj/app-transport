import axios from "axios";

interface UpdateTripData {
  departCountry?: string;
  departState?: string;
  destCountry?: string;
  desState?: string;
  departDate?: string;
  arrivDate?: string;
  maxWeight?: string;
  description?: string;
  status?: string;
}
export const useUpdateTripData = (
  id: any,
): ((data: UpdateTripData) => Promise<void>) => {
  const UpdateTripData = async (data: UpdateTripData) => {
    try {
      console.log("data: ", data);
      if (id) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trips/${id}`,
          data,
        );
      } else {
        throw new Error("User ID is not available.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  };

  return UpdateTripData;
};
