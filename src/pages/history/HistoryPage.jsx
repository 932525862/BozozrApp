import React, { useState } from "react";
import EmptyHistory from "./components/EmptyHistory";
import { useFetchOne } from "../../hooks/useFetchOne";
import HistoryMarketCard from "./components/HistoryMarketCard";
import Loding from "../../components/Loding";
import CustomModal from "../../components/CustomModal";
import AgainHistory from "./components/AgainHistory";
import CheckMarket from "./components/CheckMarket";
import { useTranslation } from "react-i18next";

const HistoryPage = () => {
  const [open, setOpen] = useState(false);
  const [selectHistory, setSelectHistory] = useState(null);
  const [modalType, setModalType] = useState(null);
  const {t} = useTranslation()
  const { data, isLoading } = useFetchOne({
    key: [`history`],
    url: `/history`,
  });

  const handleOpen = (type) => {
    setModalType(type);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loding />
      </div>
    );
  }

  return (
    <div className="h-full pb-[90px] sm:pb-[115px] md:pb-[0]">
      {data?.data?.length > 0 ? (
        <div className="flex flex-col gap-[20px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[12px]">
            {data?.data?.map((item) => (
              <HistoryMarketCard
                key={item?.id}
                market={item}
                handleOpen={handleOpen}
                setSelectHistory={setSelectHistory}
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptyHistory />
      )}
      <CustomModal
        open={open}
        title={modalType == "again" ? t("history.again") : t("history.check")}
        onCancel={handleClose}
        width={modalType == "again" ? 351 : 351}
      >
        {modalType == "again" ? (
          <AgainHistory onClose={handleClose} history={selectHistory} />
        ) : (
          <CheckMarket shoppingHistory={selectHistory}/>
        )}
      </CustomModal>
    </div>
  );
};

export default HistoryPage;
