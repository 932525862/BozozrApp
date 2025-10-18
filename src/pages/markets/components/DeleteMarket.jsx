import React from "react";
import useApiMutation from "../../../hooks/useMutation";
import { toast } from "react-toastify";
import PrimaryButton from "../../../components/PrimaryButton";
import { useTranslation } from "react-i18next";

const DeleteMarket = ({ refetch, selectMarket, onClose }) => {
  const { t } = useTranslation();

  const { mutate: deleteMutate } = useApiMutation({
    url: "/market",
    method: "DELETE",
    onSuccess: () => {
      toast.success(t("deleteMarket.success"));
      refetch();
      onClose();
    },
    onError: () => {
      toast.error(t("deleteMarket.error"));
    },
  });

  const handleDelete = () => {
    deleteMutate({ id: selectMarket?.id });
  };

  return (
    <div className="w-full">
      <p className="text-[#4B4B4B] text-center mx-auto w-full text-[18px] mb-[24px]">
        {t("deleteMarket.confirm", { name: selectMarket?.name })}
      </p>
      <div className="flex flex-col gap-[12px]">
        <PrimaryButton
          onClick={handleDelete}
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

export default DeleteMarket;
