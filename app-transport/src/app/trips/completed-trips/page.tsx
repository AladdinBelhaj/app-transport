import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const CompletedTrips = () => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Completed Trips"></Breadcrumb>
      </DefaultLayout>
    </>
  );
};

export default CompletedTrips;
