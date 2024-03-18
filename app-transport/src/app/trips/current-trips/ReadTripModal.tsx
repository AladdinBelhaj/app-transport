import React, { useState } from "react";
import UpdateTripModal from "./UpdateTripModal";
import { useRouter } from "next/navigation";
import axios from "axios";
interface Trip {
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

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedTrip: Trip | null;
}

const ReadTripModal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  selectedTrip,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setModalOpen(false);
    closeModal();
  };

  const [isUpdateModalOpen, setUpdateIsModalOpen] = useState(false);

  const closeUpdateModal = () => {
    setUpdateIsModalOpen(false);
  };
  const openUpdateModal = () => {
    setUpdateIsModalOpen(true);
  };

  const router = useRouter();
  const viewOffers = () => {
    router.push(`/offers/${selectedTrip?.id}`);
  };

  const handleStart = (event: React.FormEvent) => {
    closeModal();
    if (selectedTrip != null) {
      selectedTrip.status = "ongoing";
    }
    console.log(selectedTrip);
    console.log(selectedTrip?.id);
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trips/${selectedTrip?.id}`,
        selectedTrip,
      )
      .then((response) => {})
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelegate = (event: React.FormEvent) => {
    router.push("/delegate-objects");
  };

  return (
    <div>
      {/* Main modal */}
      {isOpen && ( // Render the modal only if isOpen prop is true
        <div
          id="readProductModal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 md:h-full"
          style={{ zIndex: 9999 }}
        >
          <div
            className="fixed inset-0 bg-black opacity-50" // Close the modal if clicked outside
          ></div>
          <div className="relative h-full w-full max-w-xl p-4 md:h-auto">
            {/* Modal content */}
            <div className="dark:bg-gray-800 relative rounded-lg bg-white p-4 shadow sm:p-5">
              {/* Modal header */}
              <div className="mb-4 flex justify-between rounded-t sm:mb-5">
                <div className="text-gray-900 text-lg dark:text-white md:text-xl">
                  <h3 className="font-semibold ">
                    Trip to {selectedTrip?.destCountry}
                  </h3>
                  <p className="text-sm font-bold">{selectedTrip?.desState}</p>
                </div>
                <div>
                  <button
                    type="button"
                    className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 inline-flex rounded-lg bg-transparent p-1.5 text-sm dark:hover:text-white"
                    onClick={handleCloseModal} // Call handleCloseModal function when close button is clicked
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
                </div>
              </div>
              <dl>
                <dt className="text-gray-900 mb-2 font-semibold leading-none dark:text-white">
                  Details
                </dt>
                <dd className="text-gray-500 dark:text-gray-400 mb-4 font-light sm:mb-5">
                  {selectedTrip?.description
                    ? selectedTrip.description
                    : "No description"}
                </dd>
              </dl>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  {selectedTrip?.status === "ongoing" ? (
                    <button
                      type="button"
                      className="inline-flex items-center rounded-lg bg-modal-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-modal-800 focus:outline-none focus:ring-4 focus:ring-modal-300 dark:bg-modal-600 dark:hover:bg-modal-700 dark:focus:ring-modal-800"
                    >
                      <svg
                        aria-hidden="true"
                        className="-ml-1 mr-1 h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"
                        />
                      </svg>
                      Delegate Objects
                    </button>
                  ) : (
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-lg bg-modal-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-modal-800 focus:outline-none focus:ring-4 focus:ring-modal-300 dark:bg-modal-600 dark:hover:bg-modal-700 dark:focus:ring-modal-800"
                        onClick={() => {
                          handleCloseModal();
                          openUpdateModal();
                        }}
                      >
                        <svg
                          aria-hidden="true"
                          className="-ml-1 mr-1 h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                          <path
                            fillRule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Edit Trip
                      </button>
                    </div>
                  )}
                  <button
                    type="button"
                    className="text-gray-900 border-gray-200 hover:bg-gray-100 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg border bg-yellow-300 px-5 py-2.5  text-sm font-medium text-white hover:bg-yellow-500 focus:z-10 focus:outline-none focus:ring-4 dark:hover:text-white"
                    onClick={viewOffers}
                  >
                    <svg
                      aria-hidden="true"
                      className="-ml-1 mr-1 inline-block h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 16v-5.5A3.5 3.5 0 0 0 7.5 7m3.5 9H4v-5.5A3.5 3.5 0 0 1 7.5 7m3.5 9v4M7.5 7H14m0 0V4h2.5M14 7v3m-3.5 6H20v-6a3 3 0 0 0-3-3m-2 9v4m-8-6.5h1"
                      />
                    </svg>
                    View Offers
                  </button>
                </div>
                {selectedTrip?.status == "ongoing" ? (
                  <button
                    type="button"
                    className="text-gray-900 border-gray-200 hover:bg-gray-100 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg border bg-red-500 px-5 py-2.5  text-sm font-medium text-white hover:bg-red-700 focus:z-10 focus:outline-none focus:ring-4 dark:hover:text-white"
                    // onClick={handleStart}
                  >
                    <svg
                      aria-hidden="true"
                      className="-ml-1 mr-1 inline-block h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    End Trip
                  </button>
                ) : (
                  <button
                    type="button"
                    className="text-gray-900 border-gray-200 hover:bg-gray-100 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg border bg-green-500 px-5 py-2.5  text-sm font-medium text-white hover:bg-green-700 focus:z-10 focus:outline-none focus:ring-4 dark:hover:text-white"
                    onClick={handleStart}
                  >
                    <svg
                      aria-hidden="true"
                      className="-ml-1 mr-1 inline-block h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                    Start Trip
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <UpdateTripModal
        isOpen={isUpdateModalOpen}
        closeModal={closeUpdateModal}
      ></UpdateTripModal>
    </div>
  );
};

export default ReadTripModal;
