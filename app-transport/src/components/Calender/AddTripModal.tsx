// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { Modal } from "flowbite";
// import type { ModalOptions, ModalInterface } from "flowbite";
// import type { InstanceOptions } from "flowbite";
// import SelectCountry from "./SelectCountry";
// import DatePickerOne from "./DatepickerOne";
// import DatePickerTwo from "./DatepickerTwo";

// const AddTripModal = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const $modalElementRef = useRef<HTMLElement | null>(null);
//   let modal: ModalInterface | undefined;

//   // Function to open the modal
//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   // Define modal options
//   const modalOptions: ModalOptions = {
//     placement: "center",
//     backdrop: "dynamic",
//     backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
//     closable: true,
//     onHide: () => {
//       console.log("modal is hidden");
//     },
//     onShow: () => {
//       console.log("modal is shown");
//     },
//     onToggle: () => {
//       console.log("modal has been toggled");
//     },
//   };

//   // Define instance options
//   const instanceOptions: InstanceOptions = {
//     id: "modalEl",
//     override: true,
//   };

//   // Function to initialize the modal when the component mounts
//   useEffect(() => {
//     $modalElementRef.current = document.querySelector(
//       "#modalEl",
//     ) as HTMLElement;
//     modal = new Modal($modalElementRef.current, modalOptions, instanceOptions);
//   }, []);

//   // Function to show the modal

//   return (
//     <>
//       {/* Add Product button */}
//       <div className="fixed bottom-5 left-5 z-50">
//         <button
//           onClick={openModal}
//           className="bg-modal-700 hover:bg-modal-800 focus:ring-modal-300 dark:bg-modal-600 dark:hover:bg-modal-700 dark:focus:ring-modal-800 block rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
//           type="button"
//         >
//           Add Trip
//         </button>
//       </div>

//       {/* Main modal */}
//       <div
//         id="modalEl" // Set the id for modal element
//         tabIndex={-1}
//         aria-hidden="true"
//         className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden ${isModalOpen ? "" : "hidden"}`}
//       >
//         {/* <div className="relative h-full w-full max-w-3xl p-4 md:h-auto"> */}
//         <div className="relative h-full w-full max-w-2xl p-6 md:h-auto">
//           {/* Modal content */}
//           <div className="dark:bg-gray-800 relative rounded-lg bg-white p-4 shadow sm:p-5">
//             {/* Modal header */}
//             <div className="dark:border-gray-600 mb-4 flex items-center justify-between rounded-t border-b pb-4 sm:mb-5">
//               <h3 className="text-gray-900 text-lg font-semibold dark:text-white">
//                 Add Trip
//               </h3>
//               <button
//                 onClick={closeModal}
//                 type="button"
//                 className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm dark:hover:text-white"
//               >
//                 <svg
//                   aria-hidden="true"
//                   className="h-5 w-5"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 <span className="sr-only">Close modal</span>
//               </button>
//             </div>
//             {/* Modal body */}
//             <form action="#">
//               <div className="mb-4 grid gap-4 sm:grid-cols-2">
//                 <SelectCountry></SelectCountry>
//                 <DatePickerOne></DatePickerOne>
//                 <DatePickerTwo></DatePickerTwo>
//                 <div>
//                   <label
//                     htmlFor="weight"
//                     className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
//                   >
//                     Max Weight
//                   </label>
//                   <input
//                     type="number"
//                     name="weight"
//                     id="weight"
//                     className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-modal-600 focus:border-modal-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-modal-500 dark:focus:border-modal-500 block w-full rounded-lg border p-2.5 text-sm dark:text-white"
//                     placeholder="KG"
//                     required
//                   />
//                 </div>

//                 <div className="sm:col-span-2">
//                   <label
//                     htmlFor="description"
//                     className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
//                   >
//                     Description
//                   </label>
//                   <textarea
//                     id="description"
//                     rows={4}
//                     className="text-gray-900 bg-gray-50 border-gray-300 focus:ring-modal-500 focus:border-modal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-modal-500 dark:focus:border-modal-500 block w-full rounded-lg border p-2.5 text-sm dark:text-white"
//                     placeholder="Write product description here"
//                     defaultValue={""}
//                   />
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="bg-modal-700 hover:bg-modal-800 focus:ring-modal-300 dark:bg-modal-600 dark:hover:bg-modal-700 dark:focus:ring-modal-800 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
//               >
//                 <svg
//                   className="-ml-1 mr-1 h-6 w-6"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 Add new trip
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddTripModal;
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import type { InstanceOptions } from "flowbite";
import SelectCountry from "./SelectCountry";
import DatePickerOne from "./DatepickerOne";
import DatePickerTwo from "./DatepickerTwo";

interface AddTripModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const AddTripModal: React.FC<AddTripModalProps> = ({ isOpen, closeModal }) => {
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
                <SelectCountry />
                <DatePickerOne />
                <DatePickerTwo />
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
                    className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-modal-600 focus:border-modal-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-modal-500 dark:focus:border-modal-500 block w-full rounded-lg border p-2.5 text-sm dark:text-white"
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
                    className="text-gray-900 bg-gray-50 border-gray-300 focus:ring-modal-500 focus:border-modal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-modal-500 dark:focus:border-modal-500 block w-full rounded-lg border p-2.5 text-sm dark:text-white"
                    placeholder="Write product description here"
                    defaultValue={""}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-modal-700 hover:bg-modal-800 focus:ring-modal-300 dark:bg-modal-600 dark:hover:bg-modal-700 dark:focus:ring-modal-800 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
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
