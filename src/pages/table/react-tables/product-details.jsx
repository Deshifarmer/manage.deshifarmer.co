import React from "react";
import { useParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import Icon from "../../../components/ui/Icon";
import GroupChart4 from "@/components/partials/widget/chart/group-chart-4";
import DonutChart from "@/components/partials/widget/chart/donut-chart";
import { meets, files } from "@/constant/data";
import SelectMonth from "@/components/partials/SelectMonth";
import TaskLists from "@/components/partials/widget/task-list";
import MessageList from "@/components/partials/widget/message-list";
import TrackingParcel from "@/components/partials/widget/activity";
import TeamTable from "@/components/partials/Table/team-table";
import CalendarView from "@/components/partials/widget/CalendarView";
import Fileinput from "@/components/ui/Fileinput";

import axios from "axios";
// import Icon from "@/components/ui/Icon";
import { useEffect } from "react";
import { useState } from "react";
import Textinput from "../../../components/ui/Textinput";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const token = localStorage.getItem("hq-token");
  const [product_details, setProductDetails] = useState([]);
  console.log(product_details);
  const [show, setShow] = useState(false);
  const [edited_sell_price, set_edited_sell_price] = useState("");
  const [edited_commission, set_edited_commission] = useState({});
  const [edited_product_details, set_edited_product_details] = useState({});
  const [p_name, set_p_name] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [edited_sell_price_company, set_edited_sell_price_company] =
    useState("");
  const [edited_buy_price_company, set_edited_buy_price_company] = useState("");
  const [updatedProductImage, setUpdatedProductImage] = useState(null);

  const hanleUpdatedProductImage = (e) => {
    setUpdatedProductImage(e.target.files[0]);
  };

  const handleEditorChange = (content) => {
    setEditorValue({
      ...edited_product_details,
      description: content,
    });
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE}/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProductDetails(response.data);
      set_edited_sell_price(response.data?.sell_price);
      set_edited_commission({
        hq_commission: response.data?.hq_secret?.hq_commission,
        distributor_commission:
          response.data?.hq_secret?.distributor_commission,
        me_commission: response.data?.hq_secret?.me_commission,
        discount: response.data?.discount,
      });
      set_edited_product_details({
        name: response.data?.name,
        description: response.data?.description,
        sell_price: response.data?.sell_price,
        buy_price_from_company: response.data?.hq_secret?.buy_price_from_company,
        sell_price_from_company: response.data?.sell_price_from_company,
      });
    } catch (error) {}
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const statistics = [
    {
      title: "Hq Commission",
      id: "hq_commission",
      count: product_details?.hq_secret?.hq_commission,
      bg: "bg-info-500",
      text: "text-info-500",
      percent: "25.67% ",
      icon: "heroicons-outline:menu-alt-1",
    },
    {
      title: "Dis Commission ",
      id: "distributor_commission",
      count: product_details?.hq_secret?.distributor_commission,
      bg: "bg-warning-500",
      text: "text-warning-500",
      percent: "8.67%",
      icon: "heroicons-outline:chart-pie",
    },
    {
      title: "ME Commission",
      id: "me_commission",
      count: product_details?.hq_secret?.me_commission,
      bg: "bg-primary-500",
      text: "text-primary-500",
      percent: "1.67%  ",
      icon: "heroicons-outline:clock",
    },
    {
      title: "Discount",
      id: "discount",
      count: product_details?.discount,
      bg: "bg-success-500",
      text: "text-success-500",
      percent: "11.67%  ",
      icon: "heroicons-outline:calculator",
    },
  ];

  const discount = product_details.discount;
  const totalCommossion =
    parseInt(product_details?.hq_secret?.hq_commission) +
    parseInt(product_details?.hq_secret?.distributor_commission) +
    parseInt(product_details?.hq_secret?.me_commission);

  const total_discount_with_commission =
    parseInt(discount) + parseInt(totalCommossion);

  const handleEdit = async (value) => {
    if (
      !edited_commission?.hq_commission &&
      !edited_commission?.distributor_commission &&
      !edited_commission?.me_commission
    ) {
      toast.error("Please Enter Commission");
      return;
    }

    if (value === "active") {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BASE}/hq/product/${id}`,
          {
            status: "active",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          Swal.fire("Success", "Product Active Successful", "success");
        }
      } catch (error) {
        Swal.fire("Ops!", "Error active product", "error");
      }
    } else if (value === "inactive") {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BASE}/hq/product/${id}`,
          {
            status: "inactive",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          Swal.fire("Success", "Product Inactive Successful", "success");
        }
      } catch (error) {
        Swal.fire("Ops!", "Something Went Wrong", "error");
      }
    } else {
      Swal.fire("Ops!", "Something Went Wrong", "error");
    }
  };

  const handle_update = async (value) => {
    if (value === "update") {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE}/hq/product/${id}`,
          {
            sell_price: parseFloat(edited_product_details?.sell_price),
            hq_commission: parseFloat(edited_commission?.hq_commission),
            distributor_commission: parseFloat(
              edited_commission?.distributor_commission
            ),
            me_commission: parseFloat(edited_commission?.me_commission),
            name: edited_product_details?.name,
            description: edited_product_details?.description,
            discount: edited_product_details?.discount
              ? parseInt(edited_product_details?.discount)
              : 0,
            buy_price_from_company: parseFloat(
              edited_product_details?.buy_price_from_company
            ),
            sell_price_from_company: parseFloat(
              edited_product_details?.sell_price_from_company
            ),
            image: updatedProductImage,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          Swal.fire("Success", "Product Updated Successfully", "success");
          setShow(false);
          fetchProductData();
        } else {
          setShow(false);
          Swal.fire("Ops!", "Error Updating Product", "error");
        }
      } catch (error) {
        setShow(false);
        Swal.fire("Ops!", "Error Updating Product", "error");
        console.log(error);
      }
    } else if (value === "edit") {
      setShow(true);
    } else {
      Swal.fire("Ops!", "Something Went Wrong", "error");
    }
  };

  return (
    <div className=" space-y-5">
      <div className="grid grid-cols-12 gap-5">
        <Card className="xl:col-span-3 col-span-12 lg:col-span-5 h-full">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {/* <GroupChart4  /> */}
            <>
              {statistics.map((item, i) => (
                <div
                  key={i}
                  className={`${item.bg} rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-50 text-center`}
                >
                  <div
                    className={`${item.text} mx-auto h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white text-2xl mb-4 `}
                  >
                    <Icon icon={item.icon} />
                  </div>
                  <span className="block text-sm text-slate-600 font-medium dark:text-white mb-1">
                    {item.title}
                  </span>
                  {show ? (
                    <Textinput
                      label=""
                      id="pn"
                      type="text"
                      defaultValue={item.count}
                      placeholder={item.count}
                      // onChange={(e) => {
                      //   return {
                      //     ...edited_commission,
                      //     [item.title]: e.target.value,
                      //   };
                      // }}

                      onChange={(e) => {
                        set_edited_commission({
                          ...edited_commission,
                          [item.id]: e.target.value,
                        });
                      }}
                    />
                  ) : (
                    <span className="block mb- text-2xl text-slate-900 dark:text-white font-medium">
                      {item.count}
                      {"%"}
                    </span>
                  )}
                </div>
              ))}
            </>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-md p-4 mt-4">
            <div className="bg-slate-100 dark:bg-slate-700 rounded px-4 pt-4 pb-1 flex flex-wrap justify-between mt-6">
              <div className="mr-3 mb-3 space-y-2">
                {/* // note  */}

                <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Buy Price from Company
                </div>
                {show ? (
                  <div>
                    <Textinput
                      label=""
                      id="pn"
                      type="text"
                      defaultValue={
                        edited_product_details?.buy_price_from_company
                      }
                      onChange={(e) =>
                        set_edited_product_details({
                          ...edited_product_details,
                          buy_price_from_company: e.target.value,
                        })
                      }
                      placeholder={
                        edited_product_details?.buy_price_from_company
                      }
                    />
                  </div>
                ) : (
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    {product_details?.hq_secret?.buy_price_from_company} tk
                  </div>
                )}
              </div>
              {/* end single */}
              <div className="mr-3 mb-3 space-y-2">
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
                        edited_product_details?.sell_price_from_company
                      }
                      onChange={(e) =>
                        set_edited_product_details({
                          ...edited_product_details,
                          sell_price_from_company: e.target.value,
                        })
                      }
                      placeholder={
                        edited_product_details?.sell_price_from_company
                      }
                    />
                  </div>
                ) : (
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    {edited_product_details?.sell_price_from_company} tk
                  </div>
                )}
              </div>
              {/* end single */}
              <div className="mr-3 mb-3 space-y-2">
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Deshifarmer Sell Price
                </div>

                {show ? (
                  <div>
                    <Textinput
                      label=""
                      id="pn"
                      type="text"
                      defaultValue={edited_product_details?.sell_price}
                      onChange={(e) => {
                        set_edited_product_details({
                          ...edited_product_details,
                          sell_price: e.target.value,
                        });
                      }}
                      placeholder={edited_product_details?.sell_price}
                    />
                  </div>
                ) : (
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    {edited_product_details?.sell_price} tk
                  </div>
                )}
              </div>
              {/* end single */}
              <div className="mr-3 mb-3 space-y-2">
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Created At
                </div>
                <div className="text-xs text-warning-500">01/11/2021</div>
              </div>
              <div className="mr-3 mb-3 space-y-2">
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Product Status
                </div>
                <div className="text-xs text-warning-500 ">
                  {product_details?.status}
                </div>
              </div>
              {/* end single */}
            </div>
            <div className="flex justify-end gap-6">
              <button
                onClick={(e) => handle_update(e.target.value)}
                className="bg-slate-500 text-white mt-2 rounded-md px-4 py-2"
                value={show ? "update" : "edit"}
              >
                {show ? "update" : "Edit"}
              </button>
              <button
                onClick={(e) => handleEdit(e.target.value)}
                value={
                  product_details?.status === "active" ? "inactive" : "active"
                }
                className="bg-slate-500 text-white mt-2 rounded-md px-6 py-2"
              >
                {product_details?.status === "active" ? "Inactive" : "Active"}
              </button>
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
          title={`About ${product_details.name}`}
          className="xl:col-span-5 col-span-12 lg:col-span-7 h-full"
        >
          <div>
            {/* <div>
              {show ? (
                <div>
                  <Textinput
                    label=""
                    id="pn"
                    type="text"
                    onChange={(e) => set_edited_sell_price(e.target.value)}
                    placeholder={product_details?.sell_price}
                  />
                </div>
              ) : (
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  {product_details?.sell_price} tk
                </div>
              )}
            </div> */}
            <div className="text-base font-medium text-slate-800 dark:text-slate-100 mb-3">
              {show ? (
                <div className="">
                  <div className="pb-2">Product Name</div>
                  <div>
                    <Textinput
                      label=""
                      id="pn"
                      type="text"
                      defaultValue={edited_product_details?.name}
                      onChange={(e) => {
                        set_edited_product_details({
                          ...edited_product_details,
                          name: e.target.value,
                        });
                      }}
                      placeholder={product_details?.name}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-base font-medium text-slate-800 dark:text-slate-100 ">
                  <div>Product Name</div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 my-3">
                    {product_details?.name}
                  </p>
                </div>
              )}
            </div>
            <div className="text-base font-medium text-slate-800 dark:text-slate-100 mb-3">
              {show ? (
                <div className="">
                  <div className="pb-2">Description</div>
                  <div>
                    <div>
                      <ReactQuill
                        defaultValue={edited_product_details?.description}
                        onChange={(e) => {
                          set_edited_product_details({
                            ...edited_product_details,
                            description: e,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-base font-medium text-slate-800 dark:text-slate-100 ">
                  <div>Description</div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: product_details?.description,
                    }}
                    className="text-sm text-slate-600 dark:text-slate-300 my-3"
                  >
                    {/* {product_details?.description} */}
                  </p>
                </div>
              )}
            </div>
            {/* <div className="text-base font-medium text-slate-800 dark:text-slate-100 mb-3">
              Description
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: product_details?.description,
              }}
              className="text-sm text-slate-600 dark:text-slate-300"
            >
              {product_details?.description}
            </p> */}
            <br />
            {/* <div className="text-base font-medium text-slate-800 dark:text-slate-100 mb-3">
              Preferred
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {product_details?.preferred}
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
        <Card
          title={`${product_details.name}`}
          className="xl:col-span-4 col-span-12"
        >
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
                        <span className="text-base inline-block mr-1">
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
          {/* <div className="text-base text-slate-600 dark:text-slate-300">
            {product_details?.image && (
              <img
                src={`${import.meta.env.VITE_IMG_URL}/${
                  product_details?.image
                }`}
                alt="thumb-1"
                className="rounded-md border-4 border-slate-300 w-full h-full"
              />
            )}
          </div> */}
          {show ? (
            <Card title="Select You Updated Product Image">
              <Fileinput
                name="basic"
                selectedFile={updatedProductImage}
                onChange={hanleUpdatedProductImage}
                preview
              />
            </Card>
          ) : (
            <div className="text-base text-slate-600 dark:text-slate-300">
              {product_details?.image && (
                <img
                  src={`${import.meta.env.VITE_IMG_URL}/${
                    product_details?.image
                  }`}
                  alt="thumb-1"
                  className="rounded-md border-4 border-slate-300 w-full h-full"
                />
              )}
            </div>
          )}
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
  );
};

export default ProductDetailsPage;
