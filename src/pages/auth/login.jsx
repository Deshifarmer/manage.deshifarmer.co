import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./common/login-form";
import Social from "./common/social";
import useDarkMode from "@/hooks/useDarkMode";
import { ToastContainer } from "react-toastify";
import Lottie from "lottie-react";

// image import
import LogoWhite from "@/assets/images/logo/logo.jpg";
import Logo from "@/assets/images/logo/logo.jpg";
import Illustration from "@/assets/images/auth/dashboard.jpg";

const login = () => {
  const [isDark] = useDarkMode();
  return (
    <>
      <ToastContainer />
      <div className="loginwrapper h-full">
        <div className="lg-inner-column">
          <div className="left-column relative z-[1]">
            {/* <div className="max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20">
              <Link to="/">
                <img src={isDark ? LogoWhite : Logo} alt="" className="mb-10" />
              </Link>
              <h4>
                Welcome to{" "}
                <span className="text-slate-800 dark:text-slate-400 font-bold">
                  HQ Platform
                </span>
              </h4>
            </div> */}
            <div className="relative h-full w-full">
              <img
                src={Illustration}
                alt=""
                className=" w-full h-full object-contain"
              />

              {/* <Lottie animationData={Illustration} loop={true} /> */}
            </div>
          </div>
          <div className="right-column relative">
            <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
              <div className="auth-box h-full flex flex-col justify-center">
                <div className="mobile-logo text-center mb-6 lg:hidden block">
                  <Link to="/">
                    <img
                      src={isDark ? LogoWhite : Logo}
                      alt=""
                      className="mx-auto h-8 w-8 rounded-xl"
                    />
                  </Link>
                </div>
                <div className="text-center 2xl:mb-10 mb-4">
                  <h4 className="font-medium">Sign in</h4>
                  <div className="text-slate-500 text-base">
                    Sign in to your account to start using Hq Platform
                  </div>
                </div>
                <LoginForm />
                <div className="relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6">
                  <div className="absolute inline-block bg-white dark:bg-slate-800 dark:text-slate-400 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm text-slate-500 font-normal">
                    Or continue with
                  </div>
                </div>
                <div className="max-w-[242px] mx-auto mt-8 w-full">
                  <Social />
                </div>
                <div className="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 mt-12 uppercase text-sm">
                  {/* Don’t have an account?{" "} */}
                  {/* <Link
                    to="/register"
                    className="text-slate-900 dark:text-white font-medium hover:underline"
                  >
                    Sign up
                  </Link> */}
                </div>
              </div>
              <div className="auth-footer text-center">
                Copyright 2023, HQ Platform, Deshifarmer All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
