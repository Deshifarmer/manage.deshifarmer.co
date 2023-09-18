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

const ViewBatches = ({ row }) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(row?.cell?.row?.original?.amount);
  const token = localStorage.getItem("hq-token");
  const [showModal, setShowModal] = useState(false);

  console.log(row);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(!showModal);
  };

  const returnNull = () => {
    return null;
  };

  return (
    <div>
      <Modal
        title="Batches"
        label="View Batches"
        labelClass="btn-outline-dark"
        uncontrol
        centered
        fixed
        onClose
        activeModal
        showModal={showModal}
        setShowModal={setShowModal}
        openModal={openModal}
        closeModal={closeModal}
      >
        <div className="grid grid-cols-2 gap-4"></div>
      </Modal>
    </div>
  );
};

export default ViewBatches;
