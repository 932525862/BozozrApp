import React from 'react'
import HeroSlider from './components/HeroSlider'
import SectionsMarket from './components/SectionsMarket'
import MarketsSections from './components/MarketsSections'

const HomePage = () => {
  return (
    <div className='pb-[90px] sm:pb-[115px] md:pb-[10px]'>
      <HeroSlider/>
      <SectionsMarket/>
      <MarketsSections/>
    </div>
  )
}

export default HomePage