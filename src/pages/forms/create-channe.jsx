import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Card from "../../components/ui/Card";
import Textinput from "../../components/ui/Textinput";
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// note => form validation schema
const FormValadtionSchema = yup
  .object({
    location: yup.string().required("Location is Required"),
    address: yup.string().required("Address is Required"),
    assign_user: yup.string().required("Assign User Field is Required"),
  })
  .required();

// note => react-select styles
const styles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const users = [
  { value: 1, label: "Fahim" },
  { value: 2, label: "Sumit" },
  { value: 3, label: "Abir" },
  { value: 4, label: "Antor" },
  { value: 5, label: "Rafiq" },
];

const CreateChannel = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [distributors, setDistributors] = useState([]); // [{value:1,label:"fahim"}
  const [selectedDistributorId, setSelectedDistributorId] = useState(null);
  const [microEntrepreneurs, setMicroEntrepreneurs] = useState([]); // [{value:1,label:"fahim"}
  const [selectedMicroEntrepreneursId, setSelectedMicroEntrepreneursId] =
    useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("hq-token");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValadtionSchema),
  });

  // note => fetch locations data
  const fetchLocations = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE}/upazila`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.data;
    setLocations(data);
  };

  // note => fetch distributors data
  const fetchDistributors = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE}/hq/unassigned_distributor`,

      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;
    setDistributors(data);
  };

  // note => Api calls
  useEffect(() => {
    fetchLocations();
    fetchDistributors();
    // fetchME();
  }, []);

  // note => form submit handler
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE}/hq/add_channel`,
        {
          upazila_id: parseInt(selectedLocationId),
          distributor_id: selectedDistributorId,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      Swal.fire("Grat Job!", "Channel Created Successfully", "success");
      setLoading(false);
    } catch (error) {
    
      Swal.fire("Ops!", "Error Creating Channel", "error");
      setLoading(false);
    }
  };

  return (
    <div>
      <Card title="Create Channel">
        <form onSubmit={onSubmit} className="space-y-4 ">
          {/* // note => Location */}
          <div>
            <label htmlFor=" hh" className="form-label ">
              Select Upazilla
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              // defaultValue={furits[0]}
              options={locations.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              styles={styles}
              onChange={(e) => setSelectedLocationId(e.value)}
              id="hh"
            />
          </div>
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
          <button
            disabled={loading}
            type="submit"
            className="btn btn-dark  text-center"
          >
            {loading ? (
              <div className="w-5 h-5  border-2 border-dashed rounded-full border-white animate-spin"></div>
            ) : (
              "Create Channel"
            )}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default CreateChannel;
