// "use client";
// import React, { useState, useEffect } from "react";
// import SelectCountry from "./SelectCountry";
// import DatePickerOne from "./DatepickerOne";
// import DatePickerTwo from "./DatepickerTwo";
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
//   let tripData: any;

//   const storedTripString = localStorage.getItem("trip");
//   if (storedTripString) {
//     tripData = JSON.parse(storedTripString);
//   }

//   const listenStorageChange = () => {
//     const storedTripString = localStorage.getItem("trip");
//     if (storedTripString) {
//       const parsedTripData = JSON.parse(storedTripString);
//       tripData = parsedTripData;
//     } else {
//       tripData = null;
//     }
//   };

//   window.addEventListener("storage", listenStorageChange);
//   window.removeEventListener("storage", listenStorageChange);

//   // // Render the component only when tripData is not null
//   const id = localStorage.getItem("id");

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
//     departCountry: tripData.departCountry,
//     departState: tripData.departState,
//     destCountry: tripData.destCountry,
//     desState: tripData.desState,
//     departDate: clickedDate,
//     arrivDate: arrivalDate,
//     maxWeight: tripData.maxWeight,
//     description: "",
//     transporterId: id,
//   });

//   const handleInput = (name: string, event: any) => {
//     setPost((prevPost: any) => ({ ...prevPost, [name]: event }));
//   };

//   console.log("POST", post);

//   function handleSubmit(event: React.FormEvent) {
//     event.preventDefault();
//     closeModal();

