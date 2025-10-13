import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import ProductCard from "./components/ProductCard";

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
  const { state } = useLocation();
  const brend = state;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">
        {brend.selectedSub
          ? `${brend.title} - ${brend.selectedSub.title} mahsulotlari`
          : `${brend.title} mahsulotlari`}
      </h2>

      <div className="grid grid-cols-4 gap-[12px]">
      {products.map((item) => (
        <div
          key={item.id}
          className="cursor-pointer"
        //   onClick={() => handleCardClick(item)}
        >
          <ProductCard product={item} />
        </div>
      ))}
      </div>
    </div>
  );
};

export default ProductsPage;
