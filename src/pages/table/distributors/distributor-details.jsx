import { useParams } from "react-router-dom";
import { useGetSingleDistributorDetailsQuery } from "../../../store/features/distributor/api";
import DistributorProfile from "./distributor-profile";
import DistributorMeLists from "./distributor-me-list";
import DistributorOrders from "./distributor-order";

const DistributorDetails = () => {
  const params = useParams();
  const { data } = useGetSingleDistributorDetailsQuery(params?.id);

  console.log(data);

  return (
    <div className="space-y-10 ">
      <DistributorProfile distributor_details={data} />
      {/* <DistributorsRecentTransactions /> */}
      <div>
        <div className="mb-10">
          <DistributorMeLists
            me_lists={data?.me_list}
            db_name={data?.full_name}
          />
        </div>
        <div>
          <DistributorOrders params={params} />
        </div>
      </div>
    </div>
  );
};

export default DistributorDetails;