//     axios
//       .put(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trips/${tripData.id}`,
//         post,
//       )
//       .then((response) => {
//         if (response.status === 200) {
//           toast.success("Trip updated successfully!", {
//             position: "top-center",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//           window.location.reload();
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         toast.error("Failed to update trip", {
//           position: "top-center",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       });
//   }

//   const isFormValid = () => {
//     return true;
//   };

//   return (
//     <>
//       {isOpen && (
//         <div
//           id="modalEl"
//           tabIndex={-1}
//           aria-hidden="true"
//           className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
//           style={{ zIndex: 9999 }}
//         >
//           <div
//             className="fixed inset-0 bg-black opacity-50"
//             onClick={closeModal}
//           ></div>
//           <div className="relative h-full w-full max-w-2xl p-6 md:h-auto">
//             <div className="dark:bg-gray-800 relative rounded-lg bg-white p-4 shadow sm:p-5">
//               <div className="dark:border-gray-600 mb-4 flex items-center justify-between rounded-t border-b pb-4 sm:mb-5">
//                 <h3 className="text-gray-900 text-lg font-semibold dark:text-white">
//                   Update Trip
//                 </h3>
//                 <button
//                   type="button"
//                   className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm dark:hover:text-white"
//                   onClick={closeModal}
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
//               {tripData ? (
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-4 grid gap-4 sm:grid-cols-2">
//                     <SelectCountry
//                       handleInput={handleInput}
//                       tripData={tripData}
//                     />
//                     <DatePickerOne
//                       clickedDate={
//                         tripData?.departDate
//                           ? new Date(tripData.departDate)
//                           : new Date()
//                       }
//                       handleInput={handleInput}
//                     />
//                     <DatePickerTwo
//                       handleInput={handleInput}
//                       clickedDate={
//                         tripData?.departDate
//                           ? new Date(tripData.departDate)
//                           : new Date()
//                       }
//                       tripData={tripData}
//                       post={post}
//                       arrivalDate={arrivalDate}
//                     />
//                     <div>
//                       <label
//                         htmlFor="weight"
//                         className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
//                       >
//                         Max Weight
//                       </label>
//                       <input
//                         type="number"
//                         name="weight"
//                         id="weight"
//                         className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-600 focus:ring-modal-600 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
//                         placeholder="KG"
//                         required
//                         onChange={(e) => {
//                           handleInput("maxWeight", e.target.value);
//                         }}
//                         defaultValue={tripData?.maxWeight}
//                       />
//                     </div>
//                     <div className="sm:col-span-2">
//                       <label
//                         htmlFor="description"
//                         className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
//                       >
//                         Description
//                       </label>
//                       <textarea
//                         id="description"
//                         rows={4}
//                         className="text-gray-900 bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-500 focus:ring-modal-500 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
//                         placeholder="Write trip description here"
//                         defaultValue={""}
//                       />
//                     </div>
//                   </div>
//                   <button
//                     type="submit"
//                     className={`inline-flex items-center rounded-lg bg-modal-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-modal-800 focus:outline-none focus:ring-modal-300 dark:bg-modal-600 dark:hover:bg-modal-700 dark:focus:ring-modal-800 focus:ring-4${
//                       !isFormValid() && "cursor-not-allowed opacity-50"
//                     }`}
//                     disabled={!isFormValid()}
//                   >
//                     <svg
//                       className="-ml-1 mr-1 h-6 w-6"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     Update Trip
//                   </button>
//                 </form>
//               ) : (
//                 <div>Loading...</div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default UpdateTripModal;

"use client";
import SelectCountry from "./SelectCountry";
import DatePickerOne from "./DatepickerOne";
import DatePickerTwo from "./DatepickerTwo";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
interface UpdateModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const UpdateTripModal: React.FC<UpdateModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    departCountry: "",
    departState: "",
    destCountry: "",
    desState: "",
    departDate: "",
    arrivDate: "",
    maxWeight: "",
    description: "",
    transporterId: "",
  });
  useEffect(() => {
    const parseTripData = () => {
      const tripData = localStorage.getItem("trip");
      if (tripData) {
        const parsedTripData = JSON.parse(tripData);
        setFormData(parsedTripData);
      }
    };

    if (isOpen) {
      parseTripData();
    } else {
      // Reset formData when modal is closed
      setFormData({
        id: "",
        departCountry: "",
        departState: "",
        destCountry: "",
        desState: "",
        departDate: "",
        arrivDate: "",
        maxWeight: "",
        description: "",
        transporterId: "",
      });
    }
  }, [isOpen]);
  console.log(formData);

  const handleInput = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const isFormValid = () => {
    const departDateObj = new Date(formData.departDate);
    const arrivDateObj = new Date(formData.arrivDate);

    return arrivDateObj > departDateObj;
  };

  const [tripCreated, setTripCreated] = useState(false);

  useEffect(() => {
    // Check if a trip has been created
    const tripCreatedStorage = localStorage.getItem("tripCreated");
    if (tripCreatedStorage === "true") {
      // Clear the flag in localStorage
      localStorage.removeItem("tripCreated");
      // Set the state to trigger the toast
      setTripCreated(true);
    }
  }, []);

  useEffect(() => {
    // Show the toast when tripCreated state changes
    if (tripCreated) {
      toast.success("Updated trip!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [tripCreated]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    closeModal();

    axios
      .put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trips/${formData.id}`,
        formData,
      )
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("tripCreated", "true");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("A trip already exists during that period!", {
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

  return (
    <>
      <ToastContainer></ToastContainer>
      {isOpen && (
        <div
          id="modalEl"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
          style={{ zIndex: 9999 }}
        >
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          <div className="relative h-full w-full max-w-2xl p-6 md:h-auto">
            <div className="dark:bg-gray-800 relative rounded-lg bg-white p-4 shadow sm:p-5">
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

              <form>
                <div className="mb-4 grid gap-4 sm:grid-cols-2">
                  <SelectCountry
                    handleInput={handleInput}
                    formData={formData}
                  />
                  <DatePickerOne
                    handleInput={handleInput}
                    formData={formData}
                  />
                  <DatePickerTwo
                    handleInput={handleInput}
                    formData={formData}
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
                      defaultValue={formData.maxWeight}
                      onChange={(e) => handleInput("maxWeight", e.target.value)}
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
                      defaultValue={formData.description}
                      onChange={(e) =>
                        handleInput("description", e.target.value)
                      }
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
