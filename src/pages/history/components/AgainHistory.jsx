import React from "react";
import useApiMutation from "../../../hooks/useMutation";
import { toast } from "react-toastify";
import PrimaryButton from "../../../components/PrimaryButton";
import { useTranslation } from "react-i18next";
import { getLangValue } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../store/userStore";

const AgainHistory = ({ history, onClose }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate()
  const {user} = useStore()

  const { mutate, isLoading } = useApiMutation({
    url: "/market/create-by-history-id",
    method: "POST",
    onSuccess: () => {
      toast.success("Bozorlik takrorlandi");
      navigate("/markets")
      onClose();
    },
    onError: () => {
      toast.error("Bozorlikni takrorlashda xatolik yuz berdi");
    },
  });

  const handleAgain = () => {
    const form = {
        historyId: history?.id,
        userId: user?.id
    }
    mutate(form)
  };


 
  return (
    <div className="w-full">
      <p className="text-[#4B4B4B] text-center mx-auto w-full text-[18px] mb-[24px]">
        {history?.name} nomli bozorlikni takrorlamoqchimisiz?
      </p>
      <div className="flex flex-col gap-[12px]">
        <PrimaryButton
          onClick={handleAgain}
          disabled={isLoading}
          className="py-[10px] rounded-[14px] font-[500]"
        >
          Takrorlash
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

export default AgainHistory;
