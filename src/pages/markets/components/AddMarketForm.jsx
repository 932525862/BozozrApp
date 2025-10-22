import React from "react";
import { Input, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import PrimaryButton from "../../../components/PrimaryButton";
import { useFetch } from "../../../hooks/useFetch";
import { useStore } from "../../../store/userStore";
import { toast } from "react-toastify";
import useApiMutation from "../../../hooks/useMutation"
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {getLangValue} from "../../../utils/utils"

const { Option } = Select;

const AddMarketForm = ({onClose, refetch}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: "",
      marketTypeId: null,
    },
  });
  const {user} = useStore()
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { mutate, isLoading } = useApiMutation({
    url: "/market",
    method: "POST",
    onSuccess: (data) => {
      reset();
      onClose()
      refetch()
      navigate(`/market/${data?.data?.name}`, {
        state: { id: data?.data?.id },
      });
      toast.success(t("addMarketForm.success"));
      
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || t("addMarketForm.error"));
    },
  });


  const { data } = useFetch({
      key: [`market-type`],
      url: `/market-type`,
    });

    const onSubmit = (formData) => {
      const form = {
        userId: user?.id,
        ...formData
      }
      mutate(form)
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Bozorlik nomi */}
      <div>
        <label className="mb-1">
          {t("addMarketForm.nameLabel")}
        </label>
        <Controller
          name="name"
          control={control}
          rules={{ required: t("addMarketForm.nameRequired") }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t("addMarketForm.namePlaceholder")}
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

      {/* Bo‘lim */}
      <div>
        <label className="font-medium block mb-1">
          {t("addMarketForm.typeLabel")}
        </label>
        <Controller
          name="marketTypeId"
          control={control}
          rules={{ required: t("addMarketForm.typeRequired") }}
          render={({ field }) => (
            <Select
              {...field}
              placeholder={t("addMarketForm.typePlaceholder")}
              status={errors.marketTypeId ? "error" : ""}
              className="w-full"
            >
              {data?.items?.map(item => (
                <Option key={item?.id} value={item?.id}>
                 {getLangValue(item, "title", i18n.language)}
                </Option>
              ))}
            </Select>
          )}
        />
        {errors.marketTypeId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.marketTypeId.message}
          </p>
        )}
      </div>

      {/* Qo‘shish tugmasi */}
      <PrimaryButton
        type="submit"
        className="mt-3 rounded-[14px] py-[14px] font-[500]"
        disabled={isLoading}
      >
        {t("addMarketForm.submit")}
      </PrimaryButton>
    </form>
  );
};

export default AddMarketForm;
