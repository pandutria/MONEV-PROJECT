import { Search, Upload, X } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../../../components/Navbar';
import BackButton from '../../../ui/BackButton';
import useTenderHooks from '../../../hooks/TenderHooks';
import FormSelect from '../../../ui/FormSelect';
import ShowTableForm from '../../../ui/ShowTableForm';
import TableContent from '../../../ui/TableContent';

type MetodePengadaan = '' | 'pengadaan_langsung' | 'e_purchasing_v5' | 'e_purchasing_v6';

export default function PokjaLaporanPenjabatPengadaanAdd() {
    const [metodePengadaan, setMetodePengadaan] = useState<MetodePengadaan>('');
    const { tenderData } = useTenderHooks();
    const [showTender, setShowTender] = useState(false);
    const [selectedTender, setSelectedTender] = useState<any | null>(null);
    const [formData, setFormData] = useState({
        kodePaket: '',
        kodeRUP: '',
        tahunAnggaran: '',
        satuanKerja: '',
        namaPaket: '',
        sumberDana: '',
        jenisPengadaan: '',
        statusPaket: '',
        statusPengiriman: '',
        nilaiPagu: '',
        nilaiHPS: '',
        nomorKontrak: '',
        tanggalKontrak: '',
        namaPPK: '',
        jabatanPPK: '',
        namaPimpinan: '',
        jabatanPimpinan: '',
        pemenang: '',
        nilaiPenawaran: '',
        nilaiNegosiasi: '',
        nomorTelp: '',
        email: '',
        npwp: '',
        alamatPemenang: '',
        lokasiPekerjaan: '',
        catatan: '',
        ditujukanPPK: ''
    });

    const metodePengadaanOptions = [
        { id: 1, name: 'Pengadaan Langsung' },
        { id: 2, name: 'E-Purchasing V5' },
        { id: 3, name: 'E-Purchasing V6' }
    ];

    const ppkOptions = [
        'PPK 1 - Ahmad Hidayat',
        'PPK 2 - Budi Santoso',
        'PPK 3 - Citra Dewi'
    ];

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const tenderColumns = [
        {
            key: "id",
            label: "No"
        },
        {
            key: "tender_code",
            label: "Kode Tender"
        },
        {
            key: "rup_code",
            label: "Kode RUP"
        },
        {
            key: "fiscal_year",
            label: "Tahun Anggaran"
        },
        {
            key: "satker_name",
            label: "Satuan Kerja"
        },
        {
            key: "rup_name",
            label: "Nama Paket"
        },
        {
            key: "funding_source",
            label: "Sumber Dana"
        },    
    ]

    console.log(tenderData)
    const isEPurchasing = metodePengadaan === 'e_purchasing_v5' || metodePengadaan === 'e_purchasing_v6';

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="pt-24 pb-12 px-4 md:px-8" data-aos="fade-up" data-aos-duration="1000">
                <div className="max-w-7xl mx-auto">
                    <BackButton />

                    {showTender && (
                        <div className="absolute inset-0 flex justify-center items-center bg-black/20 z-20">
                            <div className="bg-white p-4 rounded-lg flex flex-col max-w-[90vw] max-h-[60vh] gap-4 relative">
                                <div className="absolute top-4 right-4 cursor-pointer text-primary" onClick={() => setShowTender(false)}>
                                    <X/>
                                </div>
                                <h1 className="font-poppins-semibold text-center text-[26px] shrink-0 mb-6">
                                    Data Tender Pekerja Konstruksi
                                </h1>
                                <div className="overflow-y-auto max-h-[70vh] w-full">
                                    <TableContent
                                        columns={tenderColumns}
                                        data={tenderData}
                                        isSelect={false}
                                        showEdit={false}
                                        showPreview={false}
                                        showSelect={true}
                                        idKey="id"
                                        // onEdit={(item) => console.log('Edit:', item)}
                                        // onPreview={(item) => console.log('Preview:', item)}
                                        onSelectedDataChange={(item) => setSelectedTender(item)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h1 className="font-poppins-bold text-2xl text-gray-800 mb-8">
                            Tambah Laporan Penjabat Pengadaan
                        </h1>

                        <div className="space-y-8">
                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    1. TRANSAKSI INFORMASI
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <FormSelect title="Metode Pengadaan" name="" value={metodePengadaan}>
                                            {metodePengadaanOptions.map((item, index) => (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            ))}
                                        </FormSelect>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Kode Paket/Non Tender <span className="text-red-500">*</span>
                                        </label>
                                        <button
                                            onClick={() => {
                                                setShowTender(true);
                                            }}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins text-left text-gray-700 hover:border-primary hover:bg-primary/5 transition-all duration-200 flex items-center justify-between"
                                        >
                                            <span>{formData.kodePaket || 'Pilih Kode Paket'}</span>
                                            <Search className="h-5 w-5 text-primary" />
                                        </button>
                                    </div>

                                    <ShowTableForm tenderCode={""} onClick={() => {
                                        setShowTender(true);
                                        setSelectedTender(null);
                                    }} />

                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Kode RUP <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.kodeRUP}
                                            disabled
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 cursor-not-allowed"
                                            placeholder="Otomatis terisi"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Tahun Anggaran <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.tahunAnggaran}
                                            disabled
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 cursor-not-allowed"
                                            placeholder="Otomatis terisi"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Satuan Kerja <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.satuanKerja}
                                            disabled
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 cursor-not-allowed"
                                            placeholder="Otomatis terisi"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Nama Paket <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.namaPaket}
                                            disabled
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 cursor-not-allowed"
                                            placeholder="Otomatis terisi"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Sumber Dana <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.sumberDana}
                                            disabled
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 cursor-not-allowed"
                                            placeholder="Otomatis terisi"
                                        />
                                    </div>

                                    {!isEPurchasing && (
                                        <div>
                                            <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                                Jenis Pengadaan <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.jenisPengadaan}
                                                disabled
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 cursor-not-allowed"
                                                placeholder="Otomatis terisi"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {isEPurchasing && (
                                <div>
                                    <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                        2. REALISASI PAKET
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                                Status Paket <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.statusPaket}
                                                disabled
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 cursor-not-allowed"
                                                placeholder="Otomatis terisi"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                                Status Pengiriman <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.statusPengiriman}
                                                disabled
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 cursor-not-allowed"
                                                placeholder="Otomatis terisi"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    {isEPurchasing ? '3' : '2'}. INFORMASI KEUANGAN
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Nilai Pagu (Rp) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.nilaiPagu}
                                            disabled
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 cursor-not-allowed"
                                            placeholder="Otomatis terisi"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Nilai HPS (Rp) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.nilaiHPS}
                                            disabled
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 cursor-not-allowed"
                                            placeholder="Otomatis terisi"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    {isEPurchasing ? '4' : '3'}. DETAIL KONTRAK
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Nomor Kontrak <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.nomorKontrak}
                                            onChange={(e) => handleInputChange('nomorKontrak', e.target.value)}
                                            disabled
                                            className="w-full bg-gray-100 text-gray-500 cursor-not-allowed px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                                            placeholder="Masukkan nomor kontrak"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Tanggal Kontrak <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.tanggalKontrak}
                                            onChange={(e) => handleInputChange('tanggalKontrak', e.target.value)}
                                            disabled
                                            className="w-full bg-gray-100 text-gray-500 cursor-not-allowed px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Nama PPK <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.namaPPK}
                                            disabled
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 cursor-not-allowed"
                                            placeholder="Otomatis terisi"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Jabatan PPK <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.jabatanPPK}
                                            disabled
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 cursor-not-allowed"
                                            placeholder="Otomatis terisi"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Nama Pimpinan Perusahaan <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.namaPimpinan}
                                            disabled
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 cursor-not-allowed"
                                            placeholder="Otomatis terisi"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Jabatan Pimpinan <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.jabatanPimpinan}
                                            disabled
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 cursor-not-allowed"
                                            placeholder="Otomatis terisi"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    {isEPurchasing ? '5' : '4'}. INFORMASI PEMENANG
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Pemenang <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.pemenang}
                                            disabled
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 cursor-not-allowed"
                                            placeholder="Otomatis terisi"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            {isEPurchasing ? 'Nilai Total' : 'Nilai Penawaran'} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.nilaiPenawaran}
                                            disabled
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 cursor-not-allowed"
                                            placeholder="Otomatis terisi"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Nilai Negosiasi/Nilai SPK (Rp) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.nilaiNegosiasi}
                                            onChange={(e) => handleInputChange('nilaiNegosiasi', e.target.value)}
                                            disabled
                                            className="w-full bg-gray-100 text-gray-500 cursor-not-allowed px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                                            placeholder="Masukkan nilai negosiasi"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Nomor Telp/HP <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.nomorTelp}
                                            disabled
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 cursor-not-allowed"
                                            placeholder="Otomatis terisi"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            disabled
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 cursor-not-allowed"
                                            placeholder="Otomatis terisi"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            NPWP <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.npwp}
                                            disabled
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 cursor-not-allowed"
                                            placeholder="Otomatis terisi"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    {isEPurchasing ? '6' : '5'}. LOKASI & ALAMAT
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Alamat Pemenang <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            value={formData.alamatPemenang}
                                            disabled
                                            rows={3}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 resize-none cursor-not-allowed"
                                            placeholder="Otomatis terisi"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Lokasi Pekerjaan <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            value={formData.lokasiPekerjaan}
                                            disabled
                                            rows={3}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins bg-gray-100 text-gray-500 resize-none cursor-not-allowed"
                                            placeholder="Otomatis terisi"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                                    {isEPurchasing ? '7' : '6'}. LAMPIRAN DAN CATATAN
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Evidence/Bukti Laporan Hasil Pemilihan PP <span className="text-red-500">*</span>
                                        </label>
                                        <div className="text-xs text-gray-500 mb-2 font-poppins">
                                            Extension yang diizinkan: .jpg, .jpeg, .png, .pdf, .gif, .doc, .docx, .xlsx, .xls, .zip, .rar, .ppt, .pptx, .7z, .tar, .gz
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                className="hidden"
                                                id="evidence-upload"
                                                accept=".jpg,.jpeg,.png,.pdf,.gif,.doc,.docx,.xlsx,.xls,.zip,.rar,.ppt,.pptx,.7z,.tar,.gz"
                                            />
                                            <label
                                                htmlFor="evidence-upload"
                                                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins text-gray-700 hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                                            >
                                                <Upload className="h-5 w-5 text-primary" />
                                                <span>Pilih File</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                            Catatan <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            value={formData.catatan}
                                            onChange={(e) => handleInputChange('catatan', e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none"
                                            placeholder="Masukkan catatan"
                                        />
                                    </div>

                                    {!isEPurchasing && (
                                        <div>
                                            <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                                                Ditujukan ke PPK <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={formData.ditujukanPPK}
                                                onChange={(e) => handleInputChange('ditujukanPPK', e.target.value)}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-white"
                                            >
                                                <option value="">Pilih PPK</option>
                                                {ppkOptions.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    onClick={() => console.log('Simpan')}
                                    className="px-8 py-2.5 cursor-pointer bg-primary hover:bg-transparent border-2 border-primary hover:text-primary text-white font-poppins-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                                >
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}