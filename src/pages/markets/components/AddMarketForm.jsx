import React from "react";
import { Input, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import PrimaryButton from "../../../components/PrimaryButton";

const { Option } = Select;

const AddMarketForm = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
    },
  });

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
              status={errors.bazaarName ? "error" : ""}
            />
          )}
        />
        {errors.bazaarName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.bazaarName.message}
          </p>
        )}
      </div>

      {/* Bo‘lim */}
      <div>
        <label className="font-medium block mb-1">
          *Bozorlik qaysi bo‘limga tegishli
        </label>
        <Controller
          name="category"
          control={control}
          rules={{ required: "Bo‘lim tanlanishi kerak" }}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Bo‘limni tanlang"
              status={errors.category ? "error" : ""}
              className="w-full"
            >
              <Option value="Oila">Oila</Option>
              <Option value="Ish">Ish</Option>
              <Option value="Shaxsiy">Shaxsiy</Option>
            </Select>
          )}
        />
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Qo‘shish tugmasi */}
      <PrimaryButton
        type="submit"
        className="mt-3 rounded-[14px] py-[14px] font-[500]"
      >
        Qo‘shish
      </PrimaryButton>
    </form>
  );
};

export default AddMarketForm;
