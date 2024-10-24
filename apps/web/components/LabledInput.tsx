 const LabeledInput = ({ type, placeholder, title, id, onChange }: LabeledInputProps) => {
    return <label htmlFor={id} className='w-full'>
      <p className='text-white uppercase mb-2'>{title}:</p>
      <input className='h-9 w-full rounded-md p-2' type={type} placeholder={placeholder} id={id} onChange={onChange} />
    </label>
  }

  export default LabeledInput