import React, { useEffect, useRef, useState } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import ReactToPrint from "react-to-print";
import "./order.css";
import { Link, useParams } from "react-router-dom";
// import images
import axios from "axios";
import OrderedItems from "./ordered-items";
import { useGetSingleOrderQuery } from "../../../store/features/orders/api";

const OrderDetails = () => {
  const params = useParams();
  const { data: details, isLoading } = useGetSingleOrderQuery(params?.id);
  const { order_details } = details || {};
  const printPage = () => {
    window.print();
  };
  const componentRef = useRef();

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="lg:flex justify-between flex-wrap items-center mb-6">
            <h4>Order Details</h4>
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

          <Card bodyClass="p-0">
            <div ref={componentRef} className="print-component">
              <div className="flex justify-between flex-wrap space-y-4 px-6 pt-6 bg-slate-50 dark:bg-slate-800 pb-6 rounded-t-md">
                <div className="mt-2.5">
                  <span className="block text-slate-900 dark:text-slate-300 font-medium leading-5 text-xl">
                    Bill From:
                  </span>

                  <div className="text-slate-500 dark:text-slate-300 font-normal leading-5 mt-4 text-sm">
                    Deshifarmer <br />
                    House#37, Baridhara Diplomatic Zone, <br />
                    Dhaka - 1212, Bangladesh
                    <div className="flex space-x-2 mt-2 leading-[1] rtl:space-x-reverse">
                      <Icon icon="heroicons-outline:phone" />
                      <span>+88 01886-327637</span>
                    </div>
                    <div className="mt-[6px] flex space-x-2 leading-[1] rtl:space-x-reverse">
                      <Icon icon="heroicons-outline:mail" />
                      <span>info@deshifarmer.co</span>
                    </div>
                    <div className="mt-[6px] flex space-x-2 leading-[1] rtl:space-x-reverse">
                      <span>Channel Partner :</span>
                      <Link
                        to={`/distributor/${order_details[0]?.distributor_id}`}
                        className="text-blue-700 underline cursor-pointer"
                      >
                        {order_details[0]?.distributor_id}
                      </Link>
                    </div>
                    <div className="mt-[6px] flex space-x-2 leading-[1] rtl:space-x-reverse">
                      <span>Microntrepreneurs :</span>
                      <Link
                        to={`/me-details/${order_details[0]?.me_id}`}
                        className="text-blue-700 underline cursor-pointer"
                      >
                        {order_details[0]?.me_id}
                      </Link>
                    </div>
                    <div className="mt-[6px] flex space-x-2 leading-[1] rtl:space-x-reverse">
                      <span>Farmer :</span>
                      <Link
                        to={`/farmer-details/${order_details[0]?.farmer_id}`}
                        className="text-blue-700 underline cursor-pointer"
                      >
                        {order_details[0]?.farmer_id}
                      </Link>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="block text-slate-900 dark:text-slate-300 font-medium leading-5 text-xl">
                    Bill to:
                  </span>

                  <div className="text-slate-500 dark:text-slate-300 font-normal leading-5 mt-4 text-sm">
                    <p className="mt-1">
                      <span className="font-semibold">Name -</span>{" "}
                      {order_details[0]?.distributor_name}
                    </p>{" "}
                    <p className="mt-1">
                      <span className="font-semibold">Delivery Contact -</span>{" "}
                      <span>+88 {order_details[0]?.delivery_contact}</span>
                    </p>{" "}
                    <p className="mt-1">
                      <span className="font-semibold">Delivery Address -</span>{" "}
                      {order_details[0]?.delivery_address}
                    </p>{" "}
                    <p className="mt-1">
                      <span className="font-semibold">
                        Microntrepreneur Name -
                      </span>{" "}
                      {details?.me_details?.me_name}
                    </p>{" "}
                    <p className="mt-1">
                      <span className="font-semibold">
                        Microntrepreneur Phone -
                      </span>{" "}
                      {details?.me_details?.me_phone}
                    </p>{" "}
                    <p className="mt-1">
                      <span className="font-semibold">Farmer Name -</span>{" "}
                      {details?.farmer_details?.farmer_name}
                    </p>{" "}
                    <p className="mt-1">
                      <span className="font-semibold">Farmer Phone -</span>{" "}
                      {details?.farmer_details?.farmer_phone}
                    </p>{" "}
                  </div>
                </div>
                <div className="space-y-[2px]">
                  <span className="block text-slate-900 dark:text-slate-300 font-medium leading-5 text-xl mb-4">
                    Invoice:
                  </span>
                  <h4 className="text-slate-600 font-medium dark:text-slate-300 text-xs uppercase">
                    Invoice number:
                  </h4>
                  <div className="text-slate-500 dark:text-slate-300 font-normal leading-5 text-sm">
                    #inv-{details?.order_id}
                  </div>
                  <h4 className="text-slate-600 font-medium dark:text-slate-300 text-xs uppercase">
                    date
                  </h4>
                  <div className="text-slate-500 dark:text-slate-300 font-normal leading-5 text-sm">
                    {details?.created_at}
                  </div>
                </div>
              </div>
              <div className="max-w-[980px] mx-auto shadow-base dark:shadow-none my-8 rounded-md overflow-x-auto">
                <OrderedItems
                  data={order_details ? order_details : []}
                  details={details ? details : []}
                />
              </div>
              <div className="py-4 text-center md:text-2xl text-xl font-normal text-slate-600 dark:text-slate-300">
                Thank you for your purchase!
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
