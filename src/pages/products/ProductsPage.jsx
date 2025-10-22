import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "./components/ProductCard";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import CustomModal from "../../components/CustomModal";
import { useFetch } from "../../hooks/useFetch";
import { useShoppingStore } from "../../store/shoppingStore";
import AddReadyProductForm from "./components/AddReadyProductForm";
import Loding from "../../components/Loding";
import { useTranslation } from "react-i18next";
import { getLangValue } from "../../utils/utils";


const ProductsPage = () => {
  const [selectProduct, setSelectProduct] = useState(null);
  const {brendId} = useShoppingStore()
  const {i18n, t} = useTranslation()

  const [open, setOpen] = useState(false);

  const handleOpen = (product) => {
    setSelectProduct(product);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const { state } = useLocation();
  const brend = state;

  const { data, isLoading } = useFetch({
    key: [`products`, brend?.selectedSub ? brend?.selectedSub?.id : brend?.id],
    url: `/products`,
    config: {
      params: {
        categoryId: brend?.selectedSub ? brend?.selectedSub?.id : brend?.id,
      },
    },
  });

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center"><Loding/></div>
    );
  }
  return (
    <div>
      <div className="bg-[#FFFFFF] rounded-[8px] mb-4 py-[10px] px-[12px]">
        <CustomBreadcrumb
          items={[
            { label: t("brends.brade.brendName"), to: "/brends" },
            {
              label: getLangValue(brendId, "title", i18n.language),
              to: `/brends/${brendId?.titleEn?.replace(/\s+/g, "-")}/subbrends`,
            },
            // faqat selectSub mavjud bo‘lsa uchinchi elementni qo‘shamiz
            ...(brend?.selectedSub
              ? [{ label: getLangValue(brend?.selectedSub, "title", i18n.language) }]
              : []),
          ]}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[12px]">
        {data?.items.map((item) => (
          <div key={item.id} className="cursor-pointer">
            <ProductCard product={item} handleOpen={handleOpen} />
          </div>
        ))}
      </div>
      <CustomModal
        open={open}
        title={t("modalType.addProduct")}
        onCancel={handleClose}
        width={391}
      >
        <AddReadyProductForm onClose={handleClose} product={selectProduct}/>
      </CustomModal>
    </div>
  );
};

export default ProductsPage;
