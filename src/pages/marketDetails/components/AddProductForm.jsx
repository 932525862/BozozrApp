import React from "react";
import { Input, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import PrimaryButton from "../../../components/PrimaryButton";
import { useFetch } from "../../../hooks/useFetch";
import { toast } from "react-toastify";
import useApiMutation from "../../../hooks/useMutation";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const { TextArea } = Input;

const AddProductForm = ({ onClose }) => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      quantity: "",
      unitId: null,
      description: "",
    },
  });

  const { data: unitData } = useFetch({
    key: [`unit`],
    url: `/unit`,
  });

  const { mutate, isLoading } = useApiMutation({
    url: "/market-list",
    method: "POST",
    onSuccess: (data) => {
      onClose();
      toast.success(t("addReadyProductForm.success"));
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || t("addReadyProductForm.error"));
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Nomi */}
      <div>
        <label className="font-medium block mb-1">
          {t("addReadyProductForm.nameLabel")}
        </label>
        <Controller
          name="name"
          control={control}
          rules={{ required: t("addReadyProductForm.nameRequired") }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t("addReadyProductForm.namePlaceholder")}
            />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Miqdor + birlik */}
      <div>
        <label className="font-medium block mb-1">
          {t("addReadyProductForm.quantityLabel")}
        </label>
        <div className="flex items-center">
          <Controller
            name="quantity"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder={t("addReadyProductForm.quantityPlaceholder")}
                className="rounded-r-none"
              />
            )}
          />
          <Controller
            name="unitId"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Select
                {...field}
                className="w-[90px] rounded-l-none"
                dropdownMatchSelectWidth={false}
                placeholder={t("addReadyProductForm.unitPlaceholder")}
              >
                {unitData?.items?.map((item) => (
                  <Option key={item?.id} value={item?.id}>
                    {item?.nameUz || item?.nameEn}
                  </Option>
                ))}
              </Select>
            )}
          />
        </div>

        {(!getValues("quantity") || !getValues("unitId")) && (
          <p className="text-red-500 text-sm mt-1">
            {errors.quantity?.message ||
              errors.unitId?.message ||
              t("addReadyProductForm.quantityUnitError")}
          </p>
        )}
      </div>

      {/* Izoh (TextArea) */}
      <div>
        <label className="font-medium block mb-1">
          {t("addReadyProductForm.descriptionLabel")}
        </label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              rows={2}
              placeholder={t("addReadyProductForm.descriptionPlaceholder")}
              {...field}
            />
          )}
        />
      </div>

      {/* Tasdiqlash tugmasi */}
      <PrimaryButton
        type="submit"
        className="mt-3 rounded-[14px] py-[12px] font-[500] text-[18px]"
        disabled={isLoading}
      >
        {t("addReadyProductForm.submit")}
      </PrimaryButton>
    </form>
  );
};

export default AddProductForm;
