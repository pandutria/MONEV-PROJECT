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
        <div className={`w-full bg-white flex flex-col lg:flex-row lg:justify-between lg:items-end lg:gap-0 gap-4 sm:gap-6 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 ${className}`}>
            <div className="flex flex-col gap-3 sm:gap-6 w-full">
                <h1 className="font-poppins-bold text-xl sm:text-2xl text-gray-800">
                    {title}
                </h1>

                <div className="flex flex-col gap-3 w-full">
                    {type === 'ppk' && (
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
                            <select
                                value={selectedTahun}
                                onChange={(e) => onTahunChange?.(e.target.value)}
                                className="text-xs sm:text-[12px] px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 cursor-pointer bg-white text-gray-700 font-poppins-regular flex-1"
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
                                className="text-xs sm:text-[12px] px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 cursor-pointer bg-white text-gray-700 font-poppins-regular flex-1"
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
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => onSearchChange?.(e.target.value)}
                            placeholder="Cari..."
                            className="text-xs sm:text-[12px] pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-white text-gray-700 w-full font-poppins-regular"
                        />
                        <Search className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-center justify-center w-full sm:w-auto">
                {showTambah && (
                    <button
                        onClick={onTambahClick}
                        className="flex items-center justify-center text-xs sm:text-[12px] gap-2 bg-primary border-2 border-primary hover:bg-transparent text-white hover:text-primary font-poppins-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors duration-200 cursor-pointer shadow-sm hover:shadow-md"
                    >
                        <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Tambah</span>
                    </button>
                )}
                {showHapus && (
                    <button
                        onClick={onHapusClick}
                        className="flex items-center justify-center text-xs sm:text-[12px] gap-2 bg-primary border-2 border-primary hover:bg-transparent text-white hover:text-primary font-poppins-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors duration-200 cursor-pointer shadow-sm hover:shadow-md"
                    >
                        <Trash className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Hapus Terpilih</span>
                    </button>
                )}
            </div>
        </div>
    );
}