import Card from "../../components/ui/Card";
import Textinput from "../../components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

import uploadSvgImage from "@/assets/images/svg/upload.svg";
import Swal from "sweetalert2";
import Fileinput from "../../components/ui/Fileinput";

// note => form validation schema
const FormValadtionSchema = yup
  .object({
    // nid_no: yup.string().required("Nid no is Required"),
    // first_name: yup.string().required("First Name is Required"),
    // last_name: yup.string().required("Last Name is Required"),
    // phone_no: yup.string().required("Phone Number is Required"),
    // gender: yup.string().required("Gender is Required"),
    // date_of_birth: yup.string().required("Date of Birth is Required"),
    // address: yup.string().required("Address is Required"),
    // village: yup.string().required("Village is Required"),
    // upazila: yup.string().required("Upazila is Required"),
    // district: yup.string().required("District is Required"),
    // division: yup.string().required("Division is Required"),
    // credit_score: yup.string().required("Credit Score is Required"),
    // land_status: yup.string().required("Land Status is Required"),
    // family_member: yup.string().required("Family Member is Required"),
    // number_of_children: yup.string().required("Number of Children is Required"),
    // yearly_income: yup.string().required("Yearly Income is Required"),
    // year_of_stay_in: yup.string().required("Year of Stay In is Required"),
    // farmer_role: yup.string().required("Farmer Role is Required"),
  })
  .required();

