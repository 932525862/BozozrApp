import React from "react";
import { Input } from "antd";
import PrimaryButton from "../../../components/PrimaryButton";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;

const SeenComment = ({ product, onClose }) => {
    // console.log(selectProduct);
    const { t } = useTranslation();
  return (
    <div className="">
      

      <TextArea
        value={product?.description ?? ""}
        readOnly
        placeholder="Izoh mavjud emas"
        rows={4}
        style={{
          resize: "none",
        }}
      />
        <PrimaryButton
          onClick={() => onClose()}
          className="py-[10px] w-full mt-[12px] rounded-[14px] bg-[#EFEFEF] hover:bg-[#e2e2e2] !text-[#1E1E1E] font-[500]"
        >
          {t("deleteMarket.cancel")}
        </PrimaryButton>
    </div>
  );
};

export default SeenComment;
