import { useParams } from "react-router-dom";
import CompanyProducts from "./company-products";
import CompanyProfile from "./company-profile";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { CheckboxSVGMap } from "react-svg-map";

const CompanyDetails = () => {
  const params = useParams();
  const [company_details, set_company_details] = useState([]);
  const [product_lists, set_product_lists] = useState([]);
  const token = localStorage.getItem("hq-token");

  const fetchCompanyDetails = async () => {
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
      set_company_details(data);
      set_product_lists(data.product_list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  console.log(company_details);

  console.log();
  return (
    <div>
      <div>
        <CompanyProfile company_details={company_details} />
      </div>
      <div className="mt-5">
        <CompanyProducts product_lists={product_lists} />
      </div>
    </div>
  );
};

export default CompanyDetails;
