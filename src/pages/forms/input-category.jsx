import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Card from "../../components/ui/Card";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import uploadSvgImage from "@/assets/images/svg/upload.svg";
import Textinput from "../../components/ui/Textinput";
import axios from "axios";
import { toast } from "react-toastify";

// note => form validation schema
const FormValadtionSchema = yup
  .object({
    // nid_no: yup.string().required("Nid no is Required"),
  })
  .required();

const InputCategory = () => {
  const [files, setFiles] = useState([]);
  // note => useForm hook
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValadtionSchema),
  });

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

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", files[0]);
    formData.append("title", data.category_name);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE}/category`,
        formData,
        {
          headers: {
            Accept: "application/json",
            ContentType: "multipart/form-data", // note => for image upload
          },
        }
      );
      if (res.status === 201) {
        toast.success("Category Added Successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card title="Input Order">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          {/*// note => Image Upload */}
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
            name="category_name"
            label="Category Name"
            placeholder="Category Name"
            type="text"
            register={register}
            // error={errors.last_name}
            msgTooltip
          />

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Create Farmer</button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default InputCategory;
