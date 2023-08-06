import { useForm } from "react-hook-form";
import Card from "../../components/ui/Card";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "../../components/ui/Textinput";
import Select from "react-select";
import { useState } from "react";
import Fileinput from "../../components/ui/Fileinput";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const FormValadtionSchema = yup
  .object({
    // company_name: yup.string().required("Company name is Required"),
    // business_type: yup.string().required("Business type is Required"),
    business_present_address: yup
      .string()
      .required("Business Present Address is Required"),
    business_contact_no: yup
      .string()
      .required("Business Contact No is Required"),
    // interested_to_invest_ammount: yup
    //   .string()
    //   .required("Investment Amount is Required"),
    // interested_to_earn_from_df: yup
    //   .string()
    //   .required("Expect to earn/month from deshifarmer is Required"),
    // applicent_name: yup.string().required("Applicant name is Required"),
    // applicent_age: yup.string().required("Applicant age is Required"),
    // nationality: yup.string().required("Nationality is Required"),
    // permanent_address: yup.string().required("Permanent Address is Required"),
    // present_address: yup.string().required("Present Address is Required"),
    // personal_contact_no: yup
    //   .string()
    //   .required("Personal Contact No is Required"),
    // nid_no: yup.string().required("Nid No is Required"),
    tin_no: yup.string().required("Tin No is Required"),
    // refference_contact_no_1: yup
    //   .string()
    //   .required("Refference contact no 1 is Required"),
    // refference_address_1: yup
    //   .string()
    //   .required("Refference address 1 is Required"),
    // refference_nid_1: yup.string().required("Refference Nid 1 is Required"),
    // refference_contact_no_2: yup
    //   .string()
    //   .required("Refference contact no 2 is Required"),
    // refference_address_2: yup
    //   .string()
    //   .required("Refference address 2 is Required"),
    // refference_nid_2: yup.string().required("Refference Nid 2 is Required"),
  })
  .required();

