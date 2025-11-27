import React, { useId } from 'react'
import { useSelector } from 'react-redux'

const Select = ({
    className,
    label,
    options,
    ...props
}) => {
    const id = useId()
    return (
        <div class="w-full max-w-sm mx-auto p-4">
            {label && (<label id={id} className="block mb-2 text-sm font-medium text-gray-700">
                {label}
            </label>)}
            <select htmlFor={id} className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} {...props}>
                {options?.map((option) =>
                    <option key={option}>{option}</option>
                )}
            </select>
        </div>

    )
}

export default Select