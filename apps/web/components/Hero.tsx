import React from 'react'

const Hero = () => {
    const backgroundImageStyle = {
        backgroundImage: 'url("https://im.uniqlo.com/global-cms/spa/res38b5e12bd21938f3529a934c9fb691dcfr.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
  return (
    <div className='min-h-[90vh] md:p-[20%]' style={backgroundImageStyle}>
        <div>
            <span className="text-xl uppercase font-bold ">
                ALL SET TO
            </span>
            <br/>
            <span className='text-2xl uppercase font-bold'>RESET</span>
        </div>
    </div>
  )
}

export default Hero