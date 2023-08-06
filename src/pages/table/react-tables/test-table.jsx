import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TestTable = () => {
  const params = useParams();
  const [distributors, setDistributors] = useState([]); // Distributors List
  const [microEntrepreneurs, setMicroEntrepreneurs] = useState([]); // Micro Entrepreneurs List
  const fetchDistributors = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE}/hq/channel/${params.id}`
      );
      const data = await response.data;
      setMicroEntrepreneurs(data.me);
      
    } catch (error) {
    
    }
  };

  useEffect(() => {
    fetchDistributors();
  }, []);

  return <div>Test Table</div>;
};

export default TestTable;
