import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useFetchOne } from "../../hooks/useFetchOne";
import ProductCard from "../marketDetails/components/ProductCardMarket";
import { formatNumberWithSpace } from "../../utils/utils";
import Loding from "../../components/Loding";
import EmptyHistory from "./components/EmptyHistory";
import { useTranslation } from "react-i18next"; // 🟢 i18 qo‘shildi
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import CustomModal from "../../components/CustomModal";
import SeenComment from "../marketDetails/components/SeenComment"

const HistoryDetails = () => {
  const [open, setOpen] = useState(false);
  const [selectProduct, setSelectProduct] = useState(null);
  const location = useLocation();
  const { t } = useTranslation(); // 🟢 Tarjima hook
  const marketId = location.state?.id;

  const { data, isLoading } = useFetchOne({
    key: [`history/${marketId}`],
    url: `/history/${marketId}`,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectProduct(null);
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

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loding />
      </div>
    );
  }

  return (
    <div className=" w-full">
      <div className="bg-white rounded-[8px] mb-4 py-[10px] px-[12px]">
        <CustomBreadcrumb
          items={[{ label: "Tarix", to: "/histories" }, { label: data?.name }]}
        />
      </div>
      {/* 🔵 Tarjima bilan o‘zgartirildi */}
      <h2 className="text-xl font-semibold mb-4">{t("historyDetails.title")}</h2>

      {data?.marketLists?.length > 0 ? (
        <>
          {/* 🔵 Tarjima bilan o‘zgartirildi */}
          <p className="mb-4 text-gray-500">
            {t("historyDetails.totalPrice")}: {calculateAllProducts(data?.marketLists)} {t("historyDetails.currency")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.marketLists.map((product) => (
              <ProductCard key={product.id} product={product} handleOpen={handleOpen}
              setSelectProduct={setSelectProduct}/>
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

export default HistoryDetails;
