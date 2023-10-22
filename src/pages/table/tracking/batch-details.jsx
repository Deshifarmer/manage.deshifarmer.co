import { useParams } from "react-router-dom";
import { useGetSignleBatchQuery } from "../../../store/features/tracking/api";
import Card from "@/components/ui/Card";
import ActivityMap from "./activity-map";
import moment from "moment";

const BatchDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSignleBatchQuery(id);


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



  const {
    buy_price,
    // category,
    // created_at,
    description,
    farmer_name,
    product_name,
    quantity,
    sell_price,
    source_by,
    source_id,
    transportation_id,
    unit,
    which_farmer,
  } = data?.sourcing || {};

  const {
    batch_id,
    details,
    seed_company,
    seed_name,
    seed_price,
    seed_quantity,
    seed_unit,
  } = data?.sowing || {};

  return (
    <div>
      <div className="border p-4 rounded-lg">
        <div className="p-6">
          <div className="card-title mb-5">Batch Details</div>
          <div className="text-sm">
            <p>
              <b>Batch Id:</b> {data?.batch_id}
            </p>
            <p>
              <b>Season:</b> {data?.season}
            </p>
            <p>
              <b>Farm ID:</b> {data?.farm_id}
            </p>
            <p>
              <b>Which Crop:</b> {data?.which_crop}
            </p>
            <p>
              <b>Created_by:</b> {data?.created_by}
            </p>
          </div>
        </div>
        <div className="p-6">
          <div className="card-title mb-5">Land Preparation</div>
          <div className="text-sm">
            <p>
              <b>Batch Id:</b> {data?.land_preparation?.batch_id}
            </p>
            <p>
              <b>Details:</b> {data?.land_preparation?.details}
            </p>
            <p>
              <b>Land Preparation:</b>{" "}
              {moment(data?.land_preparation?.date).format("LL")}
            </p>
          </div>
        </div>
        <div className="p-6">
          <div className="card-title mb-5">Sourcing</div>
          <div className="text-sm">
            <p>
              <b>Farmer Name:</b> {farmer_name}
            </p>
            <p>
              <b>Details:</b> {description}
            </p>
            <p>
              <b>Product Name:</b> {product_name}
            </p>
            <p>
              <b>Quantity:</b> {quantity} / {unit}
            </p>
            <p>
              <b>Which Farmer:</b> {which_farmer}
            </p>
            <p>
              <b>Transportation Id:</b> {transportation_id}
            </p>
            <p>
              <b>Source Id:</b> {source_id}
            </p>
            <p>
              <b>Source By:</b> {source_by}
            </p>
            <p>
              <b>Sell Price:</b> {sell_price}
            </p>
            <p>
              <b>Buy Price:</b> {buy_price}
            </p>
          </div>
        </div>
        <div className="p-6">
          <div className="card-title mb-5">Sowing</div>
          <div className="text-sm">
            <p>
              <b>Batch ID:</b> {batch_id}
            </p>
            <p>
              <b>Details:</b> {details}
            </p>
            <p>
              <b>Seed Company:</b> {seed_company}
            </p>
            <p>
              <b>Seed Name:</b> {seed_quantity} {seed_unit}
            </p>
            <p>
              <b>Seed Price:</b> {seed_price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;
