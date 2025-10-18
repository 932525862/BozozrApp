import React from "react";
import useApiMutation from "../../../hooks/useMutation";
import { toast } from "react-toastify";
import PrimaryButton from "../../../components/PrimaryButton";
import { useTranslation } from "react-i18next";

const DeleteProfile = ({ onClose, id }) => {
  const { t } = useTranslation();
  const { mutate: deleteMutate } = useApiMutation({
    url: "/user",
    method: "DELETE",
    onSuccess: () => {
      toast.success("Profilingiz o‘chirildi");
      refetch();
      onClose();
    },
    onError: () => {
      toast.error("Profilnini o‘chirishda xatolik yuz berdi");
    },
  });
  const handleDelete = () => {
    deleteMutate({ id: id });
  };

  return (
    <div className="w-full">
      <p className="text-[#4B4B4B] text-center mx-auto w-full text-[18px] mb-[24px]">
         {t("menuPage.delete.text")}
      </p>
      <div className="flex flex-col gap-[12px]">
        <PrimaryButton
          onClick={handleDelete}
          className="py-[10px] rounded-[14px] bg-[#D32F2F] hover:bg-[#d32f2fbd] font-[500]"
        >
          {t("menuPage.delete.btn")}
        </PrimaryButton>
        <PrimaryButton
          onClick={() => onClose()}
          className="py-[10px] rounded-[14px] bg-[#EFEFEF] hover:bg-[#e2e2e2] !text-[#1E1E1E] font-[500]"
        >
          {t("menuPage.back")}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default DeleteProfile;
