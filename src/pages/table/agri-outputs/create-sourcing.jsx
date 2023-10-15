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
import Card from "../../../components/ui/Card";

const FormValadtionSchema = yup
  .object({
    // customer_id: yup.string().required(""),
    // payment_id: yup.string().required(""),
    sale_location: yup.string().required("Sold Location is required"),
    sale_amount: yup.string().required("Sale amount is required"),
    quantity: yup.string().required("Quantity is required"),
  })
  .required();

const CreateSourcing = () => {
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
      <Card title="Create Source">
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
      </Card>
    </div>
  );
};

export default CreateSourcing;
