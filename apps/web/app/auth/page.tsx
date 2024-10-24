"use client"
import React from 'react'
import axios from "axios"
import { BACKEND_URL } from '../../config/config'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Content } from '../../provider/ContextProvider'

const Auth = () => {
  const router = useRouter()

  const authContext = React.useContext(Content);

  if (!authContext) {
    throw new Error("Context must be used within a ContextProvider");
  }
  const { signUpData, setSignUpData } = authContext


  const [signInData, setSignInData] = React.useState({
    email: "",
    password: ""
  })
  const backgroundImageStyle = {
    backgroundImage: 'url("/signup.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  const [signinPositon, setSigninPosition] = React.useState<boolean>(false)
  function handleChange(value: string, field: string, formtype: "signup" | "signin") {
    if (formtype === "signup") {
      setSignUpData((prev) => ({
        ...prev,
        [field]: value
      }))
    } else if (formtype === "signin") {
      setSignInData((prev) => ({
        ...prev,
        [field]: value
      }))
    }
  }
  async function handleSubmit(type: string, e: any) {
    e.preventDefault();
    if (type === "signin") {
      try {
        toast.info("Signing in")
        const response = await axios.post(`${BACKEND_URL}user/signin`, signInData)
        console.log(response.data)
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("email",response.data.user.email)
        localStorage.setItem("username",response.data.user.username)
        setTimeout(()=>{
          router.push("/")
        },1000)
        toast.success("Signed in")
      } catch (error) {
        toast.error("Error while logging")
      }
    }
    if (type === "signup") {
      toast.info("Signing Up")
      try {
        const response = await axios.post(`${BACKEND_URL}user/generateOtp`, signUpData)
        console.log(response)
        setTimeout(() => {
          router.push("/otp")
        }, 2000)
        toast.success("Logged in")
      } catch (error) {
        toast.error("Error while signing up")
      }
    }
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
              <LabeledInput type='text' placeholder='abi123' id='username' title='Username' onChange={(e) => { handleChange(e.target.value, "username", "signup") }} />
              <LabeledInput type='email' placeholder='abi@gmail.com' id='email' title='Email' onChange={(e) => { handleChange(e.target.value, "email", "signup") }} />
              <LabeledInput type='password' placeholder='' id='pass' title='Password' onChange={(e) => { handleChange(e.target.value, "password", "signup") }} />
            </div>
            <CustomButton onClick={(e: any) => handleSubmit("signup", e)}>Sign Up</CustomButton>
            <p className='text-white'>Already have a account? <a onClick={() => setSigninPosition(true)} className='cursor-pointer underline underline-offset-2'>SignIn</a></p>
          </form>
        </div>
        <div className='w-full h-full flex items-center justify-center'>
          <form className='w-[300px] flex flex-col gap-4' action="">
            <div className='text-white'>
              <h1 className='uppercase text-4xl font-bold '>Welcome Back,</h1>
              <p className='uppercase text-sm'>Signin to enter Fashion's Playground</p>
            </div>
            <div className='flex flex-col gap-4'>
              <LabeledInput type='email' placeholder='abi@gmail.com' id='email' title='Email' onChange={(e) => { handleChange(e.target.value, "email", "signin") }} />
              <LabeledInput type='password' placeholder='' id='pass' title='Password' onChange={(e) => { handleChange(e.target.value, "password", "signin") }} />
              <CustomButton onClick={(e: any) => handleSubmit("signin", e)} >Sign In</CustomButton>
            </div>
            <p className='text-white'>Don't have a accunt? <a onClick={() => setSigninPosition(false)} className='cursor-pointer underline underline-offset-2'>Signup</a></p>
          </form>
        </div>


      </div>
      <div className={`w-[50%] hidden lg:block bg-white h-screen rounded-lg absolute top-0 ${signinPositon ? "translate-x-0" : "translate-x-[99%]"} transition-all ease-linear duration-500`} style={backgroundImageStyle}>
        {/* <Image
        src="/signup.jpg"
        alt=''
        fill= {true}
       /> */}
      </div>
    </main>
  )
}


export const CustomButton = ({ children, onClick }: { children: React.ReactNode, onClick: (e: any) => void }) => {
  return <button onClick={onClick} className='bg-white h-10 rounded-lg uppercase font-semibold'>{children}</button>
}

export const LabeledInput = ({ type, placeholder, title, id, onChange }: LabeledInputProps) => {
  return <label htmlFor={id} className='w-full'>
    <p className='text-white uppercase mb-2'>{title}:</p>
    <input className='h-9 w-full rounded-md p-2' type={type} placeholder={placeholder} id={id} onChange={onChange} />
  </label>
}

export default Auth