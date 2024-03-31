"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { SocketContext } from "../context/SocketContext";

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
  const socket = useContext(SocketContext);
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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [offerToDeleteId, setOfferToDeleteId] = useState<number | null>(null);
  const [offerToAcceptId, setOfferToAcceptId] = useState<number | null>(null);
  const [userToBeAnswered, setUserToBeAnswered] = useState<string | null>(null);

  const openDeleteModal = (offerId: number, userId: string) => {
    setIsDeleteModalOpen(true);
    setUserToBeAnswered(userId);
    setOfferToDeleteId(offerId);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openAcceptModal = (offerId: number, userId: string) => {
    setIsAcceptModalOpen(true);
    setUserToBeAnswered(userId);
    setOfferToAcceptId(offerId); // Set the offer ID to be deleted
  };

  const closeAcceptModal = () => {
    setIsAcceptModalOpen(false);
  };

  const handleDelete = () => {
    if (offerToDeleteId !== null) {
      // Remove the rejected offer from the UI
      setOfferData((prevOfferData) =>
        prevOfferData.filter((offer: any) => offer.id !== offerToDeleteId),
      );
      setIsDeleteModalOpen(false);
      setOfferToDeleteId(null);
      setUserToBeAnswered(null);
      const offerToReject = offerData.find(
        (offer: any) => offer.id === offerToDeleteId,
      ) as { id: string; tripId: string } | undefined;

      let tripId: string | undefined;
      let tripData: TripData | undefined;

      if (offerToReject) {
        tripId = offerToReject.tripId;

        if (tripId !== undefined) {
          tripData = tripDataMap[tripId];
        }
      }
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/offers/${offerToDeleteId}`,
          { status: "rejected" },
        )
        .then((response) => {
          console.log("Offer rejected successfully");
          axios
            .post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bellnotifications/create`,
              {
                userId: userToBeAnswered,
                message: `Your offer has been rejected (${tripData?.departCountry} to ${tripData?.destCountry} trip!)`,
                isRead: false,
                date: new Date(),
              },
            )
            .then((response: any) => {
              console.log(response.data);
              socket?.emit("sendApplyTripNotif", response.data);
            });
        })
        .catch((error) => {
          console.error("Error rejecting offer:", error);
        });
    }
  };

  const handleAccept = () => {
    if (offerToAcceptId !== null) {
      setOfferData((prevOfferData) =>
        prevOfferData.filter((offer: any) => offer.id !== offerToAcceptId),
      );
      setIsAcceptModalOpen(false);
      setOfferToAcceptId(null);
      setUserToBeAnswered(null);
      const offerToAccept = offerData.find(
        (offer: any) => offer.id === offerToAcceptId,
      ) as { id: string; totalWeight: string; tripId: string } | undefined;

      let totalWeight: number | undefined;
      let tripId: string | undefined;
      let tripData: TripData | undefined;
      let tripWeight: number | undefined;
      let newWeight: number | undefined;
      if (offerToAccept) {
        totalWeight = +offerToAccept.totalWeight;
        tripId = offerToAccept.tripId;

        if (tripId !== undefined) {
          tripData = tripDataMap[tripId];
        }
      }

      // Ensure tripData is defined before accessing its properties
      if (tripData) {
        tripWeight = +tripData.maxWeight;
      }

      if (
        tripWeight != undefined &&
        totalWeight != undefined &&
        tripData != undefined
      ) {
        tripData.maxWeight = (tripWeight - totalWeight).toString();
      }
      // console.log(newWeight);
      // console.log(tripWeight);
      // console.log(totalWeight);
      // console.log(tripId);
      // console.log(tripData);
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/offers/${offerToAcceptId}`,
          { status: "accepted" },
        )
        .then((response) => {
          console.log("Offer accepted successfully");
          axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chats`, {
            firstId: String(id),
            secondId: String(userToBeAnswered),
          });
          axios
            .post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bellnotifications/create`,
              {
                userId: userToBeAnswered,
                message: `Your offer has been accepted (${tripData?.departCountry} to ${tripData?.destCountry} trip!)`,
                isRead: false,
                date: new Date(),
              },
            )
            .then((response: any) => {
              console.log(response.data);
              socket?.emit("sendApplyTripNotif", response.data);
            });
        })
        .catch((error) => {
          console.error("Error accepting offer:", error);
        });
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trips/${tripId}`,
          tripData,
        )
        .then((response) => {
          console.log("Trip weight updated successfully");
        })
        .catch((error) => {
          console.error("Error updating trip weight:", error);
        });
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Current Offers" />
      {/* Delete Modal */}
      {isDeleteModalOpen && (
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
                onClick={closeDeleteModal}
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
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0v-6zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-gray-500 dark:text-gray-300 mb-4">
                Are you sure you want to reject this offer?
              </p>
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  className="text-gray-500 border-gray-200 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-600 rounded-lg border bg-white px-3 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 focus:ring-modal-300 dark:hover:text-white"
                  onClick={closeDeleteModal} // Close modal on click
                >
                  No, cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                  onClick={() => handleDelete()}
                >
                  <svg
                    aria-hidden="true"
                    className="-ml-1 mr-1.5 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0v-6zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* End Delete Modal */}
      {/* Accept Modal */}
      {isAcceptModalOpen && (
        <div
          id="acceptModal"
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
                onClick={closeAcceptModal}
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
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z"
                  clip-rule="evenodd"
                />
              </svg>
              <p className="text-gray-500 dark:text-gray-300 mb-4">
                Are you sure you want to accept this offer?
              </p>
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  className="text-gray-500 border-gray-200 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-600 rounded-lg border bg-white px-3 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 focus:ring-modal-300 dark:hover:text-white"
                  onClick={closeAcceptModal} // Close modal on click
                >
                  No, cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                  onClick={() => handleAccept()}
                >
                  <svg
                    className="-ml-1 mr-1.5 h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* End Delete Modal */}

      {offerData
        .filter(
          (offer: any) =>
            offer.status !== "accepted" && offer.status !== "rejected",
        )
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
                <div className="space-x-4">
                  <button
                    onClick={() => openAcceptModal(offer.id, userData?.id)}
                    className={`rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-700 ${+tripData?.maxWeight < +offer.totalWeight ? "cursor-not-allowed opacity-40" : ""}`}
                    disabled={+tripData?.maxWeight < +offer.totalWeight}
                  >
                    Accept Offer
                  </button>

                  <button
                    onClick={() => openDeleteModal(offer.id, userData?.id)}
                    className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-700"
                  >
                    Reject Offer
                  </button>
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

export default Offers;
