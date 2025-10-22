import React, { useState } from "react";
import chekImg from "../../assets/chek.svg";
import { useFetch } from "../../hooks/useFetch";
import { formatDateNot, getLangValue } from "../../utils/utils";
import { useTranslation } from "react-i18next";
import Loding from "../../components/Loding";
import CustomModal from "../../components/CustomModal";
import MessagesForm from "./components/MessagesForm";
import useApiMutation from "../../hooks/useMutation";
import { toast } from "react-toastify";

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState("barchasi");
  const { i18n, t } = useTranslation();
  const [notId, setNotId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (notId) => {
    setNotId(notId);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const { mutate } = useApiMutation({
    url: "/notification/do-all-read",
    method: "PATCH",
    onSuccess: () => {
      refetch()
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  // 🔽 activeTab ga qarab query hosil qilamiz
  const getUrl = () => {
    if (activeTab === "oqilmagan") return `/notification/user?isRead=false`;
    if (activeTab === "oqilgan") return `/notification/user?isRead=true`;
    return `/notification/user`;
  };

  // 🔽 useFetch hook
  const { data, refetch, isLoading } = useFetch({
    key: [`notification/user`, activeTab],
    url: getUrl(),
  });

  const tabs = [
    { id: "barchasi", label: t("notification.all") },
    { id: "oqilmagan", label: t("notification.read") },
    { id: "oqilgan", label: t("notification.unRead") },
  ];

  const readAllNot = () => {
    mutate()
  }

  return (
    <div className="flex flex-col items-center gap-4 pb-[90px] sm:pb-[115px] md:pb-[0]">
      {/* Tabs */}
      <div className="w-[90%] max-w-[550px] bg-white rounded-[12px] p-2 flex justify-between items-center gap-3 shadow-sm">
        <div className="flex justify-between items-center gap-3 w-[90%]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-[32%] h-[34px] rounded-[14px] text-sm font-medium transition-colors duration-300 cursor-pointer
                ${
                  activeTab === tab.id
                    ? "bg-[#06B2B6] text-white"
                    : "bg-transparent border border-[#06B2B6] text-[#06B2B6] hover:bg-[#06B2B6] hover:text-white"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button onClick={readAllNot} className="w-[39px] h-[32px] flex items-center justify-center gap-[6px] rounded-[8px] cursor-pointer">
          <img
            src={chekImg}
            alt="check icon"
            className="w-[34px] h-[34px] object-contain"
          />
        </button>
      </div>

      {/* Notification List */}
      {isLoading ? (
        <div className="h-[200px] flex items-center">
          <Loding />
        </div>
      ) : (
        <div className="flex flex-col gap-3 w-[90%] max-w-[550px]">
          {data?.items?.map((item) => (
            <div
              onClick={() => handleOpen(item?.id)}
              key={item.id}
              className={`w-full h-[64px] cursor-pointer bg-white rounded-[12px] px-[4%] py-2 border-2 flex flex-col justify-center relative transition-all duration-300 hover:border-[#06B2B6] ${
                item?.isRead ? "border-transparent" : "border border-[#06B2B6]"
              }`}
            >
              <p className="text-sm text-[#1E1E1E] truncate">
                {item?.sender
                  ? `${item?.sender?.phoneNumber} (${item?.sender?.fullName}) foydalanuvchi sizga bozorlik ulashdi`
                  : getLangValue(item, "title", i18n.language)}
              </p>
              <span className="text-xs text-gray-500 mt-1">
                {formatDateNot(item.createdAt)}
              </span>
              {!item?.isRead && (
                <span className="absolute top-1/4 right-3 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#06B2B6] transition-opacity duration-300"></span>
              )}
            </div>
          ))}
        </div>
      )}

      <CustomModal
        open={open}
        title={t("notification.message")}
        onCancel={handleClose}
        width={391}
      >
        <MessagesForm notId={notId} refetch={refetch} onClose={handleClose}/>
      </CustomModal>
    </div>
  );
};

export default NotificationsPage;
