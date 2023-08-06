import { useState } from "react";
import DistributorsList from "./distributor-lists";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../../../components/ui/Card";
import Select from "react-select";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ChannelList from "./channel-list";

const AssignChannel = () => {
  const params = useParams();
  const [channel, setChannel] = useState([]); // [{value:1,label:"fahim"}
  const [selectedChannel, setSelectedChannel] = useState([]);
  const token = localStorage.getItem("hq-token");

  // note => react-select styles
  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  // note => fetch locations data
  const fetchDistributor = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE}/hq/unassigned_channel`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data;

    setChannel(data);
  };
  // note => fetch locations data

  // note => Api calls
  useEffect(() => {
    fetchDistributor();
  }, []);

  // note => form submit handler
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE}/hq/assign_channel/${params.id}`,
        {
          list: [...selectedChannel],
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire("Success", "Channel Assigned Successfully", "success");
    } catch (error) {
      toast.error(error.response.data.channel_name);
    }
  };

  return (
    <div className="space-y-10 w-11/12 mx-auto mt-10 mb-14">
      <Card title={`${params?.id}`}>
        <form onSubmit={onSubmit} className="space-y-4 ">
          {/* // note => Distributor */}
          <div>
            <label className="form-label" htmlFor="mul_1">
              Assign Channel
            </label>
            <Select
              // isClearable={false}
              // defaultValue={[fruits[2], fruits[3]]}
              styles={styles}
              isMulti
              name="colors"
              isDisabled={!channel}
              options={
                channel &&
                channel?.map((item) => ({
                  value: item.channel_name,
                  label: item.channel_name,
                }))
              }
              onChange={(selectedOptions) => {
                // Get an array of selected option values
                const selectedValues = selectedOptions.map(
                  (option) => option.value
                );

                // note => Set the state or update a variable with the selected values
                setSelectedChannel(selectedValues);
              }}
              className="react-select"
              classNamePrefix="select"
              id="mul_1"
            />
          </div>
          <button className="btn btn-dark  text-center">Assign Channel</button>
        </form>
      </Card>
      <ChannelList params={params} />
    </div>
  );
};

export default AssignChannel;
