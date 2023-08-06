import React, { useState, useRef } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import Image from "@/components/ui/Image";
import { saveAs } from "file-saver";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Dialog } from "@headlessui/react";

// const ViewReceipt = ({ row }) => {
//   const navigate = useNavigate();
//   const [amount, setAmount] = useState(row?.cell?.row?.original?.amount);
//   const token = localStorage.getItem("hq-token");
//   const [showModal, setShowModal] = useState(false);

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const openModal = () => {
//     setShowModal(!showModal);
//   };
//   const returnNull = () => {
//     return null;
//   };

//   const handleDownloadImage = () => {
//     let url = `${import.meta.env.VITE_IMG_URL}/${
//       row?.cell?.row?.original?.receipt
//     }`;
//     saveAs(url, `${row?.cell?.row?.original?.distributor?.full_name}`);
//   };

//   const handle_accept = async () => {
//     try {
//       const rersponse = await axios.put(
//         `${import.meta.env.VITE_BASE}/hq/distributor/cash_in_request/${
//           row?.cell?.row?.original?.receipt_id
//         }`,
//         {
//           status: "approved",
//           accepted_amount: parseFloat(amount),
//         },
//         {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       Swal.fire("Success", "Request Accepted", "success");
//     } catch (error) {
//       Swal.fire("Ops!", "Something went wrong", "error");
//     }
//   };

//   const handle_reject = async () => {
//     try {
//       const rersponse = await axios.put(
//         `${import.meta.env.VITE_BASE}/hq/distributor/cash_in_request/${
//           row?.cell?.row?.original?.receipt_id
//         }`,
//         {
//           status: "rejected",
//         },
//         {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       Swal.fire("Success", "Request Rejected", "error");
//     } catch (error) {
//       Swal.fire("Ops!", "Something went wrong", "error");
//     }
//   };

//   return (
//     <div>
//       <Modal
//         title="Receipt Details"
//         label="View Receipt"
//         labelClass="btn-outline-dark"
//         uncontrol
//         centered
//         onClose
//         footerContent={
//           <>
//             <Button
//               text="Accept"
//               className="btn-success "
//               onClick={handle_accept}
//             />
//             <Button
//               text="Reject"
//               className="btn-warning "
//               onClick={handle_reject}
//             />
//           </>
//         }
//       >
//         <div className="flex justify-between items-center">
//           <h4 className="font-medium text-lg mb-3 text-slate-900">Receipt</h4>
//           <button
//             onClick={handleDownloadImage}
//             className="font-medium text-lg mb-3 text-slate-900 bg-white px-4 py-1 rounded-full"
//           >
//             Download Receipt
//           </button>
//         </div>

//         <div className="text-base text-slate-600 dark:text-slate-300">
//           <img
//             src={`${import.meta.env.VITE_IMG_URL}/${
//               row?.cell?.row?.original?.receipt
//             }`}
//             alt="thumb-1"
//             className="rounded-md border-4 border-slate-300 w-full h-full"
//           />
//         </div>
//         <div className="mt-6">
//           <Textinput
//             label="Requested Amount"
//             id="am"
//             type="text"
//             placeholder="Requested Amount"
//             defaultValue={row?.cell?.row?.original?.amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//         </div>
//       </Modal>
//     </div>
//   );
// };

const ViewReceipt = ({ row }) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(row?.cell?.row?.original?.amount);
  const token = localStorage.getItem("hq-token");
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(!showModal);
  };

  const returnNull = () => {
    return null;
  };

  const handleDownloadImage = () => {
    let url = `${import.meta.env.VITE_IMG_URL}/${
      row?.cell?.row?.original?.receipt
    }`;
    saveAs(url, `${row?.cell?.row?.original?.distributor?.full_name}`);
  };

  const handle_accept = async () => {
    if (row?.cell?.row?.original?.status === "approved") {
      closeModal();
      return Swal.fire(
        "Ops!",
        "Request Already Accepted, You can't accept it again",
        "info"
      );
    }
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE}/hq/distributor/cash_in_request/${
          row?.cell?.row?.original?.receipt_id
        }`,
        {
          status: "approved",
          accepted_amount: parseFloat(amount),
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire("Success!", "Request Accepted", "success");
      closeModal();
    } catch (error) {
      Swal.fire("Ops!", "Something went wrong", "error");
      closeModal();
    }
  };

  const handle_reject = async () => {
    if (row?.cell?.row?.original?.status === "approved") {
      closeModal();
      return Swal.fire(
        "Ops!",
        "Request Already Accepted, Once you accept the request you can't reject it",
        "info"
      );
    }
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE}/hq/distributor/cash_in_request/${
          row?.cell?.row?.original?.receipt_id
        }`,
        {
          status: "rejected",
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.statusText === "OK") {
        Swal.fire("Ops!", "Request Already Rejected", "info");
      } else if (response.statusText === "Created") {
        Swal.fire("Success", "Request Rejected", "success");
      } else {
        Swal.fire("Ops!", "Something went wrong ", "error");
      }
      closeModal();
    } catch (error) {
      Swal.fire("Ops!", "Something went wrong", "error");
    }
  };

  return (
    <div>
      <Modal
        title="Receipt Details"
        label="View Receipt"
        labelClass="btn-outline-dark"
        uncontrol
        centered
        onClose
        activeModal
        showModal={showModal}
        setShowModal={setShowModal}
        openModal={openModal}
        closeModal={closeModal}
        footerContent={
          <>
            <Button
              text="Accept"
              className="btn-success "
              onClick={handle_accept}
            />
            <Button
              text="Reject"
              className="btn-warning "
              onClick={handle_reject}
            />
          </>
        }
      >
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg mb-3 text-slate-900">Receipt</h4>
          <button
            onClick={handleDownloadImage}
            className="font-medium text-lg mb-3 text-slate-900 bg-green-500  px-4 py-1 rounded-full"
          >
            Download Receipt
          </button>
        </div>

        <div className="text-base text-slate-600 dark:text-slate-300">
          <img
            src={`${import.meta.env.VITE_IMG_URL}${
              row?.cell?.row?.original?.receipt
            }`}
            alt="thumb-1"
            className="rounded-md border-4 border-slate-300 w-full h-full"
          />
        </div>
        <div className="mt-6">
          <Textinput
            label="Requested Amount"
            id="am"
            type="text"
            placeholder="Requested Amount"
            defaultValue={row?.cell?.row?.original?.amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ViewReceipt;
