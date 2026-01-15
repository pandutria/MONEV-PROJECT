/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search, Plus, Trash } from 'lucide-react';

interface TableHeaderProps {
    title: string;
    showHapus?: boolean;
    showTambah?: boolean;
    onTambahClick?: () => void;
    onHapusClick?: () => void;
    tahunOptions?: any[];
    satuanKerjaOptions?: any[];
    selectedTahun?: string;
    selectedSatuanKerja?: string;
    searchValue?: string;
    onTahunChange?: (value: string) => void;
    onSatuanKerjaChange?: (value: string) => void;
    onSearchChange?: (value: string) => void;
    className?: string;
    type?: 'ppk' | 'pokja'
}

export default function TableHeader({
    title,
    onTambahClick,
    onHapusClick,
    showTambah = true,
    showHapus = false,
    selectedTahun = '',
    selectedSatuanKerja = '',
    searchValue = '',
    onTahunChange,
    onSatuanKerjaChange,
    onSearchChange,
    className,
    tahunOptions = [],
    satuanKerjaOptions = [],
    type = "ppk"
}: TableHeaderProps) {
    return (
        <div className={`w-full bg-white flex lg:flex-row flex-col lg:justify-between justify-center lg:items-end items-start lg:gap-0 gap-10 rounded-lg p-6 mb-6 ${className}`}>
            <div className="flex flex-col gap-6">
                <h1 className="font-poppins-bold text-2xl text-gray-800">
                    {title}
                </h1>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {type === 'ppk' && (
                        <div className="flex flex-row gap-3 items-center">
                            <select
                                value={selectedTahun}
                                onChange={(e) => onTahunChange?.(e.target.value)}
                                className="text-[12px] px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 cursor-pointer bg-white text-gray-700 font-poppins-regular"
                            >
                                <option value="">Pilih Tahun</option>
                                {tahunOptions.map((item, index) => (
                                    <option key={index} value={item.tahun}>
                                        {item.tahun}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={selectedSatuanKerja}
                                onChange={(e) => onSatuanKerjaChange?.(e.target.value)}
                                className="text-[12px] px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 cursor-pointer bg-white text-gray-700 font-poppins-regular"
                            >
                                <option value="">Pilih Satuan Kerja</option>
                                {satuanKerjaOptions.map((item, index) => (
                                    <option key={index} value={item.text}>
                                        {item.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className="relative">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => onSearchChange?.(e.target.value)}
                            placeholder="Cari..."
                            className="text-[12px] pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-white text-gray-700 w-full sm:w-64 font-poppins-regular"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-4 items-center justify-center">
                {showTambah && (
                    <button
                        onClick={onTambahClick}
                        className="flex items-center text-[12px] gap-2 bg-primary border-2 border-primary hover:bg-transparent text-white hover:text-primary font-poppins-medium px-4 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer shadow-sm hover:shadow-md w-fit"
                    >
                        <Plus className="h-5 w-5" />
                        Tambah
                    </button>
                )}
                {showHapus && (
                    <button
                        onClick={onHapusClick}
                        className="flex items-center text-[12px] gap-2 bg-primary border-2 border-primary hover:bg-transparent text-white hover:text-primary font-poppins-medium px-4 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer shadow-sm hover:shadow-md w-fit"
                    >
                        <Trash className="h-5 w-5" />
                        Hapus Terpilih
                    </button>
                )}
            </div>
        </div>
    );
}