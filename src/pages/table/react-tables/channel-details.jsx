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
  const token = localStorage.getItem("hq-token");

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
    // try {
    //   const response = await axios.post(
    //     `${import.meta.env.VITE_BASE}/hq/channel/${params.id}/assign_dis`,
    //     {
    //       list: [...selectedDistributorId],
    //     },
    //     {
    //       headers: {
    //         Accept: "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   Swal.fire("Success", "Distibutor Assigned Successfully", "success");
    // } catch (error) {
    //   toast.error(error.response.data.channel_name);
    // }
    const option = {
      id: params?.id,
      list: [...selectedDistributorId],
    };

    assignDistributor(option);
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
            Assign Distributor
          </button>
        </form>
      </Card>
      <DistributorsList params={params} />
    </div>
  );
};

export default ChannelDetails;
