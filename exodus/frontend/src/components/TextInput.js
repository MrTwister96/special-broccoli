import React from "react";

const TextInput = ({ label, placeholder, value, onChange }) => {
    return (
        <>
            <label
                htmlFor={label}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
                <input
                    type="text"
                    name={label}
                    id={label}
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                />
            </div>
        </>
    );
};

export default TextInput;
