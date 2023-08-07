import { useState } from "react";
import MicroEntrepreneursLists from "./micro-entrepreneurs-lists";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../../../components/ui/Card";
import Select from "react-select";
import Swal from "sweetalert2";
import { useGetSingleDistributorDetailsQuery } from "../../../store/features/distributor/api";
import {
  useAssignMicroEntrepreneurMutation,
  useGetAllUnassignedMicroEntrepreneursQuery,
} from "../../../store/features/micro-entrepreneurs/api";

const AssignMicroEntrepreneurs = () => {
  const params = useParams();
  const token = localStorage.getItem("hq-token");
  const { data, isLoading, isError } = useGetSingleDistributorDetailsQuery(
    params.id
  );
  isError && console.log("Error getting DB Details");
  const {
    data: microEntrepreneurs,
    isLoading: me_loading,
    isError: me_error,
  } = useGetAllUnassignedMicroEntrepreneursQuery();
  me_error && console.log("Error getting unassigned me");

  const [assignMicroEntrepreneur, { error, isSuccess }] =
    useAssignMicroEntrepreneurMutation();

  const [selectedMicroEntrepreneursId, setSelectedMicroEntrepreneursId] =
    useState([]);

  // note => react-select styles
  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  // note => form submit handler
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMicroEntrepreneursId?.length)
      return Swal.fire("Error", "Please Select a MicroEntrepreneur", "error");

    const option = {
      under: params.id,
      list: [...selectedMicroEntrepreneursId],
    };

    try {
      assignMicroEntrepreneur(option);
      Swal.fire(
        "Success",
        "MicroEntrepreneur Assigned Successfully",
        "success"
      );
      console.log(isSuccess, error);
    } catch (error) {
      Swal.fire("Error", "MicroEntrepreneur Assign Failed", "error");
      console.log(error);
    }
  };

  return (
    <div className="space-y-10 w-11/12 mx-auto mt-10 mb-14">
      <Card title={`${data ? data?.full_name : "Name Loading..."}`}>
        <form onSubmit={onSubmit} className="space-y-4 ">
          {/* // note => Micro Entrepreneurs */}
          <div>
            <label className="form-label" htmlFor="mul_1">
              Assign Micro Entrepreneurs
            </label>
            <Select
              // isClearable={false}
              // defaultValue={[fruits[2], fruits[3]]}
              styles={styles}
              isMulti
              name="colors"
              isDisabled={!microEntrepreneurs}
              options={
                microEntrepreneurs &&
                microEntrepreneurs?.map((item) => ({
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
                setSelectedMicroEntrepreneursId(selectedValues);
              }}
              className="react-select"
              classNamePrefix="select"
              id="mul_1"
            />
          </div>
          <button className="btn btn-dark  text-center">
            Assign Micro Entrepreneurs
          </button>
        </form>
      </Card>
      {/* <DistributorsList params={params} /> */}
      <MicroEntrepreneursLists me_list={data?.me_list} isLoading={isLoading} />
    </div>
  );
};

export default AssignMicroEntrepreneurs;
