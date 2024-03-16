// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import Image from "next/image";
// import { Product } from "@/types/product";

// const Offers = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState("");
//   const modalRef = useRef<HTMLDivElement>(null); // Specify the type of ref

//   const openModal = (imageSrc: any) => {
//     setSelectedImage(imageSrc);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedImage("");
//     setIsModalOpen(false);
//   };

//   useEffect(() => {
//     const handleEscape = (event: any) => {
//       if (event.key === "Escape") {
//         closeModal();
//       }
//     };

//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         modalRef.current &&
//         !modalRef.current.contains(event.target as Node)
//       ) {
//         closeModal();
//       }
//     };

//     if (isModalOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isModalOpen]);

//   const productData: Product[] = [
//     {
//       image: "/images/product/product-01.png",
//       name: "Apple Watch Series 7",
//       category: "Electronics",
//       price: 296,
//       sold: 22,
//       profit: 45,
//     },
//     {
//       image: "/images/product/product-02.png",
//       name: "Macbook Pro M1",
//       category: "Electronics",
//       price: 546,
//       sold: 12,
//       profit: 125,
//     },
//     {
//       image: "/images/product/product-03.png",
//       name: "Dell Inspiron 15",
//       category: "Electronics",
//       price: 443,
//       sold: 64,
//       profit: 247,
//     },
//     {
//       image: "/images/product/product-04.png",
//       name: "HP Probook 450",
//       category: "Electronics",
//       price: 499,
//       sold: 72,
//       profit: 103,
//     },
//   ];

//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="Current Offers" />
//       <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="px-4 py-6 md:px-6 xl:px-7.5">
//           <h4 className="text-xl font-semibold text-black dark:text-white">
//             Top Products
//           </h4>
//         </div>

//         <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
//           <div className="col-span-3 flex items-center">
//             <p className="font-medium">Object Name</p>
//           </div>
//           <div className="col-span-1 hidden items-center sm:flex">
//             <p className="font-medium">Width</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="font-medium">Length</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="font-medium">Heigth</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="font-medium">Weight</p>
//           </div>
//         </div>

//         {productData.map((product, key) => (
//           <div
//             className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
//             key={key}
//           >
//             <div className="col-span-3 flex items-center">
//               <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//                 <div
//                   className="h-12.5 w-15 cursor-pointer rounded-md"
//                   onClick={() => openModal(product.image)}
//                 >
//                   <Image
//                     src={product.image}
//                     width={60}
//                     height={50}
//                     alt="Product"
//                   />
//                 </div>
//                 <p className="text-sm text-black dark:text-white">
//                   {product.name}
//                 </p>
//               </div>
//             </div>
//             <div className="col-span-1 hidden items-center sm:flex">
//               <p className="text-sm text-black dark:text-white">
//                 {product.category} cm
//               </p>
//             </div>
//             <div className="col-span-1 flex items-center">
//               <p className="text-sm text-black dark:text-white">
//                 ${product.price} cm
//               </p>
//             </div>
//             <div className="col-span-1 flex items-center">
//               <p className="text-sm text-black dark:text-white">
//                 {product.sold} cm
//               </p>
//             </div>
//             <div className="col-span-1 flex items-center">
//               <p className="text-sm text-black dark:text-white">
//                 {product.sold} cm
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//       {isModalOpen && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
//           style={{ zIndex: 9999 }}
//         >
//           <div
//             ref={modalRef}
//             className="fixed inset-0 bg-black bg-opacity-50"
//             onClick={closeModal}
//           ></div>
//           <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-transparent p-4 shadow-lg">
//             <img
//               src={selectedImage}
//               alt="Selected Product"
//               className="h-65 w-full object-contain"
//             />
//           </div>
//         </div>
//       )}
//     </DefaultLayout>
//   );
// };

// export default Offers;

// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import Link from "next/link";

// interface TripData {
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

// interface UserData {
//   id: string;
//   fullname: string;
//   phone: string;
//   email: string;
//   username: string;
//   role: string;
//   bio: string;
//   isFirstLogin: string;
//   picture: string;
// }

// const Offers = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [offerData, setOfferData] = useState([]);
//   const [tripDataMap, setTripDataMap] = useState<{ [key: string]: TripData }>(
//     {},
//   );
//   const [userDataMap, setUserDataMap] = useState<{ [key: string]: UserData }>(
//     {},
//   );
//   const modalRef = useRef<HTMLDivElement>(null);

//   const id = localStorage.getItem("id");

