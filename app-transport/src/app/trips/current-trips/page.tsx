import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableThree from "@/components/Tables/TableThree";

const CompletedTrips = () => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Completed Trips" />
        <TableThree />
      </DefaultLayout>
    </>
  );
};

export default CompletedTrips;
