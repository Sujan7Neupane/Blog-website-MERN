import React, { useId } from "react";

const Input = React.forwardRef(
  ({ label, type = "text", className, ...props }, ref) => {
    const id = useId();
    return (
      <div className="mb-4">
        {label && (
          <label className="block text-gray-700 mb-1" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          ref={ref} // <-- IMPORTANT
          {...props} // <-- register props applied here
          className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
      </div>
    );
  }
);

export default Input;
