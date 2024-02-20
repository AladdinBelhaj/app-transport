"use client";
import React from "react";
import { useState } from "react";
interface UpdateModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const UpdateTripModal: React.FC<UpdateModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setModalOpen(false);
    closeModal();
  };
  return (
    <>
      {/* Main modal */}
      {isOpen && (
        <div
          id="modalEl" // Set the id for modal element
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
          style={{ zIndex: 9999 }}
        >
          <div
            className="fixed inset-0 bg-black opacity-50" // Close the modal if clicked outside
          ></div>
          <div className="relative h-full w-full max-w-2xl p-6 md:h-auto">
            {/* Modal content */}
            <div className="dark:bg-gray-800 relative rounded-lg bg-white p-4 shadow sm:p-5">
              {/* Modal header */}
              <div className="dark:border-gray-600 mb-4 flex items-center justify-between rounded-t border-b pb-4 sm:mb-5">
                <h3 className="text-gray-900 text-lg font-semibold dark:text-white">
                  Add Trip
                </h3>
                <button
                  type="button"
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm dark:hover:text-white"
                  onClick={handleCloseModal}
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
              {/* Modal body */}
              <form action="#">
                <div className="mb-4 grid gap-4 sm:grid-cols-2">
                  {/* <SelectCountry />
                <DatePickerOne />
                <DatePickerTwo /> */}
                  <div>
                    <label
                      htmlFor="weight"
                      className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                    >
                      Max Weight
                    </label>
                    <input
                      type="number"
                      name="weight"
                      id="weight"
                      className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-600 focus:ring-modal-600 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
                      placeholder="KG"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className="text-gray-900 bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-500 focus:ring-modal-500 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
                      placeholder="Write trip description here"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="focus:ring-4$ inline-flex items-center rounded-lg bg-modal-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-modal-800 focus:outline-none focus:ring-modal-300 dark:bg-modal-600 dark:hover:bg-modal-700 dark:focus:ring-modal-800"
                >
                  <svg
                    className="-ml-1 mr-1 h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add new trip
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateTripModal;
