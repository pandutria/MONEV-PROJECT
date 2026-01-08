import { Search, ChevronDown, Calendar, Building2, Package } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function SearchData() {
    interface OptionProps {
        value: string;
        label: string;
    }

    const [tahunAnggaran, setTahunAnggaran] = useState<string>('');
    const [satuanKerja, setSatuanKerja] = useState<string>('');
    const [paket, setPaket] = useState<string>('');

    const [searchTahun, setSearchTahun] = useState<string>('');
    const [searchSatuan, setSearchSatuan] = useState<string>('');
    const [searchPaket, setSearchPaket] = useState<string>('');

    const [openDropdown, setOpenDropdown] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const sectionRef = useRef<HTMLDivElement>(null);

    const tahunOptions: OptionProps[] = [
        { value: '2024', label: '2024' },
        { value: '2023', label: '2023' },
        { value: '2022', label: '2022' },
        { value: '2021', label: '2021' },
    ];

    const satuanKerjaOptions: OptionProps[] = [
        { value: 'dinas_pu', label: 'Dinas Pekerjaan Umum' },
        { value: 'dinas_perhubungan', label: 'Dinas Perhubungan' },
        { value: 'dinas_perumahan', label: 'Dinas Perumahan' },
        { value: 'bappeda', label: 'Bappeda' },
    ];

    const paketOptions: OptionProps[] = [
        { value: 'jalan_raya', label: 'Pembangunan Jalan Raya' },
        { value: 'jembatan', label: 'Konstruksi Jembatan' },
        { value: 'gedung', label: 'Pembangunan Gedung' },
        { value: 'irigasi', label: 'Sistem Irigasi' },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef!.current) {
                observer.unobserve(sectionRef!.current);
            }
        };
    }, []);

    const filterOptions = (options: OptionProps[], searchTerm: string) => {
        return options.filter(option =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const handleSearch = () => {
        console.log('Search:', { tahunAnggaran, satuanKerja, paket });
    };

    const renderDropdown = (
        id: string,
        label: string,
        icon: React.ReactNode,
        value: string,
        setValue: (val: string) => void,
        searchValue: string,
        setSearchValue: (val: string) => void,
        options: OptionProps[]
    ) => {
        const isOpen = openDropdown === id;
        const filteredOptions = filterOptions(options, searchValue);
        const selectedOption = options.find(opt => opt.value === value);

        return (
            <div className="relative">
                <label className="block text-sm font-poppins-semibold text-gray-700 mb-2">
                    {label}
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                    <button
                        type="button"
                        onClick={() => setOpenDropdown(isOpen ? '' : id)}
                        className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-lg transition-all duration-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-left bg-white hover:border-gray-400"
                    >
                        <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
                            {selectedOption ? selectedOption.label : `Pilih ${label}`}
                        </span>
                    </button>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDown
                            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                    </div>
                </div>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-xl animate-fade-in">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Cari..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="max-h-48 overflow-y-auto">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            setValue(option.value);
                                            setSearchValue('');
                                            setOpenDropdown('');
                                        }}
                                        className={`w-full font-poppins-regular text-left px-4 py-2 hover:bg-orange-50 transition-colors duration-150 ${value === option.value ? 'bg-orange-100 font-semibold' : ''
                                            }`}
                                        style={{ color: value === option.value ? '#f60' : '#374151' }}
                                    >
                                        {option.label}
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 py-3 text-gray-500 text-sm">
                                    Tidak ada hasil
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    };
    return (
        <div
            ref={sectionRef}
            className="min-h-screen py-12 px-4 md:px-8 pt-36"
        >
            <div className="max-w-6xl mx-auto">
                <div
                    className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <h1
                        className="text-3xl md:text-4xl lg:text-5xl font-poppins-bold mb-4"
                        style={{ color: '#f60' }}
                    >
                        Realisasi Pekerjaan Konstruksi
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto font-poppins-medium">
                        Cari dan lihat detail realisasi pekerjaan konstruksi berdasarkan tahun anggaran, satuan kerja, dan paket pekerjaan
                    </p>
                </div>

                <div
                    className={`bg-white rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {renderDropdown(
                            'tahun',
                            'Tahun Anggaran',
                            <Calendar className="h-5 w-5 text-gray-400" />,
                            tahunAnggaran,
                            setTahunAnggaran,
                            searchTahun,
                            setSearchTahun,
                            tahunOptions
                        )}

                        {renderDropdown(
                            'satuan',
                            'Satuan Kerja',
                            <Building2 className="h-5 w-5 text-gray-400" />,
                            satuanKerja,
                            setSatuanKerja,
                            searchSatuan,
                            setSearchSatuan,
                            satuanKerjaOptions
                        )}

                        {renderDropdown(
                            'paket',
                            'Paket',
                            <Package className="h-5 w-5 text-gray-400" />,
                            paket,
                            setPaket,
                            searchPaket,
                            setSearchPaket,
                            paketOptions
                        )}
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={handleSearch}
                            className="flex cursor-pointer items-center space-x-2 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
                            style={{ backgroundColor: '#f60' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff7a1a'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f60'}
                        >
                            <Search className="h-5 w-5" />
                            <span className='font-poppins-regular'>Cari Data</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
