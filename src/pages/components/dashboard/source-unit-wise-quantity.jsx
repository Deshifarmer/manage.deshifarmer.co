import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import { colors } from "@/constant/data";
import {
  useGetMaleFemaleQuery,
  useGetSourcingUnitWiseQuantityQuery,
} from "../../../store/features/dashboard/api";

const SourceUnitWiseQuantity = ({ height = 325 }) => {
  //   const { data, error, isLoading } = useGetMaleFemaleQuery();
  const { data: sourceUnit } = useGetSourcingUnitWiseQuantityQuery();
  const unsold = sourceUnit?.map((item) => item?.unsold);
  const sold = sourceUnit?.map((item) => item?.sold);
  const labels = sourceUnit?.map((item) => item?.unit);
  const [isDark] = useDarkMode();
  const series = [
    {
      name: "Unsold",
      data: unsold,
    },
    {
      name: "Sold",
      data: sold,
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
          return val + " units";
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

export default SourceUnitWiseQuantity;
