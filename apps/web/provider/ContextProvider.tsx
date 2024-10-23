"use client"
import React from 'react';


interface AuthContextType {
  signUpData: SignUpDataType;
  signInData: SignInDataType;
  setSignUpData: React.Dispatch<React.SetStateAction<SignUpDataType>>;
  setSignInData: React.Dispatch<React.SetStateAction<SignInDataType>>;
}

export const Content = React.createContext<AuthContextType | null>(null)

const ContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [signUpData, setSignUpData] = React.useState<SignUpDataType>({
    email: "",
    username: "",
    password: ""
  })
  const [signInData, setSignInData] = React.useState<SignInDataType>({
    email: "",
    password: ""
  })
  return (
    <Content.Provider value={{ signInData, signUpData, setSignInData, setSignUpData }}>
      {children}
    </Content.Provider>
  )
}

export default ContextProvider