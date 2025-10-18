import React from "react";
import { Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import PrimaryButton from "../../../components/PrimaryButton";
import { toast } from "react-toastify";
import useApiMutation from "../../../hooks/useMutation";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


const EndMarket = ({ onClose, marketId }) => {
  const { t } = useTranslation();

  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      location: "",
    },
  });

  const { mutate: endMarket } = useApiMutation({
    url: `history`,
    method: "POST",
    onSuccess: () => {
        onClose();
      toast.success("Bozorlik yakunlandi");
        navigate("/markets")
        reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });



  const { mutate, isLoading } = useApiMutation({
    url: `/market/${marketId}`,
    method: "PATCH",
    onSuccess: () => {
      
      endMarket({marketId: marketId})
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
      {/* Nomi */}
      <div>
        <label className="font-medium block mb-1">
          Bozorlikni qayerdan qildingiz?
        </label>
        <Controller
          name="location"
          control={control}
          rules={{ required: "Manzilni kiriting" }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={"Manzil"}
            />
          )}
        />
        {errors.location && (
          <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
        )}
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

export default EndMarket;
