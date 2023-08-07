import { useState } from "react";
import DistributorsList from "./distributor-lists";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../../../components/ui/Card";
import Select from "react-select";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useGetAllUnassignedDistributorQuery } from "../../../store/features/distributor/api";
import { useAssignDistributorMutation } from "../../../store/features/channels/api";

const ChannelDetails = () => {
  const params = useParams();
  const {
    data: distributors,
    isLoading,
    isError,
  } = useGetAllUnassignedDistributorQuery();
  isError && console.log("Error getting unassigned farmers");
  const [selectedDistributorId, setSelectedDistributorId] = useState([]);
  // note => react-select styles
  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };
  const [
    assignDistributor,
    { data, error, isSuccess, isError: dbAssignError },
  ] = useAssignDistributorMutation();
  // note => form submit handler
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDistributorId?.length)
      return Swal.fire("Error", "Please Select a Distributor", "error");
    const option = {
      id: params?.id,
      list: [...selectedDistributorId],
    };
    try {
      assignDistributor(option);
      Swal.fire("Success", "Distributor Added Successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Distributor Add Failed", "error");
    }
  };

  return (
    <div className="space-y-10 w-11/12 mx-auto mt-10 mb-14">
      <Card title={`${params?.id}`}>
        <form onSubmit={onSubmit} className="space-y-4 ">
          {/* // note => Distributor */}
          <div>
            <label className="form-label" htmlFor="mul_1">
              Assign Distributor
            </label>
            <Select
              // isClearable={false}
              // defaultValue={[fruits[2], fruits[3]]}
              styles={styles}
              isMulti
              name="colors"
              isDisabled={!distributors}
              options={
                distributors &&
                distributors?.map((item) => ({
                  value: item.df_id,
                  label: item.full_name,
                }))
              }
              onChange={(selectedOptions) => {
                // Get an array of selected option values
                const selectedValues = selectedOptions.map(
                  (option) => option.value
                );

                // note => Set the state or update a variable with the selected values
                setSelectedDistributorId(selectedValues);
              }}
              className="react-select"
              classNamePrefix="select"
              id="mul_1"
            />
          </div>
          <button className="btn btn-dark  text-center">
            {isLoading ? "Assigning.." : "Assign Distributor"}
          </button>
        </form>
      </Card>
      <DistributorsList params={params} />
    </div>
  );
};

export default ChannelDetails;
