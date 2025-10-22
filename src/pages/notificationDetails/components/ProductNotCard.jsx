import React from "react";
import logo from "../../../assets/savat.svg";
import PrimaryButton from "../../../components/PrimaryButton";
import { formatNumberWithSpace, getLangValue } from "../../../utils/utils";
import { useTranslation } from "react-i18next";
import comentLogo from "../../../assets/coment.png";

const ProductNotCard = ({ product, setSelectProduct, handleOpen }) => {
  const { i18n } = useTranslation();

  const handleProduct = (type) => {
    setSelectProduct(product);
    handleOpen(type);
  };

  function calculateProductTotal(product) {
    if (!product) return 0;

    const { calculationType, quantity = 0, price = 0 } = product;

    if (calculationType === "one") {
      return formatNumberWithSpace(quantity * price);
    } else if (calculationType === "all") {
      return formatNumberWithSpace(price);
    } else {
      return 0;
    }
  }

  return (
    <div className="relative bg-white rounded-[16px] p-[12px] flex flex-col transition">
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
          className="w-[40px] h-[40px]"
        >
          <img src={comentLogo} alt="coment photo" />
        </div>
      </div>

        <div className="flex justify-between items-center ">
          <span className="text-[#4B4B4B]">Jami:</span>{" "}
          <span className="text-[#06B2B6] italic font-[600]">
            {calculateProductTotal(product)}
          </span>
        </div>
      {/* {!product?.isBuying && (
        <div className="flex justify-between w-full gap-2 mt-[5px]">
          <PrimaryButton
            onClick={() => handleProduct("delete")}
            className="py-[10px] w-full rounded-[14px] text-[14px] bg-[#EFEFEF] hover:bg-[#e7e7e7] !text-[#1E1E1E] font-[500]"
          >
            O‘chirish
          </PrimaryButton>

          <PrimaryButton
            onClick={() => handleProduct("buy")}
            className="py-[10px] w-full rounded-[14px] text-[14px] font-[500]"
          >
            Sotib olish
          </PrimaryButton>
        </div>
      )} */}
    </div>
  );
};

export default ProductNotCard;
