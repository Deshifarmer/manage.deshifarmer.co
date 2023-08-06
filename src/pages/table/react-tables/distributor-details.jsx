import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DistributorProfile from "./distributor-profile";
import DistributorsRecentTransactions from "./distributors-recent-transactions";
import DistributorMeLists from "./distributor-me-lists";
import DistributorOrders from "./distributor-orders";
import { useGetSingleDistributorDetailsQuery } from "../../../store/features/distributor/api";

const DistributorDetails = () => {
  const params = useParams();
  const { data } = useGetSingleDistributorDetailsQuery(params?.id);

  return (
    <div className="space-y-10 ">
      <DistributorProfile distributor_details={data} />
      {/* <DistributorsRecentTransactions /> */}
      <div>
        <div className="mb-10">
          <DistributorMeLists me_lists={data?.me_list} />
        </div>
        <div>
          <DistributorOrders params={params} />
        </div>
      </div>
    </div>
  );
};

export default DistributorDetails;
