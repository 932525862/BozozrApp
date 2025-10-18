import React from "react";
import { Input, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import PrimaryButton from "../../../components/PrimaryButton";
import { useFetch } from "../../../hooks/useFetch";
import { toast } from "react-toastify";
import useApiMutation from "../../../hooks/useMutation";
import { useFetchOne } from "../../../hooks/useFetchOne";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const AddReadyProductForm = ({ onClose, product }) => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      marketId: null,
      quantity: "",
      unitId: null,
      description: "",
    },
  });
  const { data: marketData } = useFetchOne({
    key: [`market`],
    url: `/market`,
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
    const form = {
      productId: product?.id,
      ...data,
    };
    mutate(form);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <div className="max-h-[104px] h-[104px] py-[15px] bg-[#F9F9F9] rounded-[14px]">
          <img
            className="h-full w-auto mx-auto"
            src={product?.images}
            alt={
              product?.titleUz ||
              product?.titleEn ||
              t("addReadyProductForm.productImageAlt")
            }
          />
        </div>
        <div className="text-[#1E1E1E] font-[600] text-[18px]">
          {product?.titleUz || product?.titleEn}, {product?.descriptionUz || product?.descriptionEn}
        </div>
      </div>
      <div>
        <label className="font-medium block mb-1">
          {t("addReadyProductForm.marketLabel")}
        </label>
        <Controller
          name="marketId"
          control={control}
          rules={{ required: t("addReadyProductForm.marketRequired") }}
          render={({ field }) => (
            <Select
              {...field}
              placeholder={t("addReadyProductForm.marketPlaceholder")}
              status={errors.marketId ? "error" : ""}
              className="w-full"
            >
              {marketData?.map((item) => (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              ))}
            </Select>
          )}
        />
        {errors.marketId && (
          <p className="text-red-500 text-sm mt-1">{errors.marketId.message}</p>
        )}
      </div>
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

        {/* Umumiy error (ikkalasini birlashtirgan) */}
        {(!getValues("quantity") || !getValues("unitId")) && (
          <p className="text-red-500 text-sm mt-1">
            {errors.quantity?.message ||
              errors.unitId?.message ||
              t("addReadyProductForm.quantityUnitError")}
          </p>
        )}
      </div>

      {/* Izoh (majburiy emas) */}
      <div>
        <label className="font-medium block mb-1">
          {t("addReadyProductForm.descriptionLabel")}
        </label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input placeholder={t("addReadyProductForm.descriptionPlaceholder")} {...field} />
          )}
        />
      </div>

      {/* Qo‘shish tugmasi */}
      <PrimaryButton
        type="submit"
        className="mt-3 rounded-[14px] py-[14px] font-[500]"
        disabled={isLoading}
      >
        {t("addReadyProductForm.submit")}
      </PrimaryButton>
    </form>
  );
};

export default AddReadyProductForm;
