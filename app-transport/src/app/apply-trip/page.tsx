"use client";
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const ApplyTrip = () => {
  // State to track the visibility of each accordion section
  const [accordion1Open, setAccordion1Open] = useState(true);
  const [accordion2Open, setAccordion2Open] = useState(false);
  const [accordion3Open, setAccordion3Open] = useState(false);

  // Function to toggle the visibility of accordion section 1
  const toggleAccordion1 = () => {
    setAccordion1Open(!accordion1Open);
  };

  // Function to toggle the visibility of accordion section 2
  const toggleAccordion2 = () => {
    setAccordion2Open(!accordion2Open);
  };

  // Function to toggle the visibility of accordion section 3
  const toggleAccordion3 = () => {
    setAccordion3Open(!accordion3Open);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Apply Trip" />
      <div id="accordion-collapse" data-accordion="collapse">
        <h2 id="accordion-collapse-heading-1">
          <button
            type="button"
            className="text-gray-500 border-gray-200 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 flex w-full items-center justify-between gap-3 rounded-t-xl border border-b-0 p-5 font-medium focus:ring-4 rtl:text-right"
            data-accordion-target="#accordion-collapse-body-1"
            aria-expanded={accordion1Open ? "true" : "false"}
            aria-controls="accordion-collapse-body-1"
            onClick={toggleAccordion1}
          >
            <span>What is Flowbite?</span>
            <svg
              data-accordion-icon=""
              className={`h-3 w-3 shrink-0 ${
                accordion1Open ? "rotate-180" : ""
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-1"
          className={`${accordion1Open ? "" : "hidden"}`}
          aria-labelledby="accordion-collapse-heading-1"
        >
          <div className="border-gray-200 dark:border-gray-700 dark:bg-gray-900 border border-b-0">
            <section className="dark:bg-gray-900 bg-white">
              <div className="mx-auto max-w-2xl px-4 py-8 lg:py-16">
                <h2 className="text-gray-900 mb-4 text-xl font-bold dark:text-white">
                  Add a new product
                </h2>
                <form action="#">
                  <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
                    <div className="sm:col-span-3">
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
                      {/* <div
                        className="inline-flex rounded-md shadow-sm"
                        role="group"
                      >
                        <button
                          type="button"
                          className="text-gray-900 border-gray-900 focus:ring-gray-500 dark:hover:bg-gray-700 rounded-s-lg border bg-transparent px-4 py-2 text-sm font-medium hover:bg-black hover:text-white focus:z-10 focus:bg-black focus:text-white focus:ring-2 dark:border-white dark:text-white dark:hover:text-white dark:focus:bg-black"
                        >
                          Profile
                        </button>
                        <button
                          type="button"
                          className="text-gray-900 border-gray-900 focus:ring-gray-500 dark:hover:bg-gray-700 border-b border-t bg-transparent px-4 py-2 text-sm font-medium hover:bg-black hover:text-white focus:z-10 focus:bg-black focus:text-white focus:ring-2 dark:border-white dark:text-white dark:hover:text-white dark:focus:bg-black"
                        >
                          Settings
                        </button>
                        <button
                          type="button"
                          className="text-gray-900 border-gray-900 focus:ring-gray-500 dark:hover:bg-gray-700 rounded-e-lg border bg-transparent px-4 py-2 text-sm font-medium hover:bg-black hover:text-white focus:z-10 focus:bg-black focus:text-white focus:ring-2 dark:border-white dark:text-white dark:hover:text-white dark:focus:bg-black"
                        >
                          Downloads
                        </button>
                      </div> */}
                      <div className="w-full">
                        <label
                          htmlFor="length"
                          className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                        >
                          Length (in cm)
                        </label>
                        <input
                          type="text"
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
                        Width (in cm)
                      </label>
                      <input
                        type="text"
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
                        Height (in cm)
                      </label>
                      <input
                        type="text"
                        name="height"
                        id="height"
                        className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-600 focus:ring-modal-600 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
                        placeholder="$2999"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="item-weight"
                        className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                      >
                        Item Weight (kg)
                      </label>
                      <input
                        type="number"
                        name="item-weight"
                        id="item-weight"
                        className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-600 focus:ring-modal-600 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
                        placeholder={"12"}
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
                        rows={8}
                        className="text-gray-900 bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-500 focus:ring-modal-500 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
                        placeholder="Your description here"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-4 inline-flex items-center rounded-lg bg-modal-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-modal-800 focus:ring-4 focus:ring-modal-200 dark:focus:ring-modal-900 sm:mt-6"
                  >
                    Add product
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
        {/* Repeat the above pattern for accordion sections 2 and 3 */}
        {/* Accordion Section 2 */}
        <h2 id="accordion-collapse-heading-2">
          <button
            type="button"
            className="text-gray-500 border-gray-200 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 flex w-full items-center justify-between gap-3 border border-b-0 p-5 font-medium focus:ring-4 rtl:text-right"
            data-accordion-target="#accordion-collapse-body-2"
            aria-expanded={accordion2Open ? "true" : "false"}
            aria-controls="accordion-collapse-body-2"
            onClick={toggleAccordion2}
          >
            <span>Is there a Figma file available?</span>
            <svg
              data-accordion-icon=""
              className={`h-3 w-3 shrink-0 ${
                accordion2Open ? "rotate-180" : ""
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-2"
          className={`${accordion2Open ? "" : "hidden"}`}
          aria-labelledby="accordion-collapse-heading-2"
        >
          <div className="border-gray-200 dark:border-gray-700 border border-b-0 p-5">
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              Flowbite is first conceptualized and designed using the Figma
              software so everything you see in the library has a design
              equivalent in our Figma file.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Check out the{" "}
              <a
                href="https://flowbite.com/figma/"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                Figma design system
              </a>{" "}
              based on the utility classes from Tailwind CSS and components from
              Flowbite.
            </p>
          </div>
        </div>
        {/* Accordion Section 3 */}
        <h2 id="accordion-collapse-heading-3">
          <button
            type="button"
            className="text-gray-500 border-gray-200 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 flex w-full items-center justify-between gap-3 border p-5 font-medium focus:ring-4 rtl:text-right"
            data-accordion-target="#accordion-collapse-body-3"
            aria-expanded={accordion3Open ? "true" : "false"}
            aria-controls="accordion-collapse-body-3"
            onClick={toggleAccordion3}
          >
            <span>
              What are the differences between Flowbite and Tailwind UI?
            </span>
            <svg
              data-accordion-icon=""
              className={`h-3 w-3 shrink-0 ${
                accordion3Open ? "rotate-180" : ""
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-3"
          className={`${accordion3Open ? "" : "hidden"}`}
          aria-labelledby="accordion-collapse-heading-3"
        >
          <div className="border-gray-200 dark:border-gray-700 border border-t-0 p-5">
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              The main difference is that the core components from Flowbite are
              open source under the MIT license, whereas Tailwind UI is a paid
              product. Another difference is that Flowbite relies on smaller and
              standalone components, whereas Tailwind UI offers sections of
              pages.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              However, we actually recommend using both Flowbite, Flowbite Pro,
              and even Tailwind UI as there is no technical reason stopping you
              from using the best of two worlds.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              Learn more about these technologies:
            </p>
            <ul className="text-gray-500 dark:text-gray-400 list-disc ps-5">
              <li>
                <a
                  href="https://flowbite.com/pro/"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  Flowbite Pro
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindui.com/"
                  rel="nofollow"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  Tailwind UI
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ApplyTrip;
