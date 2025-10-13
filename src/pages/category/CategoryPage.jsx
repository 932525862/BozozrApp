import React from "react";
import BrendsCard from "./components/BrendsCard";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const brends = [
  {
    id: 1,
    title: "Chortoq",
    text: "mahsulotlari",
    img: logo,
    subcategories: [
      { id: 1, title: "Suvlar", text: "mahsulotlari" },
      { id: 2, title: "Gazsiz ichimliklar", text: "mahsulotlari" },
      { id: 3, title: "Mineral suvlar", text: "mahsulotlari" },
    ],
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

const CategoryPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (brend) => {
    const formattedTitle = brend.title.replace(/\s+/g, "-");
    if (brend.subcategories && brend.subcategories.length > 0) {
      navigate(`/brends/${formattedTitle}/subbrends`, { state: brend });
    } else {
      navigate(`/brends/${formattedTitle}/products`, { state: brend });
    }
  };

  return (
    <div className="grid grid-cols-4 gap-[12px]">
      {brends.map((item) => (
        <div
          key={item.id}
          className="cursor-pointer"
          onClick={() => handleCardClick(item)}
        >
          <BrendsCard brend={item} />
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
