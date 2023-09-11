import { useParams } from "react-router-dom";
import { useGetSingleMicroEntrepreneurQuery } from "../../../store/features/micro-entrepreneurs/api";
import MeProfile from "../micro-entrepreneurs/me-profile";
import MeOrders from "../micro-entrepreneurs/me-order-list";
import MeFarmerLists from "../micro-entrepreneurs/me-farmer-list";

const MeDetails = () => {
  const params = useParams();
  const { data, isError, isLoading } = useGetSingleMicroEntrepreneurQuery(
    params?.id
  );
  isError && console.log("Error fetching data from server for me details");
  const { full_name } = data || {};

  return (
    <div>
      <MeProfile me_details={data} />
      <div className="mt-5">
        <div className="mb-10">
          <MeFarmerLists
            farmer_lists={data?.farmer_list}
            isLoading={isLoading}
            full_name={full_name}
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
