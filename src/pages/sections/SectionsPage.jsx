import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import { useFetch } from "../../hooks/useFetch";
import { getLangValue } from "../../utils/utils";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";
import { useFetchOne } from "../../hooks/useFetchOne";
import MarketCard from "../markets/components/MarketCard";
import { useStore } from "../../store/userStore";
import HistoryMarketCard from "../history/components/HistoryMarketCard";
import CustomModal from "../../components/CustomModal";
import EditMarketForm from "../markets/components/EditMarketForm";
import DeleteMarket from "../markets/components/DeleteMarket";
import ShareMarket from "../markets/components/ShareMarket";
import CheckMarket from "../history/components/CheckMarket";
import AgainHistory from "../history/components/AgainHistory";

const SectionsPage = () => {
  const { i18n, t } = useTranslation();
  const { sectionId, setSectionId } = useStore();
  const [filter, setFilter] = useState("Faol bozorliklar");
  const options = ["Faol bozorliklar", "Tugallangan bozorliklar"];
  const [open, setOpen] = useState(false);
    const [selectMarket, setSelectMarket] = useState(null);
    const [modalType, setModalType] = useState(null);
    const handleOpen = (type) => {
      setModalType(type)
      setOpen(true);
    };
    const handleClose = () => setOpen(false);

  const { data: marketTypeData } = useFetch({
    key: [`market-type`],
    url: `/market-type`,
  });

  const { data: marketData, refetch, isLoading: marketLoading } = useFetchOne({
    key: ["market", sectionId],
    url: "/market",
    config: {
      params: { marketTypeId: sectionId },
    },
    options: {
      enabled: !!sectionId && filter == "Faol bozorliklar", // sectionId mavjud bo‘lganda chaqiradi
    },
  });

  const { data: historyData, isLoading: historyLoading } = useFetchOne({
    key: [`history`, sectionId],
    url: `/history`,
    config: {
      params: { marketTypeId: sectionId },
    },
    options: {
      enabled: !!sectionId && filter == "Tugallangan bozorliklar", // sectionId mavjud bo‘lganda chaqiradi
    },
  });

  return (
    <div className="">
      {/* Breadcrumb */}
      <div className="bg-white rounded-[8px] mb-4 py-[10px] px-[12px]">
        <CustomBreadcrumb
          items={[{ label: "Bosh sahifa", to: "/" }, { label: "Bo'limlar" }]}
        />
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Chap bo‘limlar */}
        <div className="col-span-5 flex flex-col gap-3">
          {[...(marketTypeData?.items ?? [])].reverse().map((item) => (
            <div
              key={item?.id}
              onClick={() => setSectionId(item?.id)}
              className={`w-[309px] h-[178px] transition-all duration-300 hover:border-[#06B2B6] border-[2px] cursor-pointer bg-[#ffffff] rounded-[16px] pt-[16px] pl-[16px] pb-[25px] ${
                sectionId == item?.id
                  ? "border-[#06B2B6]"
                  : "border-transparent"
              }`}
              style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right center",
                backgroundImage: `url(${item?.image})`,
              }}
            >
              <div className="flex flex-col justify-between h-full">
                <div className="font-[600] max-w-[84px]">
                  {getLangValue(item, "title", i18n.language)}
                </div>
                <div className="w-[61px] h-[36px]">
                  <img src={logo} alt={t("logoAlt")} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* O‘ng taraf */}
        <div className="col-span-7 flex flex-col gap-4">
          {/* Statistik qismi */}
          <div className="bg-white rounded-[10px] p-5 flex  shadow-sm">
            <div className="w-full">
              <ul className="space-y-1 text-[15px] w-full">
                <li className="flex justify-between ">
                  <span className="font-[600] text-[#1E1E1E]">
                    Jami bozorliklar soni:
                  </span>{" "}
                  <span className="text-[#4B4B4B] font-[500]">41</span>
                </li>
                <li className="flex justify-between ">
                  <span className="font-[600] text-[#1E1E1E]">
                    Jami xarajatlar:
                  </span>{" "}
                  <span className="text-[#4B4B4B] font-[500]">12 210 000</span>
                </li>
                <li className="flex justify-between ">
                  <span className="font-[600] text-[#1E1E1E]">
                    Oylik bozorliklar soni:
                  </span>{" "}
                  <span className="text-[#4B4B4B] font-[500]">12</span>
                </li>
                <li className="flex justify-between ">
                  <span className="font-[600] text-[#1E1E1E]">
                    Oylik xarajatlar:
                  </span>{" "}
                  <span className="text-[#4B4B4B] font-[500]">12 210 000</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-[600] text-[#1E1E1E]">
                    O‘tgan oyga nisbati:{" "}
                  </span>
                  <span className="text-green-500 flex items-center gap-1 font-[500]">
                    <ArrowUpRight size={16} /> +14.3%
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Tugmalar */}
          <div className="relative bg-white shadow-sm rounded-[15px] overflow-hidden flex items-center p-1 w-full h-[42px]">
            {/* Harakatlanuvchi fon */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 h-[34px] w-[50%] rounded-[14px] bg-[#06B2B6] transition-all duration-300 ease-in-out ${
                filter === "Faol bozorliklar" ? "left-1" : "left-[calc(48%)]"
              }`}
            ></div>

            {options.map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`relative cursor-pointer z-10 flex-1 text-[14px] font-medium py-[7px] transition-colors duration-300 ${
                  filter === option ? "text-white" : "text-gray-600"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Kartalar */}
          <div className="grid grid-cols-2 gap-4">
            {filter == "Faol bozorliklar" ? marketData?.map((item) => (
              <MarketCard
                key={item?.id}
                market={item}
                refetch={refetch}
                setSelectMarket={setSelectMarket}
                handleOpen={handleOpen}
              />
            )) : historyData?.data?.map((item) => (
              <HistoryMarketCard
                key={item?.id}
                market={item}
                handleOpen={handleOpen}
                setSelectHistory={setSelectMarket}
              />
            ))}
          </div>
        </div>
      </div>
      <CustomModal
        open={open}
        title={modalType == "edit" ? "Tahrirlash" : modalType == "delet" ? "O'chirish" : modalType == "share" ? "Ulashish" : modalType == "again" ? "Takrorlash" : "Check"}
        onCancel={handleClose}
        width={modalType == "share" ? 400 : 351}
      >
        {modalType == "edit" ? <EditMarketForm refetch={refetch} onClose={handleClose} selectMarket={selectMarket}/> : modalType == "delete" ? <DeleteMarket onClose={handleClose} refetch={refetch} selectMarket={selectMarket}/> : modalType == "share" ? <ShareMarket refetch={refetch} onClose={handleClose} selectMarket={selectMarket}/> : modalType == "again" ? (
          <AgainHistory onClose={handleClose} history={selectMarket} />
        ) : (
          <CheckMarket shoppingHistory={selectMarket}/>
        )}
      </CustomModal>
    </div>
  );
};

export default SectionsPage;
