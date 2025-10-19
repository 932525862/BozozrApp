import React, { useEffect } from "react";
import { Form, Input, Select, Segmented } from "antd";
import profileImg from "../../../assets/icons/profile.png";
import PrimaryButton from "../../../components/PrimaryButton";
import { useTranslation } from "react-i18next";
import useApiMutation from "../../../hooks/useMutation";
import { toast } from "react-toastify";
import { useStore } from "../../../store/userStore";

const { Option } = Select;

export default function EditProfile({ user, onClose }) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { setUserChange } = useStore();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.fullName || "",
        region: user.region || "",
        gender: user.gender || "erkak",
      });
    }
  }, [user, form]);

  const { mutate, isLoading } = useApiMutation({
    url: `/user/${user?.id}`,
    method: "PATCH",
    onSuccess: (data) => {
      setUserChange(data?.data);
      toast.success(t("editProfile.toast.success"));
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const onFinish = (values) => {
    mutate(values);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full overflow-hidden">
        {/* Profil rasmi */}
        <div className="w-full bg-[#F9F9F9] rounded-xl p-4 flex justify-center items-center mb-4">
          <div className="w-36 h-20 flex items-center justify-center rounded-lg">
            <img src={profileImg} alt="profile image" />
          </div>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* To‘liq ism */}
          <Form.Item
            label={<span className="text-sm font-medium">{t("editProfile.fullName.label")}</span>}
            name="fullName"
            rules={[{ required: true, message: t("editProfile.fullName.required") }]}
          >
            <Input
              placeholder={t("editProfile.fullName.placeholder")}
              className="rounded-lg"
            />
          </Form.Item>

          {/* Manzil */}
          <Form.Item
            label={<span className="text-sm">{t("editProfile.region.label")}</span>}
            name="region"
          >
            <Select
              placeholder={t("editProfile.region.placeholder")}
              className="rounded-lg"
            >
              <Option value="toshkent">{t("regions.toshkent")}</Option>
              <Option value="andijon">{t("regions.andijon")}</Option>
              <Option value="fargona">{t("regions.fargona")}</Option>
              <Option value="namangan">{t("regions.namangan")}</Option>
              <Option value="samarqand">{t("regions.samarqand")}</Option>
              <Option value="buxoro">{t("regions.buxoro")}</Option>
              <Option value="xorazm">{t("regions.xorazm")}</Option>
              <Option value="navoiy">{t("regions.navoiy")}</Option>
              <Option value="qashqadaryo">{t("regions.qashqadaryo")}</Option>
              <Option value="surxondaryo">{t("regions.surxondaryo")}</Option>
              <Option value="jizzax">{t("regions.jizzax")}</Option>
              <Option value="sirdaryo">{t("regions.sirdaryo")}</Option>
              <Option value="qarakalpogiston">
                {t("regions.qarakalpogiston")}
              </Option>
            </Select>
          </Form.Item>

          {/* Jins */}
          <Form.Item
            label={<span className="text-sm">{t("editProfile.gender.label")}</span>}
            name="gender"
          >
            <Segmented
              options={[
                { label: t("editProfile.gender.male"), value: "erkak" },
                { label: t("editProfile.gender.female"), value: "ayol" },
              ]}
              block
              className="rounded-full"
            />
          </Form.Item>

          {/* Button */}
          <Form.Item>
            <PrimaryButton
              type="submit"
              className="mt-3 rounded-[14px] py-[14px] font-[500] w-full"
              disabled={isLoading}
            >
              {t("editProfile.button.confirm")}
            </PrimaryButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
