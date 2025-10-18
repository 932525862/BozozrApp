import React from 'react'
import EmptyHistory from './components/EmptyHistory';
import { useFetchOne } from '../../hooks/useFetchOne';

const HistoryPage = () => {

  const { data } = useFetchOne({
      key: [`history`],
      url: `/history`,
    });

    console.log(data?.data);
    
    
    return <div className="h-full">
    {data?.items?.length > 0 ? (
        <div className="flex flex-col gap-[20px]">sds
          {/* <div className="grid grid-cols-3 gap-[12px]">
            {data?.map((item) => (
              <MarketCard
                key={item?.id}
                market={item}
                refetch={refetch}
                setSelectMarket={setSelectMarket}
                handleOpen={handleOpen}
              />
            ))}
          </div>
          <div className="self-end">
            <CustomButton onClick={() => handleOpen("add")} className="w-[278px]">
              <span>Yangi bozorlik</span>
              <span className="bg-white w-[24px] h-[24px] flex justify-center items-center rounded-[5px] text-[#06B2B6]">
                <LuPlus className="text-[16px]" />
              </span>
            </CustomButton>
          </div> */}
        </div>
      ) : (
        <EmptyHistory/>
      )}
  </div>;
}

export default HistoryPage