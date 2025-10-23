import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFetchOne } from "../../hooks/useFetchOne";
import CustomModal from "../../components/CustomModal";
import EmptyMarketList from "./components/EmptyMarketList";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import AddProductForm from "./components/AddProductForm";
import TopActions from "./components/TopActions";
import ShoppingSummary from "./components/ShoppingSummary";
import ProductCard from "./components/ProductCardMarket";
import DeleteProduct from "./components/DeleteProduct";
import { useTranslation } from "react-i18next";
import { formatNumberWithSpace, getLangValue } from "../../utils/utils";
import SeenComment from "./components/SeenComment";
import BuyProduct from "./components/BuyProduct";
import EndMarket from "./components/EndMarket";
import Loding from "../../components/Loding";
import ShareMarket from "../markets/components/ShareMarket";
import BtnsModal from "./components/BtnsModal";

const MarketDetails = () => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectProduct, setSelectProduct] = useState(null);
  const [buying, setBuying] = useState(false);

  const location = useLocation();
  const { t, i18n } = useTranslation();
  const language = i18n?.language;
  const marketId = location.state?.id;

  const { data, refetch, isLoading } = useFetchOne({
    key: [`market/${marketId}`],
    url: `/market/${marketId}`,
  });

  // 🧩 Modalni ochish
  const handleOpen = (type) => {
    setModalType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalType(null);
    setSelectProduct(null);
  };

  // 🪄 Modal ichidagi kontent
  const renderModalContent = () => {
    switch (modalType) {
      case "add":
        return (
          <AddProductForm
            marketId={marketId}
            onClose={handleClose}
            refetch={refetch}
          />
        );
      case "delete":
        return (
          <DeleteProduct
            product={selectProduct}
            onClose={handleClose}
            refetch={refetch}
          />
        );
      case "seen":
        return <SeenComment product={selectProduct} onClose={handleClose} />;
      case "buy":
        return (
          <BuyProduct
            product={selectProduct}
            onClose={handleClose}
            refetch={refetch}
          />
        );
        case "end":
        return (
          <EndMarket
            marketId={marketId}
            onClose={handleClose}
          />
        );
        case "share":
        return (
          <ShareMarket
            selectMarket={data}
            onClose={handleClose}
            refetch={refetch}
          />
        );
        case "addModal":
        return (
          <BtnsModal
            // selectMarket={data}
            // onClose={handleClose}
            // refetch={refetch}
            handleOpen={handleOpen}
          />
        );
      default:
        return null;
    }
  };

  // 🏷️ Modal sarlavhasi
  const getModalTitle = () => {
    switch (modalType) {
      case "add":
        return t("modalType.addProduct");
      case "delete":
        return t("modalType.deleteProduct");
      case "seen":
        return t("modalType.commentProduct");
      case "buy":
        return t("modalType.buyProduct");
        case "end":
        return t("modalType.endMarket");
        case "share":
        return t("modalType.share");
        case "addModal":
        return t("modalType.add");
      default:
        return "";
    }
  };

  const buyingCount = useMemo(
    () => data?.marketLists.reduce((acc, p) => acc + (p.isBuying ? 1 : 0), 0),
    [data]
  );

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

    return formatNumberWithSpace(total); // masalan: 15 000
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center"><Loding/></div>
    );
  }

  return (
    <div className="h-full w-full pb-[90px] sm:pb-[115px] md:pb-[0]">
      {/* 🧭 Breadcrumb */}
      <div className="bg-white rounded-[8px] mb-4 py-[10px] px-[12px]">
        <CustomBreadcrumb
          items={[{ label: t("modalType.bradeMarket"), to: "/markets" }, { label: data?.name }]}
        />
      </div>

      {/* 📦 Mahsulotlar ro‘yxati */}
      {data?.marketLists?.length > 0 ? (
        
        <div className="md:p-6 w-full">
          <h2 className="text-xl font-semibold mb-4">{t("masulotlar")}</h2>
            <div className="flex justify-between w-full mb-[32px]">
              
              <TopActions
                handleOpen={handleOpen}
                setBuying={setBuying}
                total={data?.marketLists?.length}
                bought={buyingCount}
              />
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ShoppingSummary
              total={data?.marketLists?.length}
              bought={buyingCount}
              price={calculateAllProducts(data?.marketLists)}
              name={getLangValue(data?.marketType, "title", language)}
            />

            {data?.marketLists
              ?.filter((item) => item?.isBuying === buying)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleOpen={handleOpen}
                  setSelectProduct={setSelectProduct}
                />
              ))}
          </div>
        </div>
      ) : (
        <EmptyMarketList handleOpen={handleOpen} />
      )}

      {/* 🪟 Modal */}
      <CustomModal
        open={open}
        title={getModalTitle()}
        onCancel={handleClose}
        width={351}
      >
        {renderModalContent()}
      </CustomModal>
    </div>
  );
};

export default MarketDetails;
