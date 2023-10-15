import React, { useState, useRef } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import { saveAs } from "file-saver";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";

const FormValadtionSchema = yup
  .object({
    // customer_id: yup.string().required(""),
    // payment_id: yup.string().required(""),
    sale_location: yup.string().required("Sold Location is required"),
    sale_amount: yup.string().required("Sale amount is required"),
    quantity: yup.string().required("Quantity is required"),
  })
  .required();

const ViewSource = ({ row }) => {
  // const [amount, setAmount] = useState(row?.cell?.row?.original?.amount);
  const token = localStorage.getItem("hq-token");
  const [showModal, setShowModal] = useState(false);
  const [marketType, setMarketType] = useState("Rich");

  console.log(row?.cell?.row?.original?.source_id);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(!showModal);
  };

  const returnNull = () => {
    return null;
  };

  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  const type_of_market = [
    { value: "Retail Market", label: "Retail Market" },
    { value: "Wholesale Market", label: "Wholesale Market" },
    { value: "Export Market", label: "Export Market" },
    { value: "Market Linkage", label: "Market Linkage" },
  ];

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(FormValadtionSchema),
  });

  // const handleDownloadImage = () => {
  //   let url = `${import.meta.env.VITE_IMG_URL}/${
  //     row?.cell?.row?.original?.receipt
  //   }`;
  //   saveAs(url, `${row?.cell?.row?.original?.distributor?.full_name}`);
  // };

  // const handle_accept = async () => {
  //   if (row?.cell?.row?.original?.status === "approved") {
  //     closeModal();
  //     return Swal.fire(
  //       "Ops!",
  //       "Request Already Accepted, You can't accept it again",
  //       "info"
  //     );
  //   }
  //   try {
  //     const response = await axios.put(
  //       `${import.meta.env.VITE_BASE}/hq/distributor/cash_in_request/${
  //         row?.cell?.row?.original?.receipt_id
  //       }`,
  //       {
  //         status: "approved",
  //         accepted_amount: parseFloat(amount),
  //       },
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     Swal.fire("Success!", "Request Accepted", "success");
  //     closeModal();
  //   } catch (error) {
  //     Swal.fire("Ops!", "Something went wrong", "error");
  //     closeModal();
  //   }
  // };

  // const handle_reject = async () => {
  //   if (row?.cell?.row?.original?.status === "approved") {
  //     closeModal();
  //     return Swal.fire(
  //       "Ops!",
  //       "Request Already Accepted, Once you accept the request you can't reject it",
  //       "info"
  //     );
  //   }
  //   try {
  //     const response = await axios.put(
  //       `${import.meta.env.VITE_BASE}/hq/distributor/cash_in_request/${
  //         row?.cell?.row?.original?.receipt_id
  //       }`,
  //       {
  //         status: "rejected",
  //       },
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (response.statusText === "OK") {
  //       Swal.fire("Ops!", "Request Already Rejected", "info");
  //     } else if (response.statusText === "Created") {
  //       Swal.fire("Success", "Request Rejected", "success");
  //     } else {
  //       Swal.fire("Ops!", "Something went wrong ", "error");
  //     }
  //     closeModal();
  //   } catch (error) {
  //     Swal.fire("Ops!", "Something went wrong", "error");
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE}/hq/source_selling`,
        {
          source_id: row?.cell?.row?.original?.source_id,
          market_type: marketType,
          sell_location: data.sale_location,
          sell_price: parseFloat(data.sale_amount),
          quantity: parseFloat(data.quantity),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        Swal.fire("Success!", "Source Sold", "success");
        reset();
        closeModal();
      } else {
        Swal.fire("Ops!", "Something went wrong", "error");
      }
    } catch (error) {
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div>
      <Modal
        title="Mark Sold"
        label="Mark Sold"
        labelClass="btn-outline-dark"
        uncontrol
        centered
        onClose
        activeModal
        showModal={showModal}
        setShowModal={setShowModal}
        openModal={openModal}
        closeModal={closeModal}
        // footerContent={
        //   <>
        //     {row?.cell?.row?.original?.status === "approved" ? (
        //       <p
        //         onClick={() => toast.error("Already Accepted")}
        //         className="bg-red-500 cursor-pointer text-white p-2 rounded"
        //       >
        //         Already Accepted, You can't accept it again
        //       </p>
        //     ) : (
        //       <div className="space-x-4">
        //         <Button
        //           text="Accept"
        //           className="btn-success "
        //           onClick={handle_accept}
        //         />
        //         <Button
        //           text="Reject"
        //           className="btn-warning "
        //           onClick={handle_reject}
        //         />
        //       </div>
        //     )}
        //   </>
        // }
      >
        {/* <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg mb-3 text-slate-900">Receipt</h4>
          <button
            onClick={handleDownloadImage}
            className="font-medium text-lg mb-3 text-slate-900 bg-green-500  px-4 py-1 rounded-full"
          >
            Download Receipt
          </button>
        </div> */}

        {/* <div className="text-base text-slate-600 dark:text-slate-300">
          <img
            src={`${import.meta.env.VITE_IMG_URL}${
              row?.cell?.row?.original?.receipt
            }`}
            alt="thumb-1"
            className="rounded-md border-4 border-slate-300 w-full h-full"
          />
        </div> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor=" hh" className="form-label ">
                Type of market
              </label>
              <Select
                className="react-select"
                classNamePrefix="select"
                options={type_of_market?.map((market) => ({
                  value: market.value,
                  label: market.label,
                }))}
                onChange={(e) => setMarketType(e.value)}
                styles={styles}
                required
                id="hh"
              />
            </div>
            <Textinput
              name="sale_location"
              label="Sale Location"
              placeholder="Sale Location"
              type="text"
              register={register}
              error={errors.sale_location}
              msgTooltip
            />
            <Textinput
              name="sale_amount"
              label="Sale Amount"
              placeholder="Sale Amount"
              type="number"
              register={register}
              error={errors.sold_location}
              msgTooltip
            />
            <Textinput
              name="quantity"
              label="Quantity"
              placeholder="Quantity"
              type="text"
              register={register}
              error={errors.quantity}
              msgTooltip
            />

            {/* <Textinput
            name="customer_id"
            label="Customer ID"
            placeholder="Customer ID"
            type="text"
            register={register}
            error={errors.customer_id}
            msgTooltip
          />
          <Textinput
            name="payment_id"
            label="Payment ID"
            placeholder="Payment ID"
            type="text"
            register={register}
            error={errors.payment_id}
            msgTooltip
          /> */}
          </div>
          <button
            // disabled={loading}
            type="submit"
            className="btn btn-dark  text-center mt-4"
          >
            {/* {loading ? "Loading..." : "Submit"} */}
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ViewSource;
