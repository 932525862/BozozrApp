import React from "react";
import EmptyHistory from "./components/EmptyHistory";
import { useFetchOne } from "../../hooks/useFetchOne";
import HistoryMarketCard from "./components/HistoryMarketCard";
import Loding from "../../components/Loding";

const HistoryPage = () => {
  const { data, isLoading } = useFetchOne({
    key: [`history`],
    url: `/history`,
  });

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center"><Loding/></div>
    );
  }

  return (
    <div className="h-full">
  {data?.data?.length > 0 ? (
    <div className="flex flex-col gap-[20px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[12px]">
        {data?.data?.map((item) => (
          <HistoryMarketCard key={item?.id} market={item} />
        ))}
      </div>
    </div>
  ) : (
    <EmptyHistory />
  )}
</div>  
  );
};

export default HistoryPage;
