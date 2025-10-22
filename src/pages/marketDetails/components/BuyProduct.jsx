import React from "react";
import { Input, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import PrimaryButton from "../../../components/PrimaryButton";
import { toast } from "react-toastify";
import useApiMutation from "../../../hooks/useMutation";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/product.png";
import { getLangValue } from "../../../utils/utils";

const { Option } = Select;

const BuyProduct = ({ onClose, product, refetch }) => {
  const { i18n, t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      price: "",
      calculationType: "one",
    },
  });

  const { mutate, isLoading } = useApiMutation({
    url: `/market-list/check-is-buying/${product?.id}`,
    method: "PATCH",
    onSuccess: () => {
      refetch();
      onClose();
      toast.success(t("modalType.buyProductToast"));
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
        <div className="max-h-[104px] h-[104px] py-[15px] bg-[#F9F9F9] rounded-[14px]">
          <img
            className="h-full w-auto mx-auto"
            src={product?.product ? product?.product.images : logo}
            alt="product"
          />
        </div>
        <div className="text-[#1E1E1E] font-[600] text-[18px] mt-2">
          {product?.product
            ? getLangValue(product?.product, "title", i18n.language)
            : product?.productName}
        </div>
      </div>

      {/* Narx inputi */}
      <div>
        <label className="font-medium block mb-1">
          {t("modalType.priceText")}
        </label>
        <div className="flex items-center gap-2">
          <Controller
            name="price"
            control={control}
            rules={{
              required: t("modalType.pricePlaceholder"),
            }}
            render={({ field: { onChange, value, ...restField } }) => (
              <Input
                {...restField}
                // UI uchun value formatlash
                value={
                  value
                    ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                    : ""
                }
                onChange={(e) => {
                  // Foydalanuvchi kiritgan qiymatdan faqat raqamlarni olish
                  const numericValue = e.target.value.replace(/\D/g, "");
                  // Form state’ga faqat raqamlarni saqlaymiz
                  onChange(numericValue);
                }}
                placeholder={t("modalType.pricePlaceholder")}
                className="rounded-r-none"
              />
            )}
          />
          <Controller
            name="calculationType"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Select
                {...field}
                className="w-[150px] rounded-l-none"
                dropdownMatchSelectWidth={false}
                // placeholder={"Narxini kiriting"}
                defaultValue="one"
              >
                <Option value="one">
                  1 {getLangValue(product?.unit, "name", i18n.language)}{" "}
                  {t("modalType.price")}
                </Option>
                <Option value="all">{t("modalType.allPrice")}</Option>
              </Select>
            )}
          />
        </div>

        {/* Price error */}
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>

      <PrimaryButton
        type="submit"
        className="mt-3 rounded-[14px] py-[12px] text-[17px] font-[500]"
        disabled={isLoading}
      >
        {t("modalType.tasdiqlash")}
      </PrimaryButton>
    </form>
  );
};

export default BuyProduct;
