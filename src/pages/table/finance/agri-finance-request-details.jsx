import React, { useRef, useState } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import ReactToPrint from "react-to-print";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import { useGetSingleAgriFinanceRequestQuery } from "/src/store/features/farmers/api.js";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import { set } from "react-hook-form";

const AgriFinanceDetails = () => {
  const token = localStorage.getItem("hq-token");
  const [show, setShow] = useState(false);
  const { id } = useParams();

  const qrCodeValue = "https://manage.deshifarmer.co";
  const { data: details, isLoading } = useGetSingleAgriFinanceRequestQuery(id);
  console.log(details);
  const statistics = [
    {
      title: "Season",
      id: "season",
      count: details?.season,
      bg: "bg-info-500",
      text: "text-info-500",
      icon: "heroicons-outline:menu-alt-1",
    },
    {
      title: "Purpose of Loan",
      id: "Purpose_of_Loan",
      count: details?.purpose_of_loan,
      bg: "bg-red-500",
      text: "text-warning-500",
      icon: "heroicons-outline:chart-pie",
    },
    {
      title: "Producing Crop",
      id: "producing_crop",
      count: details?.producing_crop,
      bg: "bg-yellow-400",
      text: "text-primary-500",
      icon: "heroicons-outline:clock",
    },
    {
      title: "Farming Land Area",
      id: "land_size",
      count: details?.land_size,
      bg: "bg-lime-500",
      text: "text-success-500",
      icon: "heroicons-outline:calculator",
    },
  ];
  const which_farmer = details?.which_farmer;
  const [status, setStatus] = useState(null);
  const handleEdit = async (value) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE}/hq/finance_request/${id}`,
        {
          status: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setStatus(value); // Update the status state here

        switch (value) {
          case "confirm":
            toast.success("Confirm status updated successfully");
            break;
          case "Reject":
            toast.success("Reject status updated successfully");
            break;
          case "pending":
            toast.success("Pending status updated successfully");
            break;
          default:
            toast.success("Status updated successfully");
        }
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("An error occurred while updating status");
    }
  };

  const Amount = details?.df_approved_loan;
  const [editedAmount, setEditedAmount] = useState(Amount);
  console.log(Amount);
  const [isUpdated, setIsUpdated] = useState(false);

  const handle_update = async (value) => {
    if (value === "edit") {
      setShow(true);
      if (!editedAmount) {
        setEditedAmount(Amount);
      } else {
        setEditedAmount(editedAmount);
      }
      // setIsUpdated(false);
    }

    if (value === "update") {
      if (editedAmount === Amount) {
        toast.warning("Please update the amount before saving.");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BASE}/hq/finance_request/${id}`,
        {
          df_approved_loan: editedAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setShow(false);
        toast.success("Amount Updated Successfully");
        setIsUpdated(true);
      } else if (message) {
        toast.error("Failed to update amount. Please try again.");
      }
    }
  };

  return (
    <div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className=" space-y-5">
            <div className="grid grid-cols-12 gap-5">
              <Card className="xl:col-span-4 col-span-12 lg:col-span-5 md:col-span-12 h-full">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                  {/* <GroupChart4  /> */}
                  <>
                    {statistics.map((item, i) => (
                      <div
                        key={i}
                        className={`${item.bg} rounded-md  border-white border-2 p-4 bg-opacity-[0.15] dark:bg-opacity-50 text-center`}
                      >
                        <div
                          className={`${item.text} mx-auto h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white mb-4 `}
                        >
                          <Icon icon={item.icon} />
                        </div>
                        <span className="block text-slate-600 font-medium dark:text-white mb-1">
                          {item.title}
                        </span>

                        <span className="block mb-  text-slate-900 dark:text-white ">
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-md p-4 mt-4">
                  <div className="bg-slate-100 dark:bg-slate-700 rounded px-4 pt-4 pb-1  mt-6">
                    <div className="mr-3 mb-3 space-y-2">
                      {/* // note  */}
                      <div className="mr-3 mb-3 space-y-2">
                        <div className="font-medium text-slate-700 dark:text-slate-200">
                          Amount Of Loan
                        </div>
                        <div className="text-warning-700 dark:text-warning-500">
                          {" "}
                          {details?.amount_of_loan} ৳
                        </div>
                      </div>

                      <div className="text-slate-700 dark:text-slate-200">
                        DF Approved Loan
                      </div>
                      {show ? (
                        <input
                          type="number"
                          value={editedAmount}
                          onChange={(e) => setEditedAmount(e.target.value)}
                          className="w-full border border-slate-300  dark:bg-slate-500 bg-black-50 rounded-md p-2 text-black-900 dark:text-slate-200"
                        />
                      ) : (
                        <span className="text-warning-700 dark:text-warning-500 font-normal py-4">
                          {isUpdated ? editedAmount : details.df_approved_loan}{" "}
                          ৳
                        </span>
                      )}
                    </div>
                    {/* end single */}

                    <div className="mr-3 mb-3 space-y-2">
                      <div className="text-slate-700 dark:text-slate-200">
                        Requested At
                      </div>
                      <div className="text-warning-700 dark:text-warning-500">
                        {" "}
                        {moment(details?.updated_at).format("LL")}
                      </div>
                    </div>

                    <div className="mr-3 mb-3 space-y-2">
                      <div className="text-slate-700 dark:text-slate-200">
                        Status
                      </div>
                      <div className="text-warning-700 dark:text-warning-500">
                        {status || details?.status}
                      </div>
                    </div>
                    {/* end single */}
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={(e) => handle_update(e.target.value)}
                      className="bg-slate-500 text-white mt-2 rounded-md px-4 py-2 items-center"
                      value={show ? "update" : "edit"}
                    >
                      {show ? "update" : "Edit"}
                    </button>
                    <select
                      value={status || "pending"}
                      onChange={(e) => handleEdit(e.target.value)}
                      className="bg-slate-500 text-white mt-2  rounded-md px-4 py-2"
                    >
                      <option className=" p-2 mt-1" value="pending">
                        Pending
                      </option>
                      <option className=" p-2" value="Reject">
                        Reject
                      </option>
                      <option className=" p-2" value="confirm">
                        Confirm
                      </option>
                    </select>
                    {/* <button
                    onClick={handleEdit}
                    className="bg-slate-500 text-white mt-2 rounded-md px-6 py-2"
                  >
                    Active
                  </button> */}
                  </div>
                </div>
              </Card>
              {/* end single column*/}
              <Card
                title={`Farmer details`}
                className="xl:col-span-4 col-span-12 lg:col-span-4 md:col-span-12 h-full"
              >
                <div className="  dark:bg-slate-700  p-3 rounded-md">
                  <div className=" dark:text-slate-100 mb-3 space-y-3">
                    <div className="flex justify-between dark:text-slate-100 ">
                      <div>DF Farmer ID</div>
                      <Link to={`/farmer-details/${which_farmer}`}>
                        <p className=" text-slate-600 dark:text-orange-300">
                          {details?.which_farmer}
                        </p>
                      </Link>
                    </div>
                    <div className="flex justify-between">
                      <p>Name</p>
                      <div>Ramjan ali</div>
                    </div>
                    <div className="flex justify-between">
                      <p>Mobile number</p>
                      <div>
                        <span className="text-xs">show </span>+88 xxxxxx5662
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <p>Address</p>
                      <div>Jessore sadar upazila, jessore</div>
                    </div>
                    <div className="flex justify-between">
                      <p>Yearly Income</p>
                      <div>~ 55,000 Tk</div>
                    </div>
                    <div className="flex justify-between">
                      <p>Family member</p>
                      <div>4 person</div>
                    </div>
                    <div className="flex justify-between">
                      <p>Land Size</p>
                      <div>1.2 acre (rent)</div>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                      <p>Farmers Group</p>
                      <div>Chashi 3a</div>
                    </div>
                    <div className="flex justify-between">
                      <p>Group Avg. Score</p>
                      <div className="text-green-700">88</div>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                      <p>Sales Volume (last yr)</p>
                      <div className="text-green-700"> - </div>
                    </div>
                    <div className="flex justify-between">
                      <p>Input purchase</p>
                      <div className="text-green-700"> - </div>
                    </div>
                    <div className="flex justify-between">
                      <p>Recorded harvest</p>
                      <div className="text-green-700"> - </div>
                    </div>
                  </div>
                </div>
              </Card>
              <Card
                title="Loan details"
                className="xl:col-span-4 col-span-12 md:col-span-12 lg:col-span-3"
              >
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p>Type</p>
                    <div className="text-green-700 dark:text-green-200">
                      {" "}
                      Instant Capital{" "}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p>Loan for</p>
                    <div className="text-green-700  dark:text-green-200">
                      Input purchase{" "}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p>Reference Invoice</p>
                    <div className="text-green-700  dark:text-green-200">
                      Order_id#458445645
                    </div>
                  </div>
                  <div className="pt-6">
                    <ol class="relative pl-8 border-l border-gray-200 dark:border-gray-700">
                      {details?.payment_dates?.map((date, index) => (
                        <li class="mb-10 ms-6" key={index}>
                          <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                              />
                            </svg>
                          </span>
                          <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                            BDT 5,000
                            <span class=" ml-3 bg-blue-100 text-blue-800 text-sm font-sm me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                              not paid
                            </span>
                          </h3>
                          <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                            {moment(date).format("LL")}
                          </time>
                          {/* <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                          Get access to over 20+ pages including a dashboard
                          layout, charts, kanban board, calendar, and pre-order
                          E-commerce & Marketing pages.
                        </p> */}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </Card>
            </div>

            {/* <div className="grid xl:grid-cols-3 grid-cols-1 gap-5">
            <Card title="Task list" headerslot={<SelectMonth />}>
              <TaskLists />
            </Card>
            <Card title="Messages" headerslot={<SelectMonth />}>
              <MessageList />
            </Card>
            <Card title="Activity" headerslot={<SelectMonth />}>
              <TrackingParcel />
            </Card>
          </div>
          <div className="grid grid-cols-12 gap-5">
            <div className="xl:col-span-8 lg:col-span-7 col-span-12">
              <Card title="Team members" noborder>
                <TeamTable />
              </Card>
            </div>
            <div className="xl:col-span-4 lg:col-span-5 col-span-12">
              <Card title="Files" headerslot={<SelectMonth />}>
                <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                  {files.map((item, i) => (
                    <li key={i} className="block py-[8px]">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <div className="flex-1 flex space-x-2 rtl:space-x-reverse">
                          <div className="flex-none">
                            <div className="h-8 w-8">
                              <img
                                src={item.img}
                                alt=""
                                className="block w-full h-full object-cover rounded-full border hover:border-white border-transparent"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <span className="block text-slate-600 text-sm dark:text-slate-300">
                              {item.title}
                            </span>
                            <span className="block font-normal text-xs text-slate-500 mt-1">
                              {item.date}
                            </span>
                          </div>
                        </div>
                        <div className="flex-none">
                          <button
                            type="button"
                            className="text-xs text-slate-900 dark:text-white"
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgriFinanceDetails;
