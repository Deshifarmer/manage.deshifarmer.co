import { useState } from "react";
import DistributorsList from "./distributor-lists";
import MicroEntrepreneursLists from "./micro-entrepreneurs-lists";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../../../components/ui/Card";
import Select from "react-select";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useGetSingleDistributorDetailsQuery } from "../../../store/features/distributor/api";

const AssignMicroEntrepreneurs = () => {
  const params = useParams();
  const { data, isLoading } = useGetSingleDistributorDetailsQuery(params.id);
  const [microEntrepreneurs, setMicroEntrepreneurs] = useState([]); // [{value:1,label:"fahim"}
  const [selectedMicroEntrepreneursId, setSelectedMicroEntrepreneursId] =
    useState([]);
  const token = localStorage.getItem("hq-token");

  // note => react-select styles
  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  // note => fetch locations data

  const fetchMe = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE}/hq/unassigned_me`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    setMicroEntrepreneurs(data);
  };

  // note => Api calls
  useEffect(() => {
    fetchMe();
  }, []);

  // note => form submit handler

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE}/hq/assign_me`,
        {
          under: params.id,
          list: [...selectedMicroEntrepreneursId],
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      Swal.fire("Success", "Me Assigned Successfully", "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Ops!", "Something Went", "error");
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
