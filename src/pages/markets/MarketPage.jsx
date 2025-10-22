import React, { useState } from "react";
import EmptyShoppingList from "./components/EmptyShoppingList";
import { useFetchOne } from "../../hooks/useFetchOne";
import MarketCard from "./components/MarketCard";
import CustomButton from "../../components/CustomButton";
import CustomModal from "../../components/CustomModal";
import AddMarketForm from "./components/AddMarketForm";
import { LuPlus } from "react-icons/lu";
import EditMarketForm from "./components/EditMarketForm";
import DeleteMarket from "./components/DeleteMarket";
import Loding from "../../components/Loding";
import ShareMarket from "./components/ShareMarket";
import { useTranslation } from "react-i18next";
const MarketPage = () => {   
  const [open, setOpen] = useState(false);
  const [selectMarket, setSelectMarket] = useState(null);
  const [modalType, setModalType] = useState(null);
  const { t } = useTranslation();
  const handleOpen = (type) => {
    setModalType(type)
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const { data, refetch, isLoading } = useFetchOne({
    key: [`market`],
    url: `/market`,
  });

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center"><Loding/></div>
    );
  }

  return (
    <div className="h-full bg-[#F9F9F9] pb-[90px] sm:pb-[115px] md:pb-[0]">
      {data?.length > 0 ? (
        <div className="flex flex-col gap-[20px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[12px]">
            {data?.map((item) => (
              <MarketCard
                key={item?.id}
                market={item}
                refetch={refetch}
                setSelectMarket={setSelectMarket}
                handleOpen={handleOpen}
              />
            ))}
          </div>
          <div className="self-center md:self-end w-full sm:w-auto px-[15px] sm:px-0 md:mr-[20px]">
            <CustomButton onClick={() => handleOpen("add")} className="w-full sm:w-[278px]">
              <span>{t("Yangibozorlik")}</span>
              <span className="bg-white w-[24px] h-[24px] flex justify-center items-center rounded-[5px] text-[#06B2B6]">
                <LuPlus className="text-[16px]" />
              </span>
            </CustomButton>
          </div>
        </div>
      ) : (
        <EmptyShoppingList handleOpen={handleOpen}/>
      )}
      <CustomModal
        open={open}
        title={modalType == "add" ? t("modalType.addMarket") : modalType == "edit" ? t("modalType.edit") : modalType == "delet" ? t("modalType.delete") : t("modalType.share") }
        onCancel={handleClose}
        width={modalType == "share" ? 400 : 351}
      >
        {modalType == "add" ? <AddMarketForm refetch={refetch} onClose={handleClose} /> : modalType == "edit" ? <EditMarketForm refetch={refetch} onClose={handleClose} selectMarket={selectMarket}/> : modalType == "delete" ? <DeleteMarket onClose={handleClose} refetch={refetch} selectMarket={selectMarket}/> : <ShareMarket refetch={refetch} onClose={handleClose} selectMarket={selectMarket}/>}
      </CustomModal>
    </div>
  );
};

export default MarketPage;
