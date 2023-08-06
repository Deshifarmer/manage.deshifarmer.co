import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FarmerProfile from "./farmer-profile";
import FarmerOrders from "./farmer-orders";

const FarmerDetails = () => {
  const params = useParams();
  const [farmer_details, set_farmer_details] = useState([]);
  const [orders, set_orders] = useState([]);
  const token = localStorage.getItem("hq-token");
  const [current_producing_coprs, set_current_producing_coprs] = useState([]);
  const [focused_crops, set_focused_crops] = useState([]);

  const fetchFarmerDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE}/hq/farmer/profile/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data;
      set_farmer_details(data);
      set_focused_crops(JSON.parse(data?.focused_crop));
      set_current_producing_coprs(JSON.parse(data?.current_producing_crop));
      set_orders(data?.order_list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFarmerDetails();
  }, []);

  console.log(farmer_details);

  return (
    <div className="space-y-10">
      <FarmerProfile
        farmer_details={farmer_details}
        focused_crops={focused_crops}
        current_producing_coprs={current_producing_coprs}
      />
      <FarmerOrders orders={orders} />
    </div>
  );
};

export default FarmerDetails;
