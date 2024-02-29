"use client";
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const ApplyTrip = () => {
  // State to keep track of the currently active accordion item
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Function to handle click on accordion title
  const handleAccordionClick = (index: any) => {
    setActiveAccordion(index === activeAccordion ? null : index);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Apply Trip" />
      {/* Map through accordion items */}
      {[...Array(3)].map((_, index) => (
        <div key={index} className="collapse collapse-plus bg-base-200">
          {/* Use index as the key and value of 'name' attribute for radio inputs */}
          <input
            type="radio"
            name="my-accordion-3"
            id={`accordion-${index}`}
            checked={activeAccordion === index}
            onChange={() => handleAccordionClick(index)}
          />
          <label
            htmlFor={`accordion-${index}`}
            className="collapse-title text-xl font-medium"
          >
            Click to open this one and close others
          </label>
          <div className="collapse-content">
            <div className="border-gray-200 dark:border-gray-700 dark:bg-gray-900 border border-b-0 bg-white">
              <section className="dark:bg-gray-900 bg-white">
                <div className="mx-auto max-w-2xl px-4 py-8 lg:py-16">
                  <h2 className="text-gray-900 mb-4 text-xl font-bold dark:text-white">
                    Add a new product
                  </h2>
                  <form action="#">
                    <div className="grid gap-4 sm:grid-cols-4 sm:gap-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="name"
                          className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                        >
                          Product Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-600 focus:ring-modal-600 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
                          placeholder="Type product name"
                          required
                        />
                      </div>
                      <div className="w-full">
                        <div className="w-full">
                          <label
                            htmlFor="length"
                            className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                          >
                            Length (cm)
                          </label>
                          <input
                            type="number"
                            name="length"
                            id="length"
                            className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-600 focus:ring-modal-600 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
                            placeholder="Enter length"
                            required
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="width"
                          className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                        >
                          Width (cm)
                        </label>
                        <input
                          type="number"
                          name="width"
                          id="width"
                          className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-600 focus:ring-modal-600 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
                          placeholder="Enter width"
                          required
                        />
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="height"
                          className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                        >
                          Height (cm)
                        </label>
                        <input
                          type="number"
                          name="height"
                          id="height"
                          className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-600 focus:ring-modal-600 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
                          placeholder="Enter height"
                          required
                        />
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="weight"
                          className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                        >
                          Item weight (kg)
                        </label>
                        <input
                          type="number"
                          name="weight"
                          id="weight"
                          className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-600 focus:ring-modal-600 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
                          placeholder="Enter height"
                          required
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                          Item Image
                        </label>
                        <div className="flex w-full items-center justify-center">
                          <label
                            htmlFor="dropzone-file"
                            className="border-gray-300 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed"
                          >
                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                              <svg
                                className="text-gray-500 dark:text-gray-400 mb-4 h-8 w-8"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-gray-500 dark:text-gray-400 text-xs">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                              </p>
                            </div>
                            <input
                              id="dropzone-file"
                              type="file"
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
      ))}
    </DefaultLayout>
  );
};

export default ApplyTrip;
