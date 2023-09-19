// import React, { useState } from "react";
// import ReactApexChart from "react-apexcharts";
// import { useGetMaleFemaleQuery } from "../../../store/features/dashboard/api";

// const Calculation = () => {
//   const { data, error, isLoading } = useGetMaleFemaleQuery();
//   const male = data?.map((item) => item?.male_count);
//   const female = data?.map((item) => item?.female_count);
//   const labels = data?.map((item) => item?.district_name);
//   console.log(data, error);

//   const [chartData, setChartData] = useState({
//     series: [
//       {
//         data: male ? male : [],
//       },
//       {
//         data: female ? female : [],
//       },
//     ],
//     options: {
//       chart: {
//         type: "bar",
//         height: 630,
//         stacked: true,
//         toolbar: {
//           show: true,
//           offsetX: 10,
//           offsetY: 10,
//           tools: {
//             download: false,
//             selection: true,
//             zoom: true,
//             zoomin: true,
//             zoomout: true,
//             pan: true,
//           },
//         },
//       },
//       plotOptions: {
//         bar: {
//           horizontal: true,
//           dataLabels: {
//             position: "top",
//           },
//         },
//       },
//       dataLabels: {
//         enabled: true,
//         offsetX: -6,
//         style: {
//           fontSize: "12px",
//           colors: ["#fff"],
//         },
//       },
//       stroke: {
//         show: true,
//         width: 1,
//         colors: ["#fff"],
//       },
//       tooltip: {
//         shared: true,
//         intersect: false,
//       },
//       xaxis: {
//         categories: labels ? labels : [],
//       },
//     },
//   });

//   return (
//     <div id="chart">
//       {isLoading ? (
//         "Loading"
//       ) : (
//         <ReactApexChart
//           options={chartData?.options}
//           series={chartData?.series}
//           type="bar"
//           height={430}
//         />
//       )}
//     </div>
//   );
// };

// export default Calculation;

import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import { colors } from "@/constant/data";
import { useGetMaleFemaleQuery } from "../../../store/features/dashboard/api";

const StackBarChart = ({ height = 325 }) => {
  const { data, error, isLoading } = useGetMaleFemaleQuery();
  const male = data?.map((item) => item?.male_count);
  const female = data?.map((item) => item?.female_count);
  const labels = data?.map((item) => item?.district_name);
  const [isDark] = useDarkMode();
  const series = [
    {
      name: "Male",
      data: male,
    },
    {
      name: "Female",
      data: female,
    },
  ];
  const options = {
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        endingShape: "rounded",
        columnWidth: "55%",
      },
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
      fontFamily: "Inter",
      offsetY: 0,
      markers: {
        width: 6,
        height: 6,
        offsetY: 0,
        offsetX: -5,
        radius: 12,
      },
      itemMargin: {
        horizontal: 18,
        vertical: 0,
      },
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },

    yaxis: {
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
    },

    xaxis: {
      // categories: [
      //   "Feb",
      //   "Mar",
      //   "Apr",
      //   "May",
      //   "Jun",
      //   "Jul",
      //   "Aug",
      //   "Sep",
      //   "Oct",
      // ],
      categories: labels,
      labels: {
        offsetY: -3,
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },

    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " Persons";
        },
      },
    },
    colors: [colors.primary, colors.info, colors.warning],
    grid: {
      show: true,
      borderColor: isDark ? "#334155" : "#E2E8F0",
      strokeDashArray: 10,
      position: "back",
    },
  };
  return (
    <>
      <Chart options={options} series={series} type="bar" height={height} />
    </>
  );
};

export default StackBarChart;
