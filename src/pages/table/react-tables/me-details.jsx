import { useParams } from "react-router-dom";
import MeProfile from "./me-profile";
import MeOrders from "./me-orders";
import MeFarmerLists from "./me-farmer-lists";
import { useGetSingleMicroEntrepreneurQuery } from "../../../store/features/micro-entrepreneurs/api";

const MeDetails = () => {
  const params = useParams();
  const { data, isError, isLoading } = useGetSingleMicroEntrepreneurQuery(
    params?.id
  );
  isError && console.log("Error fetching data from server for me details");
  return (
    <div>
      <MeProfile me_details={data} />
      <div className="mt-5">
        <div className="mb-10">
          <MeFarmerLists
            farmer_lists={data?.farmer_list}
            isLoading={isLoading}
          />
        </div>
        <div>
          <MeOrders params={params} />
        </div>
      </div>
    </div>
  );
};

export default MeDetails;
