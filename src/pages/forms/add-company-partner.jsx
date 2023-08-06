import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textarea from "../../components/ui/Textarea";
import Card from "../../components/ui/Card";
import Textinput from "../../components/ui/Textinput";
import axios from "axios";
import { toast } from "react-toastify";

const FormValadtionSchema = yup
  .object({
    name: yup.string().required("Name is Required"),
    contact_name: yup.string().required("Contact Name is Required"),
    email: yup.string().required("Email is Required"),
    contact_phone_no: yup.string().required("Contact Phone No is Required"),
    address: yup.string().required("Address is Required"),
  })
  .required();

const AddCompanyPartner = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValadtionSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("contact_person_name", data.contact_name);
    formData.append("email", data.email);
    formData.append("phone", data.contact_phone_no);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE}/hq/company`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);
      if (res.status === 201) {
        toast.success("Company Added Successfully");
      } else {
        toast.error("Add Company Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card title="Add Company / Partner">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Textinput
            name="name"
            label="Name"
            placeholder="Name"
            type="text"
            register={register}
            error={errors.name}
            msgTooltip
          />
          <Textinput
            name="contact_name"
            label="Contact Name"
            placeholder="Contact Name"
            type="text"
            register={register}
            error={errors.contact_name}
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
            name="contact_phone_no"
            label="Contact Phone No"
            placeholder="Contact Phone No"
            type="text"
            register={register}
            error={errors.contact_phone_no}
            msgTooltip
          />
          <Textinput
            name="address"
            label="Address"
            placeholder="Address"
            type="text"
            register={register}
            error={errors.address}
            msgTooltip
          />
          <button className="btn btn-dark  text-center">
            Add Company / Partner
          </button>
        </form>
      </Card>
    </div>
  );
};

export default AddCompanyPartner;
