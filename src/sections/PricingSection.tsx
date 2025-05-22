import { motion, AnimatePresence } from 'framer-motion';
import { FaInfoCircle, FaBaby, FaChild, FaUserGraduate, FaUserTie } from 'react-icons/fa';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { useInView } from 'react-intersection-observer';

interface Club {
  id: string;
  name: string;
}  type CourseType = 'baby_3' | 'baby_4' | 'baby_3_5' | 'enfants_5_6' | 'enfants_6_9' | 
  'enfants_7_8' | 'enfants_9_10' | 'ados_10_17' | 'ados_11_16' | 'adultes' | 'enfants_5_11' | 'ados_12_17' |
  'info_mjc' | 'planning';

interface ClubCourseTypes {
  [key: string]: CourseType[];
}

interface PricingOption {
  id: CourseType;
  name: string;
  ageRange: string;
  icon: IconType;
  iconColor?: string;
  prices: {
    [key: string]: number;
  };
}

interface SupplementData {
  price?: number;
  schedule?: string;
  note?: string;
}

interface SupplementsData {
  [key: string]: SupplementData;
}

const PricingSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedClub, setSelectedClub] = useState<string>('villebon');

  const clubs: Club[] = [
    { id: 'villebon', name: 'ATP Villebon-sur-Yvette' },
    { id: 'palaiseau', name: 'ATP Palaiseau' },
    { id: 'longjumeau', name: 'ATP Longjumeau' },
    { id: 'saint-remy', name: 'ATP Saint-Rémy-lès-Chevreuse' },
    { id: 'magny', name: 'ATP Magny-les-Hameaux' },
    { id: 'ulis', name: 'ATP Les Ulis' },
  ];

  // Mettre à jour les types de cours disponibles pour Palaiseau et Magny
  const clubCourseTypes: ClubCourseTypes = {
    'villebon': ['baby_3_5', 'enfants_6_9', 'ados_10_17'],
    'longjumeau': ['baby_3_5', 'enfants_6_9', 'ados_10_17'],
    'saint-remy': ['enfants_5_11', 'ados_12_17'],
    'ulis': ['baby_3', 'baby_4', 'enfants_5_6', 'enfants_7_8', 'enfants_9_10', 'ados_11_16', 'adultes'],
    'palaiseau': ['info_mjc'],
    'magny': ['planning']
  };

  const pricingOptions: PricingOption[] = [
    {
      id: 'info_mjc',
      name: 'Information MJC',
      ageRange: 'Tous âges',
      icon: FaInfoCircle,
      prices: {
        'palaiseau': 0
      }
    },
    {
      id: 'planning',
      name: 'En cours de planification',
      ageRange: 'Tous âges',
      icon: FaInfoCircle,
      prices: {
        'magny': 0
      }
    },
    {
      id: 'enfants_5_11',
      name: 'Enfants',
      ageRange: '5-11 ans',
      icon: FaChild,
      prices: {
        'villebon': 0,
        'palaiseau': 0,
        'longjumeau': 0,
        'saint-remy': 225,
        'magny': 0,
        'ulis': 0
      }
    },
    {
      id: 'baby_3_5',
      name: 'Baby Taekwondo',
      ageRange: '3-5 ans',
      icon: FaBaby,
      prices: {
        'villebon': 185,
        'palaiseau': 0,
        'longjumeau': 185,
        'saint-remy': 0,
        'magny': 0,
        'ulis': 0
      }
    },
    {
      id: 'baby_3',
      name: 'Baby Taekwondo',
      ageRange: '3 ans',
      icon: FaBaby,
      prices: {
        'villebon': 0,
        'palaiseau': 0,
        'longjumeau': 0,
        'saint-remy': 0,
        'magny': 0,
        'ulis': 185
      }
    },
    {
      id: 'baby_4',
      name: 'Baby Taekwondo',
      ageRange: '4 ans',
      icon: FaBaby,
      prices: {
        'villebon': 0,
        'palaiseau': 0,
        'longjumeau': 0,
        'saint-remy': 0,
        'magny': 0,
        'ulis': 185
      }
    },
    {
      id: 'enfants_5_6',
      name: 'Enfants',
      ageRange: '5-6 ans',
      icon: FaChild,
      prices: {
        'villebon': 0,
        'palaiseau': 0,
        'longjumeau': 0,
        'saint-remy': 0,
        'magny': 0,
        'ulis': 225
      }
    },
    {
      id: 'enfants_7_8',
      name: 'Enfants',
      ageRange: '7-8 ans',
      icon: FaChild,
      prices: {
        'villebon': 0,
        'palaiseau': 0,
        'longjumeau': 0,
        'saint-remy': 0,
        'magny': 0,
        'ulis': 245
      }
    },
    {
      id: 'enfants_9_10',
      name: 'Enfants',
      ageRange: '9-10 ans',
      icon: FaChild,
      prices: {
        'villebon': 0,
        'palaiseau': 0,
        'longjumeau': 0,
        'saint-remy': 0,
        'magny': 0,
        'ulis': 245
      }
    },
    {
      id: 'enfants_6_9',
      name: 'Enfants',
      ageRange: '6-9 ans',
      icon: FaChild,
      prices: {
        'villebon': 225,
        'palaiseau': 0,
        'longjumeau': 225,
        'saint-remy': 0,
        'magny': 0,
        'ulis': 0
      }
    },
    {
      id: 'ados_10_17',
      name: 'Adolescents',
      ageRange: '10-17 ans',
      icon: FaUserGraduate,
      prices: {
        'villebon': 245,
        'palaiseau': 0,
        'longjumeau': 245,
        'saint-remy': 0,
        'magny': 0,
        'ulis': 0
      }
    },
    {
      id: 'ados_12_17',
      name: 'Adolescents',
      ageRange: '12-17 ans',
      icon: FaUserGraduate,
      prices: {
        'villebon': 0,
        'palaiseau': 0,
        'longjumeau': 0,
        'saint-remy': 245,
        'magny': 0,
        'ulis': 0
      }
    },
    {
      id: 'ados_11_16',
      name: 'Adolescents',
      ageRange: '11-16 ans',
      icon: FaUserGraduate,
      prices: {
        'villebon': 0,
        'palaiseau': 0,
        'longjumeau': 0,
        'saint-remy': 0,
        'magny': 0,
        'ulis': 245
      }
    },
    {
      id: 'adultes',
      name: 'Adultes',
      ageRange: '+16 ans',
      icon: FaUserTie,
      prices: {
        'villebon': 245,
        'palaiseau': 0,
        'longjumeau': 245,
        'saint-remy': 0,
        'magny': 0,
        'ulis': 265
      }
    }
  ];

  const supplementsData: SupplementsData = {
    'villebon': { price: 95, schedule: 'Pour compétiteurs et ados : Samedi 18h00-20h00' },
    'longjumeau': { price: 75, schedule: 'Pour compétiteurs confirmés : 1er dimanche du mois 14h30-16h30' },
    'ulis': { price: 80, schedule: 'Pour compétiteurs : Dimanche 14h30-17h30', note: '(sur sélection)' },
    'palaiseau': { note: 'Pour plus d\'informations sur les tarifs, consultez le site de la MJC Palaiseau.' },
    'magny': { note: 'Cours en cours de planification.' },
    'saint-remy': { note: 'Prochainement ...' }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 1
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    }
  };

  const supplementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary via-gray-800 to-gray-900 text-white overflow-hidden relative" id="pricing">
      {/* Décorations d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-secondary/30 to-transparent transform rotate-45"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-secondary/30 to-transparent transform -rotate-45"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Tarifs
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-secondary/50 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Des formules adaptées à chaque âge pour pratiquer le Taekwondo dans les meilleures conditions.
          </p>
        </motion.div>

        {/* Grille d'informations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-4xl mx-auto">
          {/* Premier bloc - Inclus */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-4 backdrop-blur-sm border border-gray-700/50"
          >
            <h3 className="text-xl font-semibold mb-4 text-center">Ce que comprend votre adhésion</h3>
            <p className="text-sm text-gray-400 mb-4 text-center italic">Note : Tarifs hors licence fédérale FFTDA (36€)</p>
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: FaInfoCircle, text: "Assurance du club" },
                { icon: FaInfoCircle, text: "Cours hebdomadaires" },
                { icon: FaInfoCircle, text: "Accès aux passages de grades" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="p-2 bg-secondary/20 rounded-lg">
                    <item.icon className="text-secondary text-lg" />
                  </div>
                  <span className="text-gray-200 text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Deuxième bloc - Suppléments */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-blue-500/20 to-gray-900/80 rounded-xl p-6 backdrop-blur-sm border border-blue-500/30"
          >
            <h3 className="text-xl font-semibold mb-4 text-center">Suppléments Compétiteurs</h3>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedClub}
                variants={supplementVariants}
                initial="hidden"
                animate="visible"
                className="text-center"
              >
                {supplementsData[selectedClub]?.price ? (
                  <motion.div
                    className="mb-3"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                      +{supplementsData[selectedClub].price}€
                    </span>
                    <span className="text-gray-300 text-lg ml-2">/an</span>
                  </motion.div>
                ) : null}
                
                {supplementsData[selectedClub]?.schedule ? (
                  <motion.p 
                    className="text-base text-gray-200 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {supplementsData[selectedClub].schedule}
                  </motion.p>
                ) : null}
                
                {supplementsData[selectedClub]?.note ? (
                  <motion.p 
                    className="text-sm text-gray-400 italic whitespace-pre-line"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {supplementsData[selectedClub].note}
                  </motion.p>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Sélecteur de club */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {clubs.map((club) => (
              <motion.button
                key={club.id}
                onClick={() => setSelectedClub(club.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 text-sm md:text-base rounded-xl transition-all duration-200 ${
                  selectedClub === club.id
                    ? 'bg-secondary text-white shadow-lg shadow-secondary/30'
                    : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 hover:text-white'
                }`}
              >
                {club.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Grille des cartes de prix */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-w-7xl mx-auto"
        >
          {pricingOptions
            .filter(option => clubCourseTypes[selectedClub]?.includes(option.id))
            .map((option) => {
              const IconComponent = option.icon;
              return (
                <motion.div
                  key={option.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl overflow-hidden shadow-xl backdrop-blur-sm border border-gray-700/50"
                >
                  <div className="p-4 text-center border-b border-gray-700/50">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-14 h-14 mx-auto mb-3 p-3 rounded-full bg-[#3498DB] flex items-center justify-center shadow-lg shadow-[#3498DB]/50"
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-1">{option.name}</h3>
                    <p className="text-gray-400 text-sm">{option.ageRange}</p>
                  </div>
                  
                  <div className="p-4 flex flex-col justify-between bg-white">
                    <div className="text-center mb-4">
                      {selectedClub === 'palaiseau' ? (
                        <p className="text-gray-600 text-base">Pour plus d'informations sur les tarifs, consultez le site de la MJC Palaiseau</p>
                      ) : selectedClub === 'magny' ? (
                        <p className="text-gray-600 text-base">Cours en cours de planification</p>
                      ) : (
                        <>
                          <div className="mb-1">
                            <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                              {option.prices[selectedClub]}€
                            </span>
                          </div>
                          <div className="text-gray-600 text-base">par an</div>
                        </>
                      )}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-r from-primary to-secondary text-white w-full py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                      onClick={() => selectedClub === 'palaiseau' 
                        ? window.open('https://www.mjcpalaiseau.com', '_blank')
                        : window.location.href = '#registration'
                      }
                    >
                      {selectedClub === 'palaiseau' ? 'Accéder au site MJC' : "S'inscrire maintenant"}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;