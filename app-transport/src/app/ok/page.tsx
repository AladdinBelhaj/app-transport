"use client";
import React from "react";

const Page = () => {
  const toggleModal = () => {
    const modal = document.getElementById("deleteModal");
    modal?.classList.toggle("hidden");
  };

  return (
    <div>
      <div className="m-5 flex justify-center">
        <button
          id="deleteButton"
          onClick={toggleModal}
          className="block rounded-lg bg-modal-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-modal-800 focus:outline-none focus:ring-4 focus:ring-modal-300 dark:bg-modal-600 dark:hover:bg-modal-700 dark:focus:ring-modal-800"
          type="button"
        >
          Show delete confirmation
        </button>
      </div>
      <div
        id="deleteModal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-50 hidden h-modal w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 md:h-full"
      >
        <div className="relative h-full w-full max-w-md p-4 md:h-auto">
          {/* Modal content */}
          <div className="dark:bg-gray-800 relative rounded-lg bg-white p-4 text-center shadow sm:p-5">
            <button
              type="button"
              onClick={toggleModal}
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
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-gray-500 dark:text-gray-300 mb-4">
              Are you sure you want to delete this item?
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={toggleModal}
                type="button"
                className="text-gray-500 border-gray-200 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-600 rounded-lg border bg-white px-3 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 focus:ring-modal-300 dark:hover:text-white"
              >
                No, cancel
              </button>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900 rounded-lg px-3 py-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
              >
                Yes, Im sure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
