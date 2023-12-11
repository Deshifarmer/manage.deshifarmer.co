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

  const printPage = () => {
    window.print();
  };

  const componentRef = useRef();

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

  const Amount = details?.amount_of_loan;
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
          amount_of_loan: editedAmount,
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
          <div>
            <div className="lg:flex justify-between flex-wrap items-center">
              <h4 className="text-lg">Agri Finance Request Details</h4>
              <div className="flex lg:justify-end items-center flex-wrap space-xy-5">
                {/* <button className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse">
                <span className="text-lg">
                  <Icon icon="heroicons:pencil-square" />
                </span>
                <span>ConFirm</span>
              </button> */}
                {/* <ReactToPrint
                trigger={() => (
                  <button
                    type="button"
                    onClick={printPage}
                    className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse"
                  >
                    <span className="text-lg">
                      <Icon icon="heroicons:printer" />
                    </span>
                    <span>Print</span>
                  </button>
                )}
                content={() => componentRef.current}
              /> */}

                {/* <button className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse">
                <span className="text-lg">
                  <Icon icon="heroicons:arrow-down-tray" />
                </span>
                <span>Download</span>
              </button> */}
                {/* <button className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse">
                <span className="text-lg transform -rotate-45">
                  <Icon icon="heroicons:paper-airplane" />
                </span>
                <span>Send invoice</span>
              </button> */}
              </div>
            </div>

            <Card bodyClass="p-0 space-y-10">
              <div ref={componentRef} className="print-component">
                <div className="flex justify-between flex-wrap space-y-4 px-6 pt-6 bg-slate-50 dark:bg-slate-800 pb-6 rounded-t-md">
                  <div className="mt-2.5">
                    {/* <span className="block text-slate-900 dark:text-slate-300 font-medium leading-5 text-xl">
                    Bill From:
                  </span> */}

                    <div className="text-slate-500 dark:text-slate-300 font-normal leading-5 mt-4 text-sm">
                      <p className="text-xs">Deshifarmer</p>
                      <p className="text-xs">
                        House#37, Baridhara Diplomatic Zone
                      </p>
                      <p className="text-xs">Dhaka - 1212, Bangladesh</p>
                      <div className="flex text-xs space-x-2 mt-2 leading-[1] rtl:space-x-reverse">
                        <Icon icon="heroicons-outline:phone" />
                        <span>+88 01886-327637</span>
                      </div>
                      <div className="mt-[6px] text-xs flex space-x-2 leading-[1] rtl:space-x-reverse">
                        <Icon icon="heroicons-outline:mail" />
                        <span>info@deshifarmer.co</span>
                      </div>
                      <div className=" flex">
                        <div>Amount Of Loan:</div>
                        <div>
                          {" "}
                          {isUpdated ? editedAmount : details.amount_of_loan} ৳
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-[2px]">
                    {/* <span className="block text-slate-900 dark:text-slate-300 font-medium leading-5 text-xl mb-4">
                    Invoice:
                  </span> */}

                    <div className="text-slate-500 text-xs dark:text-slate-300 font-normal leading-5 text-sm">
                      Finance Request ID-{details?.id}
                    </div>
                    <h4 className="text-slate-600 font-medium dark:text-slate-300 text-xs capitalize">
                      date
                    </h4>
                    <div className="text-slate-500 text-xs dark:text-slate-300 font-normal leading-5 text-sm">
                      {moment(details?.updated_at).format("LLLL")}
                    </div>
                  </div>
                  <div>
                    {/* <span className="block text-slate-900 dark:text-slate-300 font-medium leading-5 text-xl">
                    Bill to:
                  </span> */}

                    <div className="text-slate-500 text-xs dark:text-slate-300 font-normal leading-5 mt-4 text-sm">
                      <div className="mt-1 ">
                        <div className="flex gap-2">
                          <span className="font-semibold">Farmer ID -</span>{" "}
                          <Link to={`/farmer-details/{$id}`}>
                            {" "}
                            {details?.which_farmer}
                          </Link>
                        </div>
                      </div>{" "}
                      {/* <p className="mt-1">
                      <span className="font-semibold">Phone No -</span>{" "}
                      {details?.customer_details?.phone_number}
                    </p>{" "}
                    <p className="mt-1">
                      <span className="font-semibold">Address -</span>{" "}
                      {details?.sell_location}
                    </p>{" "} */}
                    </div>
                  </div>

                  {/* <div>
                 
                  <QRCode
                    value={qrCodeValue}
                    size={100}
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                  />
                  <p>Scan the QR code to access the link.</p>
                </div> */}
                </div>
                <div>
                  <table className="w-full border-collapse table-fixed dark:border-slate-700 dark:border">
                    <thead>
                      <tr>
                        <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                          <span className="block px-6 py-5 font-semibold">
                            producing crop
                          </span>
                        </th>

                        <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                          <span className="block px-6 py-5 font-semibold">
                            Purpose of loan
                          </span>
                        </th>
                        <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                          <span className="block px-6 py-5 font-semibold">
                            Amount Of Loan
                          </span>
                        </th>
                        <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                          <span className="block px-6 py-5 font-semibold">
                            Season
                          </span>
                        </th>
                        <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                          <span className="block px-6 py-5 font-semibold">
                            Payment Date
                          </span>
                        </th>

                        <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                          <span className="block px-6 py-5 font-semibold">
                            Status
                          </span>
                        </th>
                        <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                          <span className="block px-6 py-5 font-semibold">
                            Action
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100 dark:border-slate-700">
                        <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                          {details?.producing_crop}
                        </td>
                        <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                          {details?.purpose_of_loan}{" "}
                        </td>
                        <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left  py-4">
                          {show ? (
                            <input
                              type="number"
                              value={editedAmount}
                              onChange={(e) => setEditedAmount(e.target.value)}
                              className="w-full border border-slate-300  dark:bg-slate-500 bg-black-50 rounded-md p-2 text-black-900 dark:text-slate-300"
                            />
                          ) : (
                            <span className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                              {isUpdated
                                ? editedAmount
                                : details.amount_of_loan}{" "}
                              ৳
                            </span>
                          )}
                        </td>
                        <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                          {details?.season}
                        </td>
                        {details?.payment_dates?.map((date, index) => (
                          <tr className=" mt-2" key={index}>
                            <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-2">
                              {date}
                            </td>
                          </tr>
                        ))}
                        <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                          {status || details?.status}
                        </td>
                        <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                          <div className=" justify-center items-center text-center gap-4 ">
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
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="md:flex px-6 py-6 items-center">
                    <div className="flex-1 text-slate-500 dark:text-slate-300 text-sm">
                      System Generated Invoice.
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgriFinanceDetails;
