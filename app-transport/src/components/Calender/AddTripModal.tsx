"use client";
import React, { useState, useEffect, useRef } from "react";
import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import type { InstanceOptions } from "flowbite";
import SelectCountry from "./SelectCountry";
import DatePickerOne from "./DatepickerOne";
import DatePickerTwo from "./DatepickerTwo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";

interface AddTripModalProps {
  isOpen: boolean;
  closeModal: () => void;
  clickedDate: Date;
}

const AddTripModal: React.FC<AddTripModalProps> = ({
  isOpen,
  closeModal,
  clickedDate,
}) => {
  const $modalElementRef = useRef<HTMLDivElement>(null); // Adjusted the type here
  let modal: ModalInterface | undefined;

  // Function to open the modal
  const openModal = () => {
    closeModal();
  };

  // Define modal options
  const modalOptions: ModalOptions = {
    placement: "center",
    backdrop: "dynamic",
    backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
    closable: true,
    onHide: () => {
      console.log("modal is hidden");
    },
    onShow: () => {
      console.log("modal is shown");
    },
    onToggle: () => {
      console.log("modal has been toggled");
    },
  };

  // Define instance options
  const instanceOptions: InstanceOptions = {
    id: "modalEl",
    override: true,
  };

  // Function to initialize the modal when the component mounts
  useEffect(() => {
    if ($modalElementRef?.current) {
      modal = new Modal(
        $modalElementRef.current,
        modalOptions,
        instanceOptions,
      );
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      openModal();
    }
  }, []);

  const [post, setPost] = useState({
    departCountry: "",
    departState: "",
    destCountry: "",
    desState: "",
    departDate: new Date(),
    arrivDate: new Date(),
    maxWeight: "",
    description: "",
  });

  const isFormValid = () => {
    return (
      post.departCountry !== "" &&
      post.departState !== "" &&
      post.destCountry !== "" &&
      post.desState !== "" &&
      post.maxWeight !== "" &&
      post.arrivDate == null
    );
  };

  const handleInput = (name: string, event: any) => {
    console.log(event);
    setPost({ ...post, [name]: event });
  };

  function handleSubmit(event: any) {
    event.preventDefault();
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trips/create`, post)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // Display success toast
          toast.success("Trip created!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        // Display error toast
      });
  }

  return (
    <>
      {/* Main modal */}
      <div
        id="modalEl" // Set the id for modal element
        tabIndex={-1}
        aria-hidden="true"
        className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden ${
          isOpen ? "" : "hidden"
        }`}
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
                onClick={closeModal}
                type="button"
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm dark:hover:text-white"
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
                <SelectCountry handleInput={handleInput} />
                <DatePickerOne
                  clickedDate={clickedDate}
                  handleInput={handleInput}
                />
                <DatePickerTwo
                  handleInput={handleInput}
                  clickedDate={clickedDate}
                />
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
                    onChange={(e) => {
                      handleInput("maxWeight", e.target.value);
                    }}
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
                    onChange={(e) => {
                      handleInput("description", e.target.value);
                    }}
                    className="text-gray-900 bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-500 focus:ring-modal-500 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
                    placeholder="Write product description here"
                    defaultValue={""}
                  />
                </div>
              </div>
              <button
                type="submit"
                className={`inline-flex items-center rounded-lg bg-modal-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-modal-800 focus:outline-none focus:ring-modal-300 dark:bg-modal-600 dark:hover:bg-modal-700 dark:focus:ring-modal-800 focus:ring-4${
                  !isFormValid() && "cursor-not-allowed opacity-50"
                }`}
                disabled={!isFormValid()}
                onClick={handleSubmit}
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
    </>
  );
};

export default AddTripModal;
