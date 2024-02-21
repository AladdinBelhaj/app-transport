// "use client";
// import React from "react";
// import { useState } from "react";
// import SelectCountry from "./SelectCountry";
// import DatePickerOne from "./DatepickerOne";
// import DatePickerTwo from "./DatepickerTwo";
// import { useSingleTripData } from "../../../../utils/GetSingleTrip";
// import { useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// interface Trip {
//   id: number;
//   departCountry: string;
//   departState: string;
//   destCountry: string;
//   desState: string;
//   departDate: string;
//   arrivDate: string;
//   maxWeight: string;
//   description: string;
//   transporterId: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface UpdateModalProps {
//   isOpen: boolean;
//   closeModal: () => void;
//   selectedTrip: Trip | null;
// }

// const UpdateTripModal: React.FC<UpdateModalProps> = ({
//   isOpen,
//   closeModal,
//   selectedTrip,
// }) => {
//   const id = localStorage.getItem("id");
//   const tripData = useSingleTripData(selectedTrip?.id || 0);
//   const clickedDate = tripData?.departDate
//     ? new Date(tripData.departDate).toLocaleDateString("en-US", {
//         month: "short",
//         day: "2-digit",
//         year: "numeric",
//       })
//     : "";

//   const arrivalDate = tripData?.arrivDate
//     ? new Date(tripData.arrivDate).toLocaleDateString("en-US", {
//         month: "short",
//         day: "2-digit",
//         year: "numeric",
//       })
//     : "";

//   const [post, setPost] = useState({
//     departCountry: tripData?.departCountry,
//     departState: tripData?.departState,
//     destCountry: tripData?.destCountry,
//     desState: tripData?.desState,
//     departDate: clickedDate,
//     arrivDate: arrivalDate,
//     maxWeight: tripData?.maxWeight,
//     description: "",
//     transporterId: id,
//   });

//   const handleInput = (name: string, event: any) => {
//     setPost({ ...post, [name]: event });
//     console.log(post);
//     console.log(tripData);
//   };

//   const [modalOpen, setModalOpen] = useState(false);
//   const handleCloseModal = () => {
//     setModalOpen(false);
//     closeModal();
//   };

//   // useEffect(() => {
//   //   const nextDayDate = new Date(clickedDate);
//   //   nextDayDate.setDate(nextDayDate.getDate() + 1);
//   //   const formattedDate = nextDayDate.toLocaleDateString("en-US", {
//   //     month: "short",
//   //     day: "2-digit",
//   //     year: "numeric",
//   //   });

//   //   handleInput("departDate", formattedDate);
//   // }, [clickedDate]);

//   function handleSubmit(event: any) {
//     closeModal();

