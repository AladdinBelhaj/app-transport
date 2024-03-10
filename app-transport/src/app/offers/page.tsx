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
// import axios from "axios"; // Import Axios
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import Image from "next/image";
// import { Product } from "@/types/product";

// const Offers = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [offerData, setOfferData] = useState([]); // State to store offer data
//   const modalRef = useRef<HTMLDivElement>(null); // Specify the type of ref

//   const id = localStorage.getItem("id");

//   useEffect(() => {
//     // Fetch offer data from the API
//     axios
//       .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/offers/${id}`)
//       .then((response) => {
//         setOfferData(response.data);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching offer data:", error);
//       });
//   }, []);

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

//   return (
//   <DefaultLayout>
//     <Breadcrumb pageName="Current Offers" />
//     <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//       <div className="px-4 py-6 md:px-6 xl:px-7.5">
//         <h4 className="text-xl font-semibold text-black dark:text-white">
//           Top Products
//         </h4>
//       </div>

//       <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
//         <div className="col-span-3 flex items-center">
//           <p className="font-medium">Object Name</p>
//         </div>
//         <div className="col-span-1 hidden items-center sm:flex">
//           <p className="font-medium">Width</p>
//         </div>
//         <div className="col-span-1 flex items-center">
//           <p className="font-medium">Length</p>
//         </div>
//         <div className="col-span-1 flex items-center">
//           <p className="font-medium">Height</p>
//         </div>
//         <div className="col-span-1 flex items-center">
//           <p className="font-medium">Weight</p>
//         </div>
//       </div>

//       {offerData.map((offer: any, key: number) => (
//         <div key={key}>
//           {JSON.parse(offer.objects).map((object: any, index: number) => (
//             <div
//               className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
//               key={index}
//             >
//               {/* Render offer details */}
//               <div className="col-span-3 flex items-center">
//                 <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//                   <p className="text-sm text-black dark:text-white">
//                     {object[`name-${index}`]}
//                   </p>
//                 </div>
//               </div>
//               <div className="col-span-1 hidden items-center sm:flex">
//                 <p className="text-sm text-black dark:text-white">
//                   {object[`width-${index}`]} cm
//                 </p>
//               </div>
//               <div className="col-span-1 flex items-center">
//                 <p className="text-sm text-black dark:text-white">
//                   {object[`length-${index}`]} cm
//                 </p>
//               </div>
//               <div className="col-span-1 flex items-center">
//                 <p className="text-sm text-black dark:text-white">
//                   {object[`height-${index}`]} cm
//                 </p>
//               </div>
//               <div className="col-span-1 flex items-center">
//                 <p className="text-sm text-black dark:text-white">
//                   {object[`weight-${index}`]} kg
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//     {isModalOpen && (
//       <div
//         className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
//         style={{ zIndex: 9999 }}
//       >
//         <div
//           ref={modalRef}
//           className="fixed inset-0 bg-black bg-opacity-50"
//           onClick={closeModal}
//         ></div>
//         <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-transparent p-4 shadow-lg">
//           <img
//             src={selectedImage}
//             alt="Selected Product"
//             className="h-65 w-full object-contain"
//           />
//         </div>
//       </div>
//     )}
//   </DefaultLayout>
// );
// };

// export default Offers;
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios"; // Import Axios
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";

// const Offers = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [offerData, setOfferData] = useState([]); // State to store offer data
//   const modalRef = useRef<HTMLDivElement>(null); // Specify the type of ref

//   const id = localStorage.getItem("id");

//   useEffect(() => {
//     // Fetch offer data from the API
//     axios
//       .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/offers/${id}`)
//       .then((response) => {
//         setOfferData(response.data);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching offer data:", error);
//       });
//   }, []);

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

//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="Current Offers" />
//       {offerData.map((offer: any, offerIndex: number) => (
//         <div
//           className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
//           key={offerIndex}
//         >
//           <div className="px-4 py-6 md:px-6 xl:px-7.5">
//             <h4 className="text-xl font-semibold text-black dark:text-white">
//               Top Products
//             </h4>
//           </div>

