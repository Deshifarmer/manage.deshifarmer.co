import Card from "../../components/ui/Card";
import Textinput from "../../components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import uploadSvgImage from "@/assets/images/svg/upload.svg";

// note => image import
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import Fileinput from "../../components/ui/Fileinput";
import { useEffect } from "react";
import { parse } from "postcss";
import { useDropzone } from "react-dropzone";

// note => form validation schema
const FormValadtionSchema = yup
  .object({
    first_name: yup.string().required("Product Name is Required"),
    last_name: yup.string().required("Discount in Percent is Required"),
    email: yup.string().required("Current Stock is Required"),
    nid: yup.string().required("Buy Price is Required"),
    phone: yup.string().required("Phone is Required"),
    present_address: yup.string().required("Present Address is Required"),
    permanent_address: yup.string().required("Permanent Address is Required"),
    password: yup.string().required("Password is Required"),
    c_password: yup.string().required("Confirm Password is Required"),
  })
  .required();

const AddCompany = () => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [gender, setGender] = useState("");
  const [districts, setDistricts] = useState([]);
  const [dsitrictId, setDistrictId] = useState("");
  const [picker, setPicker] = useState(new Date());
  // note => useForm hook
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(FormValadtionSchema),
  });

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

  const token = localStorage.getItem("hq-token");

  const onSubmit = async (data) => {
    // if password and confirm password is not same
    if (data.password !== data.c_password) {
      Swal.fire("Ops", "Password and Confirm Password must be same", "error");
      return;
    }
    // check only jpg, png , jpeg file
    // if (
    //   image &&
    //   image.type !== "image/jpg" &&
    //   image.type !== "image/png" &&
    //   image.type !== "image/jpeg"
    // ) {
    //   Swal.fire("Ops", "Only jpg, png, jpeg file is allowed", "error");
    //   return;
    // }

    const formData = new FormData();
    formData.append("photo", files[0]);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("nid", data.nid);
    formData.append("role", parseInt(1));
    formData.append("phone", data.phone);
    formData.append("present_address", data.present_address);
    formData.append("gender", gender);
    formData.append("permanent_address", data.permanent_address);
    formData.append("home_district", parseInt(dsitrictId));
    formData.append("joing_date", formatDate(picker));
    formData.append("password", data.password);
    formData.append("c_password", data.c_password);

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE}/hq/add`,
        formData,
        {
          headers: {
            ContentType: "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire("Success", "Comapny Added Successfully", "success");
      reset();
      setLoading(false);
    } catch (error) {
      setLoading(false); // note => for debugging
      Swal.fire("Ops!", "Something went wrong", "error");
      if (error.response.data.error.email) {
        Swal.fire("Ops!", error.response.data.error.email[0], "error");
      } else if (error.response.data.error.phone) {
        Swal.fire("Ops!", error.response.data.error.phone[0], "error");
      } else if (error.response.data.error.nid) {
        Swal.fire("Ops!", error.response.data.error.nid[0], "error");
      } else {
        Swal.fire("Ops!", "Something went wrong", "error");
      }
    }
    
  };

  const handel_distributor_image = (e) => {
    setImage(e.target.files[0]);
  };

  const fetch_locations = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE}/district`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDistricts(res.data);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    fetch_locations();
  }, []);

  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  const gender_types = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  function formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }



  return (
    <div>
      <Card title="Add Comapny">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          {/*// note => Image Upload */}
          <div className="xl:col-span-2 col-span-1 cursor-pointer">
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
          </div>
          <Textinput
            name="first_name"
            label="first_name"
            placeholder="First Name"
            type="text"
            register={register}
            error={errors.first_name}
            msgTooltip
          />

          <Textinput
            name="last_name"
            label="Last Name"
            placeholder="Last Name"
            type="text"
            register={register}
            error={errors.last_name}
            msgTooltip
          />
          <Textinput
            name="email"
            label="Email"
            placeholder="Email"
            type="text"
            register={register}
            error={errors.email}
            msgTooltip
          />
          <Textinput
            name="nid"
            label="NID"
            placeholder="NID"
            type="text"
            register={register}
            error={errors.nid}
            msgTooltip
          />
          <Textinput
            name="phone"
            label="Phone"
            placeholder="Phone"
            type="text"
            register={register}
            error={errors.phone}
            msgTooltip
          />
          <Textinput
            name="present_address"
            label="Present Address"
            placeholder="Present Address"
            type="text"
            register={register}
            error={errors.present_address}
            msgTooltip
          />
          <Textinput
            name="permanent_address"
            label="Permanent Address"
            placeholder="Permanent Address"
            type="text"
            register={register}
            error={errors.permanent_address}
            msgTooltip
          />
          <div>
            <label htmlFor=" hh" className="form-label ">
              Home District
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
            <label htmlFor="default-picker" className=" form-label">
              Joining Date
            </label>
            <Flatpickr
              className="form-control py-2"
              value={picker}
              onChange={(date) => setPicker(date)}
              id="default-picker"
            />
          </div>
          <div>
            <label htmlFor=" hh" className="form-label ">
              Gender
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              // defaultValue={farmer_type[0]}
              options={gender_types.map((type) => ({
                value: type.value,
                label: type.label,
              }))}
              onChange={(e) => setGender(e.value)}
              styles={styles}
              id="hh"
            />
          </div>
          <Textinput
            name="password"
            label="Password"
            placeholder="*********"
            type="password"
            register={register}
            error={errors.password}
            msgTooltip
          />
          <Textinput
            name="c_password"
            label="Confirm Password"
            placeholder="*********"
            type="password"
            register={register}
            error={errors.c_password}
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
              "Add Company"
            )}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default AddCompany;
