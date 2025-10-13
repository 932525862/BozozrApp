import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import ProductCard from "./components/ProductCard";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import CustomModal from "../../components/CustomModal";

const products = [
  {
    id: 1,
    title: "Chortoq",
    text: "mahsulotlari",
    img: logo,
  },
  {
    id: 2,
    title: "Rash Milk",
    text: "mahsulotlari",
    img: logo,
  },
  {
    id: 3,
    title: "Dena",
    text: "mahsulotlari",
    img: logo,
  },
  {
    id: 4,
    title: "Ermak",
    text: "mahsulotlari",
    img: logo,
  },
];

const ProductsPage = () => {
  const [selectProduct, setSelectProduct] = useState(null);

  const [open, setOpen] = useState(false);

  const handleOpen = (product) => {
    setSelectProduct(product);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const { state } = useLocation();
  const brend = state;

  console.log(brend);

  return (
    <div>
      <div className="bg-[#FFFFFF] rounded-[8px] mb-4 py-[10px] px-[12px]">
        <CustomBreadcrumb
          items={[
            { label: "Brendlar", to: "/brends" },
            {
              label: brend?.title,
              to: `/brends/${brend?.title?.replace(/\s+/g, "-")}`,
            },
            // faqat selectSub mavjud bo‘lsa uchinchi elementni qo‘shamiz
            ...(brend?.selectSub ? [{ label: brend?.selectSub?.title }] : []),
          ]}
        />
      </div>

      <div className="grid grid-cols-4 gap-[12px]">
        {products.map((item) => (
          <div key={item.id} className="cursor-pointer">
            <ProductCard product={item} handleOpen={handleOpen} />
          </div>
        ))}
      </div>
      <CustomModal
        open={open}
        title="Mahsulot qo'shish"
        onCancel={handleClose}
        width={351}
      >
        {/* <AddMarketForm/> */}
      </CustomModal>
    </div>
  );
};

export default ProductsPage;
