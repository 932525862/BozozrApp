import React from "react";
import { Form, Input } from "antd";
import PrimaryButton from "../../../components/PrimaryButton";
import useApiMutation from "../../../hooks/useMutation";
import { toast } from "react-toastify";

export default function EditPassword({ onClose, user }) {
  const [form] = Form.useForm();

  const { mutate, isLoading } = useApiMutation({
    url: `/user/${user?.id}`,
    method: "PATCH",
    onSuccess: () => {
      toast.success("Parol muvaffaqiyatli yangilandi!");
      onClose();
      form.resetFields();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Xatolik yuz berdi");
    },
  });

  const onFinish = (values) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Parollar mos emas!");
      return;
    }

    mutate(values);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full overflow-hidden">
        <div className="w-full bg-[#F9F9F9] rounded-xl p-4 flex justify-center items-center mb-4">
          <div className="text-lg font-medium text-gray-700">
            🔑 Parolni o‘zgartirish
          </div>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Yangi parol */}
          <Form.Item
            label={<span className="text-sm font-medium">Yangi parol</span>}
            name="password"
            rules={[
              { required: true, message: "Iltimos, yangi parolni kiriting" },
              { min: 6, message: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak" },
            ]}
          >
            <Input.Password
              placeholder="Yangi parolni kiriting"
            />
          </Form.Item>

          {/* Parolni tasdiqlash */}
          <Form.Item
            label={<span className="text-sm font-medium">Parolni tasdiqlang</span>}
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Iltimos, yangi parolni tasdiqlang" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Parollar mos emas!");
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Parolni qayta kiriting"
            />
          </Form.Item>

          <Form.Item>
            <PrimaryButton
              type="submit"
              className="mt-3 rounded-[14px] py-[14px] font-[500] w-full"
              disabled={isLoading}
            >
              Tasdiqlash
            </PrimaryButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
