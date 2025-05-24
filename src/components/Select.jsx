import React from 'react'
import { useId,forwardRef } from 'react';

function Select({
    options=[],
    classname='',
    label,
    ...props
},ref) {
    const id=useId();
  return (
    <div className='w-full'>
    {label && (
        <label htmlFor={id}>{label}</label>

    )}
    <select
    {...props}
    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full${classname}`}
    id={id}
    ref={ref}
    
    >
    {options.length>0?(
        options.map((option)=>(
            <option key={option}>
                {option}
            </option>
        ))
    ):null}

    </select>
    </div>
  )
}

export default forwardRef(Select);