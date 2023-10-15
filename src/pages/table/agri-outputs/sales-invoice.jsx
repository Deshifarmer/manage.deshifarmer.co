import React, { useRef } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import ReactToPrint from "react-to-print";
import "./style.css";
import { Link, useParams } from "react-router-dom";

// import images
import { useGetSingleOrderQuery } from "../../../store/features/orders/api";
import { useGetSalesInvoiceDetailsQuery } from "../../../store/features/agri-output/api";
import moment from "moment";
// import OrderTrack from "./order-track";

const SalesInvoice = () => {
  const params = useParams();
  const { data: details, isLoading } = useGetSalesInvoiceDetailsQuery(
    params?.id
  );

  console.log("details", details);
  const { order_details, status } = details || {};
  const printPage = () => {
    window.print();
  };

  const componentRef = useRef();

  return (
    <div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="lg:flex justify-between flex-wrap items-center">
              <h4 className="text-lg">Order Details</h4>
              <div className="flex lg:justify-end items-center flex-wrap space-xy-5">
                <button className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse">
                  <span className="text-lg">
                    <Icon icon="heroicons:pencil-square" />
                  </span>
                  <span>Edit</span>
                </button>
                <ReactToPrint
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
                />

                <button className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse">
                  <span className="text-lg">
                    <Icon icon="heroicons:arrow-down-tray" />
                  </span>
                  <span>Download</span>
                </button>
                <button className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse">
                  <span className="text-lg transform -rotate-45">
                    <Icon icon="heroicons:paper-airplane" />
                  </span>
                  <span>Send invoice</span>
                </button>
              </div>
            </div>

            <Card bodyClass="p-0 space-y-10">
              <div ref={componentRef} className="print-component">
                <div className="flex justify-between flex-wrap space-y-4 px-6 pt-6 bg-slate-50 dark:bg-slate-800 pb-6 rounded-t-md">
                  <div className="mt-2.5">
                    <span className="block text-slate-900 dark:text-slate-300 font-medium leading-5 text-xl">
                      Bill From:
                    </span>

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
                    </div>
                  </div>
                  <div className="space-y-[2px]">
                    <span className="block text-slate-900 dark:text-slate-300 font-medium leading-5 text-xl mb-4">
                      Invoice:
                    </span>

                    <div className="text-slate-500 text-xs dark:text-slate-300 font-normal leading-5 text-sm">
                      #inv-{details?.source_id}-{details?.id}
                    </div>
                    <h4 className="text-slate-600 font-medium dark:text-slate-300 text-xs capitalize">
                      date
                    </h4>
                    <div className="text-slate-500 text-xs dark:text-slate-300 font-normal leading-5 text-sm">
                      {moment(details?.updated_at).format("LLLL")}
                    </div>
                  </div>
                  <div>
                    <span className="block text-slate-900 dark:text-slate-300 font-medium leading-5 text-xl">
                      Bill to:
                    </span>

                    <div className="text-slate-500 text-xs dark:text-slate-300 font-normal leading-5 mt-4 text-sm">
                      <p className="mt-1 ">
                        <div className="flex gap-2">
                          <span className="font-semibold">Customer Name -</span>{" "}
                          <p>
                            {details?.customer_name
                              ? details?.customer_name
                              : ""}
                          </p>
                          <p>
                            {details?.customer_id ? details?.customer_id : ""}
                          </p>
                        </div>
                      </p>{" "}
                      <p className="mt-1">
                        <span className="font-semibold">Phone No -</span>{" "}
                        {details?.customer_phone}
                      </p>{" "}
                      <p className="mt-1">
                        <span className="font-semibold">Address -</span>{" "}
                        {details?.sell_location}
                      </p>{" "}
                    </div>
                  </div>
                </div>
                <div>
                  <table className="w-full border-collapse table-fixed dark:border-slate-700 dark:border">
                    <thead>
                      <tr>
                        <th
                          colSpan={3}
                          className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left"
                        >
                          <span className="block px-6 py-5 font-semibold">
                            Name
                          </span>
                        </th>
                        <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                          <span className="block px-6 py-5 font-semibold">
                            Quantity
                          </span>
                        </th>
                        <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                          <span className="block px-6 py-5 font-semibold">
                            Price
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100 dark:border-slate-700">
                        <td
                          colSpan={3}
                          className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4"
                        >
                          {details?.source_details?.product_name}
                        </td>
                        <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                          {details?.quantity} {details?.source_details?.unit}
                        </td>
                        <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                          {details?.sell_price} ৳
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

export default SalesInvoice;
