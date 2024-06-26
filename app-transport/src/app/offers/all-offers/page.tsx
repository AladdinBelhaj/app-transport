"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";

interface TripData {
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

interface UserData {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  username: string;
  role: string;
  bio: string;
  isFirstLogin: string;
  picture: string;
}

const Offers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [offerData, setOfferData] = useState([]);
  const [tripDataMap, setTripDataMap] = useState<{ [key: string]: TripData }>(
    {},
  );
  const [userDataMap, setUserDataMap] = useState<{ [key: string]: UserData }>(
    {},
  );
  const modalRef = useRef<HTMLDivElement>(null);

  const id = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/offers`)
      .then((response) => {
        setOfferData(response.data);
        const tripIds = response.data.map((offer: any) => offer.tripId);
        const userIds = response.data.map((offer: any) => offer.userId);

        const uniqueTripIds: string[] = Array.from(
          new Set(tripIds),
        ) as string[];
        uniqueTripIds.forEach((tripId) => {
          fetchTripData(tripId);
        });

        const uniqueUserIds: string[] = Array.from(
          new Set(userIds),
        ) as string[];
        uniqueUserIds.forEach((userId) => {
          fetchUserData(userId);
        });
      })
      .catch((error) => {
        console.error("Error fetching offer data:", error);
      });
  }, []);

  const fetchTripData = (tripId: string) => {
    axios
      .get<TripData>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trips/single/${tripId}`,
      )
      .then((response) => {
        setTripDataMap((prevTripDataMap) => ({
          ...prevTripDataMap,
          [tripId]: response.data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching trip data:", error);
      });
  };

  const fetchUserData = (userId: string) => {
    axios
      .get<UserData>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`,
      )
      .then((response) => {
        setUserDataMap((prevUserDataMap) => ({
          ...prevUserDataMap,
          [userId]: response.data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const openModal = (imageSrc: any) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage("");
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleEscape = (event: any) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Offers" />

      {offerData.length > 0 ? (
        offerData
          //   .filter(
          //     (offer: any) =>
          //       offer.status !== "accepted" && offer.status !== "rejected",
          //   )
          .map((offer: any, offerIndex: number) => {
            const tripData = tripDataMap[offer.tripId];
            const userData = userDataMap[offer.userId];
            const pictures = JSON.parse(offer.picture);
            const pictureIds = JSON.parse(offer.pictureIds);
            return (
              <div
                className="dark:border-stroked mb-10 rounded-sm border border-stroke bg-white shadow-default"
                key={offerIndex}
              >
                <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
                  <div>
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                      {tripData?.departCountry} to {tripData?.destCountry}
                      <span className="text-sm font-light">
                        {" "}
                        (Weight Left: {tripData?.maxWeight} kg)
                      </span>
                    </h4>
                    <p className="text-sm font-normal">
                      Offer by{" "}
                      <Link
                        href={`/profile/${userData?.id}`}
                        className="text-blue-500 hover:underline"
                      >
                        {userData?.fullname}
                      </Link>{" "}
                    </p>
                    <span className="text-sm font-light">
                      Total Weight: {offer.totalWeight} kg
                    </span>
                    {+offer.totalWeight > +tripData?.maxWeight && (
                      <div className="mt-2 flex items-center text-red-600">
                        <svg
                          className="mr-1 h-5 w-5 fill-current"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        Warning: Offer weight exceeds trip weight!
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                  <div className="col-span-3 flex items-center">
                    <p className="font-medium">Object</p>
                  </div>
                  <div className="col-span-1 hidden items-center sm:flex">
                    <p className="font-medium">Width</p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="font-medium">Length</p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="font-medium">Height</p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="font-medium">Weight</p>
                  </div>
                </div>

                {JSON.parse(offer.objects).map((object: any, index: number) => {
                  const pictureIndex = pictureIds.indexOf(index);

                  return (
                    <div
                      className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                      key={index}
                    >
                      {/* Render offer details */}
                      <div className="col-span-3 flex items-center">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                          {pictureIndex !== -1 && (
                            <div
                              className="h-15 w-17.5 cursor-pointer rounded-md"
                              onClick={() =>
                                openModal(
                                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/${pictures[pictureIndex]}`,
                                )
                              }
                            >
                              <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${pictures[pictureIndex]}`}
                                width={60}
                                height={50}
                                alt="Product"
                              />
                            </div>
                          )}
                          <p className="text-sm text-black dark:text-white">
                            {object[`name-${index}`]}
                          </p>
                        </div>
                      </div>
                      <div className="col-span-1 hidden items-center sm:flex">
                        <p className="text-sm text-black dark:text-white">
                          {object[`width-${index}`]} cm
                        </p>
                      </div>
                      <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">
                          {object[`length-${index}`]} cm
                        </p>
                      </div>
                      <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">
                          {object[`height-${index}`]} cm
                        </p>
                      </div>
                      <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">
                          {object[`weight-${index}`]} kg
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })
      ) : (
        <div className="text-gray-500 text-center">No offers yet!</div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
          style={{ zIndex: 9999 }}
        >
          <div
            ref={modalRef}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeModal}
          ></div>
          <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-transparent p-4 shadow-lg">
            <img
              src={selectedImage}
              alt="Selected Product"
              className="h-65 w-full object-contain"
            />
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default Offers;
