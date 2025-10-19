import React from "react";
import { Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import PrimaryButton from "../../../components/PrimaryButton";
import { toast } from "react-toastify";
import useApiMutation from "../../../hooks/useMutation";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;

const SendFeedback = ({ onClose }) => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      text: "",
    },
  });

  const { mutate, isLoading } = useApiMutation({
    url: `/feedback`,
    method: "POST",
    onSuccess: () => {
      onClose();
      toast.success(t("feedback.toast.success"));
      reset();
    },
   onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <label className="mb-1">{t("feedback.label")}</label>
        <Controller
          name="text"
          control={control}
          rules={{ required: t("feedback.validation.required") }}
          render={({ field }) => (
            <TextArea
              {...field}
              placeholder={t("feedback.placeholder")}
              rows={4}
              status={errors.text ? "error" : ""}
              className="resize-none"
            />
          )}
        />
        {errors.text && (
          <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>
        )}
      </div>

      <PrimaryButton
        type="submit"
        className="mt-3 rounded-[14px] py-[14px] font-[500]"
        disabled={isLoading}
      >
        {t("feedback.button")}
      </PrimaryButton>
    </form>
  );
};

export default SendFeedback;
