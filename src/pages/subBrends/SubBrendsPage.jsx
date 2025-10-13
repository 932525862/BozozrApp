import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BrendsCard from "../category/components/BrendsCard";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const SubBrendsPage = () => {
  const { state: brend } = useLocation();
  const navigate = useNavigate();

  console.log(brend);
  

  if (!brend) return <div>Ma'lumot topilmadi</div>;

  const handleSubClick = (sub) => {
    // Bo‘sh joylarni "-" bilan almashtirish
    const formattedTitle = brend.title.replace(/\s+/g, "-");
    navigate(`/brends/${formattedTitle}/products`, {
      state: { ...brend, selectedSub: sub },
    });
  };

  return (
    <div>
      <div className="bg-[#FFFFFF] rounded-[8px] mb-4 py-[10px] px-[12px]">
        <CustomBreadcrumb items={[
    { label: "Brendlar", to: "/brends" },
    { label: brend?.title },
  ]}/>
      </div>
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
