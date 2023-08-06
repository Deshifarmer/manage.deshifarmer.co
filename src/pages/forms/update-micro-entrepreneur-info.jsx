import Card from "../../components/ui/Card";
import { useDropzone } from "react-dropzone";
import uploadSvgImage from "@/assets/images/svg/upload.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import Textinput from "../../components/ui/Textinput";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";

// note => date format function

function formatDate(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}

// note => form validation schema

const FormValadtionSchema = yup
  .object({
    // nid_no: yup.string().required("Nid no is Required"),
  })
  .required();

const UpdateMicroEntrepreneurInfo = () => {
  const [files, setFiles] = useState([]);
  const [picker, setPicker] = useState(new Date());
  const [picker2, setPicker2] = useState(new Date());
  const [gender, setGender] = useState("");
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState("");

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

  const gender_types = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const fetch_locations = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE}/district`);
      setDistricts(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch_locations();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("designation", data.designation);
    formData.append("previous_designation", data.previous_designation);
    formData.append("previous_company", data.previous_company);
    formData.append("photo", files[0]);
    formData.append("nid", data.nid);
    formData.append("date_of_birth", formatDate(picker));
    formData.append("present_address", data.present_address);
    formData.append("permanent_address", data.permanent_address);
    formData.append("home_district", parseInt(districtId));
    formData.append("phone", data.phone);
    formData.append("joining_date", formatDate(picker2));
    formData.append("gender", gender);
    formData.append("department", "IT");
    formData.append("work_place", "hq");
    formData.append("channel_id", 1);

    // note => api call

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE}/me`,
        formData,
        {
          headers: {
            Accept: "application/json",
            ContentType: "multipart/form-data", // note => for image upload
          },
        }
      );
      console.log(res);
      if (res.status === 201) {
        toast.success("Micro Entrepreneur Added Successfully");
      } else {
        toast.error("Error Validation");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Validation");
    }
  };

  return (
    <div>
      <Card title="Add Micro Entrepreneur">
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

          {/* // note => Date of Birth */}
          <div>
            <label htmlFor="default-picker" className=" form-label">
              Date of Birth
            </label>
            <Flatpickr
              className="form-control py-2"
              value={picker}
              onChange={(date) => setPicker(date)}
              id="default-picker"
            />
          </div>

          {/*  */}
          <Textinput
            name="first_name"
            label="First Name"
            placeholder="First Name"
            type="text"
            register={register}
            // error={errors.first_name}
            msgTooltip
          />

          <Textinput
            name="last_name"
            label="Last Name"
            placeholder="Last Name"
            type="text"
            register={register}
            // error={errors.last_name}
            msgTooltip
          />

          <Textinput
            name="designation"
            label="Designation"
            placeholder="Designation"
            type="text"
            register={register}
            // error={errors.last_name}
            msgTooltip
          />

          <Textinput
            name="previous_designation"
            label="Previous Designation"
            placeholder="Previous Designation"
            type="text"
            register={register}
            // error={errors.last_name}
            msgTooltip
          />

          <Textinput
            name="previous_company"
            label="Previous Company"
            placeholder="Previous Company"
            type="text"
            register={register}
            // error={errors.last_name}
            msgTooltip
          />

          <Textinput
            name="nid"
            label="NID"
            placeholder="NID"
            type="text"
            register={register}
            // error={errors.last_name}
            msgTooltip
          />

          <Textinput
            name="present_address"
            label="Present Address"
            placeholder="Present Address"
            type="text"
            register={register}
            // error={errors.last_name}
            msgTooltip
          />

          <Textinput
            name="permanent_address"
            label="Permanent Address"
            placeholder="Permanent Address"
            type="text"
            register={register}
            // error={errors.last_name}
            msgTooltip
          />

          <div>
            <label htmlFor=" hh" className="form-label ">
              Home District
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              // defaultValue={furits[0]}
              options={districts.map((district) => ({
                value: district.id,
                label: district.name,
              }))}
              onChange={(e) => setDistrictId(e.value)}
              styles={styles}
              id="hh"
            />
          </div>

          <Textinput
            name="phone"
            label="Phone No"
            placeholder="Phone No"
            type="text"
            register={register}
            // error={errors.last_name}
            msgTooltip
          />

          <div>
            <label htmlFor="default-picker" className=" form-label">
              Joining date
            </label>
            <Flatpickr
              className="form-control py-2"
              value={picker2}
              onChange={(date) => setPicker2(date)}
              id="default-picker"
            />
          </div>

          <div>
            <label htmlFor=" hh" className="form-label ">
              Employee Type
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              // defaultValue={furits[0]}
              //   options={
              //     upazilas &&
              //     upazilas[0]?.map((upazila) => ({
              //       value: upazila.id,
              //       label: upazila.name,
              //     }))
              //   }
              onChange={(e) => setUpazilaId(e.value)}
              styles={styles}
              id="hh"
            />
          </div>
          <div>
            <label htmlFor=" hh" className="form-label ">
              Gender
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              // defaultValue={furits[0]}
              options={gender_types.map((type) => ({
                value: type.value,
                label: type.label,
              }))}
              onChange={(e) => setGender(e.value)}
              styles={styles}
              id="hh"
            />
          </div>
          <div>
            <label htmlFor=" hh" className="form-label ">
              Department
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              // defaultValue={furits[0]}
              //   options={
              //     upazilas &&
              //     upazilas[0]?.map((upazila) => ({
              //       value: upazila.id,
              //       label: upazila.name,
              //     }))
              //   }
              onChange={(e) => setUpazilaId(e.value)}
              styles={styles}
              id="hh"
            />
          </div>
          <div>
            <label htmlFor=" hh" className="form-label ">
              Workplace
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              // defaultValue={furits[0]}
              //   options={
              //     upazilas &&
              //     upazilas[0]?.map((upazila) => ({
              //       value: upazila.id,
              //       label: upazila.name,
              //     }))
              //   }
              onChange={(e) => setUpazilaId(e.value)}
              styles={styles}
              id="hh"
            />
          </div>
          <button className="btn btn-dark  text-center">
            Add Micro Entrepreneurs
          </button>
        </form>
      </Card>
    </div>
  );
};

export default UpdateMicroEntrepreneurInfo;
