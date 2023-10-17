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
import { useGetSalesCustomerQuery } from "../../../store/features/agri-output/api";

const FormValadtionSchema = yup
  .object({
    // customer_id: yup.string().required(""),
    // payment_id: yup.string().required(""),
    sale_location: yup.string().required("Sold Location is required"),
    sale_amount: yup.string().required("Sale amount is required"),
    quantity: yup.string().required("Quantity is required"),
    // phone_number: yup.string().required("Phone number is required"),
    // name: yup.string().required("Customer name is required"),
  })
  .required();

const ViewSource = ({ row }) => {
  // const [amount, setAmount] = useState(row?.cell?.row?.original?.amount);
  const token = localStorage.getItem("hq-token");
  const [showModal, setShowModal] = useState(false);
  const [marketType, setMarketType] = useState("");
  const [customerId, setCustomerId] = useState(null);
  const [newCustomer, setNewCustomer] = useState({ name: "", phoneNumber: "" });
  const [showNewCustomerFields, setShowNewCustomerFields] = useState(false);

  const {
    data: sales_customers,
    isLoading,
    isFetching,
  } = useGetSalesCustomerQuery();

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

  const handleSelectChange = (selectedOption) => {
    setCustomerId(selectedOption.value);

    // Check if "Add New Customer" option is selected
    if (selectedOption.value === "addNewCustomer") {
      setShowNewCustomerFields(true);
    } else {
      setShowNewCustomerFields(false);
    }
  };

  const handleNewCustomerNameChange = (e) => {
    setNewCustomer({ ...newCustomer, name: e.target.value });
  };

  const handleNewCustomerPhoneNumberChange = (e) => {
    setNewCustomer({ ...newCustomer, phoneNumber: e.target.value });
  };

  const onSubmit = async (data) => {
    try {
      let postData = {
        source_id: row?.cell?.row?.original?.source_id,
        market_type: marketType,
        sell_location: data.sale_location,
        sell_price: parseFloat(data.sale_amount),
        quantity: parseFloat(data.quantity),
      };

      if (customerId === "addNewCustomer") {
        postData = {
          ...postData,
          name: data.name,
          phone_number: data.phone_number,
        };
      } else {
        postData = {
          ...postData,
          customer_id: customerId,
        };
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE}/hq/source_selling`,
        postData,
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
        // toast.error(error.response.data.error);
        Swal.fire("Ops!", `${error.response.data.error}`, "error");
        closeModal();
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
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6 space-y-4">
            <div>
              <div>
                <label htmlFor=" hh" className="form-label ">
                  Select Customer
                </label>
                {isLoading ? (
                  "Loading"
                ) : (
                  <Select
                    className="react-select capitalize"
                    classNamePrefix="select"
                    options={[
                      {
                        value: "addNewCustomer",
                        label: "Add New Customer",
                      },
                      ...sales_customers?.map((customer) => ({
                        value: customer?.customer_id,
                        label: `${customer?.name} - ${customer?.phone_number}`,
                      })),
                    ]}
                    onChange={handleSelectChange}
                    // isSearchable
                    styles={styles}
                    required
                    id="hh"
                  />
                )}
              </div>
            </div>
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
              type="number"
              register={register}
              error={errors.quantity}
              msgTooltip
            />

            {showNewCustomerFields && (
              <div className="space-y-4">
                <Textinput
                  name="name"
                  label="Customer Name"
                  placeholder="Customer Name"
                  type="text"
                  register={register}
                  // error={errors.name}
                  msgTooltip
                />
                <Textinput
                  name="phone_number"
                  label="Phone Number"
                  placeholder="Phone Number"
                  type="text"
                  register={register}
                  // error={errors.phone_number}
                  msgTooltip
                />
              </div>
            )}
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
