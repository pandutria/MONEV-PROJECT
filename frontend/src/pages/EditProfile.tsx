/* eslint-disable @typescript-eslint/no-explicit-any */
import { Upload, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  
  const [formData, setFormData] = useState({
    email: 'john.doe@example.com',
    namapengguna: 'johndoe',
    namaLengkap: 'John Doe',
    alamat: 'Jl. Merdeka No. 123, Jakarta',
    telepon: '08123456789',
    opdOrganisasi: 'opd1',
    pangkatGolongan: 'III/c',
    nik: '1234567890123456',
    nip: '198512102010121001'
  });

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

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log('Form data:', formData);
    console.log('Profile photo:', profilePhoto);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <div>
            <h1 className="font-poppins-bold text-3xl text-gray-800">
              Edit Profil
            </h1>
            <p className="font-poppins text-gray-600 mt-1">
              Kelola dan perbarui informasi profil Anda
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8 space-y-8">
            
            <div className="flex flex-col md:flex-row gap-8 items-start pb-8 border-b border-gray-200">
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-poppins-bold text-3xl text-primary">
                      {"John Doe".split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <input
                    type="file"
                    className="hidden"
                    id="profile-photo-upload"
                    accept=".jpg,.jpeg,.png"
                    onChange={handlePhotoChange}
                  />
                  <label
                    htmlFor="profile-photo-upload"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border-2 border-dashed border-primary/50 rounded-lg font-poppins text-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                  >
                    <Upload className="h-5 w-5" />
                    <span className="text-sm font-poppins-medium">Ubah Foto</span>
                  </label>
                </div>
              </div>

              <div className="flex-1">
                <h2 className="font-poppins-semibold text-xl text-gray-800 mb-4">
                  Foto Profil
                </h2>
                <p className="font-poppins text-sm text-gray-600 mb-4">
                  Unggah foto profil baru Anda untuk memperbarui tampilan profil. Format yang didukung: JPG, JPEG, PNG. Ukuran maksimal: 5MB.
                </p>
                {profilePhoto && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-poppins text-green-800">
                      ✓ File dipilih: <span className="font-poppins-medium">{profilePhoto.name}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-poppins-semibold text-lg text-gray-800 mb-6 pb-3 border-b-2 border-primary/20">
                Informasi Akun
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>
            </div>

            <div>
              <h3 className="font-poppins-semibold text-lg text-gray-800 mb-6 pb-3 border-b-2 border-primary/20">
                Informasi Pribadi
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
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 p-8 bg-gray-50 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="px-8 py-2.5 border-2 border-gray-300 text-gray-700 font-poppins-medium rounded-lg transition-colors duration-200 hover:bg-gray-100 cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={handleSubmit}
              className="px-8 py-2.5 bg-primary hover:bg-primary/90 text-white font-poppins-medium rounded-lg transition-colors duration-200 cursor-pointer shadow-sm hover:shadow-md"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}