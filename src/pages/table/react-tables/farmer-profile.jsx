import React from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import BasicArea from "../../chart/appex-chart/BasicArea";

import Tooltip from "@/components/ui/Tooltip";

// import images
import ProfileImage from "@/assets/images/users/user-1.jpg";
import MarkerMap from "../../map/marker-map";
import moment from "moment";

const FarmerProfile = ({
  farmer_details,
  current_producing_crop,
  focused_crop,
}) => {
  const birthDate = new Date(farmer_details?.date_of_birth);
  const todayDate = new Date();
  const age = todayDate.getFullYear() - birthDate.getFullYear();
  const cpc = current_producing_crop && JSON.parse(current_producing_crop);
  const fc = focused_crop && JSON.parse(focused_crop);

  return (
    <div>
      <div className="space-y-5 profile-page">
        <div className="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
          <div className="bg-lime-200 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] "></div>
          <div className="profile-box flex-none md:text-start text-center">
            <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
              <div className="flex-none">
                <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                  {farmer_details?.image && (
                    <img
                      src={`${import.meta.env.VITE_IMG_URL}${
                        farmer_details?.image
                      }`}
                      alt=""
                      className="w-full h-full object-cover  rounded-full"
                    />
                  )}
                  <Link
                    to="#"
                    className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
                  >
                    <Icon icon="heroicons:pencil-square" />
                  </Link>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                  {farmer_details?.full_name?.replace(/\b\w/g, (match) =>
                    match.toUpperCase()
                  )}
                </div>
                <div className="text-sm flex gap-2 font-light text-slate-600 dark:text-slate-400">
                  Farmer , Onboarded By{" "}
                  <Tooltip
                    content="Click For Details"
                    placement="top"
                    arrow
                    animation="shift-away"
                    theme="info"
                  >
                    <Link to={`/me-details/${farmer_details?.onboard_by}`}>
                      <span className="text-slate-900 dark:text-slate-200">
                        {farmer_details?.onboard_by}
                      </span>
                    </Link>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
            <div className="flex-1">
              <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                {farmer_details?.yearly_income} TK
              </div>
              <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                {/* Total Balance */}
                Yearly Income
              </div>
            </div>

            <div className="flex-1">
              <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                {/* 200 */}
                {farmer_details?.family_member}
              </div>
              <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                {/* Board Card */}
                Family Member
              </div>
            </div>

            <div className="flex-1">
              <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                {moment(farmer_details?.date_of_birth).format("DD MMM YYYY")}
              </div>
              <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                {/* Calender Events */}
                Date of Birth
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-12 col-span-12">
            <Card title="Info">
              <ul className="list grid grid-cols-4 gap-10">
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:envelope" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Age
                    </div>
                    <a
                      href="mailto:someone@example.com"
                      className="text-base text-slate-600 dark:text-slate-50"
                    >
                      {age} Years
                    </a>
                  </div>
                </li>

                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:phone-arrow-up-right" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      PHONE
                    </div>
                    <a
                      href="tel:0189749676767"
                      className="text-base text-slate-600 dark:text-slate-50"
                    >
                      +880-{farmer_details?.phone?.slice(1)}
                    </a>
                  </div>
                </li>

                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:map" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      LOCATION
                    </div>
                    <div className="text-base text-slate-600 dark:text-slate-50">
                      {farmer_details?.division}, {farmer_details?.district},{" "}
                      {farmer_details?.upazila}, {farmer_details?.union},{" "}
                      {farmer_details?.village}, {farmer_details?.address}
                    </div>
                  </div>
                </li>
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:home" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Resident Type
                    </div>
                    <div className="text-base text-slate-600 dark:text-slate-50">
                      {farmer_details?.resident_type}
                    </div>
                  </div>
                </li>

                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:finger-print" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Nid
                    </div>
                    <div className="text-base text-slate-600 dark:text-slate-50">
                      {farmer_details?.nid}
                    </div>
                  </div>
                </li>
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:user" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Gender
                    </div>
                    <div className="text-base text-slate-600 capitalize dark:text-slate-50">
                      {farmer_details?.gender}
                    </div>
                  </div>
                </li>
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:user-plus" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Father's Name
                    </div>
                    <div className="text-base text-slate-600 capitalize dark:text-slate-50">
                      {farmer_details?.fathers_name}
                    </div>
                  </div>
                </li>
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:calendar-days" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Onboard Date
                    </div>
                    <div className="text-base text-slate-600 capitalize dark:text-slate-50">
                      {moment(farmer_details?.onboard_date).format("LLLL")}
                    </div>
                  </div>
                </li>
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:calendar" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Year's of Stay in
                    </div>
                    <div className="text-base text-slate-600 capitalize dark:text-slate-50">
                      {parseInt(farmer_details?.year_of_stay_in)}
                    </div>
                  </div>
                </li>
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:arrow-path" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Cultivation Practice
                    </div>
                    <div className="text-base text-slate-600 capitalize dark:text-slate-50">
                      {farmer_details?.cultivation_practice}
                    </div>
                  </div>
                </li>
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:arrow-trending-up" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Croping Intensity
                    </div>
                    <div className="text-base text-slate-600 capitalize dark:text-slate-50">
                      {farmer_details?.cropping_intensity}
                    </div>
                  </div>
                </li>
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:shopping-bag" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Current Producing Crop
                    </div>
                    <div className="text-base text-slate-600 capitalize dark:text-slate-50">
                      {cpc?.cropname}
                    </div>
                  </div>
                </li>
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:cursor-arrow-ripple" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Focused Crop
                    </div>
                    <div className="text-base text-slate-600 capitalize dark:text-slate-50">
                      {fc?.cropname}
                    </div>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <Card title="User Overview">
              <BasicArea height={170} />
            </Card>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <Card title="User Location">
              <MarkerMap />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
