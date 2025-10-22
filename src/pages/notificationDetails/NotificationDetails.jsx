import React, { useMemo, useState } from "react";
import { formatNumberWithSpace, getLangValue } from "../../utils/utils";
import Loding from "../../components/Loding";
import { useTranslation } from "react-i18next"; // 🟢 i18 qo‘shildi
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import CustomModal from "../../components/CustomModal";
import SeenComment from "../marketDetails/components/SeenComment";
import { useStore } from "../../store/userStore";
import CustomButton from "../../components/CustomButton";
import useApiMutation from "../../hooks/useMutation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ShoppingSummary from "../marketDetails/components/ShoppingSummary";
import ProductNotCard from "./components/ProductNotCard";

const NotificationDetails = () => {
  const { notMarket } = useStore();
  const [selectProduct, setSelectProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectProduct(null);
  };

  const { mutate } = useApiMutation({
    url: `/market/respond/to-invite`,
    method: "PATCH",
    onSuccess: () => {
      navigate(`/market/${notMarket?.name}`, {
        state: { id: notMarket?.id },
      });
      toast.success("Bozorlikni qabul qildingiz");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const respondShare = () => {
    const data = {
      marketId: notMarket?.id,
      accept: true,
    };
    mutate(data);
  };

  function calculateAllProducts(products) {
    if (!Array.isArray(products)) return "0";

    const total = products.reduce((sum, p) => {
      const { calculationType, quantity = 0, price = 0 } = p;
      const subtotal =
        calculationType === "one"
          ? quantity * price
          : calculationType === "all"
          ? price
          : 0;
      return sum + subtotal;
    }, 0);

    return formatNumberWithSpace(total);
  }

  const buyingCount = useMemo(
      () => notMarket?.marketLists.reduce((acc, p) => acc + (p.isBuying ? 1 : 0), 0),
      [notMarket]
    );

  if (!notMarket) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loding />
      </div>
    );
  }


  return (
    <div className=" w-full pb-[90px] sm:pb-[115px] md:pb-[0]">
      <div className="bg-white rounded-[8px] mb-4 py-[10px] px-[12px]">
        <CustomBreadcrumb
          items={[
            { label: "Xabarnoma", to: "/notifications" },
            { label: notMarket?.name },
          ]}
        />
      </div>
      {/* 🔵 Tarjima bilan o‘zgartirildi */}
      <div className="flex justify-between items-center flex-col sm:flex-row mb-[10px]">
        <h2 className="text-xl font-semibold mb-4">
          {t("historyDetails.title")}{" "}
        </h2>
        <CustomButton
          onClick={respondShare}
          className="text-[13px] py-[10px] px-[25px]"
        >
          Bozorlikni qabul qilish
        </CustomButton>
      </div>

      {notMarket?.marketLists?.length > 0 ? (
        <>
          {/* 🔵 Tarjima bilan o‘zgartirildi */}
          {/* <p className="mb-4 text-gray-500">
            {t("historyDetails.totalPrice")}:{" "}
            {calculateAllProducts(notMarket?.marketLists)}{" "}
            {t("historyDetails.currency")}
          </p> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ShoppingSummary
              total={notMarket?.marketLists?.length}
              bought={buyingCount}
              price={calculateAllProducts(notMarket?.marketLists)}
              name={getLangValue(notMarket?.marketType, "title", i18n.language)}
            />
            {notMarket?.marketLists.map((product) => (
              <ProductNotCard
                key={product.id}
                product={product}
                handleOpen={handleOpen}
                setSelectProduct={setSelectProduct}
              />
            ))}
          </div>
        </>
      ) : (
        <EmptyHistory />
      )}
      <CustomModal
        open={open}
        title="Mahsulot izohi"
        onCancel={handleClose}
        width={351}
      >
        <SeenComment product={selectProduct} onClose={handleClose} />
      </CustomModal>
    </div>
  );
};

export default NotificationDetails;