//           <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
//             <div className="col-span-3 flex items-center">
//               <p className="font-medium">Object</p>
//             </div>
//             <div className="col-span-1 hidden items-center sm:flex">
//               <p className="font-medium">Width</p>
//             </div>
//             <div className="col-span-1 flex items-center">
//               <p className="font-medium">Length</p>
//             </div>
//             <div className="col-span-1 flex items-center">
//               <p className="font-medium">Height</p>
//             </div>
//             <div className="col-span-1 flex items-center">
//               <p className="font-medium">Weight</p>
//             </div>
//           </div>

//           {JSON.parse(offer.objects).map((object: any, index: number) => (
//             <div
//               className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
//               key={index}
//             >
//               {/* Render offer details */}
//               <div className="col-span-3 flex items-center">
//                 <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//                   <p className="text-sm text-black dark:text-white">
//                     {object[`name-${index}`]}
//                   </p>
//                 </div>
//               </div>
//               <div className="col-span-1 hidden items-center sm:flex">
//                 <p className="text-sm text-black dark:text-white">
//                   {object[`width-${index}`]} cm
//                 </p>
//               </div>
//               <div className="col-span-1 flex items-center">
//                 <p className="text-sm text-black dark:text-white">
//                   {object[`length-${index}`]} cm
//                 </p>
//               </div>
//               <div className="col-span-1 flex items-center">
//                 <p className="text-sm text-black dark:text-white">
//                   {object[`height-${index}`]} cm
//                 </p>
//               </div>
//               <div className="col-span-1 flex items-center">
//                 <p className="text-sm text-black dark:text-white">
//                   {object[`weight-${index}`]} kg
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ))}
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

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Current Offers" />
      {offerData.map((offer: any, offerIndex: number) => {
        const tripData = tripDataMap[offer.tripId];
        const userData = userDataMap[offer.userId];
        return (
          <div
            className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
            key={offerIndex}
          >
            <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
              <div>
                <h4 className="text-xl font-semibold text-black dark:text-white">
                  {tripData?.departCountry} to {tripData?.destCountry}
                  <span className="text-sm font-light">
                    {" "}
                    (Weight Left: {tripData.maxWeight} kg)
                  </span>
                </h4>
                <p className="text-sm font-normal">
                  Offer by {userData?.fullname}
                </p>
              </div>
              <div className="space-x-4">
                <button className="rounded-md bg-green-500 px-4 py-2 text-white">
                  Accept Offer
                </button>
                <button className="rounded-md bg-red-500 px-4 py-2 text-white">
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

            {JSON.parse(offer.objects).map((object: any, index: number) => (
              <div
                className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                key={index}
              >
                {/* Render offer details */}
                <div className="col-span-3 flex items-center">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
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
            ))}
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

    // <DefaultLayout>
    //   <Breadcrumb pageName="Current Offers" />
    //   {offerData.map((offer: any, offerIndex: number) => {
    //     const tripData = tripDataMap[offer.tripId];
    //     const userData = userDataMap[offer.userId];
    //     return (
    //       <div
    //         className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
    //         key={offerIndex}
    //       >
    //         <div className="px-4 py-6 md:px-6 xl:px-7.5">
    //           <h4 className="text-xl font-semibold text-black dark:text-white">
    //             {tripData?.departCountry}{" "}
    //             {userData ? `${userData.fullname}'s Products` : "Top Products"}
    //           </h4>
    //         </div>

    //         {/* Render offer details */}
    //         <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
    //           {/* Render object details */}
    //         </div>
    //       </div>
    //     );
    //   })}
    //   {isModalOpen && (
    //     <div
    //       className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
    //       style={{ zIndex: 9999 }}
    //     >
    //       <div
    //         ref={modalRef}
    //         className="fixed inset-0 bg-black bg-opacity-50"
    //         onClick={closeModal}
    //       ></div>
    //       <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-transparent p-4 shadow-lg">
    //         <img
    //           src={selectedImage}
    //           alt="Selected Product"
    //           className="h-65 w-full object-contain"
    //         />
    //       </div>
    //     </div>
    //   )}
    // </DefaultLayout>
  );
};

export default Offers;
