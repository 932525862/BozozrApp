import React from 'react'
import { getLangValue } from '../../../utils/utils'

import { useTranslation } from "react-i18next";

const BrendsCard = ({brend}) => {
   const { t, i18n } = useTranslation();
 const typeTitle = getLangValue(brend, "title", i18n?.language)

  return (
    <div className='px-[8px] pt-[8px] pb-[12px] bg-[#FFFFFF] rounded-[16px]'>
        <div className='rounded-[14px] bg-[#F9F9F9] h-[105px] py-[15px] flex justify-center items-center'>
            <img src={brend?.image} alt="logo photo" className='h-full w-auto'/>
        </div>
        <div className='flex flex-col mt-[8px]'>
            <span className='font-[600]'>{typeTitle}</span>
            <span className='text-[#06B2B6] text-[14px] font-[500]'>{t("masulotlar")}</span>
        </div>
    </div>
  )
}

export default BrendsCard