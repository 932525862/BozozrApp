import React from 'react'
import { useLocation } from 'react-router-dom';

const MarketDetails = () => {
    const location = useLocation(); // state ma'lumotlarini olish

  // state ichidagi id ni olish
  const marketId = location.state?.id;
  console.log(marketId);
  
  return (
    <div>MarketDetails</div>
  )
}

export default MarketDetails