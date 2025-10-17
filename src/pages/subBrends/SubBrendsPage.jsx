import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BrendsCard from "../category/components/BrendsCard";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import { useFetchOne } from "../../hooks/useFetchOne";
import { useShoppingStore } from "../../store/shoppingStore";

const SubBrendsPage = () => {
  const { state: brend } = useLocation();
  const navigate = useNavigate();
  const {brendId} = useShoppingStore()
  
  const { data } = useFetchOne({
      key: [`category/${brendId?.id}`, ],
      url: `/category/${brendId?.id}`
    });

  const handleSubClick = (sub) => {
    // Bo‘sh joylarni "-" bilan almashtirish
    const formattedTitle = data?.titleEn.replace(/\s+/g, "-");
    navigate(`/brends/${formattedTitle}/products`, {
      state: { ...brend, selectedSub: sub },
    });
  };

  return (
    <div>
      <div className="bg-[#FFFFFF] rounded-[8px] mb-4 py-[10px] px-[12px]">
        <CustomBreadcrumb items={[
        { label: "Brendlar", to: "/brends" },
        { label: data?.titleUz },
      ]}/>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[12px]">
        {data?.children?.map((sub) => (
          <div
            key={sub.id}
            className="cursor-pointer"
            onClick={() => handleSubClick(sub)}
          >
            <BrendsCard brend={{ ...sub }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubBrendsPage;