//   useEffect(() => {
//     axios
//       .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/offers/${id}`)
//       .then((response) => {
//         setOfferData(response.data);
//         const tripIds = response.data.map((offer: any) => offer.tripId);
//         const userIds = response.data.map((offer: any) => offer.userId);

//         const uniqueTripIds: string[] = Array.from(
//           new Set(tripIds),
//         ) as string[];
//         uniqueTripIds.forEach((tripId) => {
//           fetchTripData(tripId);
//         });

//         const uniqueUserIds: string[] = Array.from(
//           new Set(userIds),
//         ) as string[];
//         uniqueUserIds.forEach((userId) => {
//           fetchUserData(userId);
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching offer data:", error);
//       });
//   }, []);

//   const fetchTripData = (tripId: string) => {
//     axios
//       .get<TripData>(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trips/single/${tripId}`,
//       )
//       .then((response) => {
//         setTripDataMap((prevTripDataMap) => ({
//           ...prevTripDataMap,
//           [tripId]: response.data,
//         }));
//       })
//       .catch((error) => {
//         console.error("Error fetching trip data:", error);
//       });
//   };

//   const fetchUserData = (userId: string) => {
//     axios
//       .get<UserData>(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`,
//       )
//       .then((response) => {
//         setUserDataMap((prevUserDataMap) => ({
//           ...prevUserDataMap,
//           [userId]: response.data,
//         }));
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   };

//   const openModal = (imageSrc: any) => {
//     setSelectedImage(imageSrc);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedImage("");
//     setIsModalOpen(false);
//   };

//   useEffect(() => {
//     const handleEscape = (event: any) => {
//       if (event.key === "Escape") {
//         closeModal();
//       }
//     };

//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         modalRef.current &&
//         !modalRef.current.contains(event.target as Node)
//       ) {
//         closeModal();
//       }
//     };

//     if (isModalOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isModalOpen]);

//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//   const openDeleteModal = () => {
//     setIsDeleteModalOpen(true);
//   };

//   const closeDeleteModal = () => {
//     setIsDeleteModalOpen(false);
//   };

//   const handleDelete = (offerId: number) => {
//     // Remove the rejected offer from the UI
//     setOfferData((prevOfferData) =>
//       prevOfferData.filter((offer: any) => offer.id !== offerId),
//     );
//   };

//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="Current Offers" />
//       {offerData.map((offer: any, offerIndex: number) => {
//         {
//           isDeleteModalOpen && (
//             <div
//               id="deleteModal"
//               tabIndex={-1}
//               aria-hidden="true"
//               className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
//               style={{ zIndex: 9999, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//             >
//               <div className="relative w-full max-w-md">
//                 {/* Modal content */}
//                 <div className="dark:bg-gray-800 relative rounded-lg bg-white p-4 text-center shadow sm:p-5">
//                   <button
//                     type="button"
//                     onClick={closeDeleteModal}
//                     className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 absolute right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm dark:hover:text-white"
//                   >
//                     <svg
//                       aria-hidden="true"
//                       className="h-5 w-5"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     <span className="sr-only">Close modal</span>
//                   </button>
//                   <svg
//                     className="text-gray-400 dark:text-gray-500 mx-auto mb-3.5 h-11 w-11"
//                     aria-hidden="true"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   <p className="text-gray-500 dark:text-gray-300 mb-4">
//                     Are you sure you want to delete this trip?
//                   </p>
//                   <div className="flex items-center justify-center space-x-4">
//                     <button
//                       type="button"
//                       className="text-gray-500 border-gray-200 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-600 rounded-lg border bg-white px-3 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 focus:ring-modal-300 dark:hover:text-white"
//                       onClick={closeDeleteModal} // Close modal on click
//                     >
//                       No, cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
//                       onClick={() => handleDelete(offer.id)}
//                     >
//                       <svg
//                         aria-hidden="true"
//                         className="-ml-1 mr-1.5 h-5 w-5"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0v-6zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         }
//         const tripData = tripDataMap[offer.tripId];
//         const userData = userDataMap[offer.userId];
//         return (
//           <div
//             className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
//             key={offerIndex}
//           >
//             <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
//               <div>
//                 <h4 className="text-xl font-semibold text-black dark:text-white">
//                   {tripData?.departCountry} to {tripData?.destCountry}
//                   <span className="text-sm font-light">
//                     {" "}
//                     (Weight Left: {tripData?.maxWeight} kg)
//                   </span>
//                 </h4>
//                 <p className="text-sm font-normal">
//                   Offer by{" "}
//                   <Link
//                     href={`/profile/${userData?.id}`}
//                     className="text-blue-500 hover:underline"
//                   >
//                     {userData?.fullname}
//                   </Link>
//                 </p>
//               </div>
//               <div className="space-x-4">
//                 <button className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-700">
//                   Accept Offer
//                 </button>
//                 <button
//                   onClick={() => openDeleteModal()}
//                   className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-700"
//                 >
//                   Reject Offer
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
//               <div className="col-span-3 flex items-center">
//                 <p className="font-medium">Object</p>
//               </div>
//               <div className="col-span-1 hidden items-center sm:flex">
//                 <p className="font-medium">Width</p>
//               </div>
//               <div className="col-span-1 flex items-center">
//                 <p className="font-medium">Length</p>
//               </div>
//               <div className="col-span-1 flex items-center">
//                 <p className="font-medium">Height</p>
//               </div>
//               <div className="col-span-1 flex items-center">
//                 <p className="font-medium">Weight</p>
//               </div>
//             </div>

