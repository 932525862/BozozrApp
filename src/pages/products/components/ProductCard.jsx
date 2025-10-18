import React from 'react'
import PrimaryButton from '../../../components/PrimaryButton'
import { useTranslation } from "react-i18next";

const ProductCard = ({product, handleOpen}) => {
  const { t, i18n } = useTranslation();

  const title =
    (i18n?.language === "uz" ? product?.titleUz : product?.titleEn) ||
    product?.titleUz ||
    product?.titleEn ||
    "";
  const description =
    (i18n?.language === "uz" ? product?.descriptionUz : product?.descriptionEn) ||
    product?.descriptionUz ||
    product?.descriptionEn ||
    "";

  return (
    <div className='px-[8px] pt-[8px] pb-[12px] bg-[#FFFFFF] rounded-[16px]'>
        <div className='rounded-[14px] bg-[#F9F9F9] h-[105px] py-[15px] flex justify-center items-center'>
            <img src={product?.images} alt={title || t("productCard.imageAlt")} className='h-full w-auto'/>
        </div>
        <div className='flex flex-col mt-[8px]'>
            <span className='font-[600]'>{title}</span>
            <span className='text-[#06B2B6] text-[14px] font-[500]'>{description}</span>
        </div>
        <PrimaryButton onClick={() => handleOpen(product)} className='w-full rounded-[8px] font-[500] py-[4px] mt-[8px]'>{t("productCard.add")}</PrimaryButton>
    </div>
  )
}

export default ProductCard