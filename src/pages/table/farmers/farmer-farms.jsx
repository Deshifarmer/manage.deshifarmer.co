import { Link } from "react-router-dom";
import { useGetFarmerWiseFarmQuery } from "../../../store/features/farmers/api";
import Card from "@/components/ui/Card";

const FarmerFarms = ({ params }) => {
  const { data, isLoading } = useGetFarmerWiseFarmQuery(params?.id);
  console.log(isLoading ? "Loading..." : data);
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <div className="grid grid-cols-3">
            {data?.map((item, i) => (
              <Card title={item?.farm_name} subtitle={item?.farm_id} noborder>
                {/* <div className="h-[140px] w-full mb-6">
                <img
                  src={cardImage1}
                  alt=""
                  className="block w-full h-full object-cover rounded-md"
                />
              </div> */}

                <div className="">
                  <div>
                    <div className="text-sm grid grid-cols-2 gap-4">
                      <p className="font-bold border p-1 rounded">
                        Farm Area :{" "}
                        <span className="font-normal">{item?.farm_area}</span>
                      </p>
                      <p className="font-bold border p-1 rounded">
                        Current Crop :{" "}
                        <span className="font-normal">
                          {item?.current_crop}
                        </span>
                      </p>
                      <p className="font-bold border p-1 rounded">
                        Address :{" "}
                        <span className="font-normal">{item?.address}</span>
                      </p>
                      <p className="font-bold border p-1 rounded">
                        Mouaza :{" "}
                        <span className="font-normal">{item?.mouaza}</span>
                      </p>
                      <p className="font-bold border p-1 rounded">
                        Union :{" "}
                        <span className="font-normal">{item?.union}</span>
                      </p>
                      <p className="font-bold border p-1 rounded">
                        Soil Type :{" "}
                        <span className="font-normal">{item?.soil_type}</span>
                      </p>
                    </div>
                    {/* <div className="mt-4 space-x-4 rtl:space-x-reverse">
                      <Link to="#" className="btn-link">
                        Learn more
                      </Link>
                      <Link to="#" className="btn-link">
                        Another link
                      </Link>
                    </div> */}
                  </div>
                  <div className="mt-6">
                    <h4>
                      <span className="text-sm font-bold">Batches : </span>
                    </h4>
                    <div className="text-sm grid grid-cols-2 gap-4">
                      {item?.batch?.map((batch, i) => (
                        <p className="font-bold border p-1 rounded">
                          Farm Area :{" "}
                          <span className="font-normal">{item?.farm_area}</span>
                        </p>
                      ))}
                    </div>
                    <div className="mt-4 space-x-4 rtl:space-x-reverse">
                      <Link to="#" className="btn-link">
                        Learn more
                      </Link>
                      <Link to="#" className="btn-link">
                        Another link
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FarmerFarms;
