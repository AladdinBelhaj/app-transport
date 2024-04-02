"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import AddTripModal from "./AddTripModal";
import { useEventsData } from "../../../utils/getEventsData";

const Calendar = () => {
  const today = new Date();
  const [clickedDate, setClickedDate] = useState<Date>(new Date());
  const eventsData = useEventsData();

  const [initialEvents, setInitialEvents] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setInitialEvents(eventsData);
  }, [eventsData]);

  const handleDateClick = (arg: any) => {
    console.log(eventsData);
    console.log("Date clicked:", arg.dateStr);
    const dateParts = arg.dateStr.split("-");
    const clickedDate = new Date(
      parseInt(dateParts[0]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[2]),
    );
    setClickedDate(clickedDate);
    console.log(clickedDate);
    // const newEvent = {
    //   title: "testing",
    //   start: clickedDate,
    //   resourceId: "a",
    // };
    // console.log("New event:", newEvent);
    // setInitialEvents((prevEvents) => [...prevEvents, newEvent]);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative mx-auto max-w-7xl">
      <Breadcrumb pageName="Calendar" />
      <FullCalendar
        key={JSON.stringify(initialEvents)}
        plugins={[
          // resourceTimelinePlugin,
          dayGridPlugin,
          interactionPlugin,
          // timeGridPlugin,
        ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth",
          // resourceTimelineWeek,
          // timeGridWeek
        }}
        initialView="dayGridMonth"
        nowIndicator={true}
        // editable={true}
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
        validRange={{ start: today }}
      />
      {/* Render AddTripModal inside Calendar */}
      <AddTripModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        clickedDate={clickedDate}
        setInitialEvents={setInitialEvents}
      />
    </div>
  );
};

export default Calendar;
