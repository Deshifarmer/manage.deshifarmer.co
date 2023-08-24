import React, { useEffect, useRef, useState } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import SingleOrderTable from "@/components/order/SingleOrderTable";
import userDarkMode from "@/hooks/useDarkMode";
import ReactToPrint from "react-to-print";
import "../order/order.css";
import Loading from "@/components/Loading";
import { Link, useParams } from "react-router-dom";

// import images
import MainLogo from "@/assets/images/logo/logo.svg";
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import axios from "axios";

const SingleOrder = () => {
  const [order_details, set_order_details] = useState([]);
  const [details, set_details] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("hq-token");

  const params = useParams();
  const printPage = () => {
    window.print();
  };
  const [isDark] = userDarkMode();

  const dataFetch = async () => {
    try {
      const response = await axios(
        `${import.meta.env.VITE_BASE}/hq/input_order/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set_details(response.data);
      set_order_details(response.data.order_details);
    } catch (error) {}
  };

  console.log(order_details);

  useEffect(() => {
    dataFetch();
  }, []);

  const componentRef = useRef();

  return (
    <>
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
                </div>
              </div>
              <div>
                <span className="block text-slate-900 dark:text-slate-300 font-medium leading-5 text-xl">
                  Bill to:
                </span>

                <div className="text-slate-500 dark:text-slate-300 font-normal leading-5 mt-4 text-sm">
                  {order_details[0]?.farmer_name} <br />
                  {order_details[0]?.delivery_address} <br />
                  <div className="flex space-x-2 mt-2 leading-[1] rtl:space-x-reverse">
                    <Icon icon="heroicons-outline:phone" />
                    <span>+88 {order_details[0]?.delivery_contact}</span>
                  </div>
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
              <SingleOrderTable data={order_details} details={details} />
            </div>
            <div className="py-10 text-center md:text-2xl text-xl font-normal text-slate-600 dark:text-slate-300">
              Thank you for your purchase!
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default SingleOrder;
