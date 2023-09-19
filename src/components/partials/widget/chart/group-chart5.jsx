import React from "react";
import { colors } from "@/constant/data";
import Chart from "react-apexcharts";
import { useGetDashboardRadialChartQuery } from "../../../../store/features/dashboard/api";

const columnCharthome2 = {
  series: [
    {
      name: "Revenue",
      data: [40, 70, 45, 100, 75, 40, 80, 90],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "60px",
        barHeight: "100%",
      },
    },
    legend: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },

    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + "k";
        },
      },
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      show: false,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    colors: colors.warning,
    grid: {
      show: false,
    },
  },
};
const columnCharthome3 = {
  series: [
    {
      name: "Revenue",
      data: [40, 70, 45, 100, 75, 40, 80, 90],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "60px",
        barHeight: "100%",
      },
    },
    legend: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },

    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + "k";
        },
      },
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      show: false,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    colors: colors.info,
    grid: {
      show: false,
    },
  },
};
const columnCharthome4 = {
  series: [
    {
      name: "Revenue",
      data: [40, 70, 45, 100, 75, 40, 80, 90],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "60px",
        barHeight: "100%",
      },
    },
    legend: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },

    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + "k";
        },
      },
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      show: false,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    colors: colors.success,
    grid: {
      show: false,
    },
  },
};

const GroupChart5 = () => {
  const { data, isLoading, isError, error } = useGetDashboardRadialChartQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  console.log(data);

  const statistics = [
    {
      name: columnCharthome3,
      title: "Members",
      count: data?.total_member,
      bg: "bg-[#793FDF] ",
      text: "text-info-500",
      icon: "heroicons:shopping-cart",
    },
    {
      name: columnCharthome3,
      title: " Channels",
      count: data?.total_channel,
      bg: "bg-[#E5F9FF] ",
      text: "text-info-500",
      icon: "heroicons:shopping-cart",
    },
    {
      name: columnCharthome2,
      title: "Companies",
      count: data?.total_co,
      bg: "bg-[#E5F9FF] ",
      text: "text-[#5743BE]",
      icon: "heroicons:arrow-trending-up-solid",
    },
    {
      name: columnCharthome4,
      title: " Distrubutors",
      count: data?.total_cp,
      bg: "bg-[#E5F9FF] ",
      text: "text-warning-500",
      icon: "heroicons:cube",
    },
    {
      name: columnCharthome4,
      title: "Microntrepreneurs",
      count: data?.total_me,
      bg: "bg-[#E5F9FF] ",
      text: "text-warning-500",
      icon: "heroicons:cube",
    },
    {
      name: columnCharthome2,
      title: " Farmers",
      count: data?.total_farmer,
      bg: "bg-[#E5F9FF] ",
      text: "text-[#5743BE]",
      icon: "heroicons:arrow-trending-up-solid",
    },
    {
      name: columnCharthome2,
      title: "Project Managers",
      count: data?.total_te,
      bg: "bg-[#E5F9FF] ",
      text: "text-[#5743BE]",
      icon: "heroicons:arrow-trending-up-solid",
    },
    {
      name: columnCharthome3,
      title: " Products",
      count: data?.total_product,
      bg: "bg-[#E5F9FF] ",
      text: "text-info-500",
      icon: "heroicons:shopping-cart",
    },

    {
      name: columnCharthome2,
      title: "Groups",
      count: data?.total_group,
      bg: "bg-[#E5F9FF] ",
      text: "text-[#5743BE]",
      icon: "heroicons:arrow-trending-up-solid",
    },
    {
      name: columnCharthome4,
      title: "Orders",
      count: data?.total_order,
      bg: "bg-[#E5F9FF] ",
      text: "text-warning-500",
      icon: "heroicons:cube",
    },
    {
      name: columnCharthome2,
      title: "Sell Amount (Input)",
      count: data?.agri_input_sell,
      bg: "bg-[#E5F9FF] ",
      text: "text-warning-500",
      icon: "heroicons:cube",
    },
    // {
    //   name: columnCharthome2,
    //   title: "Sell Amount (Vegetables)",
    //   count: data?.agri_input_sell,
    //   bg: "bg-[#E5F9FF] ",
    //   text: "text-warning-500",
    //   icon: "heroicons:cube",
    // },
    // {
    //   name: columnCharthome2,
    //   title: "Hours of Advisory",
    //   count: data?.agri_input_sell,
    //   bg: "bg-[#E5F9FF] ",
    //   text: "text-warning-500",
    //   icon: "heroicons:cube",
    // },
    // {
    //   name: columnCharthome2,
    //   title: "Weight of Sold Vegetables (Kg)",
    //   count: data?.agri_input_sell,
    //   bg: "bg-[#E5F9FF] ",
    //   text: "text-warning-500",
    //   icon: "heroicons:cube",
    // },
  ];

  console.log(data);
  return (
    <>
      {statistics.map((item, i) => (
        <div className="bg-slate-50 dark:bg-slate-900 rounded p-4" key={i}>
          <div className="text-slate-600 dark:text-slate-400 text-sm mb-1 font-medium">
            {item.title}
          </div>
          <div className="text-slate-900 dark:text-white text-lg font-medium">
            {item.count}
          </div>
          <div className="ml-auto max-w-[124px]">
            <Chart
              options={item.name.options}
              series={item.name.series}
              type="bar"
              height="48"
              width="124"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default GroupChart5;
