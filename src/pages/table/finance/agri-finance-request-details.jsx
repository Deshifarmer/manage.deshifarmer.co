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
      title: "Payment Schedule",
      id: "payment_schedule",
      count: details?.payment_schedule,
      bg: "bg-lime-500",
      text: "text-success-500",
      icon: "heroicons-outline:calculator",
    },
  ];
const which_farmer = details?.which_farmer
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
                          className={`${item.text} mx-auto h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white text-sm mb-4 `}
                        >
                          <Icon icon={item.icon} />
                        </div>
                        <span className="block text-sm text-slate-600 font-medium dark:text-white mb-1">
                          {item.title}
                        </span>

                        <span className="block mb-  text-slate-900 dark:text-white  text-sm ">
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
                      <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                        Amount Of Loan
                      </div>
                      <div className="text-xs text-warning-500">
                        {" "}
                     {details?.amount_of_loan} ৳
                      </div>
                    </div>

                      <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      DF Approved Loan

                      </div>
                      {show ? (
                        <input
                          type="number"
                          value={editedAmount}
                          onChange={(e) => setEditedAmount(e.target.value)}
                          className="w-full border border-slate-300  dark:bg-slate-500 bg-black-50 rounded-md p-2 text-black-900 dark:text-slate-300"
                        />
                      ) : (
                        <span className=" text-warning-500 text-sm  font-normal   py-4">
                          {isUpdated ? editedAmount : details.df_approved_loan} ৳
                        </span>
                      )}
                    </div>
                    {/* end single */}
                    {/* <div className="mr-3 mb-3 space-y-2">
                    <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      Sell Price from Company
                    </div>
                    {show ? (
                      <div>
                        <Textinput
                          label=""
                          id="pn"
                          type="text"
                          defaultValue={
                            edited_details?.sell_price_from_company
                          }
                          onChange={(e) =>
                            set_edited_details({
                              ...edited_details,
                              sell_price_from_company: e.target.value,
                            })
                          }
                          placeholder={
                            edited_details?.sell_price_from_company
                          }
                        />
                      </div>
                    ) : (
                      <div className="text-xs text-slate-600 dark:text-slate-300">
                        {edited_details?.sell_price_from_company} tk
                      </div>
                    )}
                  </div> */}
                    {/* end single */}
                    {/* <div className="mr-3 mb-3 space-y-2">
                    <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      Deshifarmer Sell Price
                    </div>
    
                    {show ? (
                      <div>
                        <Textinput
                          label=""
                          id="pn"
                          type="text"
                          defaultValue={edited_details?.sell_price}
                          onChange={(e) => {
                            set_edited_details({
                              ...edited_details,
                              sell_price: e.target.value,
                            });
                          }}
                          placeholder={edited_details?.sell_price}
                        />
                      </div>
                    ) : (
                      <div className="text-xs text-slate-600 dark:text-slate-300">
                        {edited_details?.sell_price} tk
                      </div>
                    )}
                  </div> */}
                    {/* end single */}
                    <div className="mr-3 mb-3 space-y-2">
                      <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                        Created At
                      </div>
                      <div className="text-xs text-warning-500">
                        {" "}
                        {moment(details?.updated_at).format("LLLL")}
                      </div>
                    </div>

                    <div className="mr-3 mb-3 space-y-2">
                      <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                        Status
                      </div>
                      <div className="text-xs font-bold text-warning-500 ">
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
                  {/* <DonutChart
                  discount={discount}
                  totalCommossion={totalCommossion}
                  total_discount_with_commission={total_discount_with_commission}
                /> */}
                </div>
              </Card>
              {/* end single column*/}
              <Card
                title={`About Farmer`}
                className="xl:col-span-4 col-span-12 lg:col-span-4 md:col-span-12 h-full"
              >
                <div className="  dark:bg-slate-700  p-3 rounded-md">
                  <div className="text-sm font-medium text-slate-800 dark:text-slate-100 mb-3 ">
                    <div className="text-sm font-medium text-slate-800 dark:text-slate-100 ">
                      <div>Farmer ID</div>
                      <p className="text-sm text-slate-600 dark:text-orange-300 my-3">
                        <Link to={`/farmer-details/${which_farmer}`}>
                          {details?.which_farmer}
                        </Link>
                      </p>
                    </div>
                    <div className="text-sm font-medium text-slate-800 dark:text-slate-100 ">
                      <div>Farmer Name</div>
                      <p className="text-sm text-slate-600 dark:text-orange-300 my-3">
                        Nadiea
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-slate-800 dark:text-slate-300 mb-3">
                    <div className="text-sm font-medium text-slate-800 dark:text-slate-300 ">
                      <div>Location</div>
                      <p className="text-sm text-slate-600 dark:text-orange-300 my-3">
                        Dhamrai
                      </p>
                    </div>
                  </div>
                  {/* <div className="text-sm font-medium text-slate-800 dark:text-slate-100 mb-3">
                  Description
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: details?.description,
                  }}
                  className="text-sm text-slate-600 dark:text-slate-300"
                >
                  {details?.description}
                </p> */}
                  <br />
                  {/* <div className="text-sm font-medium text-slate-800 dark:text-slate-100 mb-3">
                  Preferred
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {details?.preferred}
                </p> */}
                  {/* <div className="flex flex-wrap mt-8">
                  <div className="xl:mr-8 mr-4 mb-3 space-y-1">
                    <div className="font-semibold text-slate-500 dark:text-slate-400">
                      Existing website
                    </div>
                    <div className="flex items-center space-x-2 text-xs font-normal text-primary-600 dark:text-slate-300 rtl:space-x-reverse">
                      <Icon icon="heroicons:link" />
                      <a href="#">www.example.com</a>
                    </div>
                  </div>
                  <div className="xl:mr-8 mr-4 mb-3 space-y-1">
                    <div className="font-semibold text-slate-500 dark:text-slate-400">
                      Project brief
                    </div>
                    <div className="flex items-center space-x-2 text-xs font-normal text-primary-600 dark:text-slate-300 rtl:space-x-reverse">
                      <Icon icon="heroicons:link" />
                      <a href="#">www.example.com</a>
                    </div>
                  </div>
                </div> */}
                  {/* end flex */}
                </div>
              </Card>
              <Card className="xl:col-span-4 col-span-12 md:col-span-12 lg:col-span-3">
                {/* <div className="-mx-6 custom-calender mb-6">
                <CalendarView />
              </div>
              <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                {meets.slice(0, 3).map((item, i) => (
                  <li key={i} className="block py-[10px]">
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
                          <span className="block text-slate-600 text-sm dark:text-slate-300 mb-1 font-medium">
                            {item.title}
                          </span>
                          <span className="flex font-normal text-xs dark:text-slate-400 text-slate-500">
                            <span className="text-sm inline-block mr-1">
                              <Icon icon="heroicons-outline:video-camera" />
                            </span>
                            {item.meet}
                          </span>
                        </div>
                      </div>
                      <div className="flex-none">
                        <span className="block text-xs text-slate-600 dark:text-slate-400">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul> */}
                {/* <div className="text-sm text-slate-600 dark:text-slate-300">
                {details?.image && (
                  <img
                    src={`${import.meta.env.VITE_IMG_URL}/${
                      details?.image
                    }`}
                    alt="thumb-1"
                    className="rounded-md border-4 border-slate-300 w-full h-full"
                  />
                )}
              </div> */}

                <Card title="Payment Dates">
                  {details?.payment_dates?.map((date, index) => (
                    <tr className=" mt-2" key={index}>
                      <td className="text-slate-900 dark:text-slate-300 text-sm  border font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-2">
                        {date}
                      </td>
                    </tr>
                  ))}
                </Card>

                <div className="text-sm text-slate-600 dark:text-slate-300">
                  {details?.image && (
                    <img
                      src={`${import.meta.env.VITE_IMG_URL}/${details?.image}`}
                      alt="thumb-1"
                      className="rounded-md border-4 border-slate-300 w-full h-full"
                    />
                  )}
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
