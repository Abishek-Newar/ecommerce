import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { CiShoppingCart, CiHeart } from "react-icons/ci";

const Navbar = () => {
  return (
    <nav className="flex justify-around items-center h-[8vh]">
      <div>
        <Image 
        src="https://www.snitch.co.in/cdn/shop/files/SNITCH_LOGO_NEW_BLACK.png?v=1721457834"
        alt=''
        width={100}
        height={100}
        />
      </div>
      <ul className='flex gap-8 '>
        <Link href={{pathname: "/cart"}}><li>MENS</li></Link>
        <li>WOMENS</li>
        <li>KIDS</li>
      </ul>
      <div className='flex gap-2'>
      <CiHeart />
      <Link href={{pathname: "/cart"}}><CiShoppingCart /></Link>
      </div>
    </nav>
  )
}

export default Navbar