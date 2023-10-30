import React, { useState } from "react";
import Card from "@/components/ui/Card";
import RevenueBarChart from "@/components/partials/widget/chart/revenue-bar-chart";
import SelectMonth from "@/components/partials/SelectMonth";
import CompanyTable from "@/components/partials/Table/company-table";
import RecentActivity from "@/components/partials/widget/recent-activity";
import MostSales from "../../components/partials/widget/most-sales";
import HomeBredCurbs from "./HomeBredCurbs";
import GroupChart5 from "../../components/partials/widget/chart/group-chart5";
import Calculation from "../components/dashboard/calculation";
import SalesChart from "../table/dashboard/sales-chart";
import MonthlySalesChart from "../table/dashboard/monthly-sales-chart";
import SourceUnitWiseQuantity from "../components/dashboard/source-unit-wise-quantity";

const Dashboard = () => {
  const [filterMap, setFilterMap] = useState("usa");

  return (
    <div>
      <HomeBredCurbs title="Dashboard" />
      <div className="grid grid-cols-12 gap-5 mb-5">
        {/* <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
          <ImageBlock1 />
        </div> */}
        <div className="2xl:col-span-12 lg:col-span-12 col-span-12">
          <Card bodyClass="p-4">
            <div className="grid md:grid-cols-5 col-span-1 gap-4">
              <GroupChart5 />
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* <div className="lg:col-span-12 col-span-12">
          <Card>
            <div className="legend-ring">
              <RevenueBarChart />
            </div>
          </Card>
        </div> */}
        <div className="lg:col-span-6 col-span-12">
          <Card
            title="Gender Analytics District Wise"
            headerslot={<SelectMonth />}
          >
            <Calculation />
          </Card>
        </div>
        <div className="lg:col-span-6 col-span-12">
          <Card title="Source Unit Wise Quantity" headerslot={<SelectMonth />}>
            <SourceUnitWiseQuantity />
          </Card>
        </div>
        <div className="col-span-6">
          <Card title="Daily Sales">
            <div className="legend-ring">
              <SalesChart />
            </div>
          </Card>
        </div>
        <div className="col-span-6">
          <Card title="Monthly Sales">
            <div className="legend-ring">
              <MonthlySalesChart />
            </div>
          </Card>
        </div>
        <div className="lg:col-span-8 col-span-12">
          <Card title="All Company" headerslot={<SelectMonth />} noborder>
            <CompanyTable />
          </Card>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <Card title="Recent Orders" headerslot={<SelectMonth />}>
            <RecentActivity />
          </Card>
        </div>
        <div className="lg:col-span-12 col-span-12">
          <Card
            // title="Most Sales"
            title="Map Overview"
            // headerslot={
            //   <div className="border border-slate-200 dark:border-slate-700 dark:bg-slate-900 rounded p-1 flex items-center">
            //     <span
            //       className={` flex-1 text-sm font-normal px-3 py-1 transition-all duration-150 rounded cursor-pointer
            //     ${
            //       filterMap === "global"
            //         ? "bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-300"
            //         : "dark:text-slate-300"
            //     }
            //     `}
            //       onClick={() => setFilterMap("global")}
            //     >
            //       Global
            //     </span>
            //     <span
            //       className={` flex-1 text-sm font-normal px-3 py-1 rounded transition-all duration-150 cursor-pointer
            //       ${
            //         filterMap === "usa"
            //           ? "bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-300"
            //           : "dark:text-slate-300"
            //       }
            //   `}
            //       onClick={() => setFilterMap("usa")}
            //     >
            //       USA
            //     </span>
            //   </div>
            // }
          >
            <div className="grid col-span-6">
              <MostSales filterMap={filterMap} />
            </div>
          </Card>
        </div>
        {/* <div className="lg:col-span-4 col-span-12">
          <Card title="Overview" headerslot={<SelectMonth />}>
            <RadarChart />
            <div className="bg-slate-50 dark:bg-slate-900 rounded p-4 mt-8 flex justify-between flex-wrap">
              <div className="space-y-1">
                <h4 className="text-slate-600 dark:text-slate-200 text-xs font-normal">
                  Invested amount
                </h4>
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  $8264.35
                </div>
                <div className="text-slate-500 dark:text-slate-300 text-xs font-normal">
                  +0.001.23 (0.2%)
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-slate-600 dark:text-slate-200 text-xs font-normal">
                  Invested amount
                </h4>
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  $8264.35
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-slate-600 dark:text-slate-200 text-xs font-normal">
                  Invested amount
                </h4>
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  $8264.35
                </div>
              </div>
            </div>
          </Card>
        </div> */}
        {/* <div className="col-span-12">

          <Card title="Overview" headerslot={<SelectMonth />}>
            <TestGeoJSONMap />
          </Card>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
