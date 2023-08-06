import { useState } from "react";
import Card from "../../components/ui/Card";
import Checkbox from "../../components/ui/Checkbox";
import Textinput from "../../components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Flatpickr from "react-flatpickr";
import Select from "react-select";

const FormValadtionSchema = yup
  .object({
    amount: yup.string().required("Amount is Required"),
    notes: yup.string().required("Notes / KPI title is Required"),
    quantity: yup.string().required("Quantity is Required"),
    unit: yup.string().required("Unit is Required"),
  })
  .required();

const SetKpi = () => {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [picker, setPicker] = useState(new Date());
  const [picker2, setPicker2] = useState(new Date());

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValadtionSchema),
  });

  // note => react-select styles
  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  const onSubmit = (data) => {
    
  };

  return (
    <div>
      <Card title="Set Kpi">
        <div className="space-y-10">
          <div className="flex space-x-20 ">
            <Checkbox
              label="For all distributor"
              value={checked}
              onChange={() => setChecked(!checked)}
            />
            <Checkbox
              label="For specific distributor"
              value={checked2}
              onChange={() => setChecked2(!checked2)}
            />
          </div>
          {checked2 && (
            <div className="mt-6">
              <label className="form-label" htmlFor="mul_1">
                Assign Location
              </label>
              <Select
                // isClearable={false}
                // defaultValue={[fruits[2], fruits[3]]}
                styles={styles}
                isMulti
                name="colors"
                // isDisabled={!distributors}
                // options={
                //   distributors &&
                //   distributors?.map((item) => ({
                //     value: item.deshifarmer_id,
                //     label: item.full_name,
                //   }))
                // }
                // onChange={(selectedOptions) => {
                //   // Get an array of selected option values
                //   const selectedValues = selectedOptions.map(
                //     (option) => option.value
                //   );

                //   // note => Set the state or update a variable with the selected values
                //   setSelectedDistributorId(selectedValues);
                // }}
                className="react-select"
                classNamePrefix="select"
                id="mul_1"
              />
            </div>
          )}
          <div className="flex space-x-20 ">
            <Checkbox
              label="For all micro entrepreneur"
              value={checked3}
              onChange={() => setChecked3(!checked3)}
            />
            <Checkbox
              label="For specific micro entrepreneur"
              value={checked4}
              onChange={() => setChecked4(!checked4)}
            />
          </div>
        </div>

        <div>
          <p className="mt-6">Type</p>
          <div className="flex space-x-20 mt-6">
            <Checkbox
              label="Sales Amount"
              value={checked5}
              onChange={() => setChecked5(!checked5)}
            />
            <Checkbox
              label="Sales Volume"
              value={checked6}
              onChange={() => setChecked6(!checked6)}
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            {checked6 && (
              <div className="grid grid-cols-6 gap-10">
                <div className="mt-6 grid col-span-2">
                  <Textinput
                    name="quantity"
                    label="Quantity"
                    placeholder="Quantity"
                    type="text"
                    register={register}
                    error={errors.quantity}
                    msgTooltip
                  />
                </div>
                <div className="mt-6 grid col-span-1">
                  <Textinput
                    name="unit"
                    label="Unit"
                    placeholder="Unit"
                    type="text"
                    register={register}
                    error={errors.unit}
                    msgTooltip
                  />
                </div>
              </div>
            )}
            {
              // note => if checked5 is true then show this
              checked5 && (
                <div className="mt-6">
                  <Textinput
                    name="amount"
                    label="Amount"
                    placeholder="Amount"
                    type="text"
                    register={register}
                    error={errors.amount}
                    msgTooltip
                  />
                </div>
              )
            }
            <div className="mt-6">
              <Textinput
                name="notes"
                label="Notes / KPI title"
                placeholder="Notes / KPI title"
                type="text"
                register={register}
                error={errors.notes}
                msgTooltip
              />
            </div>
            <p className="mt-6">Select KPI Timeline</p>
            <div className="grid grid-cols-2 gap-10">
              <div className="w-full">
                <label htmlFor="default-picker" className=" form-label">
                  Start Date
                </label>
                <Flatpickr
                  className="form-control py-2"
                  value={picker}
                  onChange={(date) => setPicker(date)}
                  id="default-picker"
                />
              </div>
              <div className="w-full">
                <label htmlFor="default-picker" className=" form-label">
                  End Date
                </label>
                <Flatpickr
                  className="form-control py-2"
                  value={picker2}
                  onChange={(date) => setPicker2(date)}
                  id="default-picker"
                />
              </div>
            </div>
            <div className="ltr:text-right rtl:text-left w-full">
              <button className="btn btn-dark  text-center w-full">
                Create Target
              </button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default SetKpi;
