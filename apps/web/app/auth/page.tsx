"use client"
import Image from 'next/image'
import React from 'react'

const Auth = () => {

  const [signUpData,setSignUpData] = React.useState<SignUpDataType>({
    username: "",
    email: "",
    password: ""
  })
  const backgroundImageStyle = {
    backgroundImage: 'url("/signup.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    color: 'white',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};
  const [signinPositon,setSigninPosition] = React.useState<boolean>(false)
  function handleChange(value:string, data:string){
    // setSignUpData()
  }
  return (
    <main className="min-h-screen bg-black  bg-dot-white/[0.2] relative  ">
      <div className='h-screen w-full grid grid-cols-2 font-mono'>
        <div className='w-full h-full flex items-center justify-center'>
          <form className='w-[300px] flex flex-col gap-4' action="">
            <div className='text-white'>
            <h1 className='uppercase text-4xl font-bold '>Welcome,</h1>
            <p className='uppercase text-sm'>signup to Enter the Fashion's Playground</p>
            </div>
            <div className='flex flex-col gap-4'>
            <LabeledInput type='text' placeholder='abi123' id='username' title='Username' onChange={(e)=>{handleChange(e.target.value,"username")}}  />
            <LabeledInput type='email' placeholder='abi@gmail.com' id='email' title='Email' onChange={(e)=>{handleChange(e.target.value,"email")}}  />
            <LabeledInput type='password' placeholder='' id='pass' title='Password' onChange={(e)=>{handleChange(e.target.value,"email")}}  />
            </div>
            <Button onClick={()=>setSigninPosition(true)}>Sign Up</Button>
            <p className='text-white'>Already have a account? <a onClick={()=>setSigninPosition(true)} className='cursor-pointer underline underline-offset-2'>SignIn</a></p>
          </form>
        </div>
        <div className='w-full h-full flex items-center justify-center'>
        <form className='w-[300px] flex flex-col gap-4' action="">
        <div className='text-white'>
            <h1 className='uppercase text-4xl font-bold '>Welcome Back,</h1>
            <p className='uppercase text-sm'>Signin to enter Fashion's Playground</p>
            </div>
          <div className='flex flex-col gap-4'>
          <LabeledInput type='email' placeholder='abi@gmail.com' id='email' title='Email' onChange={(e)=>{handleChange(e.target.value,"email")}}  />
          <LabeledInput type='password' placeholder='' id='pass' title='Password' onChange={(e)=>{handleChange(e.target.value,"email")}}  />
          <Button onClick={()=>setSigninPosition(false)} >Sign In</Button>
          </div>
          <p className='text-white'>Don't have a accunt? <a onClick={()=>setSigninPosition(false)} className='cursor-pointer underline underline-offset-2'>Signup</a></p>
          </form>
        </div>
        

      </div>
      <div className={`w-[50%] bg-white h-screen rounded-lg absolute top-0 ${signinPositon? "translate-x-0": "translate-x-[99%]"} transition-all ease-linear duration-500`} style={backgroundImageStyle}>
      {/* <Image
        src="/signup.jpg"
        alt=''
        fill= {true}
       /> */}
        </div>
    </main>
  )
}


export const Button = ({children, onClick}: {children: React.ReactNode,onClick: ()=>void})=>{
  return <button onClick={onClick} className='bg-white h-10 rounded-lg uppercase font-semibold'>{children}</button>
}

export const LabeledInput = ({type,placeholder,title,id,onChange}:LabeledInputProps)=>{
  return <label htmlFor={id} className='w-full'>
    <p className='text-white uppercase mb-2'>{title}:</p>
    <input className='h-9 w-full rounded-md p-2' type={type} placeholder={placeholder} id={id} onChange={onChange}/>
  </label>
}

export default Auth