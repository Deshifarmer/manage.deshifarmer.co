// import React, { useEffect, useState } from "react";
// import Chart from "react-apexcharts";
// import useDarkMode from "@/hooks/useDarkMode";
// import useWidth from "@/hooks/useWidth";
// import axios from "axios";

// const RadialsChart = () => {
//   const token = localStorage.getItem("hq-token");
//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BASE}/hq/dashboard/all_member`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(response.data);
//       setData(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   console.log(data);

//   const [isDark] = useDarkMode();
//   const { width, breakpoints } = useWidth();
//   const series = [
//     data?.total_farmer,
//     data?.total_me,
//     data?.total_cp,
//     data?.total_co,
//   ];
//   const options = {
//     chart: {
//       toolbar: {
//         show: true,
//       },
//     },
//     plotOptions: {
//       radialBar: {
//         dataLabels: {
//           name: {
//             fontSize: "22px",
//             color: isDark ? "#CBD5E1" : "#475569",
//           },
//           value: {
//             fontSize: "16px",
//             color: isDark ? "#CBD5E1" : "#475569",
//           },
//           total: {
//             show: true,
//             label: `Total Member ${data && data?.total_member}`,
//             color: isDark ? "#CBD5E1" : "#475569",

//             formatter: function () {
//               return parseInt(data && data?.total_member);
//             },
//           },
//         },
//         track: {
//           background: "#E2E8F0",
//           strokeWidth: "97%",
//         },
//       },
//     },
//     labels: [
//       "Total Farmers",
//       "Total Me's",
//       "Total Channels",
//       "Total companies",
//     ],
//     colors: ["#4669FA", "#FA916B", "#50C793", "#0CE7FA"],
//   };

//   return (
//     <div>
//       <Chart
//         options={options}
//         series={series}
//         type="radialBar"
//         height={width > breakpoints.md ? 360 : 250}
//       />
//     </div>
//   );
// };

// export default RadialsChart;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Chart from "react-apexcharts";

// const RadialsChart = () => {
//   const token = localStorage.getItem("hq-token");
//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BASE}/hq/dashboard/all_member`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(response.data);
//       setData(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const options = {
//     series: [
//       data?.total_member,
//       data?.total_farmer,
//       data?.total_me,
//       data?.total_cp,
//       data?.total_co,
//     ],
//     chart: {
//       height: 390,
//       type: "radialBar",
//     },
//     plotOptions: {
//       radialBar: {
//         offsetY: 0,
//         startAngle: 0,
//         endAngle: 270,
//         hollow: {
//           margin: 5,
//           size: "30%",
//           background: "transparent",
//           image: undefined,
//         },
//         dataLabels: {
//           name: {
//             show: false,
//           },
//           value: {
//             show: false,
//           },
//         },
//       },
//     },
//     colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
//     labels: ["Total Members", " Farmers", " Me", " Channels", " Companies"],
//     legend: {
//       show: true,
//       floating: true,
//       fontSize: "16px",
//       position: "left",
//       offsetX: 50,
//       offsetY: 10,
//       labels: {
//         useSeriesColors: true,
//       },
//       markers: {
//         size: 0,
//       },
//       formatter: function (seriesName, opts) {
//         return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
//       },
//       itemMargin: {
//         vertical: 3,
//       },
//     },
//     responsive: [
//       {
//         breakpoint: 480,
//         options: {
//           legend: {
//             show: true,
//           },
//         },
//       },
//     ],
//   };

//   const chart = new ApexCharts(
//     document.querySelector("#apex-radial-bar-chart"),
//     options
//   );
//   chart.render();

//   // Optionally, you can return a cleanup function if needed
//   // For example, if you use ApexCharts in multiple components, you may need to destroy the chart on unmount to avoid conflicts.
//   // return () => {
//   //   chart.destroy();
//   // };

//   return (
//     <div id="apex-radial-bar-chart">
//       {/* The chart will be rendered here */}
//     </div>
//   );
// };

// export default RadialsChart;

// import React from "react";
import Chart from "react-apexcharts";
import React from "react";

import { useGetDashboardQuery } from "../../../../store/features/dashboard/api";

const RadialsChart = () => {
  const { data, isLoading, isError, error } = useGetDashboardQuery();

  const series = [
    data?.total_member,
    data?.total_farmer,
    data?.total_me,
    data?.total_cp,
    data?.total_co,
    data?.total_te,
  ];
  const options = {
    chart: {
      height: 390,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            show: false,
          },
        },
      },
    },
    colors: ["#6528F7", "#EF6262", "#F86F03", "#22A699", "#DD58D6", "#F11A7B"],
    labels: [
      "Total Member",
      "Total Farmer",
      "Total ME",
      "Total CP",
      "Total CO",
      "Total TE",
    ],
    legend: {
      show: true,
      floating: true,
      fontSize: "12px",
      position: "left",
      offsetX: 60,
      offsetY: 1,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
      formatter: function (seriesName, opts) {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
      },
      itemMargin: {
        vertical: 3,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: true,
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      <Chart options={options} series={series} type="radialBar" height={390} />
    </div>
  );
};

export default RadialsChart;
