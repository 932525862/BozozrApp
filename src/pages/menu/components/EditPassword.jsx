import React from "react";
import { Form, Input } from "antd";
import PrimaryButton from "../../../components/PrimaryButton";
import useApiMutation from "../../../hooks/useMutation";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next"; // 🟢 qo‘shildi

export default function EditPassword({ onClose, user }) {
  const [form] = Form.useForm();
  const { t } = useTranslation(); // 🟢 i18n hook

  const { mutate, isLoading } = useApiMutation({
    url: `/user/${user?.id}`,
    method: "PATCH",
    onSuccess: () => {
      toast.success(t("editPassword.successMessage")); // 🔵 tarjima
      onClose();
      form.resetFields();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || t("editPassword.errorMessage")); // 🔵 tarjima
    },
  });

  const onFinish = (values) => {
    if (values.password !== values.confirmPassword) {
      toast.error(t("editPassword.passwordMismatch")); // 🔵 tarjima
      return;
    }

    mutate(values);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full overflow-hidden">
        <div className="w-full bg-[#F9F9F9] rounded-xl p-4 flex justify-center items-center mb-4">
          <div className="text-lg font-medium text-gray-700">
            {t("editPassword.title")}
          </div>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* 🔵 Yangi parol */}
          <Form.Item
            label={<span className="text-sm font-medium">{t("editPassword.newPasswordLabel")}</span>}
            name="password"
            rules={[
              { required: true, message: t("editPassword.newPasswordRequired") },
              { min: 6, message: t("editPassword.passwordMinLength") },
            ]}
          >
            <Input.Password placeholder={t("editPassword.newPasswordPlaceholder")} />
          </Form.Item>

          {/* 🔵 Parolni tasdiqlash */}
          <Form.Item
            label={<span className="text-sm font-medium">{t("editPassword.confirmPasswordLabel")}</span>}
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: t("editPassword.confirmPasswordRequired") },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t("editPassword.passwordMismatch")));
                },
              }),
            ]}
          >
            <Input.Password placeholder={t("editPassword.confirmPasswordPlaceholder")} />
          </Form.Item>

          <Form.Item>
            <PrimaryButton
              type="submit"
              className="mt-3 rounded-[14px] py-[14px] font-[500] w-full"
              disabled={isLoading}
            >
              {t("editPassword.submitButton")}
            </PrimaryButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
