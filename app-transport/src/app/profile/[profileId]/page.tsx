"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface ProfileData {
  fullname: string;
  // Add other properties as needed
}

const ProfilePage = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2]; // Assuming the path is '/profile/1', split by '/' and get the third element which is the ID
  console.log(id);
  const [profileData, setProfileData] = useState<ProfileData | null>(null); // Explicitly type profileData

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch profile data based on the id parameter using Axios
        const response = await axios.get<ProfileData>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`,
        );
        setProfileData(response.data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    if (id) {
      fetchProfileData();
    }
  }, [id]);

  return (
    <div>
      <h1>Profile Page</h1>
      {profileData ? (
        <div>
          <p>ID: {id}</p>
          <p>Name: {profileData.fullname}</p>
          {/* Display other profile data */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
