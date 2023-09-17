import { useParams } from "react-router-dom";
import { useGetSignleBatchQuery } from "../../../store/features/tracking/api";
import Card from "@/components/ui/Card";
import ActivityMap from "./activity-map";

const BatchDetails = () => {
  const { id } = useParams();
  const { data } = useGetSignleBatchQuery(id);

  return (
    <div>
      {data?.activities?.map((activity) => (
        <div className="lg:col-span-6 col-span-12">
          <Card title="User Location">
            <ActivityMap lat={activity?.lat} long={activity?.lon} />
          </Card>
        </div>
      ))}
    </div>
  );
};

export default BatchDetails;
