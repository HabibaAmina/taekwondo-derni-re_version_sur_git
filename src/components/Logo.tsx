import { motion } from 'framer-motion';
import logoAtp from '../assets/logo-atp.png.png';

const Logo = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div 
      className="flex items-center cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={scrollToTop}
      role="button"
      aria-label="Retour en haut de la page"
    >
      <img
        src={logoAtp}
        alt="Logo ATP"
        className="h-12 w-12 object-contain mr-3 bg-white rounded-full shadow"
        style={{ background: '#fff' }}
      />
      <div className="font-display font-bold text-lg text-primary">
        Académie<span className="text-secondary"> Taekwondo</span>
      </div>
    </motion.div>
  );
};

export default Logo;