//     event.preventDefault();
//     axios
//       .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trips/create`, post)
//       .then((response) => {
//         console.log(response);
//         if (response.status === 201) {
//           localStorage.setItem("tripCreated", "true");
//           window.location.reload();
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error("A trip already exists during that period", {
//           position: "top-center",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       });
//     axios
//       .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/create`, {
//         start: post.departDate,
//         end: post.arrivDate,
//         transporterId: post.transporterId,
//       })
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   return (
//     <>
//       {/* Main modal */}
//       {isOpen && (
//         <div
//           id="modalEl" // Set the id for modal element
//           tabIndex={-1}
//           aria-hidden="true"
//           className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
//           style={{ zIndex: 9999 }}
//         >
//           <div
//             className="fixed inset-0 bg-black opacity-50" // Close the modal if clicked outside
//           ></div>
//           <div className="relative h-full w-full max-w-2xl p-6 md:h-auto">
//             {/* Modal content */}
//             <div className="dark:bg-gray-800 relative rounded-lg bg-white p-4 shadow sm:p-5">
//               {/* Modal header */}
//               <div className="dark:border-gray-600 mb-4 flex items-center justify-between rounded-t border-b pb-4 sm:mb-5">
//                 <h3 className="text-gray-900 text-lg font-semibold dark:text-white">
//                   Add Trip
//                 </h3>
//                 <button
//                   type="button"
//                   className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm dark:hover:text-white"
//                   onClick={handleCloseModal}
//                 >
//                   <svg
//                     aria-hidden="true"
//                     className="h-5 w-5"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   <span className="sr-only">Close modal</span>
//                 </button>
//               </div>
//               {/* Modal body */}
//               <form action="#">
//                 <div className="mb-4 grid gap-4 sm:grid-cols-2">
//                   <SelectCountry
//                     handleInput={handleInput}
//                     tripData={tripData}
//                   />
//                   <DatePickerOne
//                     clickedDate={
//                       tripData?.departDate
//                         ? new Date(tripData.departDate)
//                         : new Date()
//                     }
//                     handleInput={handleInput}
//                   />
//                   <DatePickerTwo
//                     handleInput={handleInput}
//                     clickedDate={
//                       tripData?.departDate
//                         ? new Date(tripData.departDate)
//                         : new Date()
//                     }
//                     tripData={tripData}
//                     arrivalDate={arrivalDate}
//                   />
//                   <div>
//                     <label
//                       htmlFor="weight"
//                       className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
//                     >
//                       Max Weight
//                     </label>
//                     <input
//                       type="number"
//                       name="weight"
//                       id="weight"
//                       className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-600 focus:ring-modal-600 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
//                       placeholder="KG"
//                       required
//                       onChange={(e) => {
//                         handleInput("maxWeight", e.target.value);
//                       }}
//                       defaultValue={tripData?.maxWeight}
//                     />
//                   </div>

//                   <div className="sm:col-span-2">
//                     <label
//                       htmlFor="description"
//                       className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
//                     >
//                       Description
//                     </label>
//                     <textarea
//                       id="description"
//                       rows={4}
//                       className="text-gray-900 bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-500 focus:ring-modal-500 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
//                       placeholder="Write trip description here"
//                       defaultValue={""}
//                     />
//                   </div>
//                 </div>
//                 <button
//                   type="submit"
//                   className="focus:ring-4${ inline-flex items-center rounded-lg bg-modal-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-modal-800 focus:outline-none focus:ring-modal-300 dark:bg-modal-600 dark:hover:bg-modal-700 dark:focus:ring-modal-800"
//                   onClick={handleSubmit}
//                 >
//                   <svg
//                     className="-ml-1 mr-1 h-6 w-6"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   Update Trip
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default UpdateTripModal;

"use client";
import React, { useState, useEffect } from "react";
import SelectCountry from "./SelectCountry";
import DatePickerOne from "./DatepickerOne";
import DatePickerTwo from "./DatepickerTwo";
import { useSingleTripData } from "../../../../utils/GetSingleTrip";
import axios from "axios";
import { toast } from "react-toastify";

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

interface UpdateModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedTrip: Trip | null;
}

const UpdateTripModal: React.FC<UpdateModalProps> = ({
  isOpen,
  closeModal,
  selectedTrip,
}) => {
  const id = localStorage.getItem("id");
  let tripData: any;
  const storedTripString = localStorage.getItem("trip");
  if (storedTripString) {
    tripData = JSON.parse(storedTripString);
    // Use the storedTrip object as needed
  }
  const clickedDate = tripData?.departDate
    ? new Date(tripData.departDate).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "";

  const arrivalDate = tripData?.arrivDate
    ? new Date(tripData.arrivDate).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "";

  console.log("Trip Data:", tripData);

  const [post, setPost] = useState({
    departCountry: tripData?.departCountry || "",
    departState: tripData?.departState || "",
    destCountry: tripData?.destCountry || "",
    desState: tripData?.desState || "",
    departDate: tripData?.departDate || null,
    arrivDate: tripData?.arrivDate || null,
    maxWeight: tripData?.maxWeight || "",
    description: "",
    transporterId: id || "",
  });
  console.log("Trip Data:", tripData);
  console.log("Post State:", post);

  const handleInput = (name: string, event: any) => {
    setPost((prevPost) => ({ ...prevPost, [name]: event }));
    console.log(post);
  };
  useEffect(() => {
    console.log("Post state updated:", post);
    console.log(tripData);
  }, [post]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    closeModal();

    axios
      .put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trips/${selectedTrip?.id}`,
        post,
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          toast.success("Trip updated successfully!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update trip", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  // const isFormValid = () => {
  //   if (
  //     post.departCountry == "" ||
  //     post.departState == "" ||
  //     post.departDate == null ||
  //     post.arrivDate == null ||
  //     post.destCountry == "" ||
  //     post.desState == ""
  //   ) {
  //     return false;
  //   } else if (
  //     post?.departDate &&
  //     post?.arrivDate &&
  //     post?.arrivDate <= post?.departDate
  //   ) {
  //     return false;
  //   } else if (
  //     post?.departDate &&
  //     !post?.arrivDate &&
  //     tripData?.arrivDate &&
  //     post?.departDate >= tripData?.arrivDate
  //   ) {
  //     return false;
  //   } else if (
  //     post?.departDate &&
  //     !post?.arrivDate &&
  //     tripData?.arrivDate &&
  //     post?.departDate >= tripData?.arrivDate
  //   ) {
  //     return false;
  //   } else if (
  //     !post?.departDate &&
  //     post?.arrivDate &&
  //     tripData?.arrivDate &&
  //     tripData?.departDate >= post?.arrivDate
  //   ) {
  //     return false;
  //   } else if (
  //     post?.departDate &&
  //     !post?.arrivDate &&
  //     tripData?.arrivDate &&
  //     post?.departDate < tripData?.arrivDate
  //   ) {
  //     return true;
  //   } else {
  //     return true;
  //   }
  // };

  const isFormValid = () => {
    return true;
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
            onClick={closeModal}
          ></div>
          <div className="relative h-full w-full max-w-2xl p-6 md:h-auto">
            {/* Modal content */}
            <div className="dark:bg-gray-800 relative rounded-lg bg-white p-4 shadow sm:p-5">
              {/* Modal header */}
              <div className="dark:border-gray-600 mb-4 flex items-center justify-between rounded-t border-b pb-4 sm:mb-5">
                <h3 className="text-gray-900 text-lg font-semibold dark:text-white">
                  Update Trip
                </h3>
                <button
                  type="button"
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm dark:hover:text-white"
                  onClick={closeModal}
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
              <form onSubmit={handleSubmit}>
                <div className="mb-4 grid gap-4 sm:grid-cols-2">
                  <SelectCountry
                    handleInput={handleInput}
                    tripData={tripData}
                  />
                  <DatePickerOne
                    clickedDate={
                      tripData?.departDate
                        ? new Date(tripData.departDate)
                        : new Date()
                    }
                    handleInput={handleInput}
                  />
                  <DatePickerTwo
                    handleInput={handleInput}
                    clickedDate={
                      tripData?.departDate
                        ? new Date(tripData.departDate)
                        : new Date()
                    }
                    tripData={tripData}
                    arrivalDate={arrivalDate}
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
                      className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-600 focus:ring-modal-600 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
                      placeholder="KG"
                      required
                      onChange={(e) => {
                        handleInput("maxWeight", e.target.value);
                      }}
                      defaultValue={tripData?.maxWeight}
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
                  className={`inline-flex items-center rounded-lg bg-modal-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-modal-800 focus:outline-none focus:ring-modal-300 dark:bg-modal-600 dark:hover:bg-modal-700 dark:focus:ring-modal-800 focus:ring-4${
                    !isFormValid() && "cursor-not-allowed opacity-50"
                  }`}
                  disabled={!isFormValid()}
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
                  Update Trip
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
