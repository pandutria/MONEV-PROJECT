import { Lock, ArrowLeft, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import logo from "/image/logo/logo-monalisa.png";
import background from "/image/auth/background.jpg";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!token || !email) {
      <Navigate to="/" replace/>
    }
  }, [token, email, navigate]);

//   const handleResetPassword = async () => {


//     setLoading(true);

//     try {
//       SwalMessage({
//         type: "success",
//         title: "Berhasil!",
//         text: "Kata sandi berhasil diubah!"
//       })
//       setTimeout(() => {
//         navigate('/masuk');
//       }, 2000);
//     } catch (error) {
//       console.error('Error:', error);
//       SwalMessage({
//         type: "error",
//         text: "Terjadi Kesahal"
//       })
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div
        className="rounded-2xl p-8 w-full max-w-lg"
        data-aos="fade-up"
        data-aos-duration="1000"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
        }}
      >
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-4 mb-4">
            <ArrowLeft 
              className="w-6 h-6 cursor-pointer hover:scale-90 transition-all text-gray-700" 
              onClick={() => navigate("/login")}
            />
            <img src={logo} className='w-auto h-4 mx-auto'/>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Reset Kata Sandi</h1>
          <p className="text-gray-600">Masukkan kata sandi baru Anda</p>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
              Kata Sandi Baru
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border-2 border-gray-300 rounded-lg transition-all duration-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                placeholder="Minimal 8 karakter"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
              Konfirmasi Kata Sandi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border-2 border-gray-300 rounded-lg transition-all duration-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                placeholder="Ulangi kata sandi baru"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleResetPassword();
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {newPassword && confirmPassword && newPassword === confirmPassword && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="h-4 w-4" />
              <span>Password cocok</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleResetPassword}
            disabled={loading}
            className="w-full text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#f60' }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#ff7a1a')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#f60')}
          >
          </button>
        </div>
      </div>
    </div>
  );
}