import axios, { AxiosRequestConfig } from "axios";

export const useUpdateOfferImage = (): ((
  offerId: string,
  data: FormData,
) => Promise<void>) => {
  const updateOfferImage = async (offerId: string, data: FormData) => {
    try {
      console.log("data: ", data);
      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // Assuming your offer image upload endpoint is /api/offers/imageData/:offerId
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/offers/imageData/${offerId}`,
        data,
        config,
      );
    } catch (error) {
      console.error("Error updating offer data:", error);
      throw error;
    }
  };

  return updateOfferImage;
};
