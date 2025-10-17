import React from "react";
import { Input, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import PrimaryButton from "../../../components/PrimaryButton";
import { useFetch } from "../../../hooks/useFetch";
import { useStore } from "../../../store/userStore";
import { toast } from "react-toastify";
import useApiMutation from "../../../hooks/useMutation"

const { Option } = Select;

const AddMarketForm = ({onClose}) => {
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

  const { mutate, isLoading } = useApiMutation({
    url: "/market",
    method: "POST",
    onSuccess: (data) => {
      console.log(data);
      onClose()
      navigate("/markets");
      toast.success("Bozorlik qo'shildi");
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const { data } = useFetch({
      key: [`market-type`],
      url: `/market-type`,
    });

    const onSubmit = (data) => {
      const form = {
        userId: user?.id,
        ...data
      }
      mutate(form)
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Bozorlik nomi */}
      <div>
        <label className="mb-1">
          *Bozorlik nomi
        </label>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Bozorlik nomi kiritilishi kerak" }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Bozorlik nomini kiriting"
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
          *Bozorlik qaysi bo‘limga tegishli
        </label>
        <Controller
          name="marketTypeId"
          control={control}
          rules={{ required: "Bo‘lim tanlanishi kerak" }}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Bo‘limni tanlang"
              status={errors.marketTypeId ? "error" : ""}
              className="w-full"
            >
              {data?.items?.map(item => <Option value={item?.id}>{item?.titleUz}</Option>)}
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
        Qo‘shish
      </PrimaryButton>
    </form>
  );
};

export default AddMarketForm;
