import React from "react";
import useApiMutation from "../../../hooks/useMutation";
import { toast } from "react-toastify";
import PrimaryButton from "../../../components/PrimaryButton";
import { useTranslation } from "react-i18next";
import { getLangValue } from "../../../utils/utils";

const DeleteProduct = ({ refetch, product, onClose }) => {
  const { t, i18n } = useTranslation();

  const { mutate: deleteMutate, isLoading } = useApiMutation({
    url: "/market-list",
    method: "DELETE",
    onSuccess: () => {
      toast.success("Mahsulot o'chirildi");
      refetch();
      onClose();
    },
    onError: () => {
      toast.error("Mahsulotni o'chirishda xatolik yuz berdi");
    },
  });

  const handleDelete = () => {
    deleteMutate({ id: product?.id });
  };
 
  return (
    <div className="w-full">
      <p className="text-[#4B4B4B] text-center mx-auto w-full text-[18px] mb-[24px]">
        {product?.product ? getLangValue(product?.product, "title", i18n.language) : product?.productName} nomli mahsulotingizni o'chirmoqchimisiz?
      </p>
      <div className="flex flex-col gap-[12px]">
        <PrimaryButton
          onClick={handleDelete}
          disabled={isLoading}
          className="py-[10px] rounded-[14px] bg-[#D32F2F] hover:bg-[#d32f2fbd] font-[500]"
        >
          {t("deleteMarket.delete")}
        </PrimaryButton>
        <PrimaryButton
          onClick={() => onClose()}
          className="py-[10px] rounded-[14px] bg-[#EFEFEF] hover:bg-[#e2e2e2] !text-[#1E1E1E] font-[500]"
        >
          {t("deleteMarket.cancel")}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default DeleteProduct;
