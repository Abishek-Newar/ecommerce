import React from 'react'
import Image from 'next/image';
const Footer = () => {

    const product= ["Build","Support","Marketplace"];
    const platform = ["Airdrop","Analytics","Workflow Engine","Turing AI"]
    const resources = ["Pricing","Blog","News","Case studies","Documentation","API Reference","The Book of DevRev"]
    const connect = ["Contact","Instagram","Medium","Linkedin","Twitter"]
    const company = ["About","People","Careers","Invest"]
    const legal:string[] = ["Security","Privacy Policy","Cookie Policy","Subprocessors","Terms of Services"]
  return (
    <div className='bg-[#E4E4E4]'>
        <div className='h-[60vh] text-black bg-[#E4E4E4] '>
            
            <div className='flex h-full justify-around pt-24' style={{borderTop:"1px solid #ffffff26"}}>
            <div>
                <CustomPTag topic="Product" />
                <CustomList list={product} />
            </div>
            <div>
                <CustomPTag topic="Platform" />
                <CustomList list={platform} />
            </div>
            <div className='flex flex-col gap-6'>
                <div>
                <CustomPTag topic="Resources" />
                <CustomList list={resources} />
                </div>
                <div>
                <CustomPTag topic="Connect" />
                <CustomList list={connect} />
                </div>
            </div>
            <div className='flex flex-col gap-6'>
                <div>
                <CustomPTag topic="Company" />
                <CustomList list={company} />
                </div>
                <div>
                <CustomPTag topic="Legal" />
                <CustomList list={legal} />
                </div>
            </div>
            </div>
            <div></div>
        </div>
    </div>
  )
}
const CustomPTag = ({topic}: {topic:string}) =>{
    return <p className='text-sm '>
        {topic}
    </p>
}

const CustomList = ({list}:{list:string[]}) =>{
    return <>
    <ul className='text-textclr text-xs '>
        {
            list.map((item,index)=>(
                <li key={index} className=' cursor-pointer'>{item}</li>
            ))
        }
    </ul>
    </>
}

export default Footer