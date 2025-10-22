import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex justify-center items-centerpx-4 pb-[90px] sm:pb-[115px] md:pb-[0]">
      <Result
        status="404"
        title={<span className="text-4xl sm:text-5xl md:text-6xl font-semibold">{t("notFound.code")}</span>}
        subTitle={
          <p className="text-sm sm:text-base md:text-lg text-gray-500">
            {t("notFound.description")}
          </p>
        }
        extra={
          <PrimaryButton
            onClick={() => navigate(-1)}
            className="text-[20px] px-[35px] py-[5px] rounded-[12px]"
          >
            {t("notFound.backHome")}
          </PrimaryButton>
        }
      />
    </div>
  );
};

export default NotFoundPage;
