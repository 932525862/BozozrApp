import React, { useEffect } from "react";
import { Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import PrimaryButton from "../../../components/PrimaryButton";
import { toast } from "react-toastify";
import useApiMutation from "../../../hooks/useMutation"
import { useTranslation } from "react-i18next"


const EditMarketForm = ({onClose, refetch, selectMarket}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: selectMarket?.name,
    },
  });

  const { t } = useTranslation();

  useEffect(() => {
    if (selectMarket) {
      reset({
        name: selectMarket.name,
      });
    }
  }, [selectMarket, reset]);

  const { mutate, isLoading } = useApiMutation({
    url: `/market/${selectMarket?.id}`,
    method: "PATCH",
    onSuccess: (data) => {
      onClose()
      refetch()
      toast.success(t("editMarketForm.success"));
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || t("editMarketForm.error"));
    },
  });

    const onSubmit = (data) => {
      mutate(data)
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Bozorlik nomi */}
      <div>
        <label className="mb-1">
          {t("editMarketForm.nameLabel")}
        </label>
        <Controller
          name="name"
          control={control}
          rules={{ required: t("editMarketForm.nameRequired") }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t("editMarketForm.namePlaceholder")}
              status={errors.name ? "error" : ""}
            />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>


      {/* Qo‘shish tugmasi */}
      <PrimaryButton
        type="submit"
        className="mt-3 rounded-[14px] py-[14px] font-[500]"
        disabled={isLoading}
      >
        {t("editMarketForm.submit")}
      </PrimaryButton>
    </form>
  );
};

export default EditMarketForm;