const AddProduct = () => {
  const [files, setFiles] = useState(null);
  const [categories, setCategory] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [category_id, setCategory_id] = useState("");
  const [company_id, setCompany_id] = useState("");
  const token = localStorage.getItem("hq-token");
  const [units, setUnits] = useState([]);
  const [unit_id, setUnit_id] = useState(null);
  const [loading, setLoading] = useState(false);

  // note => dropzone

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  // note => useForm hook

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValadtionSchema),
  });

  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  const fetch_category = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE}/all_category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetch_unit = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE}/unit`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUnits(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch_category();
    fetch_unit();
  }, []);

  console.log(unit_id);

  const onSubmit = async (data) => {
    // only accet jpg, png, jpeg
    if (
      files.type !== "image/jpg" &&
      files.type !== "image/png" &&
      files.type !== "image/jpeg"
    ) {
      toast.error("Only jpg, png, jpeg are allowed");
      return;
    }

    console.log(data);
    const formData = new FormData();
    formData.append("image", files);
    formData.append("name", data.name);
    formData.append("category_id", parseInt(category_id));
    formData.append("description", data.description);
    formData.append("preferred", data.prefered);
    // formData.append("sell_price", parseFloat(data.sell_price));
    formData.append("discount", parseFloat(data.discount));
    formData.append("hq_commission", parseFloat(data.hq_commission));
    formData.append("me_commission", parseFloat(data.me_commission));
    formData.append("unit", parseInt(unit_id));
    formData.append(
      "distributor_commission",
      parseFloat(data.distributer_commission)
    );
    formData.append(
      "buy_price_from_company",
      parseFloat(data.buy_price_from_company)
    );
    formData.append(
      "sell_price_from_company",
      parseFloat(data.sell_price_from_company)
    );
    formData.append("status", "active");
    formData.append("company_id", company_id);

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE}/add_product`,
        formData,
        {
          headers: {
            Accept: "application/json",
            ContentType: "multipart/form-data", // note => for image upload
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      Swal.fire("Success", "Product Added Successfully", "success");
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("Ops!", "Something went wrong", "error");
      // error.response.data.errors.map((err) => toast.error(err));
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE}/all_company`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      setCompanies(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProductImage = (e) => {
    setFiles(e.target.files[0]);
  };

  return (
    <div>
      <Card title="Add Product">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          {/*// note => Image Upload */}
          {/* <div className="xl:col-span-2 col-span-1 cursor-pointer">
            <Card title="Upload Image">
              <div className="w-full text-center border-dashed border border-secondary-500 rounded-md py-[52px] flex flex-col justify-center items-center">
                {files.length === 0 && (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input className="hidden" {...getInputProps()} />
                    <img src={uploadSvgImage} alt="" className="mx-auto mb-4" />
                    {isDragAccept ? (
                      <p className="text-sm text-slate-500 dark:text-slate-300 ">
                        Drop the files here ...
                      </p>
                    ) : (
                      <p className="text-sm text-slate-500 dark:text-slate-300 f">
                        Drop files here or click to upload.
                      </p>
                    )}
                  </div>
                )}
                <div className="flex space-x-4">
                  {files.map((file, i) => (
                    <div key={i} className="mb-4 flex-none">
                      <div className="h-[300px] w-[300px] mx-auto mt-6 rounded-md">
                        <img
                          src={file.preview}
                          className=" object-contain h-full w-full block rounded-md"
                          onLoad={() => {
                            URL.revokeObjectURL(file.preview);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div> */}
          <div>
            <label htmlFor="bio-data" className="form-label ">
              Product Image
            </label>
            <Fileinput
              name="image"
              selectedFile={files}
              onChange={handleProductImage}
              preview
            />
          </div>
          <div>
            <label htmlFor=" hh" className="form-label ">
              Category
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              // defaultValue={farmer_type[0]}
              options={categories.map((type) => ({
                value: type.id,
                label: type.title,
              }))}
              onChange={(e) => setCategory_id(e.value)}
              styles={styles}
              id="hh"
            />
          </div>
          <div>
            <label htmlFor=" hh" className="form-label ">
              Company
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              // defaultValue={farmer_type[0]}
              options={companies.map((type) => ({
                value: type.df_id,
                label: type.full_name,
              }))}
              onChange={(e) => setCompany_id(e.value)}
              styles={styles}
              id="hh"
            />
          </div>
          <Textinput
            name="name"
            label="Product Name"
            placeholder="Product Name"
            type="text"
            register={register}
            // error={errors.product_name}
            msgTooltip
          />
          <Textinput
            name="sell_price"
            label="Selling Price"
            placeholder="Selling Price"
            type="text"
            register={register}
            // error={errors.first_name}
            msgTooltip
            disabled={true}
          />
          <div>
            <label htmlFor=" hh" className="form-label ">
              Unit
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              // defaultValue={farmer_type[0]}
              options={units.map((type) => ({
                value: type.id,
                label: type.unit,
              }))}
              onChange={(e) => setUnit_id(e.value)}
              styles={styles}
              id="hh"
            />
          </div>
          <Textinput
            name="discount"
            label="Discount"
            placeholder="Discount"
            type="text"
            register={register}
            // error={errors.last_name}
            msgTooltip
            // disabled={true}
          />
          <Textinput
            name="hq_commission"
            label="HQ Commision"
            placeholder="HQ Commision"
            type="text"
            register={register}
            // error={errors.phone_no}
            msgTooltip
            // disabled={true}
          />
          <Textinput
            name="me_commission"
            label="ME Commision"
            placeholder="ME Commision"
            type="text"
            register={register}
            // error={errors.phone_no}
            msgTooltip
            // disabled={true}
          />
          <Textinput
            name="distributer_commission"
            label="Distributer Commision"
            placeholder="Distributer Commision"
            type="text"
            register={register}
            // error={errors.address}
            msgTooltip
            // disabled={true}
          />
          <Textinput
            name="buy_price_from_company"
            label="Buy Price From Company"
            placeholder="Buy Price From Company"
            type="text"
            register={register}
            // error={errors.village}
            msgTooltip
          />

          <Textinput
            name="sell_price_from_company"
            label="Sell Price From Company"
            placeholder="Sell Price From Company"
            type="text"
            register={register}
            // error={errors.land_status}
            msgTooltip
          />

          <Textinput
            name="description"
            label="Description"
            placeholder="Description"
            type="text"
            register={register}
            // error={errors.land_status}
            msgTooltip
          />

          <Textinput
            name="prefered"
            label="Prefered"
            placeholder="Prefered"
            type="text"
            register={register}
            // error={errors.land_status}
            msgTooltip
          />
          <button
            disabled={loading}
            type="submit"
            className="btn btn-dark  text-center"
          >
            {loading ? (
              <div className="w-5 h-5  border-2 border-dashed rounded-full border-white animate-spin"></div>
            ) : (
              "Add Product"
            )}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;
