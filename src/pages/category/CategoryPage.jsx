import React from "react";
import BrendsCard from "./components/BrendsCard";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useShoppingStore } from "../../store/shoppingStore";
import Loding from "../../components/Loding";



const CategoryPage = () => {
  const navigate = useNavigate();
  const {setBrendId} = useShoppingStore()

  const { data, isLoading } = useFetch({
    key: ['category', ],
    url: '/category'
  });
  

  const handleCardClick = (brend) => {
    setBrendId(brend)
    const formattedTitle = brend.titleEn.replace(/\s+/g, "-");
    if (brend?.children && brend?.children.length > 0) {
      navigate(`/brends/${formattedTitle}/subbrends`, { state: brend });
    } else {
      navigate(`/brends/${formattedTitle}/products`, { state: brend });
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center"><Loding/></div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[12px]">
      {data?.items?.map((item) => (
        <div
          key={item.id}
          className="cursor-pointer"
          onClick={() => handleCardClick(item)}
        >
          <BrendsCard brend={item} />
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
