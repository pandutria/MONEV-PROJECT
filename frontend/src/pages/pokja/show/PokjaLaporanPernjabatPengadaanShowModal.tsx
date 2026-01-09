/* eslint-disable react-hooks/static-components */
import { X } from 'lucide-react';

interface TransaksiDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    metodePengadaan: string;
    kodePaket: string;
    kodeRUP: string;
    tahunAnggaran: string;
    satuanKerja: string;
    namaPaket: string;
    sumberDana: string;
    jenisPengadaan: string;
    statusPaket?: string;
    statusPengiriman?: string;
    nilaiPagu: string;
    nilaiHPS: string;
    nomorKontrak: string;
    tanggalKontrak: string;
    namaPPK: string;
    jabatanPPK: string;
    namaPimpinan: string;
    jabatanPimpinan: string;
    pemenang: string;
    nilaiPenawaran: string;
    nilaiNegosiasi: string;
    nomorTelp: string;
    email: string;
    npwp: string;
    alamatPemenang: string;
    lokasiPekerjaan: string;
    evidence?: string;
    catatan: string;
    ditujukanPPK?: string;
  };
}

export default function PokjaLaporanPenjabatPengadaanShow({ isOpen, onClose, data }: TransaksiDetailModalProps) {
  if (!isOpen) return null;

  const isEPurchasing = data.metodePengadaan === 'E-Purchasing V5' || data.metodePengadaan === 'E-Purchasing V6';

  const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-3 border-b border-gray-100">
      <div className="font-poppins-medium text-sm text-gray-600">{label}</div>
      <div className="md:col-span-2 font-poppins text-sm text-gray-800">{value || '-'}</div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/20 bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="font-poppins-bold text-xl text-gray-800">
            Detail Informasi
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-6">
          <div>
            <h3 className="font-poppins-semibold text-base text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
              1. TRANSAKSI INFORMASI
            </h3>
            <div className="space-y-0">
              <DetailRow label="Metode Pengadaan" value={data.metodePengadaan} />
              <DetailRow label="Kode Paket/Non Tender" value={data.kodePaket} />
              <DetailRow label="Kode RUP" value={data.kodeRUP} />
              <DetailRow label="Tahun Anggaran" value={data.tahunAnggaran} />
              <DetailRow label="Satuan Kerja" value={data.satuanKerja} />
              <DetailRow label="Nama Paket" value={data.namaPaket} />
              <DetailRow label="Sumber Dana" value={data.sumberDana} />
              <DetailRow label="Jenis Pengadaan" value={data.jenisPengadaan} />
            </div>
          </div>

          {isEPurchasing && (
            <div>
              <h3 className="font-poppins-semibold text-base text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                2. REALISASI PAKET
              </h3>
              <div className="space-y-0">
                <DetailRow label="Status Paket" value={data.statusPaket || ''} />
                <DetailRow label="Status Pengiriman" value={data.statusPengiriman || ''} />
              </div>
            </div>
          )}

          <div>
            <h3 className="font-poppins-semibold text-base text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
              {isEPurchasing ? '3' : '2'}. INFORMASI KEUANGAN
            </h3>
            <div className="space-y-0">
              <DetailRow label="Nilai Pagu (Rp)" value={data.nilaiPagu} />
              <DetailRow label="Nilai HPS (Rp)" value={data.nilaiHPS} />
            </div>
          </div>

          <div>
            <h3 className="font-poppins-semibold text-base text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
              {isEPurchasing ? '4' : '3'}. DETAIL KONTRAK
            </h3>
            <div className="space-y-0">
              <DetailRow label="Nomor Kontrak" value={data.nomorKontrak} />
              <DetailRow label="Tanggal Kontrak" value={data.tanggalKontrak} />
              <DetailRow label="Nama PPK" value={data.namaPPK} />
              <DetailRow label="Jabatan PPK" value={data.jabatanPPK} />
              <DetailRow label="Nama Pimpinan Perusahaan" value={data.namaPimpinan} />
              <DetailRow label="Jabatan Pimpinan" value={data.jabatanPimpinan} />
            </div>
          </div>

          <div>
            <h3 className="font-poppins-semibold text-base text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
              {isEPurchasing ? '5' : '4'}. INFORMASI PEMENANG
            </h3>
            <div className="space-y-0">
              <DetailRow label="Pemenang" value={data.pemenang} />
              <DetailRow label={isEPurchasing ? 'Nilai Total' : 'Nilai Penawaran'} value={data.nilaiPenawaran} />
              <DetailRow label="Nilai Negosiasi/Nilai SPK (Rp)" value={data.nilaiNegosiasi} />
              <DetailRow label="Nomor Telp/HP" value={data.nomorTelp} />
              <DetailRow label="Email" value={data.email} />
              <DetailRow label="NPWP" value={data.npwp} />
            </div>
          </div>

          <div>
            <h3 className="font-poppins-semibold text-base text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
              {isEPurchasing ? '6' : '5'}. LOKASI & ALAMAT
            </h3>
            <div className="space-y-0">
              <DetailRow label="Alamat Pemenang" value={data.alamatPemenang} />
              <DetailRow label="Lokasi Pekerjaan" value={data.lokasiPekerjaan} />
            </div>
          </div>

          <div>
            <h3 className="font-poppins-semibold text-base text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
              {isEPurchasing ? '7' : '6'}. LAMPIRAN DAN CATATAN
            </h3>
            <div className="space-y-0">
              {data.evidence && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-3 border-b border-gray-100">
                  <div className="font-poppins-medium text-sm text-gray-600">Evidence/Bukti</div>
                  <div className="md:col-span-2">
                    <a 
                      href={data.evidence} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-poppins text-sm text-primary hover:underline"
                    >
                      Lihat File
                    </a>
                  </div>
                </div>
              )}
              <DetailRow label="Catatan" value={data.catatan} />
              {!isEPurchasing && data.ditujukanPPK && (
                <DetailRow label="Ditujukan ke PPK" value={data.ditujukanPPK} />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-8 py-2.5 bg-primary hover:bg-primary/90 text-white font-poppins-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}