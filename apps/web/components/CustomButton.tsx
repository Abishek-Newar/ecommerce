 const CustomButton = ({ children, onClick }: { children: React.ReactNode, onClick: (e: any) => void }) => {
    return <button onClick={onClick} className='bg-white h-10 rounded-lg uppercase font-semibold'>{children}</button>
  }


  export default CustomButton