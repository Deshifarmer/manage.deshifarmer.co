import Card from "../../components/ui/Card";
import Textinput from "../../components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Flatpickr from "react-flatpickr";
import { toast } from "react-toastify";

import uploadSvgImage from "@/assets/images/svg/upload.svg";

// note => form validation schema
const FormValadtionSchema = yup
  .object({
    nid_no: yup.string().required("Nid no is Required"),
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

const farmer_types = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
];
const farmer_roles = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
];

const gender_types = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

// note => date picker config

function formatDate(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}

const AddFarmer = () => {
  const [files, setFiles] = useState([]);
  const [picker, setPicker] = useState(new Date());
  const [divisions, setDivisions] = useState([]);
  const [divisionId, setDivisionId] = useState("");
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [upazilaId, setUpazilaId] = useState("");
  const [farmer_type, setFarmer_type] = useState("");
  const [farmer_role, setFarmer_role] = useState("");
  const [gender, setGender] = useState("");
  const token = localStorage.getItem("hq-token");

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

  const fetch_locations = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE}/division`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDivisions(res.data);
    } catch (error) {

    }
  };

  useEffect(() => {
    fetch_locations();

    fetch(`${import.meta.env.VITE_BASE}/division/${divisionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data.districts);
        const upazila = data?.districts
          ?.filter((district) => district.id == districtId)
          .map((district) => district.upazila);
        setUpazilas(upazila);
      });
  }, [divisionId, districtId]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", files[0]);
    formData.append("nid", data.nid_no);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("phone", data.phone_no);
    formData.append("gender", gender);
    formData.append("date_of_birth", formatDate(picker));
    formData.append("address", data.address);
    formData.append("village", data.village);
    formData.append("upazila", parseInt(upazilaId));
    formData.append("district", parseInt(districtId));
    formData.append("division", parseInt(divisionId));
    formData.append("land_status", data.land_status);
    formData.append("family_member", parseInt(data.family_member));
    formData.append("number_of_children", parseInt(data.number_of_children));
    formData.append("yearly_income", parseInt(data.yearly_income));
    formData.append("year_of_stay_in", parseInt(data.year_of_stay_in));
    formData.append("farmer_role", parseInt(farmer_role));
    formData.append("farmer_type", parseInt(farmer_type));
    formData.append("input_by", "1");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE}/farmer`,
        formData,
        {
          headers: {
            Accept: "application/json",
            ContentType: "multipart/form-data", // note => for image upload
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (res.status === 201) {
        toast.success("Farmer Added Successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
    
    }
  };



  return (
    <div>
      <Card title="Add Farmer">
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
          <div>
            <label htmlFor=" hh" className="form-label ">
              Farmer Type
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              // defaultValue={farmer_type[0]}
              options={farmer_types.map((type) => ({
                value: type.value,
                label: type.label,
              }))}
              onChange={(e) => setFarmer_type(e.value)}
              styles={styles}
              id="hh"
            />
          </div>
          <Textinput
            name="nid_no"
            label="Nid No"
            placeholder="Nid No"
            type="text"
            register={register}
            error={errors.nid_no}
            msgTooltip
          />
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
            name="phone_no"
            label="Phone Number"
            placeholder="Phone Number"
            type="text"
            register={register}
            // error={errors.phone_no}
            msgTooltip
          />
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
          <Textinput
            name="address"
            label="Address"
            placeholder="Address"
            type="text"
            register={register}
            // error={errors.address}
            msgTooltip
          />
          <Textinput
            name="village"
            label="Village"
            placeholder="Village"
            type="text"
            register={register}
            // error={errors.village}
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
                  value: upazila.id,
                  label: upazila.name,
                }))
              }
              onChange={(e) => setUpazilaId(e.value)}
              styles={styles}
              id="hh"
            />
          </div>

          <Textinput
            name="land_status"
            label="Land Status"
            placeholder="Land Status"
            type="text"
            register={register}
            // error={errors.land_status}
            msgTooltip
          />
          <Textinput
            name="family_member"
            label="Family Member"
            placeholder="Family Member"
            type="text"
            register={register}
            error={errors.family_member}
            msgTooltip
          />
          <Textinput
            name="number_of_children"
            label="Number of Children"
            placeholder="Number of Children"
            type="text"
            register={register}
            // error={errors.number_of_children}
            msgTooltip
          />
          <Textinput
            name="yearly_income"
            label="Yearly Income"
            placeholder="Yearly Income"
            type="text"
            register={register}
            // error={errors.yearly_income}
            msgTooltip
          />
          <Textinput
            name="year_of_stay_in"
            label="Year of Stay In"
            placeholder="Year of Stay In"
            type="text"
            register={register}
            // error={errors.year_of_stay_in}
            msgTooltip
          />
          <Textinput
            name="year_of_stay_in"
            label="Year of Stay In"
            placeholder="Year of Stay In"
            type="text"
            register={register}
            // error={errors.year_of_stay_in}
            msgTooltip
          />
          <div>
            <label htmlFor=" hh" className="form-label ">
              Farmer Role
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              // defaultValue={farmer_role[0]}
              options={farmer_roles.map((role) => ({
                value: role.value,
                label: role.label,
              }))}
              onChange={(e) => setFarmer_role(e.value)}
              styles={styles}
              id="hh"
            />
          </div>

          <button className="btn btn-dark  text-center">Add Farmer</button>
        </form>
      </Card>
    </div>
  );
};

export default AddFarmer;
