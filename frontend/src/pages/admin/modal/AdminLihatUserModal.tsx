/* eslint-disable @typescript-eslint/no-explicit-any */
import { X, Upload } from 'lucide-react';
import { useState } from 'react';

interface LihatUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
  data?: any
}

export default function AdminLihatUserModal({ isOpen, onClose, onSubmit, data }: LihatUserModalProps) {
  const [formData, setFormData] = useState({
    role: '',
    groupPokja: '',
    email: '',
    namapengguna: '',
    password: '',
    namaLengkap: '',
    alamat: '',
    telepon: '',
    opdOrganisasi: '',
    pangkatGolongan: '',
    nik: '',
    nip: '',
    noSK: null as File | null,
    noPBJSertifikat: '',
    uploadPBJSertifikat: null as File | null,
    noKompetensiSertifikat: '',
    uploadKompetensiSertifikat: null as File | null,
    profilePhoto: null as File | null
  });

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'ppk', label: 'PPK' },
    { value: 'pokja', label: 'Pokja' },
    { value: 'kepala Bagian', label: 'Kepala Bagian' },
    { value: 'kepala Biro', label: 'Kepala Biro' }
  ];

  const groupPokjaOptions = [
    { value: 'group1', label: 'Group Pokja 1' },
    { value: 'group2', label: 'Group Pokja 2' },
    { value: 'group3', label: 'Group Pokja 3' }
  ];

  const opdOrganisasiOptions = [
    { value: 'opd1', label: 'Dinas Pekerjaan Umum' },
    { value: 'opd2', label: 'Dinas Perhubungan' },
    { value: 'opd3', label: 'Dinas Kesehatan' }
  ];

  const pangkatGolonganOptions = [
    { value: 'III/a', label: 'Penata Muda - III/a' },
    { value: 'III/b', label: 'Penata Muda Tingkat I - III/b' },
    { value: 'III/c', label: 'Penata - III/c' },
    { value: 'III/d', label: 'Penata Tingkat I - III/d' },
    { value: 'IV/a', label: 'Pembina - IV/a' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = () => {
    onSubmit?.(formData);
    onClose();
  };

  const showGroupPokja = formData.role !== 'admin' && formData.role !== 'ppk';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/20 bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="font-poppins-bold text-xl text-gray-800">
            Lihat User
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-8">
          <div>
            <h3 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
              1. Lihat Akun
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-white"
                >
                  <option value="" disabled selected>Pilih Role</option>
                  {roleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {showGroupPokja && (
                <div>
                  <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                    Group Pokja <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.groupPokja}
                    onChange={(e) => handleInputChange('groupPokja', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-white"
                  >
                    <option value="" disabled selected>Pilih Group Pokja</option>
                    {groupPokjaOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  placeholder="Masukkan email"
                />
              </div>

              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Nama Pengguna <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.namapengguna}
                  onChange={(e) => handleInputChange('namapengguna', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  placeholder="Masukkan nama pengguna"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  placeholder="Masukkan password"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-poppins-semibold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
              2. Lihat Pengguna
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.namaLengkap}
                  onChange={(e) => handleInputChange('namaLengkap', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Alamat <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.alamat}
                  onChange={(e) => handleInputChange('alamat', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none"
                  placeholder="Masukkan alamat lengkap"
                />
              </div>

              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Telepon/HP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.telepon}
                  onChange={(e) => handleInputChange('telepon', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  placeholder="Masukkan nomor telepon"
                />
              </div>

              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  OPD Organisasi <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.opdOrganisasi}
                  onChange={(e) => handleInputChange('opdOrganisasi', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-white"
                >
                  <option value="">Pilih OPD Organisasi</option>
                  {opdOrganisasiOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Pangkat Golongan
                </label>
                <select
                  value={formData.pangkatGolongan}
                  onChange={(e) => handleInputChange('pangkatGolongan', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-white"
                >
                  <option value="">Pilih Pangkat Golongan</option>
                  {pangkatGolonganOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  NIK <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nik}
                  onChange={(e) => handleInputChange('nik', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  placeholder="Masukkan NIK"
                />
              </div>

              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  NIP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nip}
                  onChange={(e) => handleInputChange('nip', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  placeholder="Masukkan NIP"
                />
              </div>

              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  No. SK <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="no-sk-upload"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('noSK', e.target.files?.[0] || null)}
                  />
                  <label
                    htmlFor="no-sk-upload"
                    className="flex items-center justify-between w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins text-gray-700 hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                  >
                    <span className="text-sm">{formData.noSK?.name || 'Pilih File'}</span>
                    <Upload className="h-5 w-5 text-primary" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  No. PBJ Sertifikat <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.noPBJSertifikat}
                  onChange={(e) => handleInputChange('noPBJSertifikat', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  placeholder="Masukkan No. PBJ Sertifikat"
                />
              </div>

              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Upload PBJ Sertifikat <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="pbj-sertifikat-upload"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('uploadPBJSertifikat', e.target.files?.[0] || null)}
                  />
                  <label
                    htmlFor="pbj-sertifikat-upload"
                    className="flex items-center justify-between w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins text-gray-700 hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                  >
                    <span className="text-sm">{formData.uploadPBJSertifikat?.name || 'Pilih File'}</span>
                    <Upload className="h-5 w-5 text-primary" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  No. Kompetensi Sertifikat <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.noKompetensiSertifikat}
                  onChange={(e) => handleInputChange('noKompetensiSertifikat', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  placeholder="Masukkan No. Kompetensi Sertifikat"
                />
              </div>

              <div>
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Upload Kompetensi Sertifikat <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="kompetensi-sertifikat-upload"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('uploadKompetensiSertifikat', e.target.files?.[0] || null)}
                  />
                  <label
                    htmlFor="kompetensi-sertifikat-upload"
                    className="flex items-center justify-between w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins text-gray-700 hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                  >
                    <span className="text-sm">{formData.uploadKompetensiSertifikat?.name || 'Pilih File'}</span>
                    <Upload className="h-5 w-5 text-primary" />
                  </label>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                  Profile Photo
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="profile-photo-upload"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('profilePhoto', e.target.files?.[0] || null)}
                  />
                  <label
                    htmlFor="profile-photo-upload"
                    className="flex items-center justify-between w-full px-4 py-2.5 border border-gray-300 rounded-lg font-poppins text-gray-700 hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                  >
                    <span className="text-sm">{formData.profilePhoto?.name || 'Pilih Foto Profile'}</span>
                    <Upload className="h-5 w-5 text-primary" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
          <button
            onClick={handleSubmit}
            className="px-8 py-2.5 bg-primary hover:bg-transparent border-2 border-primary hover:text-primary cursor-pointer text-white font-poppins-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}