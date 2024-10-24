"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { CustomButton } from '../auth/page'
import { Content } from '../../provider/ContextProvider'
import { BACKEND_URL } from '../../config/config'
import axios from 'axios'
import { toast } from 'sonner'

const page = () => {
  const [otp, setOtp] = React.useState(new Array(4).fill(""))
  const [mainOtp,setMainOtp] = React.useState<number>(0)
  const authContext = React.useContext(Content);

  if (!authContext) {
    throw new Error("Context must be used within a ContextProvider");
  }
  const { signUpData, setSignUpData } = authContext
  const router = useRouter()
  // useEffect(()=>{
  //   if(router.state){
  //     setSignUpData(router.state)
  //     console.log(router.state)
  //   }
  // })
  const inputRef = React.useRef([])
  React.useEffect(() => {

    if (inputRef.current[0]) {
      //@ts-ignore
      inputRef?.current[0].focus()
    }
  }, [])

  async function handleSubmit() {
    try {
      toast.info("Signing in")
      const response = await axios.post(`${BACKEND_URL}user/signup`,{
        email: signUpData.email,
        username: signUpData.username,
        otp: mainOtp,
        password: signUpData.password
      })
      console.log(response)
      //@ts-ignore
      localStorage.setItem("token",response.token)
      setTimeout(()=>{
        router.push("/")
      },2000)

      toast.success("SIGNED IN")
    } catch (error) {
      console.log(error)
      toast.error("Error signing up")
    }
  }

  function handleChange(index: number, e: any) {
    let newOtp = [...otp]
    newOtp[index] = e.target.value.substring(e.target.value.length - 1)
    setOtp(newOtp)
    const combinedOtp = otp.join("");
    console.log(combinedOtp)
    if (e.target.value && combinedOtp.length < 3 && inputRef.current[index + 1]) {
      //@ts-ignore
      inputRef.current[index + 1].focus()
    }
    const mainotpjoin = newOtp.join("")
    setMainOtp(parseInt(mainotpjoin))
  }
  return (
    <main className="min-h-screen bg-black  bg-dot-white/[0.2] relative   flex justify-center items-center">
      <div className='flex flex-col gap-3'>
        <h1 className='text-white text-2xl uppercase'>Enter OTP</h1>
        <div className='flex gap-4'>
          {
            otp.map((otps, index) => (
              <input
                className="border flex w-14 h-14 p-5"
                //@ts-ignore
                ref={(input) => (inputRef.current[index] = input)}
                key={index}
                onChange={(e) => handleChange(index, e)}
                value={otps}
                type="number" />
            ))
          }
        </div>
        <CustomButton onClick={handleSubmit}>Submit</CustomButton>
      </div>
    </main>
  )
}

export default page