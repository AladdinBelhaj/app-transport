// "use client";
// import Chart from "@/components/Charts/page";

// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import React from "react";
// import ChartOne from "./ChartOne";
// import ChartTwo from "./ChartTwo";
// import ChartThree from "./ChartThree";

// const BasicChartPage: React.FC = () => {
//   return (
//     <DefaultLayout>
//       <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
//         <ChartOne />
//         <ChartTwo />
//         <ChartThree />
//       </div>
//     </DefaultLayout>
//   );
// };

// export default BasicChartPage;

"use client";

import dynamic from "next/dynamic";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const ChartOne = dynamic(() => import("./ChartOne"), { ssr: false });
const ChartTwo = dynamic(() => import("./ChartTwo"), { ssr: false });
const ChartThree = dynamic(() => import("./ChartThree"), { ssr: false });

const BasicChartPage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </DefaultLayout>
  );
};

export default BasicChartPage;
