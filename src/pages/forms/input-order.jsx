import { useForm } from "react-hook-form";
import Card from "../../components/ui/Card";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "../../components/ui/Textinput";
import Select from "react-select";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// note => form validation schema
const FormValadtionSchema = yup
  .object({
    // quantity: yup.string().required("Product Quantity is Required"),
    // total_price: yup.string().required("Total Price is Required"),
  })
  .required();

// note => select field styles
const styles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const InputOrder = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [selectedFarmerId, setSelectedFarmerId] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValadtionSchema),
  });

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE}/hq/product`
      );
      const { data } = response;
      setProducts(data.data);
    } catch (error) {
    
    }
  };

  const getUnits = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE}/unit`);
      const { data } = response;
      setUnits(data);
    } catch (error) {
      
    }
  };

  const farmersList = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE}/farmer`);
      const { data } = response;
      setFarmers(data);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getProducts();
    getUnits();
    farmersList();
  }, []);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("product_id", selectedProductId);
    formData.append("quantity", data.quantity);
    formData.append("unit", parseInt(selectedUnitId));
    formData.append("sold_to", "HQ");

    // try {
    //   const response = axios.post(
    //     `${import.meta.env.VITE_BASE}/input_order`,
    //     formData
    //   );
    //   setUnits(response.data);
    //   toast.success("Input Order Created Successfully");
    // } catch (error) {
    //   
    // }
  };

  return (
    <div>
      <Card title="Input Order">
        {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <div>
            <label htmlFor=" hh" className="form-label ">
              Select Product
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              //   defaultValue={furits[0]}
              options={products.map((item) => ({
                value: item.product_id,
                label: item.name.toUpperCase(),
              }))}
              styles={styles}
              onChange={(e) => setSelectedProductId(e.value)}
              id="hh"
            />
          </div>
          <Textinput
            name="quantity"
            label="Product Quantity"
            placeholder="Product Quantity"
            type="text"
            register={register}
            error={errors.quantity}
            msgTooltip
          />
          <div>
            <label htmlFor=" hh" className="form-label ">
              Select Unit
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              //   defaultValue={furits[0]}
              options={units.map((item) => ({
                value: item.id,
                label: item.unit,
              }))}
              styles={styles}
              onChange={(e) => {
                setSelectedUnitId(e.value);
              }}
              id="hh"
            />
          </div>
          <div>
            <label htmlFor=" hh" className="form-label ">
              Sold To
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              //   defaultValue={furits[0]}
              options={farmers.map((item) => ({
                value: item.farmer_id,
                label: item.full_name,
              }))}
              styles={styles}
              onChange={(e) => setSelectedUnitId(e.value)}
              id="hh"
            />
          </div>
          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Create Order</button>
          </div>
        </form> */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <div>
            <label htmlFor=" hh" className="form-label ">
              Select Product
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              //   defaultValue={furits[0]}
              options={products.map((item) => ({
                value: item.product_id,
                label: item.name.toUpperCase(),
              }))}
              styles={styles}
              onChange={(e) => setSelectedProductId(e.value)}
              id="hh"
            />
          </div>
          <Textinput
            name="quantity"
            label="Product Quantity"
            placeholder="Product Quantity"
            type="text"
            register={register}
            error={errors.quantity}
            msgTooltip
          />
          <div>
            <label htmlFor=" hh" className="form-label ">
              Select Unit
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              //   defaultValue={furits[0]}
              options={units.map((item) => ({
                value: item.id,
                label: item.unit,
              }))}
              styles={styles}
              onChange={(e) => {
                setSelectedUnitId(e.value);
              }}
              id="hh"
            />
          </div>
          <div>
            <label htmlFor=" hh" className="form-label ">
              Sold To
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              //   defaultValue={furits[0]}
              options={farmers.map((item) => ({
                value: item.farmer_id,
                label: item.full_name,
              }))}
              styles={styles}
              onChange={(e) => setSelectedUnitId(e.value)}
              id="hh"
            />
          </div>
          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Create Order</button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default InputOrder;
