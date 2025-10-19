import React, { useEffect } from "react";
import { useFetchOne } from "../../../hooks/useFetchOne";
import { formatDateNot, getLangValue } from "../../../utils/utils";
import { Input } from "antd";
import PrimaryButton from "../../../components/PrimaryButton";
import { useTranslation } from "react-i18next";
import useApiMutation from "../../../hooks/useMutation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const MessagesForm = ({ not, refetch, onClose }) => {
    const {i18n} = useTranslation()
  const { data } = useFetchOne({
    key: [`notification/${not?.id}`],
    url: `notification/${not?.id}`,
  });
  const navigate = useNavigate()

  const { mutate, isLoading } = useApiMutation({
    url: `/market/respond/to-invite`,
    method: "PATCH",
    onSuccess: () => {
        navigate(`/market/${not?.market?.name}`, {
            state: { id: not?.market?.id },
          });
      toast.success("Bozorlikni qabul qildingiz");
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const respondShare = () => {
    const data = {
        marketId: not?.market?.id,
        accept: true
    }
    mutate(data);
  };

  useEffect(() => {
    refetch();
  }, []);

  console.log(not);

  return (
    <div>
      <div className="text-[#4B4B4B] text-[12px]">
        {formatDateNot(not?.createdAt)}
      </div>

      <p className="font-[600] text-[20px] text-[#1E1E1E]">
        {not?.market ? <span>{not?.sender?.phoneNumber} ({not?.sender?.fullName}) foydalanuvchi sizga
        bozorlik ulashdi</span> : <span>{getLangValue(not, "title", i18n?.language)}</span>}
      </p>
      <TextArea
        value={not?.note || getLangValue(not, "message", i18n?.language)}
        readOnly
        placeholder="Izoh mavjud emas"
        rows={4}
        style={{
          resize: "none",
        }}
      />
      {not?.market && (
        <div>
          <PrimaryButton
            //   onClick={() => onClose()}
            className="py-[12px] w-full mt-[12px] rounded-[14px] bg-[#EFEFEF] hover:bg-[#e2e2e2] !text-[#1E1E1E] font-[500] text-[16px]"
          >
            Ko'rib chiqish
          </PrimaryButton>
          <div className="flex gap-[12px] mt-[12px]">
            <PrimaryButton className="py-[12px] rounded-[14px] bg-[#D32F2F] hover:bg-[#d32f2fbd] font-[500] text-[16px] w-full">
              Rad etish
            </PrimaryButton>
            <PrimaryButton disabled={isLoading} onClick={() => respondShare()} className=" rounded-[14px] py-[12px]  font-[500] text-[16px] w-full">
              Qabul qilish
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesForm;
