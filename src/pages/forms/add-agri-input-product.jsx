import Card from "../../components/ui/Card";
import Textinput from "../../components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Select from "react-select";

// note => image import
import uploadSvgImage from "@/assets/images/svg/upload.svg";
import { toast } from "react-toastify";
import axios from "axios";

// note => form validation schema
const FormValadtionSchema = yup
  .object({
    product_name: yup.string().required("Product Name is Required"),
    // category: yup.string().required("Category is Required"),
    // company: yup.string().required("Company is Required"),
    discount_in_percent: yup
      .string()
      .required("Discount in Percent is Required"),
    current_stock: yup.string().required("Current Stock is Required"),
    buy_price: yup.string().required("Buy Price is Required"),
    hq_commission: yup.string().required("HQ Commission is Required"),
    distributor_commission: yup
      .string()
      .required("Distributor Commission is Required"),
    me_commission: yup
      .string()
      .required("Micro Entrepreneurs Commission is Required"),
  })
  .required();

const AddAgriInputProduct = () => {
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState([]);
  const [company, setCompany] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  // note => useForm hook
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValadtionSchema),
  });

  // note => fetch category data
  const fetchCategoryData = async () => {
    setIsLoading(true);
    const response = await axios.get(`${import.meta.env.VITE_BASE}/category`);
    setCategory(response.data.data);
    setIsLoading(false);
  };

  // note => fetch company data
  const fetchCompanyData = async () => {
    setIsLoading(true);
    const response = await axios.get(`${import.meta.env.VITE_BASE}/hq/company`);
    setCompany(response.data);
    setIsLoading(false);
  };

  // note => Api call for create product
  useEffect(() => {
    fetchCategoryData();
    fetchCompanyData();
  }, []);

  // note => select field styles
  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.product_name);
    formData.append("image", files[0]);
    formData.append("category_id", parseInt(selectedCategoryId));
    formData.append("company_id", parseInt(selectedCompanyId));
    formData.append("price", parseFloat(data.buy_price));
    formData.append("discount", parseFloat(data.discount_in_percent));
    formData.append("hq_commission", parseFloat(data.hq_commission));
    formData.append("me_commission", parseFloat(data.me_commission));
    formData.append(
      "distributor_commission",
      parseFloat(data.distributor_commission)
    );

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE}/hq/product`,
        formData,
        {
          headers: {
            Accept: "application/json",
            ContentType: "multipart/form-data", // note => for image upload
          },
        }
      );
      toast.success("Product Added Successfully");
    } catch (error) {
      console.error(error); // note => for debugging
      toast.error("Error adding product");
    }
  };

  // note => dropzone
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  return (
    <div>
      <Card title="Add agri input - (product)">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Textinput
            name="product_name"
            label="Product Name"
            placeholder="Product Name"
            type="text"
            register={register}
            error={errors.product_name}
            msgTooltip
          />

          <div>
            <label htmlFor=" hh" className="form-label ">
              Select Category
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              // defaultValue={furits[0]}
              options={category.map((item) => ({
                value: item.id,
                label: item.title,
              }))}
              onChange={(e) => setSelectedCategoryId(e.value)}
              styles={styles}
              id="hh"
            />
          </div>

          <div>
            <label htmlFor=" hh" className="form-label ">
              Select Company
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              // defaultValue={furits[0]}
              options={company.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              styles={styles}
              onChange={(e) => setSelectedCompanyId(e.value)}
              id="hh"
            />
          </div>

          <Textinput
            name="discount_in_percent"
            label="Discount (Amount)"
            placeholder="Discount"
            type="text"
            register={register}
            error={errors.discount_in_percent}
            msgTooltip
          />
          <Textinput
            name="hq_commission"
            label="HQ Commission"
            placeholder="HQ Commission"
            type="text"
            register={register}
            error={errors.hq_commission}
            msgTooltip
          />
          <Textinput
            name="distributor_commission"
            label="Distributor Commission"
            placeholder="Distributor Commission"
            type="text"
            register={register}
            error={errors.distributor_commission}
            msgTooltip
          />
          <Textinput
            name="me_commission"
            label="ME Commission (Micro Entrepreneur)"
            placeholder="ME Commission (Micro Entrepreneur)"
            type="text"
            register={register}
            error={errors.me_commission}
            msgTooltip
          />
          <Textinput
            name="current_stock"
            label="Current Stock"
            placeholder="Current Stock"
            type="text"
            register={register}
            error={errors.current_stock}
            msgTooltip
          />
          {/* Image Upload */}
          <div className="xl:col-span-2 col-span-1 cursor-pointer">
            <Card title="Upload Image">
              <div className="w-full text-center border-dashed border border-secondary-500 rounded-md py-[52px] flex flex-col justify-center items-center">
                {files.length === 0 && (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input className="hidden" {...getInputProps()} />
                    <img src={uploadSvgImage} alt="" className="mx-auto mb-4" />
                    {isDragAccept ? (
                      <p className="text-sm text-slate-500 dark:text-slate-300 ">
                        Drop the files here ...
                      </p>
                    ) : (
                      <p className="text-sm text-slate-500 dark:text-slate-300 f">
                        Drop files here or click to upload.
                      </p>
                    )}
                  </div>
                )}
                <div className="flex space-x-4">
                  {files.map((file, i) => (
                    <div key={i} className="mb-4 flex-none">
                      <div className="h-[300px] w-[300px] mx-auto mt-6 rounded-md">
                        <img
                          src={file.preview}
                          className=" object-contain h-full w-full block rounded-md"
                          onLoad={() => {
                            URL.revokeObjectURL(file.preview);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
          <Textinput
            name="buy_price"
            label="Buy Price"
            placeholder="Buy Price"
            type="text"
            register={register}
            error={errors.buy_price}
            msgTooltip
          />
          {/* <Textarea
            name="remarks"
            label="Remarks"
            id="pn4"
            placeholder="Type here"
            register={register}
          /> */}
          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">
              Create Partner
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddAgriInputProduct;
