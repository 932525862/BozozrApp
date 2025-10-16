import React, { useEffect, useRef, useState } from "react";
import { Input, Select } from "antd";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
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
import CustomModal from "../../components/CustomModal";
import bgImg from "../../assets/back.svg"
import { toast } from "react-toastify";
import { useStore } from "../../store/userStore";

const { Option } = Select;

const Registir = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("+998 ");
  const [selectedLang, setSelectedLang] = useState("UZ");
  const [verify, setVerify] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [dataResponse, setDataResponse] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minut = 120 sekund
  const [canResend, setCanResend] = useState(false);
  const { setUser } = useStore();

  const handleClose = () => setVerify(false);
  // 🔹 react-hook-form setup
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "+998 ",
      password: "",
      confirmPassword: "",
      gender: null,
      region: null,
    },
  });

  const { mutate, isLoading } = useApiMutation({
    url: "/auth/register/user",
    method: "POST",
    onSuccess: (data) => {
      toast.info(t("toast.otp_sent"));
      setVerify(true);
      setDataResponse(data);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const { mutate: otpMutate, isLoading: otpLoading } = useApiMutation({
    url: "/auth/verify/otp",
    method: "POST",
    onSuccess: (data) => {
      setUser(data?.access_token, data?.refresh_token, data?.user);
      toast.success(t("toast.login_success"));
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

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

  const { mutate: resendMutate } = useApiMutation({
    url: "/auth/sendotp/again/for-register",
    method: "POST",
    onSuccess: (data) => {
      toast.success(t("toast.otp_resent"));
      setTimeLeft(120); // vaqtni qaytadan 2 minutga o‘rnatamiz
      setCanResend(false);
      setDataResponse(data)
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const handleResend = () => {
    resendMutate({
      phoneNumber: phone.replace(/\s/g, ""),
      verification_key: dataResponse?.details,
    });
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    if (!input.startsWith("+998")) {
      setPhone("+998 ");
      setValue("phoneNumber", "+998 ");
    } else {
      setPhone(input);
      setValue("phoneNumber", input);
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

  // 🔸 Forma submit funksiyasi
  const onSubmit = (data) => {
    const newData = {
      fullName: data.name,
      phoneNumber: data.phoneNumber.replace(/\s/g, ""),
      password: data.password,
      region: data.region, // backendga yuboriladi
      gender: data.gender, // backendga yuboriladi
      confirmPassword: data?.confirmPassword,
    };

    mutate(newData);
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
    <div className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden px-4 sm:px-6"
    style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dekor doiralar */}
 
      {/* Card */}
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

        {/* Content */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start w-full bg-white rounded-[12px] gap-[30px] md:h-[560px]">
          {/* Chap taraf */}
          <div className="hidden md:flex items-center justify-center w-[435px] h-[560px] rounded-[12px] overflow-hidden bg-transparent">
            <img
              src={getLangImage()}
              alt={t("alt.app_preview")}
              className="w-full h-full object-contain"
            />
          </div>

          {/* O‘ng taraf — forma */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full md:w-[435px] md:h-[512px] p-2 rounded-[12px] relative"
          >
            <div className="mb-2 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-[#1E1E1E]">
                {t("welcome")}
              </h2>
              <p className="text-sm text-[#1E1E1E]/60 mt-2">
                {t("subtitle")}
              </p>
            </div>

            <div className="flex w-full md:w-[435px] h-[40px] md:h-[50px] rounded-[12px] overflow-hidden bg-transparent justify-center md:justify-start">
              <img
                src={option}
                alt="option"
                className="w-[300px] md:w-[400px] h-auto bg-transparent"
              />
            </div>

            {/* Inputs */}
            <div className="flex flex-col gap-3 mt-4">
              {/* Ism + Telefon */}
              <div className="flex flex-col md:flex-row gap-3">
                {/* Ism */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[#1E1E1E] mb-1">
                    {t("labels.name")}
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: t("errors.required_name") }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        status={errors.name ? "error" : ""}
                        placeholder={t("placeholders.name")}
                      />
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Telefon */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[#1E1E1E] mb-1">
                    {t("labels.phone")}
                  </label>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{
                      required: t("errors.required_phone"),
                      pattern: {
                        value: /^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/,
                        message: t("errors.phone_invalid"),
                      },
                    }}
                    render={() => (
                      <Input
                        value={phone}
                        status={errors.phoneNumber ? "error" : ""}
                        onChange={handlePhoneChange}
                      />
                    )}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Parol + Qayta parol */}
              <div className="flex flex-col md:flex-row gap-3">
                {/* Parol */}
                <div className="flex-1 relative">
                  <label className="block text-sm font-medium text-[#1E1E1E] mb-1">
                    {t("labels.password")}
                  </label>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: t("errors.required_password") }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        status={errors.password ? "error" : ""}
                        placeholder={t("placeholders.password")}
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

                {/* Qayta parol */}
                <div className="flex-1 relative">
                  <label className="block text-sm font-medium text-[#1E1E1E] mb-1">
                    {t("labels.confirmPassword")}
                  </label>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                      required: t("errors.required_confirm"),
                      validate: (value) =>
                        value === (control._formValues?.password || "") ||
                        t("errors.password_mismatch"),
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        status={errors.confirmPassword ? "error" : ""}
                        placeholder={t("placeholders.confirmPassword")}
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

              {/* Jinsi + Joylashuv */}
              <div className="flex flex-col md:flex-row gap-3">
                {/* Jinsi */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[#1E1E1E] mb-1">
                    {t("labels.gender")}
                  </label>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: t("errors.required_gender") }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder={t("placeholders.gender")}
                        className="w-full"
                        status={errors.gender ? "error" : ""}
                      >
                        <Option value="erkak">{t("gender.male")}</Option>
                        <Option value="ayol">{t("gender.female")}</Option>
                      </Select>
                    )}
                  />
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                {/* Joylashuv */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[#1E1E1E] mb-1">
                    {t("labels.region")}
                  </label>
                  <Controller
                    name="region"
                    control={control}
                    rules={{ required: t("errors.required_region") }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder={t("placeholders.region")}
                        status={errors.region ? "error" : ""}
                        className="w-full"
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
                        <Option value="qarakalpogiston">{t("regions.qarakalpogiston")}</Option>
                      </Select>
                    )}
                  />
                  {errors.region && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.region.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Pastki qism */}
            <div className="text-sm text-gray-600 mt-8 text-center md:text-left">
              {t("account_exists")}{" "}
              <Link
                to="/Login"
                className="underline font-semibold text-[#06B2B6]"
              >
                {t("login")}
              </Link>
            </div>

            <div className="mt-4">
              <PrimaryButton
                disabled={isLoading}
                type="submit"
                className="w-full py-3 rounded-[12px] text-white font-medium mt-5"
              >
                {t("continue")}
              </PrimaryButton>
            </div>
          </form>
        </div>
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
        <PrimaryButton onClick={handleResend} disabled={!canResend} className="w-full rounded-[14px] py-[12px] mb-[16px] mt-[16px]">
          <span className={`${canResend ? "" : "text-[#1e1e1e31]"} font-[500]`}>
            {t("modal.resend")}
            {!canResend && <span> {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</span>}
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
};

export default Registir;
