import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLogin } from "./store";
import { toast } from "react-toastify";
import axios from "axios";
import { userInfo } from "../../../atom/auth-atom";
import { useSetRecoilState } from "recoil";
const schema = yup
  .object({
    // email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();

const LoginForm = () => {
  const setUserInfo = useSetRecoilState(userInfo);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    // const user = users.find(
    //   (user) => user.email === data.email && user.password === data.password
    // );
    // if (user) {
    //   dispatch(handleLogin(true));
    //   setTimeout(() => {
    //     navigate("/dashboard");
    //   }, 1500);
    // } else {
    //   toast.error("Invalid credentials", {
    //     position: "top-right",
    //     autoClose: 1500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE}/hq/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      toast.success("Login successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setUserInfo(response.data);
  
      setLoading(false);
      localStorage.setItem("hq-token", response.data.token);
      dispatch(handleLogin(true));
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error("Invalid credentials");
    
    }
  };

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="email"
        label="email"
        // defaultValue={users[0].email}
        placeholder="Enter your email"
        type="text"
        register={register}
        // error={errors.email}
      />
      <Textinput
        name="password"
        label="passwrod"
        type="password"
        // defaultValue={users[0].password}
        placeholder="Enter your password"
        register={register}
        error={errors.password}
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />
        {/* <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link> */}
      </div>

      <button
        type="submit"
        className="btn btn-dark block w-full text-center flex justify-center"
      >
        {loading ? (
          <div className="w-5 h-5  border-2 border-dashed rounded-full border-white animate-spin felx justify-center"></div>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
