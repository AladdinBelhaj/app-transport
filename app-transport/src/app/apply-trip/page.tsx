"use client";
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import axios from "axios";
import CurrentTrips from "../trips/current-trips/page";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
interface Accordion {
  id: number;
}

interface Input {
  [key: string]: string;
}

const ApplyTrip: React.FC = () => {
  const router = useRouter();
  const [accordions, setAccordions] = useState<Accordion[]>([{ id: 0 }]);
  const [inputs, setInputs] = useState<Input[]>([
    {
      "name-0": "",
      "length-0": "",
      "width-0": "",
      "height-0": "",
      "weight-0": "",
    },
  ]);

  const addAccordion = () => {
    const newAccordion = { id: accordions.length };
    console.log("Added accordion with id:", newAccordion.id);
    setAccordions([...accordions, newAccordion]);
    // Initialize the input values for the new accordion
    setInputs([
      ...inputs,
      {
        [`name-${newAccordion.id}`]: "",
        [`length-${newAccordion.id}`]: "",
        [`width-${newAccordion.id}`]: "",
        [`height-${newAccordion.id}`]: "",
        [`weight-${newAccordion.id}`]: "",
      },
    ]);
  };

  const deleteAccordion = (index: number) => {
    if (index > 0) {
      const updatedAccordions = accordions.filter(
        (accordion) => accordion.id !== index,
      );
      setAccordions(updatedAccordions);

      const updatedInputs = inputs.filter((_, i) => i !== index);
      setInputs(updatedInputs);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    accordionIndex: number,
  ) => {
    const { name, value } = event.target;
    const updatedInputs = [...inputs];
    updatedInputs[accordionIndex] = {
      ...updatedInputs[accordionIndex],
      [name]: value,
    };
    setInputs(updatedInputs);
  };

  const isFormValid = () => {
    console.log("Inputs:", inputs);
    // Check if there are any input values
    if (inputs.length === 0) {
      return false;
    }
    // Check if any input value is empty
    return inputs.every((input) =>
      Object.values(input).every((value) => value.trim() !== ""),
    );
  };
  const currentTripString = localStorage.getItem("currentTrip");

  let tripId: any;
  let transporterId: any;

  if (currentTripString !== null) {
    const currentTrip = JSON.parse(currentTripString);
    tripId = currentTrip?.id;
    transporterId = currentTrip?.transporterId;
  }

  const [offerCreated, setOfferCreated] = useState(false);

  useEffect(() => {
    const offerCreatedStorage = localStorage.getItem("offerCreated");
    if (offerCreatedStorage === "true") {
      localStorage.removeItem("offerCreated");
      setOfferCreated(true);
    }
  }, []);

  useEffect(() => {
    if (offerCreated) {
      toast.success("Applied to trip!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [offerCreated]);

  const id = localStorage.getItem("id");
  function handleSubmit(event: any) {
    event.preventDefault();
    console.log(inputs);
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/offers/create`, {
        userId: id,
        objects: inputs,
        tripId: tripId,
        transporterId: transporterId,
      })
      .then((response) => {
        if (response.status === 201) {
          localStorage.setItem("offerCreated", "true");
          router.push("/");
          console.log("Offer created successfully:", response.data);
        } else {
          console.log("Unexpected status code:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error creating offer:", error);
      });
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Apply Trip" />
      {accordions.map((accordion, index) => (
        <div
          key={accordion.id}
          className="collapse collapse-plus relative mb-3 bg-base-100"
        >
          <input
            type="radio"
            name="my-accordion-3"
            id={`accordion-${accordion.id}`}
          />
          <label
            htmlFor={`accordion-${accordion.id}`}
            className="collapse-title text-xl font-medium"
          >
            Object #{accordion.id + 1}
          </label>
          <div className="collapse-content">
            <ToastContainer />
            <div className="border-gray-200 dark:border-gray-700 border border-b-0 bg-white">
              <section className="dark:bg-gray-900 bg-white">
                <div className="mx-auto max-w-2xl px-4 py-8 lg:py-16">
                  <h2 className="text-gray-900 mb-4 text-xl font-bold dark:text-white">
                    Add a new product
                  </h2>
                  <form action="#">
                    <div className="grid gap-4 sm:grid-cols-4 sm:gap-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor={`name-${accordion.id}`}
                          className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                        >
                          Product Name
                        </label>
                        <input
                          type="text"
                          name={`name-${accordion.id}`}
                          id={`name-${accordion.id}`}
                          defaultValue={inputs[index]?.[`name-${index}`] || ""}
                          className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-600 focus:ring-modal-600 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
                          placeholder="Type product name"
                          onChange={(e) => handleInputChange(e, index)}
                          required
                        />
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor={`length-${accordion.id}`}
                          className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                        >
                          Length (cm)
                        </label>
                        <input
                          type="number"
                          name={`length-${accordion.id}`}
                          id={`length-${accordion.id}`}
                          defaultValue={
                            inputs[index]?.[`length-${index}`] || ""
                          }
                          className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-600 focus:ring-modal-600 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
                          placeholder="Enter length"
                          onChange={(e) => handleInputChange(e, index)}
                          required
                        />
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor={`width-${accordion.id}`}
                          className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                        >
                          Width (cm)
                        </label>
                        <input
                          type="number"
                          name={`width-${accordion.id}`}
                          id={`width-${accordion.id}`}
                          defaultValue={inputs[index]?.[`width-${index}`] || ""}
                          className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-600 focus:ring-modal-600 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
                          placeholder="Enter width"
                          onChange={(e) => handleInputChange(e, index)}
                          required
                        />
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor={`height-${accordion.id}`}
                          className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                        >
                          Height (cm)
                        </label>
                        <input
                          type="number"
                          name={`height-${accordion.id}`}
                          id={`height-${accordion.id}`}
                          defaultValue={
                            inputs[index]?.[`height-${index}`] || ""
                          }
                          className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-600 focus:ring-modal-600 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
                          placeholder="Enter height"
                          onChange={(e) => handleInputChange(e, index)}
                          required
                        />
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor={`weight-${accordion.id}`}
                          className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                        >
                          Item weight (kg)
                        </label>
                        <input
                          type="number"
                          name={`weight-${accordion.id}`}
                          id={`weight-${accordion.id}`}
                          defaultValue={
                            inputs[index]?.[`weight-${index}`] || ""
                          }
                          className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-modal-600 focus:ring-modal-600 dark:text-white dark:focus:border-modal-500 dark:focus:ring-modal-500"
                          placeholder="Enter weight"
                          onChange={(e) => handleInputChange(e, index)}
                          required
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <div
                          className="dark:bg-gray-800 mb-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:text-blue-400"
                          role="alert"
                        >
                          <span className="font-medium">Info alert!</span>{" "}
                          Highlight your request! Attract attention with a photo
                          showing the item to be transported. A request with
                          photos is more likely to be viewed and accepted.
                        </div>
                        <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                          Item Image
                        </label>
                        <div className="flex w-full items-center justify-center">
                          <label
                            htmlFor={`dropzone-file-${accordion.id}`}
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
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
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
                              id={`dropzone-file-${accordion.id}`}
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
              <hr className="border-gray-200 dark:border-gray-700" />
            </div>
          </div>
          {index > 0 && (
            <button
              key={`delete-${accordion.id}`}
              className="delete-button absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white"
              onClick={() => deleteAccordion(accordion.id)}
            >
              X
            </button>
          )}
        </div>
      ))}
      <div className="mt-5 flex justify-start">
        <button
          className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
          onClick={addAccordion}
        >
          Add Object
        </button>
        <button
          className={`ml-4 rounded px-4 py-2 font-semibold text-white ${
            !isFormValid()
              ? "cursor-not-allowed bg-green-200"
              : "bg-green-500 hover:bg-green-600"
          }`}
          onClick={handleSubmit}
          disabled={!isFormValid()} // Disable if form is not valid
        >
          Apply
        </button>
      </div>
    </DefaultLayout>
  );
};

export default ApplyTrip;
