import React, { useState, useRef } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";

const ProductModal = ({ product_details }) => {
  
  return (
    <div>
      <Modal
        title="Product Details"
        label="View Product Details"
        labelClass="btn-outline-dark"
        uncontrol
        centered
        footerContent={
          <Button
            text="Accept"
            className="btn-dark "
            onClick={() => {
              alert("use Control Modal");
            }}
          />
        }
      >
        <h4 className="font-medium text-lg mb-3 text-slate-900">
          Lorem ipsum dolor sit.
        </h4>
        <div className="text-base text-slate-600 dark:text-slate-300">
          Oat cake ice cream candy chocolate cake chocolate cake cotton candy
          dragée apple pie. Brownie carrot cake candy canes bonbon fruitcake
          topping halvah. Cake sweet roll cake cheesecake cookie chocolate cake
          liquorice.
        </div>
      </Modal>
    </div>
  );
};

export default ProductModal;
