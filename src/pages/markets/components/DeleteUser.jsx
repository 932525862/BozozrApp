import React from "react";
import useApiMutation from "../../../hooks/useMutation";
import { toast } from "react-toastify";
import PrimaryButton from "../../../components/PrimaryButton";
import { useTranslation } from "react-i18next";

const DeleteUser = ({ refetch, selectUser, onClose, marketId }) => {
  const { t } = useTranslation();

  const { mutate: deleteMutate, isLoading } = useApiMutation({
    url: "/market/delete/user",
    method: "PATCH",
    onSuccess: () => {
      toast.success("Foydalanuvchi o'chirildi");
      refetch()
      onClose();
    },
    onError: () => {
      toast.error("Foydalanuvchini o'chirishda xatolik yuz berdi");
    },
  });

  const handleDelete = () => {
    const form = {
        deletedUserId: selectUser?.id,
        marketId: marketId
    }
    deleteMutate(form);
  };

  return (
    <div className="w-full">
      <p className="text-[#4B4B4B] text-center mx-auto w-full text-[18px] mb-[24px]">
        {selectUser?.fullName} nomli ishtirokchini o'chirmoqchimisiz?
      </p>
      <div className="flex flex-col gap-[12px]">
        <PrimaryButton
          onClick={handleDelete}
          className="py-[10px] rounded-[14px] bg-[#D32F2F] hover:bg-[#d32f2fbd] font-[500]"
          disabled={isLoading}
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

export default DeleteUser;
