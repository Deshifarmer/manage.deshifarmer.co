import { useParams } from "react-router-dom";
import FarmerProfile from "./farmer-profile";
import FarmerOrders from "./farmer-orders";
import { useGetSingleFarmerQuery } from "../../../store/features/farmers/api";
import FarmerFarms from "./farmer-farms";
import FarmerTabs from "./farmer-tabs";

const FarmerDetails = () => {
  const params = useParams();
  const { data, isLoading, isError } = useGetSingleFarmerQuery(params?.id);
  isError && console.log("Error in fetching farmer details");
  const current_producing_crop =
    data?.current_producing_crop && data?.current_producing_crop;
  const focused_crop = data?.focused_crop && data?.focused_crop;
  return (
    <div className="space-y-10">
      <FarmerProfile
        farmer_details={data}
        current_producing_crop={current_producing_crop}
        focused_crop={focused_crop}
      />
      <FarmerTabs params={params} />
      {/* <FarmerOrders orders={data?.order_list} isLoading={isLoading} />
      <FarmerFarms params={params} /> */}
    </div>
  );
};

export default FarmerDetails;
