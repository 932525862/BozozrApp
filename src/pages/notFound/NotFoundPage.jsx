import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex justify-center items-centerpx-4">
      <Result
        status="404"
        title={<span className="text-4xl sm:text-5xl md:text-6xl font-semibold">404</span>}
        subTitle={
          <p className="text-sm sm:text-base md:text-lg text-gray-500">
            Sorry, the page you visited does not exist.
          </p>
        }
        extra={
          <PrimaryButton
            onClick={() => navigate(-1)}
            className="text-[20px] px-[35px] py-[5px] rounded-[12px]"
          >
            Back Home
          </PrimaryButton>
        }
      />
    </div>
  );
};

export default NotFoundPage;
