import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const CompletedTrips = () => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Completed Trips" />
      </DefaultLayout>
    </>
  );
};

export default CompletedTrips;
