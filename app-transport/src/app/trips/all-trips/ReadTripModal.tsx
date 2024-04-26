import React, { useState } from "react";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const handleApply = () => {
    localStorage.removeItem("currentTrip");
    localStorage.setItem("currentTrip", JSON.stringify(selectedTrip));
    router.push("/apply-trip");
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
                <dt className="text-gray-900 mb-2 font-semibold leading-none dark:text-white">
                  Trip Status
                </dt>
                <dd className="text-gray-500 dark:text-gray-400 mb-4 font-light sm:mb-5">
                  {selectedTrip?.status
                    ? selectedTrip.status.charAt(0).toUpperCase() +
                      selectedTrip.status.slice(1)
                    : ""}
                </dd>
              </dl>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  {/* <button
                    type="button"
                    className="inline-flex items-center rounded-lg bg-modal-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-modal-800 focus:outline-none focus:ring-4 focus:ring-modal-300 dark:bg-modal-600 dark:hover:bg-modal-700 dark:focus:ring-modal-800"
                    onClick={() => {
                      handleCloseModal();
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
                  </button> */}
                  {/* <button
                    type="button"
                    className="text-gray-900 border-gray-200 hover:bg-gray-100 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg border bg-green-500 px-5 py-2.5  text-sm font-medium text-white hover:bg-green-700 focus:z-10 focus:outline-none focus:ring-4 dark:hover:text-white"
                  >
                    Start Trip
                  </button> */}
                </div>
                {/* <button
                  type="button"
                  className="bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
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
                  Delete
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadTripModal;
