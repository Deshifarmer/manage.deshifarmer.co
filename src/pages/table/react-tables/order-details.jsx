import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("hq-token");

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE}/hq/input_order/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {}
    };
    getOrderDetails();
  });
  return <div>Order Details</div>;
};

export default OrderDetails;
