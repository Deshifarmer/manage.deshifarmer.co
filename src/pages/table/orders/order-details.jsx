import React, { useEffect, useRef, useState } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import ReactToPrint from "react-to-print";
import "./order.css";
import { Link, useParams } from "react-router-dom";
// import images
import OrderedItems from "./ordered-items";
import { useGetSingleOrderQuery } from "../../../store/features/orders/api";
import OrderTrack from "./order-track";

const OrderDetails = () => {
  const params = useParams();
  const { data: details, isLoading } = useGetSingleOrderQuery(params?.id);
  const { order_details, status } = details || {};
  const printPage = () => {
    window.print();
  };
  const componentRef = useRef();



  return (
    <div>
      <div className="my-10">
        <OrderTrack status={status} />
      </div>
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
                      #inv-{details?.order_id}
                    </div>
                    <h4 className="text-slate-600 font-medium dark:text-slate-300 text-xs uppercase">
                      date
                    </h4>
                    <div className="text-slate-500 text-xs dark:text-slate-300 font-normal leading-5 text-sm">
                      {details?.created_at}
                    </div>
                  </div>
                  <div>
                    <span className="block text-slate-900 dark:text-slate-300 font-medium leading-5 text-xl">
                      Bill to:
                    </span>

                    <div className="text-slate-500 text-xs dark:text-slate-300 font-normal leading-5 mt-4 text-sm">
                      <p className="mt-1 ">
                        <div className="flex gap-2">
                          <span className="font-semibold">Name -</span>{" "}
                          <p>{order_details[0]?.distributor_name}</p>
                          <p>
                            <Link
                              to={`/distributor/${order_details[0]?.distributor_id}`}
                              className="text-blue-700 underline cursor-pointer"
                            >
                              #{order_details[0]?.distributor_id}
                            </Link>
                          </p>
                        </div>
                      </p>{" "}
                      <p className="mt-1">
                        <span className="font-semibold">
                          Delivery Contact -
                        </span>{" "}
                        <span>+88 {order_details[0]?.delivery_contact}</span>
                      </p>{" "}
                      <p className="mt-1">
                        <span className="font-semibold">
                          Delivery Address -
                        </span>{" "}
                        {order_details[0]?.delivery_address}
                      </p>{" "}
                      <p className="mt-1">
                        <div className="flex gap-2">
                          <span className="font-semibold">
                            Microntrepreneur Name -
                          </span>{" "}
                          <p>{details?.me_details?.me_name}</p>
                          <p>
                            <Link
                              to={`/me-details/${order_details[0]?.me_id}`}
                              className="text-blue-700 underline cursor-pointer"
                            >
                              #{order_details[0]?.me_id}
                            </Link>
                          </p>
                        </div>
                      </p>{" "}
                      <p className="mt-1">
                        <span className="font-semibold">
                          Microntrepreneur Phone -
                        </span>{" "}
                        {details?.me_details?.me_phone}
                      </p>{" "}
                      <p className="mt-1">
                        <div className="flex gap-2">
                          <span className="font-semibold">Farmer Name -</span>{" "}
                          <p>{details?.farmer_details?.farmer_name}</p>
                          <p>
                            <Link
                              to={`/farmer-details/${order_details[0]?.farmer_id}`}
                              className="text-blue-700 underline cursor-pointer"
                            >
                              #{order_details[0]?.farmer_id}
                            </Link>
                          </p>
                        </div>
                      </p>{" "}
                      <p className="mt-1">
                        <span className="font-semibold">Farmer Phone -</span>{" "}
                        {details?.farmer_details?.farmer_phone}
                      </p>{" "}
                    </div>
                  </div>
                </div>
                <div className="max-w-[980px] mx-auto shadow-base dark:shadow-none my-8 rounded-md overflow-x-auto">
                  <OrderedItems
                    data={order_details ? order_details : []}
                    details={details ? details : []}
                  />
                </div>
                <div className="py-6 text-center md:text-2xl text-xl font-normal text-slate-600 dark:text-slate-300">
                  Thank you for your purchase!
                </div>
                <div className="py-6 text-center md:text-xs text-xl font-normal text-slate-600 dark:text-slate-300">
                  This is a system generated invoice. All rights reserved
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
