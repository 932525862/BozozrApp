import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

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
          <Button
            onClick={() => navigate("/")}
            type="primary"
            className="
        flex items-center justify-center gap-2
        !bg-[#06B2B6]
        !border-none
        hover:!bg-[#0CAFB3]
        transition-all duration-300
        text-white
        !text-base sm:!text-lg md:!text-xl
        font-medium
        !px-8 sm:!px-10 md:!px-12
        !py-3 sm:!py-4 md:!py-5
        rounded-2xl
        shadow-[0_4px_20px_rgba(6,178,182,0.4)]
      "
          >
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
