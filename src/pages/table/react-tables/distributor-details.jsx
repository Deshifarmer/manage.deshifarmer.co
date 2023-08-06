import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DistributorProfile from "./distributor-profile";
import DistributorsRecentTransactions from "./distributors-recent-transactions";
import DistributorMeLists from "./distributor-me-lists";
import DistributorOrders from "./distributor-orders";

const DistributorDetails = () => {
  const params = useParams();
  const [distributor_details, set_distributor_details] = useState([]);
  const [me_lists, set_me_lists] = useState([]);
  const [orders, set_orders] = useState([]);
  const token = localStorage.getItem("hq-token");

  const fetchFarmerDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE}/hq/profile/${params.id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data;
      set_distributor_details(data);
      set_me_lists(data?.me_list);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFarmerDetails();
  }, []);

  console.log();

  return (
    <div className="space-y-10 ">
      <DistributorProfile distributor_details={distributor_details} />
      {/* <DistributorsRecentTransactions /> */}
      <div>
        <div className="mb-10">
          <DistributorMeLists me_lists={me_lists} />
        </div>
        <div>
          <DistributorOrders params={params} />
        </div>
      </div>
    </div>
  );
};

export default DistributorDetails;
