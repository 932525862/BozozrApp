import React from 'react'
import PrimaryButton from '../../../components/PrimaryButton'

const ProductCard = ({product, handleOpen}) => {
  return (
    <div className='px-[8px] pt-[8px] pb-[12px] bg-[#FFFFFF] rounded-[16px]'>
        <div className='rounded-[14px] bg-[#F9F9F9] h-[105px] flex justify-center items-center'>
            <img src={product?.img} alt="logo photo" />
        </div>
        <div className='flex flex-col mt-[8px]'>
            <span className='font-[600]'>{product?.title}</span>
            <span className='text-[#06B2B6] text-[14px] font-[500]'>{product?.text}</span>
        </div>
        <PrimaryButton onClick={() => handleOpen(product)} className='w-full rounded-[8px] font-[500] py-[4px] mt-[8px]'>Qo'shish</PrimaryButton>
    </div>
  )
}

export default ProductCard