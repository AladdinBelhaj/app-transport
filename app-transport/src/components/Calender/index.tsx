// "use client";
// import React from "react";
// import Breadcrumb from "../Breadcrumbs/Breadcrumb";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
// import timeGridPlugin from "@fullcalendar/timegrid";

// const Calendar = () => {
//   return (
//     <div className="mx-auto max-w-7xl">
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
//         resources={[
//           { id: "a", title: "Auditorium A" },
//           { id: "b", title: "Auditorium B", eventColor: "green" },
//           { id: "c", title: "Auditorium C", eventColor: "orange" },
//         ]}
//         initialEvents={[
//           { title: "nice event", start: new Date(), resourceId: "a" },
//         ]}
//       />
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
  const [clickedDate, setClickedDate] = useState(null);

  const handleDateClick = (arg: any) => {
    setClickedDate(arg.dateStr);
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
        initialView="resourceTimelineWeek"
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
        initialEvents={[
          { title: "nice event", start: new Date(), resourceId: "a" },
        ]}
      />
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">Clicked date: {clickedDate}</p>
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
