import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BrendsCard from "../category/components/BrendsCard";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import { useFetchOne } from "../../hooks/useFetchOne";
import { useShoppingStore } from "../../store/shoppingStore";
import Loding from "../../components/Loding";
import { useTranslation } from "react-i18next";
import { getLangValue } from "../../utils/utils";

const SubBrendsPage = () => {
  const {t, i18n} = useTranslation()
  const { state: brend } = useLocation();
  const navigate = useNavigate();
  const {brendId} = useShoppingStore()
  
  const { data, isLoading } = useFetchOne({
      key: [`category/${brendId?.id}`, ],
      url: `/category/${brendId?.id}`
    });

  const handleSubClick = (sub) => {
    const formattedTitle = data?.titleEn.replace(/\s+/g, "-");
    navigate(`/brends/${formattedTitle}/products`, {
      state: { ...brend, selectedSub: sub },
    });
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center"><Loding/></div>
    );
  }

  return (
    <div>
      <div className="bg-[#FFFFFF] rounded-[8px] mb-4 py-[10px] px-[12px]">
        <CustomBreadcrumb items={[
        { label: t("brends.brade.brendName"), to: "/brends" },
        { label: getLangValue(data, "title", i18n.language) },
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
