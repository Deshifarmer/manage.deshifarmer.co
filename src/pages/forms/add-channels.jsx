import Card from "../../components/ui/Card";
import Textinput from "../../components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// note => image import
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";

// note => form validation schema
const FormValadtionSchema = yup
  .object({
    first_name: yup.string().required("Product Name is Required"),
    last_name: yup.string().required("Discount in Percent is Required"),
    email: yup.string().required("Current Stock is Required"),
    nid: yup.string().required("Buy Price is Required"),
    phone: yup.string().required("Distributor Commission is Required"),
    password: yup
      .string()
      .required("Micro Entrepreneurs Commission is Required"),
    c_password: yup
      .string()
      .required("Micro Entrepreneurs Commission is Required"),
  })
  .required();

const AddChannels = () => {
  // note => useForm hook
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(FormValadtionSchema),
  });

  const token = localStorage.getItem("hq-token");

  const onSubmit = async (data) => {
    // if password and confirm password is not same
    if (data.password !== data.c_password) {
      toast.error("Password and Confirm Password must be same");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE}/hq/add_channel`,
        {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          nid: data.nid,
          role: parseInt(1),
          phone: data.phone,
          password: data.password,
          c_password: data.c_password,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire("Success", "Channel Created Successfully", "success");
      reset();
    } catch (error) {
      Swal.fire("Good job!", "Channel Creation Failed", "error");
    }

    console.log(data);
  };

  return (
    <div>
      <Card title="Add Channles">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
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

          <button type="submit" className="btn btn-dark  text-center">
            Add Channel
          </button>
        </form>
      </Card>
    </div>
  );
};

export default AddChannels;
