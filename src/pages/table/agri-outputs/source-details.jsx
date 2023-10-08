import React, { useState, useRef } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import { saveAs } from "file-saver";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const ViewSource = ({ row }) => {
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
        title="View Details"
        label="View Source"
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
            {row?.cell?.row?.original?.status === "approved" ? (
              <p
                onClick={() => toast.error("Already Accepted")}
                className="bg-red-500 cursor-pointer text-white p-2 rounded"
              >
                Already Accepted, You can't accept it again
              </p>
            ) : (
              <div className="space-x-4">
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
              </div>
            )}
          </>
        }
      >
        {/* <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg mb-3 text-slate-900">Receipt</h4>
          <button
            onClick={handleDownloadImage}
            className="font-medium text-lg mb-3 text-slate-900 bg-green-500  px-4 py-1 rounded-full"
          >
            Download Receipt
          </button>
        </div> */}

        {/* <div className="text-base text-slate-600 dark:text-slate-300">
          <img
            src={`${import.meta.env.VITE_IMG_URL}${
              row?.cell?.row?.original?.receipt
            }`}
            alt="thumb-1"
            className="rounded-md border-4 border-slate-300 w-full h-full"
          />
        </div> */}
        <div className="mt-6">
          <Textinput
            label="test fields"
            id="am"
            type="text"
            placeholder="test fields"
            defaultValue=""
          />
        </div>
      </Modal>
    </div>
  );
};

export default ViewSource;
