import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MeProfile from "./me-profile";
import MeOrders from "./me-orders";
import MeFarmerLists from "./me-farmer-lists";

const MeDetails = () => {
  const params = useParams();
  const [me_details, set_me_details] = useState([]);
  const token = localStorage.getItem("hq-token");
  const [farmer_lists, set_farmer_lists] = useState([]);

  const fetchMeDetails = async () => {
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
      set_me_details(data);
      set_farmer_lists(data.farmer_list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMeDetails();
  }, []);

  console.log(me_details);

  return (
    <div>
      <MeProfile me_details={me_details} />
      <div className="mt-5">
        <div className="mb-10">
          <MeFarmerLists farmer_lists={farmer_lists} />
        </div>
        <div>
          <MeOrders params={params} />
        </div>
      </div>
    </div>
  );
};

export default MeDetails;
