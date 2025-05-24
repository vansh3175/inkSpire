import React from 'react'

function Button({
    className='',
    type="text",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    children,
    ...props
}) {
  return (
    <button type={type} className={` px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}` } {...props}>{children}</button>
  )
}

export default Button