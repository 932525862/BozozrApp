import React from "react";
import EmptyHistory from "./components/EmptyHistory";
import { useFetchOne } from "../../hooks/useFetchOne";
import HistoryMarketCard from "./components/HistoryMarketCard";

const HistoryPage = () => {
  const { data } = useFetchOne({
    key: [`history`],
    url: `/history`,
  });

  console.log(data?.data);

  return (
    <div className="h-full">
      {data?.data?.length > 0 ? (
        <div className="flex flex-col gap-[20px]">
          <div className="grid grid-cols-3 gap-[12px]">
            {data?.data?.map((item) => (
              <HistoryMarketCard
                key={item?.id}
                market={item}
              />
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
