import React from "react";
import { Input, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import PrimaryButton from "../../../components/PrimaryButton";
import { useFetch } from "../../../hooks/useFetch";
import { toast } from "react-toastify";
import useApiMutation from "../../../hooks/useMutation";
import { useFetchOne } from "../../../hooks/useFetchOne";

const { Option } = Select;

const AddReadyProductForm = ({ onClose, product }) => {
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
  const { data: marketData  } = useFetchOne({
    key: [`market`],
    url: `/market`,
  });

  const { data: unitData } = useFetch({
      key: [`unit`,],
      url: `/unit`,
    });

  const { mutate, isLoading } = useApiMutation({
    url: "/market-list",
    method: "POST",
    onSuccess: (data) => {
      onClose();
      toast.success("Mahsulot bozorlikka qo'shildi");
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
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
            <div className="max-h-[104px] h-[104px] py-[15px] bg-[#F9F9F9] rounded-[14px]"><img className="h-full w-auto mx-auto" src={product?.images} alt="" /></div>
            <div className="text-[#1E1E1E] font-[600] text-[18px]">{product?.titleUz}, {product?.descriptionUz}</div>
        </div>
      <div>
        <label className="font-medium block mb-1">
          *Mahsulotni qaysi bozorlikka qo'shasiz
        </label>
        <Controller
          name="marketId"
          control={control}
          rules={{ required: "Bozorlik tanlanishi kerak" }}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Bozorlikni tanlang"
              status={errors.marketId ? "error" : ""}
              className="w-full"
            >
              {marketData?.map((item) => (
                <Option value={item?.id}>{item?.name}</Option>
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
          *Mahsulot miqdori va birligi
        </label>
        <div className="flex items-center">
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="miqdorini yozing"
                className="rounded-r-none"
              />
            )}
          />
          <Controller
            name="unitId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className="w-[90px] rounded-l-none"
                dropdownMatchSelectWidth={false}
                placeholder="dona"
              >
                {unitData?.items?.map((item) => (
                  <Option key={item?.id} value={item?.id}>
                    {item?.nameUz}
                  </Option>
                ))}
              </Select>
            )}
          />
        </div>

        {/* Umumiy error (ikkalasini birlashtirgan) */}
        {(!getValues("quantity") || !getValues("unitId")) && (
          <p className="text-red-500 text-sm mt-1">
            {errors.quantity || errors.unitId
              ? "Miqdor va birlik kiritilishi kerak"
              : ""}
          </p>
        )}
      </div>

      {/* Izoh (majburiy emas) */}
      <div>
        <label className="font-medium block mb-1">Izoh (majburiy emas)</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input placeholder="mahsulotga izoh" {...field} />
          )}
        />
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

export default AddReadyProductForm;
