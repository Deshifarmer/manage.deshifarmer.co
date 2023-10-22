import React from "react";
import Chart from "react-apexcharts";
import { colors } from "@/constant/data";
import useDarkMode from "@/hooks/useDarkMode";
import { useGetDailySalesChartDataQuery } from "../../../store/features/dashboard/api";

const SalesChart = ({ height = 360 }) => {
  const { data } = useGetDailySalesChartDataQuery();

  const [isDark] = useDarkMode();
  const series = [
    {
      name: "Source Buy Price",
      data: data?.map((item) => item.source_total_buy_price),
    },
    {
      name: "Source Sell Price",
      data: data?.map((item) => item.source_total_sell_price),
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: [colors.primary, colors.warning],
    tooltip: {
      theme: "dark",
    },
    legend: {
      offsetY: 4,
      show: true,
      fontSize: "12px",
      fontFamily: "Inter",
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },

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
    },
    grid: {
      show: true,
      borderColor: isDark ? "#334155" : "#e2e8f0",
      strokeDashArray: 10,
      position: "back",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.3,
        opacityFrom: 0.4,
        opacityTo: 0.5,
        stops: [0, 30, 0],
      },
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
      type: "",
      categories: data?.map((item) => item.date),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: true,
      },
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
    },
  };
  return (
    <>
      <Chart options={options} series={series} type="area" height={height} />
    </>
  );
};

export default SalesChart;
