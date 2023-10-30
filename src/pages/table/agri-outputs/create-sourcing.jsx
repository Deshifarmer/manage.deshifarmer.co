import React, { useState, useRef, useEffect } from "react";
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
import Textarea from "../../../components/ui/Textarea";
import { useGetAllFarmersQuery } from "../../../store/features/farmers/api";

const FormValadtionSchema = yup
  .object({
    // customer_id: yup.string().required(""),
    // payment_id: yup.string().required(""),
  })
  .required();

const CreateSourcing = () => {
  const [searchValue, setSearchValue] = useState("");
  const token = localStorage.getItem("hq-token");
  const [divisions, setDivisions] = useState([]);
  const [divisionId, setDivisionId] = useState("");
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [upazilaId, setUpazilaId] = useState("");
  const [unit, setUnit] = useState("");
  const [all_farmers, setAllFarmers] = useState([]);
  const [farmerId, setFarmerId] = useState("");
  const [productName, setProductName] = useState("");
  const [all_crops, set_all_crops] = useState([]);
  const [all_unit, set_all_uint] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetch_locations = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE}/division`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDivisions(res.data);
    } catch (error) {}
  };

  const fetchFarmers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE}/hq/farmer_search?search=${searchValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllFarmers(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCrops = async () => {
    try {
      const response = await axios.get(
        `https://server.krishibebsha.com/api/v1/product`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set_all_crops(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUnit = async () => {
    try {
      const response = await axios.get(
        `https://server.krishibebsha.com/api/v1/unit`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set_all_uint(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch_locations();
    // fetchFarmers();
    getCrops();
    getUnit();

    fetch(
      `${import.meta.env.VITE_BASE}/division/${divisionId ? divisionId : 1}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data.districts);
        const upazila = data?.districts
          ?.filter((district) => district.id == districtId)
          .map((district) => district.upazila);
        setUpazilas(upazila);
      });
  }, [divisionId, districtId]);
  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(FormValadtionSchema),
  });

  const onSubmit = async (data) => {
    const postData = {
      which_farmer: farmerId?.farmer_id,
      product_name: productName,
      variety: data.variety ? data.variety : "", // if variety is not then dont send
      quantity: parseInt(data.quantity),
      unit: unit,
      buy_price: parseFloat(data?.price),
      source_location: upazilaId,
      description: data.note,
    };

    if (!data.variety) {
      delete postData.variety;
    }

    if (!data.note) {
      delete postData.description;
    }
    try {
      setSubmitting(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE}/hq/sourcing`,
        {
          which_farmer: farmerId?.farmer_id,
          product_name: productName,
          variety: data.variety, // if variety is not then dont send
          quantity: parseInt(data.quantity),
          unit: unit,
          buy_price: parseFloat(data?.price),
          source_location: upazilaId,
          description: data.note,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        Swal.fire("Success!", "Source Added", "success");
        reset();
        // closeModal();
        setSubmitting(false);
      } else {
        Swal.fire("Ops!", "Something went wrong", "error");
        setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

  const handleSearchFarmer = async (e) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE}/hq/farmer_search?search=${e}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllFarmers(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card title="Create Source">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6 space-y-4">
            <p>Selected Farmer : {farmerId?.full_name}</p>
            <div>
              <Textinput
                name="farmer_id"
                label="Select Farmer"
                placeholder="Select Farmer"
                type="text"
                register={register}
                // error={errors.nid_no}
                onChange={(e) => {
                  handleSearchFarmer(e.target.value);
                  setOpenSearch(true);
                }}
                msgTooltip
              />
              {openSearch && (
                <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                  {all_farmers?.map((farmer) => (
                    <div
                      key={farmer.farmer_id}
                      onClick={() => {
                        setFarmerId(farmer);
                        setOpenSearch(false);
                      }}
                      className="cursor-pointer"
                    >
                      <p className="border text-sm p-2">
                        {farmer.full_name} - {farmer.phone}{" "}
                        {farmer.usaid_id && `-${farmer.usaid_id}`}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label htmlFor=" hh" className="form-label ">
                Select Crop
              </label>
              <Select
                className="react-select"
                classNamePrefix="select"
                // defaultValue={farmer_type[0]}
                options={all_crops.map((crop) => ({
                  value: crop.name,
                  label: crop.name,
                }))}
                onChange={(e) => setProductName(e.value)}
                styles={styles}
                id="hh"
              />
            </div>
            <Textinput
              name="variety"
              label="Variety"
              placeholder="Variety"
              type=""
              register={register}
              // error={errors.nid_no}
              msgTooltip
            />
            <Textinput
              name="quantity"
              label="Quantity"
              placeholder="Quantity"
              type="number"
              register={register}
              // error={errors.nid_no}
              msgTooltip
            />
            <div>
              <label htmlFor=" hh" className="form-label ">
                Unit
              </label>
              <Select
                className="react-select"
                classNamePrefix="select"
                // defaultValue={farmer_type[0]}
                options={all_unit.map((unit) => ({
                  value: unit.unit,
                  label: unit.unit,
                }))}
                onChange={(e) => setUnit(e.value)}
                styles={styles}
                id="hh"
              />
            </div>
            <Textinput
              name="price"
              label="Df Buy Price"
              placeholder="Df Buy Price"
              type="number"
              register={register}
              // error={errors.nid_no}
              msgTooltip
            />
            <div>
              <label htmlFor=" hh" className="form-label ">
                Division
              </label>
              <Select
                className="react-select"
                classNamePrefix="select"
                //   defaultValue={furits[0]}
                options={divisions.map((division) => ({
                  value: division.id,
                  label: division.name,
                }))}
                onChange={(e) => setDivisionId(e.value)}
                styles={styles}
                id="hh"
              />
            </div>
            <div>
              <label htmlFor=" hh" className="form-label ">
                District
              </label>
              <Select
                className="react-select"
                classNamePrefix="select"
                //   defaultValue={furits[0]}
                options={districts?.map((district) => ({
                  value: district.id,
                  label: district.name,
                }))}
                onChange={(e) => setDistrictId(e.value)}
                styles={styles}
                id="hh"
              />
            </div>
            <div>
              <label htmlFor=" hh" className="form-label ">
                Upazilla
              </label>
              <Select
                className="react-select"
                classNamePrefix="select"
                // defaultValue={furits[0]}
                options={
                  upazilas &&
                  upazilas[0]?.map((upazila) => ({
                    value: upazila.id.toString(),
                    label: upazila.name,
                  }))
                }
                onChange={(e) => setUpazilaId(e.value)}
                styles={styles}
                id="hh"
              />
            </div>
            <Textarea
              name="note"
              label="Note"
              placeholder="Note"
              type="text"
              register={register}
              // error={errors.nid_no}
              msgTooltip
            />
          </div>
          <button
            // disabled={loading}
            type="submit"
            className="btn btn-dark  text-center mt-4"
          >
            {/* {loading ? "Loading..." : "Submit"} */}
            {submitting ? "Loading..." : "Submit"}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default CreateSourcing;
