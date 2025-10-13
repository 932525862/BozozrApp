import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BrendsCard from "../category/components/BrendsCard";

const SubBrendsPage = () => {
  const { state: brend } = useLocation();
  const navigate = useNavigate();

  if (!brend) return <div>Ma'lumot topilmadi</div>;

  const handleSubClick = (sub) => {
    navigate(`/brends/${brend.title}/products`, {
      state: { ...brend, selectedSub: sub },
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {brend.title} subkategoriyalari
      </h2>
      <div className="grid grid-cols-4 gap-[12px]">
        {brend.subcategories.map((sub) => (
          <div
            key={sub.id}
            className="cursor-pointer"
            onClick={() => handleSubClick(sub)}
          >
            <BrendsCard brend={{ ...sub, img: brend.img }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubBrendsPage;
