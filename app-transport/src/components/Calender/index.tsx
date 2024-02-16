// "use client";
// import React, { useState } from "react";
// import Breadcrumb from "../Breadcrumbs/Breadcrumb";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
// import timeGridPlugin from "@fullcalendar/timegrid";

// const Calendar = () => {
//   const [clickedDate, setClickedDate] = useState<Date | null>(null);

//   //   const handleDateClick = (arg: any) => {
//   //     setClickedDate(arg.dateStr);
//   //     const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
//   //     if (modal) {
//   //       modal.showModal();
//   //     }
//   //   };

//   const handleDateClick = (arg: any) => {
//     const dateParts = arg.dateStr.split("-");
//     const clickedDate = new Date(
//       parseInt(dateParts[0]),
//       parseInt(dateParts[1]) - 1, // Months are zero-based
//       parseInt(dateParts[2]),
//     );
//     setClickedDate(clickedDate);
//     const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
//     if (modal) {
//       modal.showModal();
//     }
//     console.log(clickedDate);
//   };

//   const handleCloseModal = () => {
//     const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
//     if (modal) {
//       modal.close();
//     }
//   };

//   return (
//     <div className="relative mx-auto max-w-7xl">
//       <Breadcrumb pageName="Calendar" />
//       <FullCalendar
//         plugins={[
//           resourceTimelinePlugin,
//           dayGridPlugin,
//           interactionPlugin,
//           timeGridPlugin,
//         ]}
//         headerToolbar={{
//           left: "prev,next today",
//           center: "title",
//           right: "resourceTimelineWeek,dayGridMonth,timeGridWeek",
//         }}
//         initialView="resourceTimelineWeek"
//         nowIndicator={true}
//         editable={true}
//         selectable={true}
//         selectMirror={true}
//         dateClick={handleDateClick}
//         // Use this option to allow clicking on empty cells
//         selectAllow={(selectInfo) => !selectInfo.resource}
//         resources={[
//           { id: "a", title: "Auditorium A" },
//           { id: "b", title: "Auditorium B", eventColor: "green" },
//           { id: "c", title: "Auditorium C", eventColor: "orange" },
//         ]}
//         initialEvents={[
//           { title: "nice event", start: new Date(), resourceId: "a" },
//         ]}
//       />
//       <dialog id="my_modal_1" className="modal">
//         <div className="modal-box">
//           <h3 className="text-lg font-bold">Hello!</h3>
//           <p className="py-4">
//             Clicked date:{" "}
//             {clickedDate
//               ? clickedDate.toLocaleDateString()
//               : "No date selected"}
//           </p>

//           <div className="modal-action">
//             <button className="btn" onClick={handleCloseModal}>
//               Close
//             </button>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default Calendar;

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

      <dialog id="my_modal_1" className="modal">
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
      </dialog>
    </div>
  );
};

export default Calendar;
