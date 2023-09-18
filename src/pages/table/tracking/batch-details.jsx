import { useParams } from "react-router-dom";
import { useGetSignleBatchQuery } from "../../../store/features/tracking/api";
import Card from "@/components/ui/Card";
import ActivityMap from "./activity-map";

const BatchDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSignleBatchQuery(id);
  console.log(data)

  // const json = [
  //   {
  //     activity: "{lat: 23.64983, lon: 90.359065}",
  //   },
  //   {
  //     activity: "{lat: 23.64983, lon: 90.359065}",
  //   },
  // ];

  // // Function to parse the "activity" string and extract lat and lon values
  // function parseActivity(activity) {
  //   try {
  //     // Remove curly braces and whitespace, then parse as JSON
  //     const activityObj = JSON.parse(
  //       activity
  //         .replace(/ /g, "")
  //         .replace(/lat:/g, '"lat":')
  //         .replace(/lon:/g, '"lon":')
  //     );

  //     // Check if lat and lon properties exist
  //     if (activityObj.lat !== undefined && activityObj.lon !== undefined) {
  //       return {
  //         lat: parseFloat(activityObj.lat),
  //         lon: parseFloat(activityObj.lon),
  //       };
  //     } else {
  //       throw new Error(
  //         "Invalid 'activity' format: 'lat' and 'lon' properties are missing."
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error parsing 'activity':", error.message);
  //     return null;
  //   }
  // }

  // // Map the data and extract lat and lon values
  // const mappedData = json.map((item) => {
  //   return parseActivity(item.activity);
  // });

  // console.log(mappedData);

  return (
    <div>
      {data?.activities?.map((activity) => (
        <div className="lg:col-span-6 col-span-12">
          {/* <Card title="User Location">
            <ActivityMap lat={activity?.lat} long={activity?.lon} />
          </Card> */}
          {data?.activities?.map((item, i) => (
            <p key={i}>Activities will come {item?.farm_id}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BatchDetails;
