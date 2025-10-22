import React, { useState } from "react";
import { Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import Uzb from "../../assets/left-part.svg";
import Eng from "../../assets/eng.svg";
import Rus from "../../assets/rus.svg";
import Kiril from "../../assets/krill.svg";
import option from "../../assets/option.svg";
import uzFlag from "../../assets/flags/uzbekistan.png";
import uzcFlag from "../../assets/flags/uzbekistan.png";
import engFlag from "../../assets/flags/united-kingdom.png";
import ruFlag from "../../assets/flags/russia.png";
import PrimaryButton from "../../components/PrimaryButton";
import useApiMutation from "../../hooks/useMutation";
import { useStore } from "../../store/userStore";
import bgImg from "../../assets/back.svg";
import { toast } from "react-toastify";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedLang, setSelectedLang] = useState("UZ");
  const { setUser } = useStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    // watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      phoneNumber: "+998 ",
      password: "",
    },
  });

  const { mutate, isLoading } = useApiMutation({
    url: "/auth/login/user",
    method: "POST",
    onSuccess: (data) => {
      setUser(data?.access_token, data?.refresh_token, data?.user);
      navigate("/");
      toast.success("Tizimga muvaffaqiyatli kirildi");
      reset();
    },
    onError: (error) => {
      if(error.status == 401) {
              toast.error("Telfon nomer yoki parol notug'ri")
            }else{
              toast.error(error.response?.data?.message);
            }
    },
  });

  const handlePhoneChange = (value, onChange) => {
    if (!value.startsWith("+998")) {
      onChange("+998 ");
    } else {
      onChange(value);
    }
  };

  const onSubmit = (data) => {
    const newData = {
      phoneNumber: data?.phoneNumber.replace(/\s/g, ""),
      password: data?.password,
    };
    mutate(newData);
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

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden px-4 sm:px-6"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dekor doiralar */}

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
              onClick={() => {
                setSelectedLang(lang.code);

                // 🔹 Til kodi xaritasi (i18n uchun)
                const langMap = {
                  UZ: "uz",
                  ЎЗ: "krl",
                  ENG: "en",
                  RU: "ru",
                };

                // 🔹 Tilni o‘zgartirish
                i18n.changeLanguage(langMap[lang.code]);

                // 🔹 LocalStorage'ga saqlash
                localStorage.setItem("marketAppLng", langMap[lang.code]);
              }}
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
          {/* Chap (Rasm qismi) */}
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
                {t("welcome")}
              </h2>
              <p className="text-sm text-[#1E1E1E]/60 mt-2">
                {t("login_description")}
              </p>
            </div>

            {/* Dekor chiziq */}
            <div className="flex w-full md:w-[435px] h-[40px] md:h-[50px] rounded-[12px] overflow-hidden bg-transparent justify-center md:justify-start">
              <img
                src={option}
                alt="option"
                className="w-[300px] md:w-[400px] h-auto bg-transparent"
              />
            </div>

            {/* Inputs */}
            <div className="flex flex-col gap-3 mt-4">
              {/* Telefon input */}
              <div>
                <label className="block text-sm font-medium text-[#1E1E1E] mb-1">
                  *{t("phone")}
                </label>
                <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{
                    required: t("password_required"),
                    pattern: {
                      value: /^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/,
                      message: t("password_min_length"),
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value}
                      status={errors.phoneNumber ? "error" : ""}
                      onChange={(e) =>
                        handlePhoneChange(e.target.value, onChange)
                      }
                    />
                  )}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Parol input */}
              <div className="relative">
                <label className="block text-sm font-medium text-[#1E1E1E] mb-1">
                  *{t("password")}
                </label>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Parol majburiy",
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
                      status={errors.password ? "error" : ""}
                      placeholder="Parol"
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
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm mt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-2 border-[#06B2B6] rounded-[4px] appearance-none outline-none cursor-pointer bg-white checked:bg-[#06B2B6]"
                />
                <span className="text-[#1E1E1E] text-sm">
                  {t("remember_me")}
                </span>
              </label>
              <Link to="/password" className="text-sm text-[#06B2B6] underline">
                {t("forgot_password")}
              </Link>
            </div>

            {/* Yangi akkount */}
            <div className="text-sm text-gray-600 mt-8 text-center md:text-left">
              {t("new_user")}{" "}
              <Link
                to="/Registir"
                className="underline font-semibold text-[#06B2B6]"
              >
                {t("create_account")}
              </Link>
            </div>

            {/* Davom etish */}
            <div className="mt-4">
              <PrimaryButton
                disabled={isLoading}
                type="submit"
                className="w-full py-3 rounded-[12px]  text-white font-medium  mt-5"
              >
                {t("continue")}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
