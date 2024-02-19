import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const PendingTrips = () => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Pending Trips"></Breadcrumb>
      </DefaultLayout>
    </>
  );
};

export default PendingTrips;
