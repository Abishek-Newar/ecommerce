import React from 'react'
import Navbar from '../../components/Navbar'
import CartBody from '../../components/CartBody'

const page = () => {
  return (
    <div>
      <Navbar />
      <ul className='w-full h-10 flex justify-center text-xs gap-16 items-center'>
        <li>Free Shipping above $1999</li>
        <li>Free & Flexible 15 days return</li>
        <li>Estimated Delivery Time: 2-7 days</li>
      </ul>
      <CartBody />
    </div>
  )
}

export default page