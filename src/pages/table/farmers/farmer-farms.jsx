import { useGetFarmerWiseFarmQuery } from "../../../store/features/farmers/api";

const FarmerFarms = ({ params }) => {
  const { data } = useGetFarmerWiseFarmQuery(params?.id);
  console.log(data);
  return (
    <div>
      <h1>Farmer Farms</h1>
    </div>
  );
};

export default FarmerFarms;
