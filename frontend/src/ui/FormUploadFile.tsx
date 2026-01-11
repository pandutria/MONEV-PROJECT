import { Upload } from "lucide-react";
import type React from "react";

interface FormUploadFileProps {
    title: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: File | null;
    name?: string;
    disabled?: boolean;
}

export default function FormUploadFile({
    title,
    onChange,
    value,
    name,
    disabled=false
}: FormUploadFileProps) {
    return (
        <div>
            <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                {title}
            </label>

            <div className="relative">
                <input
                    type="file"
                    id={name}
                    name={name}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={onChange}
                    disabled={disabled}
                />

                <label
                    htmlFor={name}
                    className="flex items-center justify-between w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins text-gray-700 hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                >
                    <span className="text-sm truncate">
                        {value ? value.name : "Pilih File"}
                    </span>
                    <Upload className="h-5 w-5 text-primary" />
                </label>
            </div>
        </div>
    );
}
