import Chart from "react-apexcharts";
import React from "react";
import { useGetDashboardRadialChartQuery } from "../../../../store/features/dashboard/api";

const RadialsChart = () => {
  const { data, isLoading, isError, error } = useGetDashboardRadialChartQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

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
    labels: ["Members", "Farmers", "ME's", "CP's", "CO's", "TE's"],
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
    <div>
      {isError ? (
        <div>{error}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <div id="chart">
          <Chart
            options={options}
            series={series}
            type="radialBar"
            height={390}
          />
        </div>
      )}
    </div>
  );
};

export default RadialsChart;
