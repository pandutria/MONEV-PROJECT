/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";

interface formInputProps {
    title: string;
    placeholder: string;
    disabled?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<any>) => void;
    type?: 'input' | 'textarea' | 'date';
}

export default function FormInput({ value, onChange, title, placeholder, disabled = false, type = 'input' }: formInputProps) {
    return (
        <div className={`${type == 'textarea' ? 'md:col-span-2' : ''}`}>
            <label className="block font-poppins-medium text-sm text-gray-700 mb-2">{title}</label>
            {type == 'input' ? (
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    className={`w-full ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''} text-[12px] px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200`}
                    placeholder={placeholder}
                    disabled={disabled}
                />
            ) : type == 'textarea' ? (
                <textarea
                    value={value}
                    disabled={disabled}
                    rows={3}
                    className={`w-full ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''} text-[12px] px-4 py-2.5 border border-gray-300 rounded-lg font-poppins resize-none`}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={`w-full ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''} text-[12px] px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200`}
                    placeholder={placeholder}
                    disabled={disabled}
                />
            )}
        </div>
    )
}
