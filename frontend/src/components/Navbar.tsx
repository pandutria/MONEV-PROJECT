import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from "/image/logo/logo-monalisa.png";
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  type?: 'guest';
}

export default function Navbar({ type = "guest" }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <nav className="w-full py-3 md:py-6 px-4 md:px-8 shadow-lg fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <img src={logo} className="w-auto h-6" />

        {type === 'guest' && (
          <>
            <div className="hidden md:flex items-center">
              <button
                className="font-poppins-medium text-black hover:text-primary text-sm md:text-base px-4 md:px-6 transition-colors duration-200 rounded-t-lg cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>

            <button
              className="md:hidden p-2 rounded-lg transition-colors duration-200 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-10 w-10 text-primary bg-primary/20 p-2 rounded-lg" />
              ) : (
                <Menu className="h-10 w-10 text-primary bg-primary/20 p-2 rounded-lg" />
              )}
            </button>
          </>
        )}
      </div>

      {type === 'guest' && (
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}
          `}
        >
          <button
            className="w-full text-left font-poppins-medium text-base px-4 py-3 mt-2 rounded-lg transition-all duration-200 text-black cursor-pointer hover:text-primary hover:bg-primary/20"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
