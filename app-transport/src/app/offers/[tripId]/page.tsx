"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter, usePathname } from "next/navigation";
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

const ViewOffers = () => {
  const pathname = usePathname();
  const currentTripId = pathname.split("/")[2];
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
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/offers/${id}`)
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

  const filteredOffers = offerData.filter(
    (offer: any) => offer.tripId === currentTripId,
  );

  const [isDelegateModalOpen, setIsDelegateModalOpen] = useState(false);
  const [offerToDelegateId, setOfferToDelegateId] = useState<number | null>(
    null,
  );

  const openDelegateModal = (offerId: number) => {
    setIsDelegateModalOpen(true);
    setOfferToDelegateId(offerId);
  };

  const closeConfirmModal = () => {
    setIsDelegateModalOpen(false);
  };

  const userId = localStorage.getItem("id");

  const [transporters, setTransporters] = useState<UserData[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransporters = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
        );
        const transporterUsers = response.data.filter(
          (user: any) => user.role === "transporter" && user.id != userId,
        );
        setTransporters(transporterUsers);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    fetchTransporters();
  }, []);

  const [selectedTransporter, setSelectedTransporter] = useState<string | null>(
    null,
  );

  const handleTransporterChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedTransporter(event.target.value);
  };

  const handleDelegate = () => {
    if (offerToDelegateId !== null) {
      setOfferData((prevOfferData) =>
        prevOfferData.filter((offer: any) => offer.id !== offerToDelegateId),
      );
    }
    axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/offers/${offerToDelegateId}`,
      { transporterId: selectedTransporter, status: userId },
    );
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Accepted Offers" />
      {isDelegateModalOpen && (
        <div
          id="deleteModal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
          style={{ zIndex: 9999, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="relative w-full max-w-md">
            {/* Modal content */}
            <div className="dark:bg-gray-800 relative rounded-lg bg-white p-4 text-center shadow sm:p-5">
              <button
                type="button"
                onClick={closeConfirmModal}
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 absolute right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <svg
                className="text-gray-400 dark:text-gray-500 mx-auto mb-3.5 h-11 w-11"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="m3.62 6.389 8.396 6.724 8.638-6.572-7.69-4.29a1.975 1.975 0 0 0-1.928 0L3.62 6.39Z" />
                <path d="m22 8.053-8.784 6.683a1.978 1.978 0 0 1-2.44-.031L2.02 7.693a1.091 1.091 0 0 0-.019.199v11.065C2 20.637 3.343 22 5 22h14c1.657 0 3-1.362 3-3.043V8.053Z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-300 mb-4">
                Select a transporter
              </p>
              <div className="mb-5">
                <select
                  id="transporter"
                  className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  value={selectedTransporter || ""}
                  onChange={handleTransporterChange}
                >
                  <option value="" disabled>
                    Select a transporter
                  </option>
                  {transporters.map((transporter) => (
                    <option key={transporter.id} value={transporter.fullname}>
                      {transporter.fullname}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  className="text-gray-500 border-gray-200 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-600 rounded-lg border bg-white px-3 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 focus:ring-modal-300 dark:hover:text-white"
                  onClick={closeConfirmModal} // Close modal on click
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`inline-flex items-center rounded-lg bg-modal-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-modal-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900 ${!selectedTransporter ? "cursor-not-allowed opacity-50" : ""}`}
                  disabled={!selectedTransporter}
                  onClick={handleDelegate}
                >
                  <svg
                    className="-ml-1 mr-1.5 h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="m3.62 6.389 8.396 6.724 8.638-6.572-7.69-4.29a1.975 1.975 0 0 0-1.928 0L3.62 6.39Z" />
                    <path d="m22 8.053-8.784 6.683a1.978 1.978 0 0 1-2.44-.031L2.02 7.693a1.091 1.091 0 0 0-.019.199v11.065C2 20.637 3.343 22 5 22h14c1.657 0 3-1.362 3-3.043V8.053Z" />
                  </svg>
                  Delegate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {filteredOffers.map((offer: any, offerIndex: number) => {
        const tripData = tripDataMap[offer.tripId];
        const userData = userDataMap[offer.userId];
        const pictures = JSON.parse(offer.picture);
        const pictureIds = JSON.parse(offer.pictureIds);
        let totalWeight = 0;

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
              </div>
              <div className="space-x-4">
                {(() => {
                  if (
                    offer.status === "accepted" &&
                    tripData?.status === "ongoing"
                  ) {
                    return (
                      <button
                        onClick={() => openDelegateModal(offer.id)}
                        className="rounded-md bg-modal-700 px-4 py-2 text-white hover:bg-modal-800"
                      >
                        Delegate Package
                      </button>
                    );
                  }
                })()}
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
              const weight = parseFloat(object[`weight-${index}`]);
              totalWeight += weight; // Add object weight to total weight
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
      })}
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

export default ViewOffers;
