import React from 'react'
import CustomButton from '../../../components/CustomButton'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { LuPlus } from 'react-icons/lu'

const BtnsModal = ({handleOpen}) => {
    const {t} = useTranslation()
    const navigate = useNavigate()
  return (
    <div >
        <p className="mt-1 text-center mb-4 text-[#4B4B4B]">
          {t("emptyMarketList.subDescription")}
        </p>

    <div className='flex gap-2'>
        <CustomButton
          onClick={() => handleOpen("add")}
          className="flex py-[8px] px-[20px] text-[14px] items-center justify-center gap-2 w-full"
          aria-label={t("topActions.ariaNewProduct")}
        >
          <span className="bg-white w-[20px] h-[20px] flex justify-center items-center rounded-[5px] text-[#06B2B6]">
            <LuPlus className="text-[20px]" />
          </span>
          <span className="">{t("topActions.manualAdd")}</span>
        </CustomButton>
        
        <CustomButton
          onClick={() => navigate("/brends")}
          className="py-[8px] px-[20px] text-[14px] w-full flex items-center justify-center gap-2"
          aria-label={t("topActions.ariaNewProduct")}
        >
          <span className="bg-white w-[20px] h-[20px] flex justify-center items-center rounded-[5px] text-[#06B2B6]">
            <LuPlus className="text-[20px]" />
          </span>
          <span className="">{t("topActions.brendAdd")}</span>
        </CustomButton>

    </div>

    </div>
  )
}

export default BtnsModal