//             {JSON.parse(offer.objects).map((object: any, index: number) => (
//               <div
//                 className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
//                 key={index}
//               >
//                 {/* Render offer details */}
//                 <div className="col-span-3 flex items-center">
//                   <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//                     <p className="text-sm text-black dark:text-white">
//                       {object[`name-${index}`]}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="col-span-1 hidden items-center sm:flex">
//                   <p className="text-sm text-black dark:text-white">
//                     {object[`width-${index}`]} cm
//                   </p>
//                 </div>
//                 <div className="col-span-1 flex items-center">
//                   <p className="text-sm text-black dark:text-white">
//                     {object[`length-${index}`]} cm
//                   </p>
//                 </div>
//                 <div className="col-span-1 flex items-center">
//                   <p className="text-sm text-black dark:text-white">
//                     {object[`height-${index}`]} cm
//                   </p>
//                 </div>
//                 <div className="col-span-1 flex items-center">
//                   <p className="text-sm text-black dark:text-white">
//                     {object[`weight-${index}`]} kg
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         );
//       })}
//       {isModalOpen && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
//           style={{ zIndex: 9999 }}
//         >
//           <div
//             ref={modalRef}
//             className="fixed inset-0 bg-black bg-opacity-50"
//             onClick={closeModal}
//           ></div>
//           <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-transparent p-4 shadow-lg">
//             <img
//               src={selectedImage}
//               alt="Selected Product"
//               className="h-65 w-full object-contain"
//             />
//           </div>
//         </div>
//       )}
//     </DefaultLayout>
//   );
// };

// export default Offers;

"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
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

  const openDeleteModal = (offerId: number) => {
    setIsDeleteModalOpen(true);
    setOfferToDeleteId(offerId); // Set the offer ID to be deleted
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openAcceptModal = (offerId: number) => {
    setIsAcceptModalOpen(true);
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
      setIsDeleteModalOpen(false); // Close the delete modal
      setOfferToDeleteId(null); // Reset the offer ID to null

      axios
        .put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/offers/${offerToDeleteId}`,
          { status: "rejected" },
        )
        .then((response) => {
          console.log("Offer rejected successfully");
        })
        .catch((error) => {
          console.error("Error rejecting offer:", error);
        });
    }
  };

  const handleAccept = () => {
    if (offerToAcceptId !== null) {
      // Remove the rejected offer from the UI
      setOfferData((prevOfferData) =>
        prevOfferData.filter((offer: any) => offer.id !== offerToAcceptId),
      );
      setIsAcceptModalOpen(false); // Close the delete modal
      setOfferToAcceptId(null); // Reset the offer ID to null

      axios
        .put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/offers/${offerToAcceptId}`,
          { status: "accepted" },
        )
        .then((response) => {
          console.log("Offer accepted successfully");
        })
        .catch((error) => {
          console.error("Error accepting offer:", error);
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
                    </Link>
                  </p>
                </div>
                <div className="space-x-4">
                  <button
                    onClick={() => openAcceptModal(offer.id)}
                    className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-700"
                  >
                    Accept Offer
                  </button>
                  <button
                    onClick={() => openDeleteModal(offer.id)}
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
                    <div className="col-span-1 flex items-center">
                      <p
                        className={`rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                          offer.status === "accepted"
                            ? "bg-success text-success"
                            : offer.status === "rejected"
                              ? "bg-danger text-danger"
                              : "bg-warning text-warning"
                        }`}
                      >
                        {offer.status}
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
