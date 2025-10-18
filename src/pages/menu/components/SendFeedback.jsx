import React from "react";
import { Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import PrimaryButton from "../../../components/PrimaryButton";
import { toast } from "react-toastify";
import useApiMutation from "../../../hooks/useMutation";

const { TextArea } = Input;

const SendFeedback = ({ onClose }) => {
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
      toast.success("Taklif yoki izoh yuborildi");
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
        <label className="mb-1">Taklif yoki izohingiz</label>
        <Controller
          name="text"
          control={control}
          rules={{ required: "Taklif yoki izoh kiritilishi kerak" }}
          render={({ field }) => (
            <TextArea
              {...field}
              placeholder="Taklif yoki izohingizni kiriting..."
              rows={4}
              status={errors.text ? "error" : ""}
              className="resize-none"
            />
          )}
        />
        {errors.text && (
          <p className="text-red-500 text-sm mt-1">
            {errors.text.message}
          </p>
        )}
      </div>

      <PrimaryButton
        type="submit"
        className="mt-3 rounded-[14px] py-[14px] font-[500]"
        disabled={isLoading}
      >
        Tasdiqlash
      </PrimaryButton>
    </form>
  );
};

export default SendFeedback;
