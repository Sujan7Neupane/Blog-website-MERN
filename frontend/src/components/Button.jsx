import React from 'react'

const Button = ({ children,
    type = "button",
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className,
    ref,
    ...props }

) => {
    return (
        <button className={`px-4 py-2 rounded-lg ${className} ${textColor} ${bgColor}`} ref={ref} {...props}>
            {children}
        </button>
    )
}

export default Button