const UpdateDistributorInfo = () => {
  const params = useParams();
  const [knowDeshifarmer, setKnowDeshifarmer] = useState(false);
  const [gender, setGender] = useState("");
  const [signature, setSignature] = useState(null);
  const [bioData, setBioData] = useState(null);
  const [tradeLicense, setTradeLicense] = useState(null);
  const [agroLicense, setAgroLicense] = useState(null);
  const [vatCertificate, setVatCertificate] = useState(null);
  const [bankSolventCertificate, setBankSolventCertificate] = useState(null);
  const [nidImageFront, setNidImageFront] = useState(null);
  const [nidImageBack, setNidImageBack] = useState(null);
  const [characterCertificate, setCharacterCertificate] = useState(null);
  const [taxReport, setTaxReport] = useState(null);
  const [ownerProve, setOwnerProve] = useState(null);
  const [foujdariOporadhSawgohonPotro, setFoujdariOporadhSawgohonPotro] =
    useState(null);
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("hq-token");

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

  const know_deshifarmer = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const gender_types = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const handleSignature = (e) => {
    setSignature(e.target.files[0]);
  };
  const handleBioData = (e) => {
    setBioData(e.target.files[0]);
  };

  const handleTradeLicense = (e) => {
    setTradeLicense(e.target.files[0]);
  };

  const handleAgroLicense = (e) => {
    setAgroLicense(e.target.files[0]);
  };

  const handleVatCertificate = (e) => {
    setVatCertificate(e.target.files[0]);
  };

  const handleBankSolventCertificate = (e) => {
    setBankSolventCertificate(e.target.files[0]);
  };

  const handleNidImageFront = (e) => {
    setNidImageFront(e.target.files[0]);
  };
  const handleNidImageBack = (e) => {
    setNidImageBack(e.target.files[0]);
  };

  const handleCharacterCertificate = (e) => {
    setCharacterCertificate(e.target.files[0]);
  };

  const handleTaxReport = (e) => {
    setTaxReport(e.target.files[0]);
  };

  const handleOwnerProve = (e) => {
    setOwnerProve(e.target.files[0]);
  };

  const handleFoujdariOporadhSawgohonPotro = (e) => {
    setFoujdariOporadhSawgohonPotro(e.target.files[0]);
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    
    // const refference = [
    //   {
    //     refference_address_1: data.refference_address_1,
    //     refference_contact_no_1: data.refference_contact_no_1,
    //     refference_nid_1: data.refference_nid_1,
    //   },
    //   {
    //     refference_address_2: data.refference_address_2,
    //     refference_contact_no_2: data.refference_contact_no_2,
    //     refference_nid_2: data.refference_nid_2,
    //   },
    // ];
    const formData = new FormData();
    formData.append("df_id", params?.id);
    // formData.append("company_name", data.company_name);
    // formData.append("business_type", data.business_type);
    if (data.business_present_address) {
      formData.append(
        "business_present_address",
        data.business_present_address
      );
    }
    if (data.business_contact_no) {
      formData.append("business_contact_no", data.business_contact_no);
    }

    if (data.tin_no) {
      formData.append("tin_no", data.tin_no);
    }
    // formData.append("is_known_to_deshi_farmer", parseInt(1));
    // formData.append(
    //   "interested_to_invest_ammount",
    //   data.interested_to_invest_ammount
    // );
    // formData.append(
    //   "interested_to_earn_from_df",
    //   data.interested_to_earn_from_df
    // );
    // formData.append("applicent_name", data.applicent_name);
    // formData.append("applicent_age", data.applicent_age);
    // formData.append("gender", gender);
    // formData.append("nationality", data.nationality);
    // formData.append("permanent_address", data.permanent_address);
    // formData.append("present_address", data.present_address);
    // formData.append("personal_contact_no", data.personal_contact_no);
    // formData.append("nid_no", data.nid_no);

    //Documents
    if (signature) {
      formData.append("signature", signature);
    }
    if (bioData) {
      formData.append("bio_data", bioData);
    }
    if (tradeLicense) {
      formData.append("trade_license", tradeLicense);
    }
    if (agroLicense) {
      formData.append("agri_license", agroLicense);
    }
    if (vatCertificate) {
      formData.append("vat_certificate", vatCertificate);
    }
    if (bankSolventCertificate) {
      formData.append("bank_solvency", bankSolventCertificate);
    }
    if (nidImageBack) {
      formData.append("nid_front", nidImageFront);
    }
    if (nidImageBack) {
      formData.append("nid_back", nidImageBack);
    }
    if (characterCertificate) {
      formData.append("character_certificate", characterCertificate);
    }
    if (taxReport) {
      formData.append("tax_report", taxReport);
    }
    if (ownerProve) {
      formData.append("owner_prove", ownerProve);
    }
    // formData.append(
    //   "foujdari_oporadh_sawgohon_potro",
    //   foujdariOporadhSawgohonPotro[0]
    // );
    // formData.append("image", image[0]);
    // refference
    // formData.append("refference", refference);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE}/hq/distributor_file`,
        formData,
        {
          headers: {
            Accept: "application/json",
            ContentType: "multipart/form-data", // note => for image upload
            Authorization: `Bearer ${token}`,
          },
        }
      );
    

      Swal.fire({
        icon: "success",
        title: "Successfully Updated",
        showConfirmButton: true,
        timer: 1500,
      });
    } catch (error) {
      
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };



  return (
    <div>
      <Card title="Distributor Details">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          {/* <Textinput
            name="company_name"
            label="Company Name"
            placeholder="Company Name"
            type="text"
            register={register}
            error={errors.company_name}
            msgTooltip
          /> */}
          {/* <Textinput
            name="business_type"
            label="Business Type"
            placeholder="Business Type"
            type="text"
            register={register}
            error={errors.business_type}
            msgTooltip
          /> */}
          <Textinput
            name="business_present_address"
            label="Business Present Address"
            placeholder="Business Present Address"
            type="text"
            register={register}
            error={errors.business_present_address}
            msgTooltip
          />
          <Textinput
            name="business_contact_no"
            label="Business Contact No"
            placeholder="Business Contact No"
            type="text"
            register={register}
            error={errors.business_contact_no}
            msgTooltip
          />
          {/* <div>
            <label htmlFor=" hh" className="form-label ">
              Do you know about Deshi Farmer?
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              // defaultValue={farmer_type[0]}
              options={know_deshifarmer.map((type) => ({
                value: type.value,
                label: type.label,
              }))}
              onChange={(e) => setKnowDeshifarmer(e.value)}
              styles={styles}
              id="hh"
            />
          </div> */}
          {/* <Textinput
            name="interested_to_invest_ammount"
            label="Interested to invest ammount"
            placeholder="Interested to invest ammount"
            type="text"
            register={register}
            error={errors.interested_to_invest_ammount}
            msgTooltip
          /> */}
          {/* <Textinput
            name="interested_to_earn_from_df"
            label="Your expectation to earn/month from deshifarmer"
            placeholder="Your expectation to earn/month from deshifarmer"
            type="text"
            register={register}
            error={errors.interested_to_earn_from_df}
            msgTooltip
          /> */}
          {/* <Textinput
            name="applicent_name"
            label="Applicant Name"
            placeholder="Applicant Name"
            type="text"
            register={register}
            error={errors.applicent_name}
            msgTooltip
          /> */}
          {/* <Textinput
            name="applicent_age"
            label="Age"
            placeholder="Age"
            type="text"
            register={register}
            error={errors.applicent_age}
            msgTooltip
          /> */}
          {/* <div>
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
          </div> */}

          {/* <Textinput
            name="nationality"
            label="Nationality"
            placeholder="Nationality"
            type="text"
            register={register}
            error={errors.nationality}
            msgTooltip
          /> */}

          {/* <Textinput
            name="permanent_address"
            label="Permanent Address"
            placeholder="Permanent Address"
            type="text"
            register={register}
            error={errors.permanent_address}
            msgTooltip
          /> */}
          {/* <Textinput
            name="present_address"
            label="Present Address"
            placeholder="Present Address"
            type="text"
            register={register}
            error={errors.present_address}
            msgTooltip
          /> */}

          {/* <Textinput
            name="personal_contact_no"
            label="Personal Contact No"
            placeholder="Personal Contact No"
            type="text"
            register={register}
            error={errors.personal_contact_no}
            msgTooltip
          /> */}
          {/* <Textinput
            name="nid_no"
            label="Nid No"
            placeholder="Nid No"
            type="text"
            register={register}
            error={errors.nid_no}
            msgTooltip
          /> */}
          <Textinput
            name="tin_no"
            label="Tin No"
            placeholder="Tin No"
            type="text"
            register={register}
            error={errors.tin_no}
            msgTooltip
          />
          <Card title="Add Documents">
            <div className="space-y-4">
              <div>
                <label htmlFor="bio-data" className="form-label ">
                  Signature
                </label>
                <Fileinput
                  name="signature"
                  selectedFile={signature}
                  onChange={handleSignature}
                  preview
                />
              </div>
              <div>
                <label htmlFor="bio-data" className="form-label ">
                  Bio Data
                </label>
                <Fileinput
                  name="bio_data"
                  selectedFile={bioData}
                  onChange={handleBioData}
                  preview
                />
              </div>
              <div>
                <label htmlFor="trade-licence" className="form-label ">
                  Trade License
                </label>
                <Fileinput
                  name="trade_license"
                  selectedFile={tradeLicense}
                  onChange={handleTradeLicense}
                  preview
                />
              </div>
              <div>
                <label htmlFor="agro-licence" className="form-label ">
                  Agro License
                </label>
                <Fileinput
                  name="agri_license"
                  selectedFile={agroLicense}
                  onChange={handleAgroLicense}
                  preview
                />
              </div>
              <div>
                <label htmlFor="vat-certificate" className="form-label ">
                  Vat License
                </label>
                <Fileinput
                  name="vat_certificate"
                  selectedFile={vatCertificate}
                  onChange={handleVatCertificate}
                  preview
                />
              </div>
              <div>
                <label htmlFor="bank-solvency" className="form-label ">
                  Bank Solvency
                </label>
                <Fileinput
                  name="bank_solvency"
                  selectedFile={bankSolventCertificate}
                  onChange={handleBankSolventCertificate}
                  preview
                />
              </div>
              <div>
                <label htmlFor="bank-solvency" className="form-label ">
                  Bank Solvency
                </label>
                <Fileinput
                  name="bank_solvency"
                  selectedFile={bankSolventCertificate}
                  onChange={handleBankSolventCertificate}
                  preview
                />
              </div>
              <div>
                <label htmlFor="nid-image" className="form-label ">
                  NID Front
                </label>
                <Fileinput
                  name="nid-image-front"
                  selectedFile={nidImageFront}
                  onChange={handleNidImageFront}
                  preview
                />
              </div>
              <div>
                <label htmlFor="nid-image" className="form-label ">
                  NID Back
                </label>
                <Fileinput
                  name="nid-image-back"
                  selectedFile={nidImageBack}
                  onChange={handleNidImageBack}
                  preview
                />
              </div>
              <div>
                <label htmlFor="character-certificate" className="form-label ">
                  Character Certificate
                </label>
                <Fileinput
                  name="character_certificate"
                  selectedFile={characterCertificate}
                  onChange={handleCharacterCertificate}
                  preview
                />
              </div>
              <div>
                <label htmlFor="tax-report" className="form-label ">
                  Tax Report
                </label>
                <Fileinput
                  name="tax_report"
                  selectedFile={taxReport}
                  onChange={handleTaxReport}
                  preview
                />
              </div>
              <div>
                <label htmlFor="owner-prove" className="form-label ">
                  Owner Prove
                </label>
                <Fileinput
                  name="owner_prove"
                  selectedFile={ownerProve}
                  onChange={handleOwnerProve}
                  preview
                />
              </div>
              {/* <div>
                  <label
                    htmlFor="foujdari-oporadh-sawgohon-potro"
                    className="form-label "
                  >
                    Foujdari Oporadh Sawgohon Potro
                  </label>
                  <Fileinput
                    name="foujdari_oporadh_sawgohon_potro"
                    selectedFile={foujdariOporadhSawgohonPotro}
                    onChange={handleFoujdariOporadhSawgohonPotro}
                    preview
                  />
                </div> */}
              {/* <div>
                  <label htmlFor="image" className="form-label">
                    Image
                  </label>
                  <Fileinput
                    name="image"
                    selectedFile={image}
                    onChange={handleImage}
                    preview
                  />
                </div> */}
            </div>
          </Card>

          {/* <Card title="Add Refference">
            <div className="space-y-4">
              <Card title="Refference 1">
                <div className="space-y-4">
                  <Textinput
                    name="refference_address_1"
                    label="Refference Address 1"
                    placeholder="Refference Address"
                    type="text"
                    register={register}
                    error={errors.refference_address_1}
                    msgTooltip
                  />
                  <Textinput
                    name="refference_contact_no_1"
                    label="Refference Contact No 1"
                    placeholder="Refference Contact No"
                    type="text"
                    register={register}
                    error={errors.refference_contact_no_1}
                    msgTooltip
                  />
                  <Textinput
                    name="refference_nid_1"
                    label="Refference Nid 1"
                    placeholder="Refference Nid"
                    type="text"
                    register={register}
                    error={errors.refference_nid_1}
                    msgTooltip
                  />
                </div>
              </Card>
              <Card title="Refference 2">
                <div className="space-y-4">
                  <Textinput
                    name="refference_address_2"
                    label="Refference Address 2"
                    placeholder="Refference Address"
                    type="text"
                    register={register}
                    error={errors.refference_address_2}
                    msgTooltip
                  />
                  <Textinput
                    name="refference_contact_no_2"
                    label="Refference Contact No 2"
                    placeholder="Refference Contact No"
                    type="text"
                    register={register}
                    error={errors.refference_contact_no_2}
                    msgTooltip
                  />
                  <Textinput
                    name="refference_nid_2"
                    label="Refference Nid 2"
                    placeholder="Refference Nid"
                    type="text"
                    register={register}
                    error={errors.refference_nid_2}
                    msgTooltip
                  />
                </div>
              </Card>
            </div>
          </Card> */}
          <button className="btn btn-dark  text-center">
            Upload Distributor Files
          </button>
        </form>
      </Card>
    </div>
  );
};

export default UpdateDistributorInfo;
