"use client";

import React, { useState } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";

const Calendar = () => {
  const [clickedDate, setClickedDate] = useState<Date | null>(null);
  const [initialEvents, setInitialEvents] = useState<any[]>([
    { title: "nice event", start: new Date(), resourceId: "a" },
  ]);

  const handleDateClick = (arg: any) => {
    console.log("Date clicked:", arg.dateStr);
    const dateParts = arg.dateStr.split("-");
    const clickedDate = new Date(
      parseInt(dateParts[0]),
      parseInt(dateParts[1]) - 1, // Months are zero-based
      parseInt(dateParts[2]),
    );
    setClickedDate(clickedDate);
    const newEvent = {
      title: "testing",
      start: clickedDate,
      resourceId: "a",
    };
    console.log("New event:", newEvent);
    // Update initialEvents by adding the new event
    setInitialEvents((prevEvents) => [...prevEvents, newEvent]);

    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const handleCloseModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  return (
    <div className="relative mx-auto max-w-7xl">
      <Breadcrumb pageName="Calendar" />
      <FullCalendar
        key={JSON.stringify(initialEvents)} // Add key prop here
        plugins={[
          resourceTimelinePlugin,
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
        ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "resourceTimelineWeek,dayGridMonth,timeGridWeek",
        }}
        initialView="dayGridMonth"
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        dateClick={handleDateClick}
        // Use this option to allow clicking on empty cells
        selectAllow={(selectInfo) => !selectInfo.resource}
        resources={[
          { id: "a", title: "Auditorium A" },
          { id: "b", title: "Auditorium B", eventColor: "green" },
          { id: "c", title: "Auditorium C", eventColor: "orange" },
        ]}
        initialEvents={initialEvents}
      />

      {/* <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">
            Clicked date: {clickedDate ? clickedDate.toLocaleDateString() : ""}
          </p>
          <div className="modal-action">
            <button className="btn" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      </dialog> */}
      <div className="m-5 flex justify-center">
        <button
          id="defaultModalButton"
          data-modal-target="defaultModal"
          data-modal-toggle="defaultModal"
          className="bg-modal-700 hover:bg-modal-800 focus:ring-modal-300 dark:bg-modal-600 dark:hover:bg-modal-700 dark:focus:ring-modal-800 block rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
          type="button"
        >
          Create product
        </button>
      </div>
      {/* Main modal */}
      <div
        id="defaultModal"
        tabIndex={-1}
        aria-hidden="true"
        className="h-modal fixed left-0 right-0 top-0 z-50 hidden w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 md:h-full"
      >
        <div className="relative h-full w-full max-w-2xl p-4 md:h-auto">
          {/* Modal content */}
          <div className="dark:bg-gray-800 relative rounded-lg bg-white p-4 shadow sm:p-5">
            {/* Modal header */}
            <div className="dark:border-gray-600 mb-4 flex items-center justify-between rounded-t border-b pb-4 sm:mb-5">
              <h3 className="text-gray-900 text-lg font-semibold dark:text-white">
                Add Product
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm dark:hover:text-white"
                data-modal-toggle="defaultModal"
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
                <div>
                  <label
                    htmlFor="name"
                    className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-modal-600 focus:border-modal-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-modal-500 dark:focus:border-modal-500 block w-full rounded-lg border p-2.5 text-sm dark:text-white"
                    placeholder="Type product name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="brand"
                    className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-modal-600 focus:border-modal-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-modal-500 dark:focus:border-modal-500 block w-full rounded-lg border p-2.5 text-sm dark:text-white"
                    placeholder="Product brand"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-modal-600 focus:border-modal-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-modal-500 dark:focus:border-modal-500 block w-full rounded-lg border p-2.5 text-sm dark:text-white"
                    placeholder="$2999"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-modal-500 focus:border-modal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-modal-500 dark:focus:border-modal-500 block w-full rounded-lg border p-2.5 text-sm dark:text-white"
                  >
                    <option selected>Select category</option>
                    <option value="TV">TV/Monitors</option>
                    <option value="PC">PC</option>
                    <option value="GA">Gaming/Console</option>
                    <option value="PH">Phones</option>
                  </select>
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
                Add new product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
