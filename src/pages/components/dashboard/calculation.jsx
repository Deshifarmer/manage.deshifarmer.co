import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useGetMaleFemaleQuery } from "../../../store/features/dashboard/api";

const Calculation = () => {
  const { data, error, isLoading } = useGetMaleFemaleQuery();
  const male = data?.map((item) => item?.male_count);
  const female = data?.map((item) => item?.female_count);
  const labels = data?.map((item) => item?.district_name);
  console.log(data, error);

  const [chartData, setChartData] = useState({
    series: [
      {
        data: male ? male : [],
      },
      {
        data: female ? female : [],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 630,
        stacked: true,
        toolbar: {
          show: true,
          offsetX: 10,
          offsetY: 10,
          tools: {
            download: false,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: labels ? labels : [],
      },
    },
  });

  return (
    <div id="chart">
      {isLoading ? (
        "Loading"
      ) : (
        <ReactApexChart
          options={chartData?.options}
          series={chartData?.series}
          type="bar"
          height={430}
        />
      )}
    </div>
  );
};

export default Calculation;
