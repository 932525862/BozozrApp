import React, { useEffect } from "react";
import { useFetchOne } from "../../../hooks/useFetchOne";
import { formatDateNot, getLangValue } from "../../../utils/utils";
import { Input, notification } from "antd";
import PrimaryButton from "../../../components/PrimaryButton";
import { useTranslation } from "react-i18next";
import useApiMutation from "../../../hooks/useMutation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../store/userStore";
import Loding from "../../../components/Loding";

const { TextArea } = Input;

const MessagesForm = ({ notId, refetch, onClose }) => {
  const { t, i18n } = useTranslation();
  const { data, isLoading: getData } = useFetchOne({
    key: [`notification/${notId}`],
    url: `notification/${notId}`,
  });

  const navigate = useNavigate();
  const { setNotMarket } = useStore();

  const { mutate, isLoading } = useApiMutation({
    url: `/market/respond/to-invite`,
    method: "PATCH",
    onSuccess: () => {
      navigate(`/market/${data?.market?.name}`, {
        state: { id: data?.market?.id },
      });
      toast.success(t("messagesForm.acceptedSuccess"));
      onClose();
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || t("messagesForm.acceptedError")
      );
    },
  });

  const { mutate: closeMutate, isLoading: closeLoading } = useApiMutation({
    url: `/market/respond/to-invite`,
    method: "PATCH",
    onSuccess: () => {
      navigate(`/market/${data?.market?.name}`, {
        state: { id: data?.market?.id },
      });
      toast.success(t("messagesForm.acceptedClose"));
      onClose();
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || t("messagesForm.acceptedError")
      );
    },
  });

  const respondShare = () => {
    const data1 = {
      notificationId: data?.id,
      marketId: data?.market?.id,
      accept: true,
    };
    mutate(data1);
  };

  const closeShare = () => {
    const data1 = {
      notificationId: data?.id,
      marketId: data?.market?.id,
      accept: false,
    };
    closeMutate(data1);
  };

  useEffect(() => {
    refetch();
  }, []);

  const watchNotMarket = () => {
    setNotMarket(data?.market);
    navigate(`/notification/${data?.market?.name}`);
  };

  if (getData) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <Loding />
      </div>
    );
  }

  return (
    <div>
      <div className="text-[#4B4B4B] text-[12px]">
        {formatDateNot(data?.createdAt)}
      </div>

      <p className="font-[600] text-[20px] text-[#1E1E1E]">
        {data?.market ? (
          <span>
            {t("messagesForm.sharedByUser", {
              phone: data?.sender?.phoneNumber,
              name: data?.sender?.fullName,
            })}
          </span>
        ) : (
          <span>{getLangValue(data, "title", i18n?.language)}</span>
        )}
      </p>

      <TextArea
        value={data?.note || getLangValue(data, "message", i18n?.language)}
        readOnly
        placeholder={t("messagesForm.noNote")}
        rows={4}
        style={{
          resize: "none",
        }}
      />

      {data?.market && data?.accept === null && (
        <div>
          <PrimaryButton
            onClick={() => watchNotMarket()}
            className="py-[12px] w-full mt-[12px] rounded-[14px] bg-[#EFEFEF] hover:bg-[#e2e2e2] !text-[#1E1E1E] font-[500] text-[16px]"
          >
            {t("messagesForm.review")}
          </PrimaryButton>

          <div className="flex gap-[12px] mt-[12px]">
            <PrimaryButton
              onClick={() => closeShare()}
              disabled={closeLoading}
              className="py-[12px] rounded-[14px] bg-[#D32F2F] hover:bg-[#d32f2fbd] font-[500] text-[16px] w-full"
            >
              {t("messagesForm.reject")}
            </PrimaryButton>

            <PrimaryButton
              disabled={isLoading}
              onClick={() => respondShare()}
              className="rounded-[14px] py-[12px] font-[500] text-[16px] w-full"
            >
              {t("messagesForm.accept")}
            </PrimaryButton>
          </div>
        </div>
      )}

      {data?.accept === true && (
        <div className="w-full py-[12px] flex justify-center items-center bg-[#06B2B6] rounded-[14px] text-[#fff] mt-[15px] font-[500] text-[18px]">
          {t("modalType.acceptTrue")}
        </div>
      )}
      {data?.accept === false && (
        <div className="w-full py-[12px] flex justify-center items-center bg-[#D32F2F] rounded-[14px] text-[#fff] mt-[15px] font-[500] text-[18px]">
          {t("modalType.acceptFalse")}
        </div>
      )}
    </div>
  );
};

export default MessagesForm;
