import React from "react";
import logo from "../../../assets/product.png";
import PrimaryButton from "../../../components/PrimaryButton";
import { formatNumberWithSpace, getLangValue } from "../../../utils/utils";
import { useTranslation } from "react-i18next";
import comentLogo from "../../../assets/coment.png";
import TrashIcon from "../../../assets/Frame 4144217.svg";
import TasdiqIcon from "../../../assets/Frame 4144218.svg";

const ProductCard = ({ product, setSelectProduct, handleOpen }) => {
  const { t, i18n } = useTranslation();

  const handleProduct = (type) => {
    setSelectProduct(product);
    handleOpen(type);
  };

  function calculateProductTotal(product) {
    if (!product) return 0;
    const { calculationType, quantity = 0, price = 0 } = product;
    if (calculationType === "one")
      return formatNumberWithSpace(quantity * price);
    if (calculationType === "all") return formatNumberWithSpace(price);
    return 0;
  }

  return (
    <div
      className="
        bg-white rounded-[16px] p-[12px] flex flex-col 
        transition sm:p-[16px]
      "
    >
      {/* 🖥 Desktop versiya */}
      <div className="hidden sm:flex flex-col">
        <div className="w-[100px] h-[100px] mx-auto mb-[10px]">
          <img
            src={product?.product?.images ? product?.product?.images : logo}
            alt="product photo"
            className="w-auto h-full object-contain mb-2"
          />
        </div>

        <div className="flex justify-between gap-[16px] items-center">
          <div className="max-w-[155px]">
            <h3 className="text-[18px] font-[600] text-[#1E1E1E] truncate w-full">
              {product?.product
                ? getLangValue(product?.product, "title", i18n.language)
                : product?.productName}
            </h3>
            <p className="text-[#06B2B6] font-[500] text-sm mb-3">
              {product.quantity}{" "}
              {getLangValue(product?.unit, "name", i18n.language)}
            </p>
          </div>
          <div
            onClick={() => handleProduct("seen")}
            className="w-[40px] h-[40px] cursor-pointer"
          >
            <img src={comentLogo} alt="coment" />
          </div>
        </div>

        {product?.isBuying ? (
          <div className="flex justify-between items-center mt-2">
            <span className="text-[#4B4B4B]">Jami:</span>
            <span className="text-[#06B2B6] italic font-[600]">
              {calculateProductTotal(product)}
            </span>
          </div>
        ) : (
          <div className="flex justify-between w-full gap-2 mt-[5px]">
            <PrimaryButton
              onClick={() => handleProduct("delete")}
              className="py-[10px] w-full rounded-[14px] text-[14px] bg-[#EFEFEF] hover:bg-[#e7e7e7] !text-[#1E1E1E] font-[500]"
            >
              {t("ochirish")}
            </PrimaryButton>

            <PrimaryButton
              onClick={() => handleProduct("buy")}
              className="py-[10px] w-full rounded-[14px] text-[14px] font-[500]"
            >
              {t("sotib_olindi")}
            </PrimaryButton>
          </div>
        )}
      </div>

      {/* 📱 Mobil versiya */}
      <div className="flex sm:hidden items-center justify-between gap-2">
        {/* Chapda rasm */}
        <div className="w-[40px] h-[40px] flex-shrink-0">
          <img
            src={product?.product?.images ? product?.product?.images : logo}
            alt="product"
            className="w-full h-full object-contain"
          />
        </div>

        {/* O‘rta qism — matn */}
        <div className="flex-1 text-[14px] text-[#1E1E1E] truncate">
          <span className="font-[600] text-[#06B2B6]">
            {product.quantity} {t("dona")}
          </span>{" "}
          ×{" "}
          <span className="truncate font-[500]">
            {product?.product
              ? getLangValue(product?.product, "title", i18n.language)
              : product?.productName}
          </span>
        </div>

        {/* O‘ngda 3 ta tugma */}
        <div className="flex items-center gap-[6px]">
          <button
            onClick={() => handleProduct("seen")}
            className="w-[32px] h-[32px] rounded-full bg-[#EFEFEF] flex items-center justify-center"
          >
            <img src={comentLogo} alt="coment" className="w-[18px]" />
          </button>
          <button
            onClick={() => handleProduct("buy")}
            className="w-[32px] h-[32px] rounded-full] text-white flex items-center justify-center text-[18px] font-bold"
          >
            <img src={TasdiqIcon} alt="tasdiq" className="w-[32px] h-[32px]" />
          </button>
          <button
            onClick={() => handleProduct("delete")}
            className="w-[32px] h-[32px] rounded-full flex items-center justify-center"
          >
            <img src={TrashIcon} alt="delete" className="w-[32px] h-[32px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
