import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import ProductCard from "./components/ProductCard";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import CustomModal from "../../components/CustomModal";
import { useFetchOne } from "../../hooks/useFetchOne";
import { useFetch } from "../../hooks/useFetch";
import { useShoppingStore } from "../../store/shoppingStore";
import AddReadyProductForm from "./components/AddReadyProductForm";


const ProductsPage = () => {
  const [selectProduct, setSelectProduct] = useState(null);
  const {brendId} = useShoppingStore()

  const [open, setOpen] = useState(false);

  const handleOpen = (product) => {
    setSelectProduct(product);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const { state } = useLocation();
  const brend = state;

  const { data } = useFetch({
    key: [`products`, brend?.selectedSub?.id],
    url: `/products`,
    config: {
      params: {
        categoryId: brend?.selectedSub?.id,
      },
    },
  });
  return (
    <div>
      <div className="bg-[#FFFFFF] rounded-[8px] mb-4 py-[10px] px-[12px]">
        <CustomBreadcrumb
          items={[
            { label: "Brendlar", to: "/brends" },
            {
              label: brendId?.titleUz,
              to: `/brends/${brendId?.titleUz?.replace(/\s+/g, "-")}/subbrends`,
            },
            // faqat selectSub mavjud bo‘lsa uchinchi elementni qo‘shamiz
            ...(brend?.selectedSub
              ? [{ label: brend?.selectedSub?.titleUz }]
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
        title="Mahsulot qo'shish"
        onCancel={handleClose}
        width={391}
      >
        <AddReadyProductForm onClose={handleClose} product={selectProduct}/>
      </CustomModal>
    </div>
  );
};

export default ProductsPage;
