import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useFetchOne } from "../../hooks/useFetchOne";
import CustomModal from "../../components/CustomModal";
import EmptyMarketList from "./components/EmptyMarketList";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import AddProductForm from "./components/AddProductForm";
import TopActions from "./components/TopActions";
import ShoppingSummary from "./components/ShoppingSummary";
import ProductCard from "./components/ProductCardMarket";
import { useTranslation } from "react-i18next";
import { getLangValue } from "../../utils/utils";

const mockProducts = [
  {
    id: 1,
    name: "Gilam uchun universal tozalagich",
    quantity: "2 kg",
    image: "/basket.png",
  },
  {
    id: 2,
    name: "Sutli va yongoqli shokolad",
    quantity: "2 kg",
    image: "/basket.png",
  },
  { id: 3, name: "Shakar", quantity: "2 kg", image: "/basket.png" },
  { id: 4, name: "Dena ananas 1l", quantity: "2 blok", image: "/dena.png" },
];

const MarketDetails = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // state ma'lumotlarini olish
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {i18n} = useTranslation()
  const language = i18n?.language
  // state ichidagi id ni olish
  const marketId = location.state?.id;
  const { data } = useFetchOne({
    key: [`market/${marketId}`],
    url: `/market/${marketId}`,
  });

  const [products, setProducts] = useState(mockProducts);

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="h-full w-full">
      <div className="bg-[#FFFFFF] rounded-[8px] mb-4 py-[10px] px-[12px]">
        <CustomBreadcrumb
          items={[{ label: "Bozorlik", to: "/markets" }, { label: data?.name }]}
        />
      </div>
      {data?.marketLists?.length > 0 ? (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
          <div className="flex justify-between w-full mb-[32px]">
            <h2 className="text-xl font-semibold mb-4">Mahsulotlar</h2>
            <div><TopActions /></div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <ShoppingSummary total={data?.marketLists?.length} bought={0} price={0} name={getLangValue(data?.marketType, "title", language)}/>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={() => handleDelete(product.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptyMarketList handleOpen={handleOpen} />
      )}
      <CustomModal
        open={open}
        title="Mahsulot qo'shish"
        onCancel={handleClose}
        width={351}
      >
        <AddProductForm />
      </CustomModal>
    </div>
  );
};

export default MarketDetails;
