import { useParams } from "react-router-dom";
import CompanyProducts from "./company-products";
import CompanyProfile from "./company-profile";
import { useGetSingleCompanyDetailsQuery } from "../../../store/features/companies/api";

const CompanyDetails = () => {
  const params = useParams();
  const { data, isError, isLoading } = useGetSingleCompanyDetailsQuery(
    params.id
  );

  isError && console.log("Error is company details page");

  return (
    <div>
      <div>
        <CompanyProfile company_details={data} />
      </div>
      <div className="mt-5">
        <CompanyProducts
          product_lists={data?.product_list}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CompanyDetails;
