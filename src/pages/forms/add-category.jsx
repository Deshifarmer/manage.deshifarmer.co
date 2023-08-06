import Card from "../../components/ui/Card";
import Textinput from "../../components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import uploadSvgImage from "@/assets/images/svg/upload.svg";
import Swal from "sweetalert2";

// note => form validation schema
const FormValadtionSchema = yup
  .object({
    // nid_no: yup.string().required("Nid no is Required"),
  })
  .required();

// note => date picker config

const AddCategory = () => {
  const [files, setFiles] = useState([]);
  const token = localStorage.getItem("hq-token");
  const [loading, setLoading] = useState(false);

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

  // note => useForm hook

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(FormValadtionSchema),
  });

  const onSubmit = async (data) => {
    // accept only jpg, png, jpeg file format
    if (
      files[0].type !== "image/jpg" &&
      files[0].type !== "image/png" &&
      files[0].type !== "image/jpeg"
    ) {
      toast.error("Please upload jpg, png, jpeg file format");
      return;
    }

    const formData = new FormData();
    formData.append("image", files[0]);
    formData.append("title", data.title);

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE}/hq/add_category`,
        formData,
        {
          headers: {
            Accept: "application/json",
            ContentType: "multipart/form-data", // note => for image upload
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
      Swal.fire("Success", "Category Added Successfully", "success");
      setLoading(false);
      reset();
    } catch (error) {
      Swal.fire("Ops!", "Something went wrong", "error");
      setLoading(false);
    }
  };

  return (
    <div>
      <Card title="Add Category">
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
            name="title"
            label="category title"
            placeholder="Category title"
            type="text"
            register={register}
            // error={errors.nid_no}
            msgTooltip
          />
          <button
            disabled={loading}
            type="submit"
            className="btn btn-dark  text-center"
          >
            {loading ? (
              <div className="w-5 h-5  border-2 border-dashed rounded-full border-white animate-spin"></div>
            ) : (
              "Add Category"
            )}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default AddCategory;
