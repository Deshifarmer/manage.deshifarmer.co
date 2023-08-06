import { useParams } from "react-router-dom";
import FarmerProfile from "./farmer-profile";
import FarmerOrders from "./farmer-orders";
import { useGetSingleFarmerQuery } from "../../../store/features/farmers/api";

const FarmerDetails = () => {
  const params = useParams();
  const { data, isLoading, isError } = useGetSingleFarmerQuery(params.id);
  isError && console.log("Error in fetching farmer details");
  return (
    <div className="space-y-10">
      <FarmerProfile farmer_details={data} />
      <FarmerOrders orders={data?.order_list} isLoading={isLoading} />
    </div>
  );
};

export default FarmerDetails;
