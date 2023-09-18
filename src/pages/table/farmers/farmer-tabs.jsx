import React, { Fragment } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { Tab, Disclosure, Transition } from "@headlessui/react";
import Accordion from "@/components/ui/Accordion";
import { useGetSingleFarmerQuery } from "../../../store/features/farmers/api";
import FarmerOrders from "./farmer-orders";
import FarmerFarms from "./farmer-farms";

const FarmerTabs = ({ params }) => {
  const { data, isLoading, isError } = useGetSingleFarmerQuery(params?.id);
  isError && console.log("Error in fetching farmer details");
  const current_producing_crop =
    data?.current_producing_crop && data?.current_producing_crop;
  const focused_crop = data?.focused_crop && data?.focused_crop;
  const buttons = [
    {
      title: "Recent Orders",
      icon: "heroicons-outline:home",
    },
    {
      title: "Farms",
      icon: "heroicons-outline:user",
    },
    {
      title: "Messages",
      icon: "heroicons-outline:chat-alt-2",
    },
    {
      title: "Settings",
      icon: "heroicons-outline:cog",
    },
  ];
  const items = [
    {
      title: "How does deshifarmer work?",
      content:
        "Jornalists call this critical, introductory section the  and when bridge properly executed, it's the that carries your reader from anheadine try at attention-grabbing to the body of your blog post.",
    },
    {
      title: "Where i can learn more about using deshifarmer?",
      content:
        "Jornalists call this critical, introductory section the  and when bridge properly executed, it's the that carries your reader from anheadine try at attention-grabbing to the body of your blog post.",
    },
    {
      title: "Why deshifarmer is so important?",
      content:
        "Jornalists call this critical, introductory section the  and when bridge properly executed, it's the that carries your reader from anheadine try at attention-grabbing to the body of your blog post.",
    },
  ];
  return (
    <Card title="Farmer Activities">
      <Tab.Group>
        <Tab.List className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
          {buttons.map((item, i) => (
            <Tab as={Fragment} key={i}>
              {({ selected }) => (
                <button
                  className={` inline-flex items-start text-sm font-medium mb-7 capitalize bg-white dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute
                     before:left-1/2 before:bottom-[-6px] before:h-[1.5px]
                      before:bg-primary-500 before:-translate-x-1/2
              
              ${
                selected
                  ? "text-primary-500 before:w-full"
                  : "text-slate-500 before:w-0 dark:text-slate-300"
              }
              `}
                >
                  <span className="text-base relative top-[1px] ltr:mr-1 rtl:ml-1">
                    <Icon icon={item.icon} />
                  </span>
                  {item.title}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <FarmerOrders orders={data?.order_list} isLoading={isLoading} />
          </Tab.Panel>
          <Tab.Panel>
            <FarmerFarms params={params} />
          </Tab.Panel>
          <Tab.Panel>
            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
              Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt
              qui
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
              Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt
              qui esse pariatur duis deserunt mollit dolore cillum minim tempor
              enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut
              voluptate aute id deserunt nisi.
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Card>
  );
};

export default FarmerTabs;
