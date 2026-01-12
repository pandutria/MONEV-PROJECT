import { Upload, FileText } from "lucide-react";
import type React from "react";
import { BASE_URL_FILE } from "../server/API";

interface FormUploadFileProps {
    title: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: File | string | null;
    name?: string;
    disabled?: boolean;
    type?: 'edit' | 'show';
}

export default function FormUploadFile({
    title,
    onChange,
    value,
    name,
    disabled = false,
    type = 'edit'
}: FormUploadFileProps) {
    return (
        <div>
            <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                {title}
            </label>
            {type === 'show' && typeof value === 'string' ? (
                <a
                    href={`${BASE_URL_FILE}/${value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins text-primary hover:bg-primary/5 transition-all duration-200"
                >
                    <span className="text-sm truncate">
                        Lihat File
                    </span>
                    <FileText className="h-5 w-5 text-primary" />
                </a>
            ) : (
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
                        className={`flex items-center justify-between w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins transition-all duration-200
                        ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:border-primary hover:bg-primary/5 cursor-pointer'}`}
                    >
                        <span className="text-sm truncate">
                            {value && value instanceof File ? value.name : "Pilih File"}
                        </span>
                        <Upload className="h-5 w-5 text-primary" />
                    </label>
                </div>
            )}
        </div>
    );
}
