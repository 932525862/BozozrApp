import React from "react";
import { Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../../../components/PrimaryButton";
import { toast } from "react-toastify";
import useApiMutation from "../../../hooks/useMutation";

const { TextArea } = Input;

const InviteForm = ({ onClose, marketId, refetch }) => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: { phoneNumber: "", note: "" },
  });

  const { mutate, isLoading } = useApiMutation({
    url: `/market/send/invitation`,
    method: "PATCH",
    onSuccess: () => {
      refetch();
      onClose();
      toast.success(t("inviteForm.successToast"));
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const onSubmit = (data) => mutate({ ...data, marketId });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      
      <div>
        <label className="font-medium block mb-1">{t("inviteForm.phoneLabel")}</label>
        <Controller
          name="phoneNumber"
          control={control}
          rules={{
            required: t("inviteForm.phoneRequired"),
            pattern: {
              value: /^\+?\d{9,15}$/,
              message: t("inviteForm.phonePattern"),
            },
          }}
          render={({ field }) => <Input {...field} placeholder="+998..." />}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div>
        <label className="font-medium block mb-1">{t("inviteForm.noteLabel")}</label>
        <Controller
          name="note"
          control={control}
          rules={{ maxLength: { value: 300, message: t("inviteForm.noteMaxLength") } }}
          render={({ field }) => <TextArea {...field} rows={3} placeholder="Izoh yozing..." />}
        />
        {errors.note && (
          <p className="text-red-500 text-sm mt-1">{errors.note.message}</p>
        )}
      </div>

      <PrimaryButton
        type="submit"
        className="mt-3 rounded-[14px] py-[12px] text-[17px] font-[500]"
        disabled={isLoading}
      >
        {t("inviteForm.submitButton")}
      </PrimaryButton>
    </form>
  );
};

export default InviteForm;
