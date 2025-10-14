import React, { useEffect, useRef, useState } from "react";
import { Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Uzb from "../../assets/left-part.svg";
import Eng from "../../assets/eng.svg";
import Rus from "../../assets/rus.svg";
import Kiril from "../../assets/krill.svg";
import Option from "../../assets/option.svg";
import uzFlag from "../../assets/flags/uzbekistan.png";
import uzcFlag from "../../assets/flags/uzbekistan.png";
import engFlag from "../../assets/flags/united-kingdom.png";
import ruFlag from "../../assets/flags/russia.png";
import PrimaryButton from "../../components/PrimaryButton";
import useApiMutation from "../../hooks/useMutation";
import { toast } from "react-toastify";
import CustomModal from "../../components/CustomModal";

const Password = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedLang, setSelectedLang] = useState("UZ");
  const [canResend, setCanResend] = useState(false);
  const [verify, setVerify] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minut = 120 sekund
  const [code, setCode] = useState(["", "", "", ""]);
  const [dataResponse, setDataResponse] = useState(null);
  const inputRefs = useRef([]);
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleClose = () => setVerify(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "+998 ",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

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

  const { mutate, isLoading } = useApiMutation({
    url: "/auth/forgot/password",
    method: "POST",
    onSuccess: (data) => {
      toast.info("Telfon raqamingizga tasdiqlash kodi yuborildi");
      setVerify(true);
      setDataResponse(data);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const { mutate: otpMutate, isLoading: otpLoading } = useApiMutation({
    url: "/auth/forget/password/verify-otp",
    method: "PATCH",
    onSuccess: (data) => {
      toast.success("Parol muvaffaqiyatli uzgartirildi");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message || t("auth.invalidCode"));
    },
  });

  const { mutate: resendMutate} = useApiMutation({
    url: "/auth/sendotp/again/for-register",
    method: "POST",
    onSuccess: (data) => {
      toast.success("Kod qayta yuborildi");
      setTimeLeft(120); // vaqtni qaytadan 2 minutga o‘rnatamiz
      setCanResend(false);
      setDataResponse(data)
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const handlePhoneChange = (value, onChange) => {
    setPhone(value);
    if (!value.startsWith("+998")) {
      onChange("+998 ");
    } else {
      onChange(value);
    }
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
      toast.error("4 talik kod kirit");
      return;
    }
    const data = {
      verification_key: dataResponse?.details,
      phoneNumber: phone.replace(/\s/g, ""),
      otp: enteredCode,
    };

    otpMutate(data);
  };

  const onSubmit = (data) => {
    const newData = {
      phoneNumber: data?.phoneNumber.replace(/\s/g, ""),
      newPassword: data?.password,
    };
    mutate(newData);
    // API yoki navigation shu yerda
  };

  const getLangImage = () => {
    switch (selectedLang) {
      case "ENG":
        return Eng;
      case "RU":
        return Rus;
      case "ЎЗ":
        return Kiril;
      default:
        return Uzb;
    }
  };

  const handleResend = () => {
    resendMutate({
      phoneNumber: phone.replace(/\s/g, ""),
      verification_key: dataResponse?.details
    });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden px-4 sm:px-6">
      {/* Dekor doiralar */}
      <div className="absolute w-[471px] h-[471px] bg-[#06B2B6] rounded-full top-[-111px] left-[1098px] hidden md:block" />
      <div className="absolute w-[471px] h-[471px] bg-[#06B2B6] rounded-full top-[520px] left-[-39px] hidden md:block" />

      {/* LoginCard */}
      <div className="relative z-10 flex flex-col items-center bg-white rounded-[12px] shadow-[0px_2px_6px_0px_#2553B91A] w-full max-w-[960px] md:h-[706px] p-5 md:p-[30px] gap-[20px] md:gap-[30px]">
        {/* Language selector */}
        <div className="flex gap-2 md:gap-4 justify-center mb-2 mt-1 flex-wrap">
          {[
            { code: "UZ", flag: uzFlag },
            { code: "ЎЗ", flag: uzcFlag },
            { code: "ENG", flag: engFlag },
            { code: "RU", flag: ruFlag },
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`flex items-center justify-center rounded-[16px] border-2 bg-white transition-all duration-300 
                ${
                  selectedLang === lang.code
                    ? "border-[#06B2B6]"
                    : "border-[#E0E0E0] hover:border-[#06B2B6]"
                }
                w-[80px] h-[48px] md:w-[103px] md:h-[56px] px-3 md:px-4 py-2 md:py-3`}
            >
              <img
                src={lang.flag}
                alt={lang.code}
                className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] mr-1 md:mr-2"
              />
              <span className="text-[#1A1A1A] text-sm md:text-base font-medium">
                {lang.code}
              </span>
            </button>
          ))}
        </div>

        {/* Kontent */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start w-full bg-white rounded-[12px] gap-[30px] md:h-[560px]">
          {/* Chap rasm */}
          <div className="hidden md:flex items-center justify-center w-[435px] h-[560px] rounded-[12px] overflow-hidden bg-transparent">
            <img
              src={getLangImage()}
              alt="App preview"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Forma */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full md:w-[435px] md:h-[512px] p-2 rounded-[12px] relative"
          >
            <div className="mb-2 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-[#1E1E1E]">
                Parolni tiklash
              </h2>
              <p className="text-sm text-[#1E1E1E]/60 mt-2">
                Iltimos, parolingizni tiklash uchun kerakli ma’lumotlarni
                kiriting.
              </p>
            </div>

            <div className="flex w-full h-[40px] md:h-[50px] rounded-[12px] overflow-hidden bg-transparent justify-center md:justify-start mt-3">
              <img
                src={Option}
                alt="option"
                className="w-[300px] md:w-[400px] h-auto bg-transparent"
              />
            </div>

            {/* Inputs */}
            <div className="flex flex-col gap-3 mt-4">
              {/* Telefon */}
              <div>
                <label className="block text-sm font-medium text-[#1E1E1E] mb-1">
                  *Telefon
                </label>
                <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{
                    required: "Telefon raqam kiritish majburiy",
                    pattern: {
                      value: /^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/,
                      message: "Telefon raqam noto‘g‘ri formatda",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value}
                      onChange={(e) =>
                        handlePhoneChange(e.target.value, onChange)
                      }
                      placeholder="Phone"
                      status={errors.phoneNumber ? "error" : ""}
                    />
                  )}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Parol */}
              <div className="relative">
                <label className="block text-sm font-medium text-[#1E1E1E] mb-1">
                  *Parol
                </label>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Parol kiritish majburiy",
                    minLength: {
                      value: 6,
                      message:
                        "Parol kamida 6 ta belgidan iborat bo‘lishi kerak",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Parol"
                      status={errors.password ? "error" : ""}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-gray-500 hover:text-[#06B2B6]"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Parol qayta */}
              <div className="relative">
                <label className="block text-sm font-medium text-[#1E1E1E] mb-1">
                  *Parol (qayta kiriting)
                </label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: "Parolni qayta kiriting",
                    validate: (value) =>
                      value === password || "Parollar mos emas",
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Parol"
                      status={errors.confirmPassword ? "error" : ""}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-gray-500 hover:text-[#06B2B6]"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Akkount yaratish */}
            <div className="text-sm text-gray-600 mt-8 text-center md:text-left">
              Yangi foydalanuvchimisiz?{" "}
              <Link
                to="/Registir"
                className="underline font-semibold text-[#06B2B6]"
              >
                Akkaunt yaratish
              </Link>
            </div>

            {/* Tugma */}
            <div className="mt-4">
              <PrimaryButton
                disabled={isLoading}
                type="submit"
                className="w-full py-3 rounded-[12px] text-white font-medium  mt-5"
              >
                Davom etish
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
      <CustomModal
        open={verify}
        title="Tasdiqlash kodi"
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
        <PrimaryButton onClick={handleResend} disabled={!canResend} className="w-full rounded-[14px] py-[12px] mb-[16px] mt-[16px]">
          <span className={`${canResend ? "" : "text-[#1e1e1e31]"} font-[500]`}>
            Kodni qayta yuborish{" "}
            {!canResend && <span>
              {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </span>}
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
            "Tasdiqlash"
          )}
        </PrimaryButton>
      </CustomModal>
    </div>
  );
};

export default Password;
