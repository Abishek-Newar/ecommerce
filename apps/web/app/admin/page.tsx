"use client"
import React from 'react'
import { BACKEND_URL } from '../../config/config';
import LabeledInput from '../../components/LabledInput';

const page = () => {
    const [signinData,setSigninData] = React.useState({
        email: "",
        password: ""
    });

    const backgroundImageStyle = {
        backgroundImage: 'url("/adminsignup.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };

    function handleChanges(datatype:string,e:any){
        setSigninData((prev)=>({
            ...prev,
            [datatype]: e.target.value
        }))
    }

    async function handleSubmit(){
        const response = await fetch(`${BACKEND_URL}admin/signin`,{
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email: signinData.email,
                password: signinData.password
            })
        })
        console.log(response)
    }
  return (
    <div className='min-h-screen flex justify-center items-center' style={backgroundImageStyle}>
        <div className='w-[450px] h-auto p-6 border font-mono flex rounded-md flex-col gap-6'>
            <h1 className='uppercase text-white text-center text-5xl'>Admin Signin</h1>
            <div className='flex flex-col gap-4'>
            <LabeledInput type="email" placeholder="admin@gmail.com" id='email' title="Email" onChange={(e)=>{handleChanges("email",e)}} />
            <LabeledInput type="password" placeholder="" id='password' title="Password" onChange={(e)=>{handleChanges("password",e)}} />
            </div>
            <button onClick={handleSubmit} className='uppercase bg-white rounded-lg w-full h-12'>Signin</button>
        </div>
    </div>
  )
}

export default page