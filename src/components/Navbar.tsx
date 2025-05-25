import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import Logo from './Logo';

interface NavbarProps {
  scrollY: number;
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  refs: {
    coursesRef: React.RefObject<HTMLDivElement>;
    clubsRef: React.RefObject<HTMLDivElement>;
    galleryRef: React.RefObject<HTMLDivElement>;
    shopRef: React.RefObject<HTMLDivElement>;
    registrationRef: React.RefObject<HTMLDivElement>;
    trialRef: React.RefObject<HTMLDivElement>;
    contactRef: React.RefObject<HTMLDivElement>;
    pricingRef: React.RefObject<HTMLDivElement>;
  };
  toggleCart: () => void;
  cartItemCount: number;
}

const Navbar = ({ scrollY, scrollToSection, refs, toggleCart, cartItemCount }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Close mobile menu if it was open and screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />
        
        {/* Desktop Menu - Visible on md and larger */}
        <div className="hidden md:flex items-center space-x-8">
          <div 
            className="nav-link hover:text-secondary cursor-pointer transition-colors"
            onClick={() => scrollToSection(refs.coursesRef)}
          >
            Nos Cours
          </div>
          <div 
            className="nav-link hover:text-secondary cursor-pointer transition-colors"
            onClick={() => scrollToSection(refs.clubsRef)}
          >
            Nos Clubs
          </div>
          <div 
            className="nav-link hover:text-secondary cursor-pointer transition-colors"
            onClick={() => scrollToSection(refs.galleryRef)}
          >
            Galerie
          </div>
          <div 
                className="nav-link hover:text-secondary cursor-pointer transition-colors"
                onClick={() => scrollToSection(refs.shopRef)}
              >
                Boutique
              </div>
              <div 
                className="nav-link hover:text-secondary cursor-pointer transition-colors"
                onClick={() => scrollToSection(refs.pricingRef)}
              >
                Nos Tarifs
              </div>
              <div 
                className="nav-link hover:text-secondary cursor-pointer transition-colors"
                onClick={() => scrollToSection(refs.trialRef)}
              >
                Cours d'essai
              </div>
          <div 
            className="nav-link hover:text-secondary cursor-pointer transition-colors"
            onClick={() => scrollToSection(refs.contactRef)}
          >
            Contact
          </div>
          
          {/* Align "Cours d'essai 100% gratuit !" next to "S'inscrire" */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="bg-secondary text-white px-4 py-2 rounded-full shadow-md hover:bg-secondary/90 transition-all"
              onClick={() => scrollToSection(refs.trialRef)}
            >
              Cours d'essai 100% gratuit !
            </button>
            <button
              className="bg-secondary text-white px-5 py-2 rounded-full hover:bg-secondary/80 transition-colors"
              onClick={() => scrollToSection(refs.registrationRef)}
            >
              S'inscrire
            </button>
          </div>
        </div>
        
        {/* Mobile menu button - Visible on mobile, hidden on md and larger */}
        <div className="flex items-center md:hidden">
          {/* The mobile dropdown menu is intended for mobile */}
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary focus:outline-none"
          >
            <FaBars className={`text-2xl ${isOpen ? 'hidden' : 'block'}`} />
            <FaTimes className={`text-2xl ${isOpen ? 'block' : 'hidden'}`} />
          </button>
        </div>

        {/* Mobile Shopping Cart Icon - Visible on mobile, hidden on md and larger */}
        <button
          className="text-primary focus:outline-none md:hidden relative ml-4" // Added ml-4 for spacing
          onClick={toggleCart} // Use toggleCart to open the cart panel
        >
          <FaShoppingCart className="text-2xl" />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-1 py-0 text-sm leading-none flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>

      </div>
      
      {/* Mobile Menu (Dropdown) - Visible on mobile, hidden on md and larger */}
      <AnimatePresence>
        {/* Render only if isOpen is true */}
        {isOpen && (
          <motion.div 
            className="bg-white border-t relative z-50 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {/* Mobile menu items */}
              <div 
                className="py-2 border-b border-gray-100"
                onClick={() => {
                   setIsOpen(false); // Close dropdown on click
                   setTimeout(() => {
                     scrollToSection(refs.coursesRef);
                   }, 200); // Re-added the delay
                 }}
                 onTouchEnd={() => {
                   setIsOpen(false); // Close dropdown on touch end
                   setTimeout(() => {
                     scrollToSection(refs.coursesRef);
                   }, 200); // Re-added the delay
                 }}
              >
                Nos Cours
              </div>
              <div 
                className="py-2 border-b border-gray-100" 
                onClick={() => {
                   setIsOpen(false); // Close dropdown on click
                   setTimeout(() => {
                     scrollToSection(refs.clubsRef);
                   }, 200); // Re-added the delay
                 }}
                 onTouchEnd={() => {
                   setIsOpen(false); // Close dropdown on touch end
                   setTimeout(() => {
                     scrollToSection(refs.clubsRef);
                   }, 200); // Re-added the delay
                 }}
              >
                Nos Clubs
              </div>
              <div 
                className="py-2 border-b border-gray-100"
                onClick={() => {
                   setIsOpen(false); // Close dropdown on click
                   setTimeout(() => {
                     scrollToSection(refs.galleryRef);
                   }, 200); // Re-added the delay
                 }}
                 onTouchEnd={() => {
                   setIsOpen(false); // Close dropdown on touch end
                   setTimeout(() => {
                     scrollToSection(refs.galleryRef);
                   }, 200); // Re-added the delay
                 }}
              >
                Galerie
              </div>
              <div 
                className="py-2 border-b border-gray-100"
                onClick={() => {
                   setIsOpen(false); // Close dropdown on click
                   setTimeout(() => {
                     scrollToSection(refs.shopRef);
                   }, 200); // Re-added the delay
                 }}
                 onTouchEnd={() => {
                   setIsOpen(false); // Close dropdown on touch end
                   setTimeout(() => {
                     scrollToSection(refs.shopRef);
                   }, 200); // Re-added the delay
                 }}
              >
                Boutique
              </div>
              <div 
                className="py-2 border-b border-gray-100"
                onClick={() => {
                   setIsOpen(false); // Close dropdown on click
                   setTimeout(() => {
                     scrollToSection(refs.pricingRef);
                   }, 200); // Re-added the delay
                 }}
                 onTouchEnd={() => {
                   setIsOpen(false); // Close dropdown on touch end
                   setTimeout(() => {
                     scrollToSection(refs.pricingRef);
                   }, 200); // Re-added the delay
                 }}
              >
                Nos Tarifs
              </div>
              <div 
                className="py-2 border-b border-gray-100"
                onClick={() => {
                   setIsOpen(false); // Close dropdown on click
                   setTimeout(() => {
                     scrollToSection(refs.trialRef);
                   }, 200); // Re-added the delay
                 }}
                 onTouchEnd={() => {
                   setIsOpen(false); // Close dropdown on touch end
                   setTimeout(() => {
                     scrollToSection(refs.trialRef);
                   }, 200); // Re-added the delay
                 }}
              >
                Cours d'essai
              </div>
              <div 
                className="py-2 border-b border-gray-100"
                onClick={() => {
                   setIsOpen(false); // Close dropdown on click
                   setTimeout(() => {
                     scrollToSection(refs.contactRef);
                   }, 200); // Re-added the delay
                 }}
                 onTouchEnd={() => {
                   setIsOpen(false); // Close dropdown on touch end
                   setTimeout(() => {
                     scrollToSection(refs.contactRef);
                   }, 200); // Re-added the delay
                 }}
              >
                Contact
              </div>
              <button
                className="bg-secondary text-white px-5 py-2 rounded-full hover:bg-secondary/80 transition-colors"
                onClick={() => {
                   setIsOpen(false); // Close dropdown on click
                   setTimeout(() => {
                     scrollToSection(refs.registrationRef);
                   }, 200); // Re-added the delay
                 }}
                 onTouchEnd={() => {
                   setIsOpen(false); // Close dropdown on touch end
                   setTimeout(() => {
                     scrollToSection(refs.registrationRef);
                   }, 200); // Re-added the delay
                 }}
              >
                S'inscrire
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
