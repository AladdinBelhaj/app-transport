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
//             <p className="font-medium">Product Name</p>
//           </div>
//           <div className="col-span-2 hidden items-center sm:flex">
//             <p className="font-medium">Category</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="font-medium">Price</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="font-medium">Sold</p>
//           </div>
//           <div className="col-span-1 flex items-center">
//             <p className="font-medium">Profit</p>
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
//             <div className="col-span-2 hidden items-center sm:flex">
//               <p className="text-sm text-black dark:text-white">
//                 {product.category}
//               </p>
//             </div>
//             <div className="col-span-1 flex items-center">
//               <p className="text-sm text-black dark:text-white">
//                 ${product.price}
//               </p>
//             </div>
//             <div className="col-span-1 flex items-center">
//               <p className="text-sm text-black dark:text-white">
//                 {product.sold}
//               </p>
//             </div>
//             <div className="col-span-1 flex items-center">
//               <p className="text-sm text-meta-3">${product.profit}</p>
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
//           <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 shadow-lg">
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
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Image from "next/image";
import { Product } from "@/types/product";

const Offers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const modalRef = useRef<HTMLDivElement>(null); // Specify the type of ref

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

  const productData: Product[] = [
    {
      image: "/images/product/product-01.png",
      name: "Apple Watch Series 7",
      category: "Electronics",
      price: 296,
      sold: 22,
      profit: 45,
    },
    {
      image: "/images/product/product-02.png",
      name: "Macbook Pro M1",
      category: "Electronics",
      price: 546,
      sold: 12,
      profit: 125,
    },
    {
      image: "/images/product/product-03.png",
      name: "Dell Inspiron 15",
      category: "Electronics",
      price: 443,
      sold: 64,
      profit: 247,
    },
    {
      image: "/images/product/product-04.png",
      name: "HP Probook 450",
      category: "Electronics",
      price: 499,
      sold: 72,
      profit: 103,
    },
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Current Offers" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Top Products
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Product Name</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Category</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Price</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Sold</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Profit</p>
          </div>
        </div>

        {productData.map((product, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-3 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div
                  className="h-12.5 w-15 cursor-pointer rounded-md"
                  onClick={() => openModal(product.image)}
                >
                  <Image
                    src={product.image}
                    width={60}
                    height={50}
                    alt="Product"
                  />
                </div>
                <p className="text-sm text-black dark:text-white">
                  {product.name}
                </p>
              </div>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {product.category}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                ${product.price}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {product.sold}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-meta-3">${product.profit}</p>
            </div>
          </div>
        ))}
      </div>
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
