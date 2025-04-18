import React from "react";
import world from "@svg-maps/world";

import { CheckboxSVGMap } from "react-svg-map";
import TestGeoJSONMap from "../../../pages/map/test-map";
import { useGetLocationWiseFarmerQuery } from "../../../store/features/dashboard/api";

const slaes = [
  // {
  //   title: "Nevada",
  //   amount: "$125k",
  //   cls: "bg-primary-500 ring-primary-500",
  // },
  // {
  //   title: "Colorado",
  //   amount: "$$325k",
  //   cls: "bg-success-500 ring-success-500",
  // },
  // {
  //   title: "Iowa",
  //   amount: "$67",
  //   cls: "bg-info-500 ring-info-500",
  // },
  // {
  //   title: "Arkansas",
  //   amount: "$354k",
  //   cls: "bg-warning-500 ring-warning-500",
  // },
  // {
  //   title: "Wyoming",
  //   amount: "$195k",
  //   cls: "bg-success-500 ring-success-500",
  // },
  // {
  //   title: "Other countries",
  //   amount: "$295k",
  //   cls: "bg-secondary-500 ring-secondary-500",
  // },
  {
    title: "Dhaka",
    amount: "125",
    cls: "bg-primary-500 ring-primary-500",
  },
  {
    title: "Rajshahi",
    amount: "325",
    cls: "bg-success-500 ring-success-500",
  },
  {
    title: "Khulna",
    amount: "67",
    cls: "bg-info-500 ring-info-500",
  },
  {
    title: "Barishal",
    amount: "354",
    cls: "bg-warning-500 ring-warning-500",
  },
  {
    title: "Chitagong",
    amount: "195",
    cls: "bg-success-500 ring-success-500",
  },
  {
    title: "Jesoore",
    amount: "295",
    cls: "bg-secondary-500 ring-secondary-500",
  },
];

const getRandomClass = () => {
  const classes = [
    "bg-primary-500 ring-primary-500",
    "bg-success-500 ring-success-500",
    "bg-info-500 ring-info-500",
    "bg-warning-500 ring-warning-500",
    "bg-secondary-500 ring-secondary-500",
  ];
  const randomIndex = Math.floor(Math.random() * classes.length);
  return classes[randomIndex];
};

const MostSales = ({ filterMap }) => {
  const { data, isLoading } = useGetLocationWiseFarmerQuery();

  const division_data = data?.map((division) => {
    return {
      title: division?.district_name,
      amount: division?.total,
      cls: getRandomClass(),
    };
  });

  const total = data?.reduce((acc, curr) => acc + parseInt(curr.total), 0);

  return (
    <div className=" items-center gap-20">
      {isLoading ? (
        "loading"
      ) : (
        <div className="flex-none">
          <h4 className="text-slate-600 dark:text-slate-200 text-sm font-normal mb-[6px]">
            {/* Total earnings */}
            Total Farmers (Division Wise)
          </h4>
          {filterMap === "usa" && (
            <div className="text-lg font-medium mb-[6px] dark:text-white text-slate-900">
              {/* $12,65,64787.00 */}
              {total}
            </div>
          )}
          {filterMap === "global" && (
            <div className="text-lg font-medium mb-[6px] dark:text-white text-slate-900">
              $12,65.00
            </div>
          )}
          {/* <div className="text-xs font-light dark:text-slate-200">
          <span className="text-primary-500">+08%</span> From last month
        </div> */}
          <ul className="bg-slate-50 grid grid-cols-4 lg:grid-cols-5 dark:bg-slate-900 rounded p-4 min-w-[184px] gap-4  my-4">
            {division_data?.map((item, i) => (
              <li
                key={i}
                className="flex border p-2 rounded-lg justify-between  text-xs text-slate-600 dark:text-slate-300"
              >
                <span className="flex space-x-2 rtl:space-x-reverse items-center ">
                  <span
                    className={` inline-flex h-[6px] w-[6px] bg-primary-500 ring-opacity-25 rounded-full ring-4
                        ${item.cls}
                        `}
                  ></span>
                </span>
                <span className="mx-2">{item.title}</span> -{" "}
                <span>{item.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex-1">
        {/* <CheckboxSVGMap
          map={world}
          className="h-[350px] w-full dash-codevmap"
        /> */}
        <TestGeoJSONMap />
      </div>
    </div>
  );
};

export default MostSales;
