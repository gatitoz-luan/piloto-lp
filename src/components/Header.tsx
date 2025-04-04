import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(17, 24, 39, 0.5)', 'rgba(17, 24, 39, 0.95)']
  );

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
    setIsMenuOpen(false);
  };

  const openCalendly = () => {
    window.open('https://calendly.com/luan-piloto', '_blank');
  };

  return (
    <motion.header 
      className="fixed w-full backdrop-blur-sm z-40 border-b border-gray-800"
      style={{ backgroundColor }}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <img src="/Prancheta4.png" alt="O Piloto" className="h-8" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">

          <motion.button 
              onClick={scrollToTop} 
              className="text-gray-300 hover:text-blue-400 transition-colors"
              whileHover={{ y: -2 }}
            >
              Início
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('about')} 
              className="text-gray-300 hover:text-blue-400 transition-colors"
              whileHover={{ y: -2 }}
            >
              Sobre
            </motion.button>
            

            <motion.button 
              onClick={() => scrollToSection('pricing')} 
              className="text-gray-300 hover:text-blue-400 transition-colors"
              whileHover={{ y: -2 }}
            >
              Planos
            </motion.button>
            <motion.button 
              onClick={openCalendly}
              className="bg-blue-600 text-blue-200 px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Demonstração
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-blue-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden mt-4 pb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                Sobre
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                Planos
              </button>
              <button 
                onClick={openCalendly}
                className="bg-blue-600 text-blue-200 px-6 py-2 rounded-full hover:bg-blue-700 transition-colors text-left"
              >
                Demonstração
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;