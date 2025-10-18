import React, { useEffect, useRef, useState } from "react";
import { Form, Input } from "antd";
import PrimaryButton from "../../../components/PrimaryButton";
import useApiMutation from "../../../hooks/useMutation";
import { toast } from "react-toastify";
import CustomModal from "../../../components/CustomModal";
import { useTranslation } from "react-i18next";

export default function EditPhone({ onClose, user }) {
  const { t } = useTranslation();
  const [verify, setVerify] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [dataResponse, setDataResponse] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minut = 120 sekund
  const [canResend, setCanResend] = useState(false);
  const [phone, setPhone] = useState(""); // 🔹 yangi state
  const [form] = Form.useForm();

  const handleClose = () => {
    setVerify(false)
  }

  const { mutate, isLoading } = useApiMutation({
    url: `/user/change/phone-number/${user?.id}`,
    method: "POST",
    onSuccess: (data) => {
      setVerify(true);
      toast.success("Telefon raqamingizgizga kod yuborildi");
      setDataResponse(data?.data);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Xatolik yuz berdi");
    },
  });

  const { mutate: resendMutate } = useApiMutation({
    url: `/user/send-otp-again/phoneNumber/${user?.id}`,
    method: "POST",
    onSuccess: (data) => {
      toast.success(t("toast.otp_resent"));
      setTimeLeft(120); // vaqtni qaytadan 2 minutga o‘rnatamiz
      setCanResend(false);
      setDataResponse(data?.data);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const { mutate: otpMutate, isLoading: otpLoading } = useApiMutation({
    url: `/user/verify/phoneNumber/${user?.id}`,
    method: "PATCH",
    onSuccess: (data) => {
      setUserChange(data?.data);
      toast.success("Telfon raqamingiz o'zgartirildi");
      setVerify(false);
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  // 🔹 user.phone ni avtomatik formaga qo‘yish
  useEffect(() => {
    if (user?.phoneNumber) {
      form.setFieldsValue({ phone: user?.phoneNumber });
    }
  }, [user, form]);

  const onFinish = (values) => {
    const formattedPhone = values.phone.replace(/\s|\(|\)|-/g, ""); // toza format
    mutate({ phoneNumber: formattedPhone });
  };

  useEffect(() => {
    let timer;

    if (verify && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }

    return () => clearInterval(timer);
  }, [verify, timeLeft]);

  const handleResend = () => {
    resendMutate({
      phoneNumber: phone.replace(/\s/g, ""),
    });
  };

  const handleCodeChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // avtomatik keyingi inputga o'tish
      if (value && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const enteredCode = code.join("");
    if (enteredCode.length !== 4) {
      toast.error(t("errors.otp_length"));
      return;
    }
    const data = {
      verification_key: dataResponse?.details,
      phoneNumber: phone.replace(/\s/g, ""),
      otp: enteredCode,
    };

    otpMutate(data);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full overflow-hidden">
        {/* Sarlavha */}
        <div className="w-full bg-[#F9F9F9] rounded-xl p-4 flex justify-center items-center mb-4">
          <div className="text-lg font-medium text-gray-700">
            📱 Telefon raqamni o‘zgartirish
          </div>
        </div>

        {/* Forma */}
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<span className="text-sm font-medium">Telefon raqam</span>}
            name="phone"
            rules={[
              { required: true, message: "Iltimos, telefon raqamni kiriting" },
              {
                pattern:
                  /^\+998\s?\(?\d{2}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
                message: "Telefon raqam noto‘g‘ri formatda",
              },
            ]}
          >
            <Input
              placeholder="+998 (__) ___-__-__"
              maxLength={19}
              className="rounded-lg"
              onChange={(e) => {
                const val = e.target.value;
                setPhone(val); // 🔹 state ichida saqlash
                form.setFieldsValue({ phone: val }); // 🔹 forma ichida ham saqlash
              }}
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
      <CustomModal
        open={verify}
        title={t("modal.title")}
        onCancel={handleClose}
        width={351}
      >
        <div className="flex justify-center mt-4 gap-2">
          {code.map((digit, i) => (
            <Input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              value={digit}
              maxLength={1}
              onChange={(e) => handleCodeChange(e.target.value, i)}
              className="w-12 h-12 text-center text-lg font-bold border-gray-300 focus:border-green-500"
            />
          ))}
        </div>
        <PrimaryButton
          onClick={handleResend}
          disabled={!canResend}
          className="w-full rounded-[14px] py-[12px] mb-[16px] mt-[16px]"
        >
          <span className={`${canResend ? "" : "text-[#1e1e1e31]"} font-[500]`}>
            {t("modal.resend")}
            {!canResend && (
              <span>
                {" "}
                {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, "0")}
              </span>
            )}
          </span>
        </PrimaryButton>

        <PrimaryButton
          onClick={handleVerify}
          disabled={otpLoading}
          className="w-full rounded-[14px] py-[12px]"
        >
          {otpLoading ? (
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
          ) : (
            t("modal.verify")
          )}
        </PrimaryButton>
      </CustomModal>
    </div>
  );
}
