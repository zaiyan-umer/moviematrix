import React from 'react'

function Banner({isSm = false}) {
  return (
    <>
    {
        !isSm? <div><div rel="preload" className="banner-img bg-[url(/banner.jpg)] z-[-2] relative w-screen h-screen overflow-hidden"></div>
    <div className="overlay absolute top-0 left-0 z-[-1] w-screen h-screen bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.4)] to-[rgba(0,0,0,0.8)]"></div></div>
    :    <div className='absolute top-0 left-0 z-[-1] w-screen h-screen bg-black'></div>
}
    
    </>
  )
}

export default Banner