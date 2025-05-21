import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCalendarAlt, FaMapMarkerAlt, FaUserAlt, FaEnvelope, FaPhone, FaCheckCircle, FaBirthdayCake, FaBaby, FaChild, FaUserGraduate, FaUserTie } from 'react-icons/fa';

interface TimeSlot {
  day: string;
  time: string;
  available: boolean;
}

interface CourseType {
  id: string;
  name: string;
  ageRange: string;
  icon: JSX.Element;
}

interface Club {
  id: string;
  name: string;
  courseTypes: string[];
  schedule: Record<string, Array<{day: string, time: string}>>;
}

const TrialSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    club: '',
    date: '',
    time: '',
    courseType: ''
  });

  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [availableCourseTypes, setAvailableCourseTypes] = useState<CourseType[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Course types with icons and age ranges
  const courseTypes: CourseType[] = [
    { id: 'baby_3', name: 'Baby Taekwondo 3 ans', ageRange: '3 ans', icon: <FaBaby className="text-baby text-xl" /> },
    { id: 'baby_4', name: 'Baby Taekwondo 4 ans', ageRange: '4 ans', icon: <FaBaby className="text-baby text-xl" /> },
    { id: 'baby_3_5', name: 'Baby Taekwondo', ageRange: '3-5 ans', icon: <FaBaby className="text-baby text-xl" /> },
    { id: 'enfants_5_6', name: 'Enfants', ageRange: '5-6 ans', icon: <FaChild className="text-enfants text-xl" /> },
    { id: 'enfants_7_8', name: 'Enfants', ageRange: '7-8 ans', icon: <FaChild className="text-enfants text-xl" /> },
    { id: 'enfants_9_10', name: 'Enfants', ageRange: '9-10 ans', icon: <FaChild className="text-enfants text-xl" /> },
    { id: 'enfants_6_9', name: 'Enfants', ageRange: '6-9 ans', icon: <FaChild className="text-enfants text-xl" /> },
    { id: 'enfants_5_11', name: 'Enfants', ageRange: '5-11 ans', icon: <FaChild className="text-enfants text-xl" /> },
    { id: 'ados_10_17', name: 'Adolescents', ageRange: '10-17 ans', icon: <FaUserGraduate className="text-ados text-xl" /> },
    { id: 'ados_11_16', name: 'Adolescents', ageRange: '11-16 ans', icon: <FaUserGraduate className="text-ados text-xl" /> },
    { id: 'ados_12_plus', name: 'Adolescents', ageRange: '12-17 ans', icon: <FaUserGraduate className="text-ados text-xl" /> },
    { id: 'adultes', name: 'Adultes', ageRange: '+16 ans', icon: <FaUserTie className="text-adultes text-xl" /> },
  ];

  // Club data with available course types and schedules
  const clubs: Club[] = [
    {
      id: 'villebon',
      name: 'ATP Villebon-sur-Yvette',
      courseTypes: ['baby_3_5', 'enfants_6_9', 'ados_10_17'],
      schedule: {
        baby_3_5: [
          { day: 'Lundi', time: '17h00-18h00' }
        ],
        enfants_6_9: [
          { day: 'Lundi', time: '18h00-19h00' },
          { day: 'Jeudi', time: '17h00-18h00' }
        ],
        ados_10_17: [
          { day: 'Lundi', time: '19h00-20h00' },
          { day: 'Jeudi', time: '18h00-19h00' }
        ]
      }
    },
    {
      id: 'palaiseau',
      name: 'ATP Palaiseau',
      courseTypes: ['baby_3_5', 'enfants_6_9', 'ados_10_17', 'adultes'],
      schedule: {
        baby_3_5: [
          { day: 'Contactez MJC', time: 'Voir site web' }
        ],
        enfants_6_9: [
          { day: 'Contactez MJC', time: 'Voir site web' }
        ],
        ados_10_17: [
          { day: 'Contactez MJC', time: 'Voir site web' }
        ],
        adultes: [
          { day: 'Contactez MJC', time: 'Voir site web' }
        ]
      }
    },
    {
      id: 'longjumeau',
      name: 'ATP Longjumeau',
      courseTypes: ['baby_3_5', 'enfants_6_9', 'ados_10_17'],
      schedule: {
        baby_3_5: [
          { day: 'Vendredi', time: '17h00-17h55' }
        ],
        enfants_6_9: [
          { day: 'Mardi', time: '17h00-17h55' },
          { day: 'Vendredi', time: '17h00-17h55' }
        ],
        ados_10_17: [
          { day: 'Mardi', time: '18h05-19h00' },
          { day: 'Vendredi', time: '18h05-19h20' }
        ]
      }
    },
    {
      id: 'saint-remy',
      name: 'ATP Saint-Rémy-lès-Chevreuse',
      courseTypes: ['enfants_5_11', 'ados_12_plus'],
      schedule: {
        enfants_5_11: [
          { day: 'Lundi', time: '17h15-18h15' },
          { day: 'Jeudi', time: '17h30-18h30' }
        ],
        ados_12_plus: [
          { day: 'Lundi', time: '17h15-18h15' },
          { day: 'Jeudi', time: '18h00-19h00' }
        ]
      }
    },
    {
      id: 'magny',
      name: 'ATP Magny-les-Hameaux',
      courseTypes: ['baby_3_5', 'enfants_6_9', 'ados_10_17'],
      schedule: {
        baby_3_5: [
          { day: 'En cours', time: 'Contactez le club' }
        ],
        enfants_6_9: [
          { day: 'En cours', time: 'Contactez le club' }
        ],
        ados_10_17: [
          { day: 'En cours', time: 'Contactez le club' }
        ]
      }
    },
    {
      id: 'ulis',
      name: 'ATP Les Ulis',
      courseTypes: ['baby_3', 'baby_4', 'enfants_5_6', 'enfants_7_8', 'enfants_9_10', 'ados_11_16', 'adultes'],
      schedule: {
        baby_3: [
          { day: 'Samedi', time: '09h30-10h20' }
        ],
        baby_4: [
          { day: 'Samedi', time: '10h25-11h20' }
        ],
        enfants_5_6: [
          { day: 'Mercredi', time: '17h15-18h15' },
          { day: 'Samedi', time: '11h25-12h25' }
        ],
        enfants_7_8: [
          { day: 'Mercredi', time: '18h15-19h15' },
          { day: 'Samedi', time: '14h00-15h00' }
        ],
        enfants_9_10: [
          { day: 'Mardi', time: '18h15-19h15' },
          { day: 'Samedi', time: '15h00-16h00' }
        ],
        ados_11_16: [
          { day: 'Mercredi', time: '19h15-20h15' },
          { day: 'Samedi', time: '15h00-16h00' }
        ],
        adultes: [
          { day: 'Mardi', time: '20h30-22h00' },
          { day: 'Jeudi', time: '20h30-22h00' }
        ]
      }
    }
  ];

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // For course type changes, immediately update time slots
      if (name === 'courseType' && value && prev.club) {
        const availableDays = getAvailableDaysForCourse(prev.club, value);
        setAvailableTimeSlots(availableDays);
      }
      
      return newData;
    });

    // Handle club selection
    if (name === 'club') {
      setFormData(prev => ({
        ...prev,
        courseType: '',
        date: '',
        time: ''
      }));
      
      // Update available course types for selected club
      updateAvailableCourseTypes(value);
    }
  };
  
  // Separate function to handle course type selection from the UI cards
  const handleCourseTypeSelection = (courseId: string) => {
    // Update form data
    setFormData(prev => {
      const newData = { ...prev, courseType: courseId, date: '', time: '' };
      return newData;
    });
    
    // Get available time slots for this course and club
    if (courseId && formData.club) {
      const availableDays = getAvailableDaysForCourse(formData.club, courseId);
      setAvailableTimeSlots(availableDays);
    }
  };

  // Get available days and times for selected course type and club
  const getAvailableDaysForCourse = (clubId: string, courseTypeId: string): TimeSlot[] => {
    const club = clubs.find(c => c.id === clubId);
    if (!club) {
      console.error(`Club not found: ${clubId}`);
      return [];
    }
    
    if (!courseTypeId) {
      console.error('No course type selected');
      return [];
    }
    
    // Check if this course type exists in the club's schedule
    if (!club.schedule[courseTypeId]) {
      console.error(`No schedule found for ${courseTypeId} in club ${clubId} (${club.name})`);
      console.log('Available course types:', Object.keys(club.schedule));
      return [];
    }
    
    const courseSchedule = club.schedule[courseTypeId];
    console.log(`Found schedule for ${courseTypeId} in club ${clubId}:`, courseSchedule);
    
    // Map schedule entries to time slots
    return courseSchedule.map(slot => {
      // Translate day names if needed (English to French)
      const dayTranslation: Record<string, string> = {
        'Monday': 'Lundi',
        'Tuesday': 'Mardi',
        'Wednesday': 'Mercredi',
        'Thursday': 'Jeudi',
        'Friday': 'Vendredi',
        'Saturday': 'Samedi',
        'Sunday': 'Dimanche'
      };
      
      return {
        day: dayTranslation[slot.day] || slot.day,
        time: slot.time,
        available: true
      };
    });
  };

  // Update available course types based on selected club
  const updateAvailableCourseTypes = (clubId: string) => {
    const club = clubs.find(c => c.id === clubId);
    if (!club) {
      setAvailableCourseTypes([]);
      return;
    }
    
    const courseTypesForClub = courseTypes.filter(course => 
      club.courseTypes.includes(course.id)
    );
    
    setAvailableCourseTypes(courseTypesForClub);
  };

  // Select time slot 
  const selectTimeSlot = (slot: TimeSlot) => {
    const [dayName, slotTime] = [slot.day, slot.time];
    
    // Si le créneau est déjà sélectionné, on le désélectionne
    if (formData.time === slotTime && formData.date) {
      setFormData(prev => ({
        ...prev,
        date: '',
        time: ''
      }));
      
      // Réinitialiser tous les créneaux comme disponibles
      setAvailableTimeSlots(prev =>
        prev.map(ts => ({
          ...ts,
          available: true
        }))
      );
      return;
    }
    
    // Find the next occurrence of this day of the week
    const today = new Date();
    
    // Handle both English and French day names
    const dayNameMapping: Record<string, number> = {
      'Sunday': 0, 'Dimanche': 0,
      'Monday': 1, 'Lundi': 1,
      'Tuesday': 2, 'Mardi': 2,
      'Wednesday': 3, 'Mercredi': 3,
      'Thursday': 4, 'Jeudi': 4,
      'Friday': 5, 'Vendredi': 5,
      'Saturday': 6, 'Samedi': 6
    };
    
    const dayIndex = dayNameMapping[dayName];
    
    if (dayIndex === undefined) {
      console.error(`Unknown day name: ${dayName}`);
      return;
    }
    
    const todayIndex = today.getDay();
    let daysToAdd = dayIndex - todayIndex;
    if (daysToAdd < 0) daysToAdd += 7; // If the day has passed this week, get next week's
    
    const nextOccurrence = new Date();
    nextOccurrence.setDate(today.getDate() + daysToAdd);
    
    // Format date for input
    const formattedDate = nextOccurrence.toISOString().split('T')[0];
    
    console.log(`Selected time slot: ${dayName} ${slotTime}, date: ${formattedDate}`);
    
    // Mettre à jour les créneaux disponibles pour désélectionner les autres
    setAvailableTimeSlots(prev => 
      prev.map(ts => ({
        ...ts,
        available: ts.day === dayName && ts.time === slotTime
      }))
    );
    
    // Mettre à jour le formulaire avec le nouveau créneau sélectionné
    setFormData(prev => ({
      ...prev,
      date: formattedDate,
      time: slotTime
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedClubObj = clubs.find(club => club.id === formData.club);
      const selectedCourseObj = courseTypes.find(course => course.id === formData.courseType);

      // Envoi du message à l'administrateur avec un template utilisant le rendu conditionnel
      await emailjs.send('service_id_gmail',
                'admin',
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          birth_date: formData.birthDate,
          club: selectedClubObj ? selectedClubObj.name : formData.club,
          course_type: selectedCourseObj ? selectedCourseObj.name : formData.courseType,
          date: formData.date,
          time: formData.time,
          to_email: 'zineb2019achraf@gmail.com',
          type_cours_essai: true,
          type_inscription: false,
          type_contact: false
        },
        'QccHq6PD1Uo3jsZHm'
      );
      
      // Envoi de la confirmation au client avec un template utilisant le rendu conditionnel
      await emailjs.send('service_id_gmail',
                'user',
        {
          to_name: formData.name,
          to_email: formData.email,
          club: selectedClubObj ? selectedClubObj.name : formData.club,
          course_type: selectedCourseObj ? selectedCourseObj.name : formData.courseType,
          date: formData.date,
          time: formData.time,
          type_cours_essai: true,
          type_inscription: false,
          type_contact: false
        },
        'QccHq6PD1Uo3jsZHm'
      );

      setSubmitted(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      setFormErrors(['Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.']);
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-background" id="trial">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Réservez un Cours d'Essai</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Envie de découvrir le taekwondo avant de vous engager ? Réservez un cours d'essai gratuit dans le club de votre choix.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Trial info */}
              <motion.div 
                className="bg-primary text-white p-8"
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-6">Premier Cours Gratuit</h3>
                <div className="mb-6 overflow-hidden rounded-lg">
                  <motion.img 
                    src="https://v2.taekwondo-vincennes.com/wp-content/uploads/2021/09/cropped-cropped-IMG_4472.jpg"
                    alt="Cours d'essai gratuit de taekwondo"
                    className="w-full h-auto rounded-lg shadow-lg border-4 border-secondary"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-xl text-secondary font-semibold text-center mb-4">Essayez le taekwondo sans engagement&nbsp;: votre premier cours est offert&nbsp;!</p>
                <ul className="space-y-4">
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <FaCheckCircle className="text-secondary mt-1 mr-3" />
                    <span>Découvrez notre méthode d'enseignement</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <FaCheckCircle className="text-secondary mt-1 mr-3" />
                    <span>Rencontrez nos maîtres et instructeurs</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <FaCheckCircle className="text-secondary mt-1 mr-3" />
                    <span>Visitez nos installations modernes</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <FaCheckCircle className="text-secondary mt-1 mr-3" />
                    <span>Expérimentez un cours adapté à votre niveau</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <FaCheckCircle className="text-secondary mt-1 mr-3" />
                    <span>Sans aucun engagement</span>
                  </motion.li>
                </ul>
                
                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <h4 className="font-medium mb-2">Que faut-il apporter ?</h4>
                  <p className="text-gray-300 text-sm">
                    Une tenue de sport confortable, une bouteille d'eau et votre motivation ! 
                    Nous fournissons tout l'équipement nécessaire pour le cours d'essai.
                  </p>
                </motion.div>
              </motion.div>
              
              {/* Trial form */}
              <div className="p-8">
                {/* Information block removed as requested */}
                
                {!submitted ? (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {formErrors.length > 0 && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                        <p className="font-medium mb-1">Veuillez corriger les erreurs suivantes:</p>
                        <ul className="list-disc ml-5 text-sm">
                          {formErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          <FaUserAlt />
                        </span>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
                          placeholder="Votre nom et prénom"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          <FaEnvelope />
                        </span>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
                          placeholder="votre.email@exemple.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          <FaPhone />
                        </span>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
                          placeholder="01 23 45 67 89"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          <FaBirthdayCake />
                        </span>
                        <input
                          type="date"
                          id="birthDate"
                          name="birthDate"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
                          max={new Date().toISOString().split('T')[0]}
                          value={formData.birthDate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="club" className="block text-sm font-medium text-gray-700 mb-1">Club</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          <FaMapMarkerAlt />
                        </span>
                        <select
                          id="club"
                          name="club"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
                          value={formData.club}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Sélectionnez un club</option>
                          {clubs.map(club => (
                            <option key={club.id} value={club.id}>{club.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    {formData.club && (
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <label htmlFor="courseType" className="block text-sm font-medium text-gray-700 mb-1">Type de cours</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {availableCourseTypes.map(course => (
                            <motion.div 
                              key={course.id}
                              variants={itemVariants}
                              onClick={() => handleCourseTypeSelection(course.id)}
                              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                                formData.courseType === course.id 
                                  ? 'border-secondary bg-secondary/10' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="mr-2">
                                {course.icon}
                              </div>
                              <div className="text-sm">
                                <div>{course.name}</div>
                                <div className="text-xs text-gray-500">{course.ageRange}</div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    
                    {formData.courseType && (
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-4"
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">Horaires disponibles</label>
                        <div className="space-y-2">
                          {availableTimeSlots.length > 0 ? (
                            availableTimeSlots.map((slot, index) => (
                              <motion.div 
                                key={index}
                                variants={itemVariants}
                                onClick={() => selectTimeSlot(slot)}
                                className={`p-3 border rounded-lg transition-colors ${
                                  !slot.available 
                                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                                    : formData.time === slot.time && formData.date
                                      ? 'border-secondary bg-secondary/10 cursor-pointer'
                                      : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                                }`}
                                whileHover={slot.available ? { scale: 1.02 } : {}}
                                whileTap={slot.available ? { scale: 0.98 } : {}}
                              >
                                <div className="flex items-center">
                                  <div className="mr-3 text-secondary">
                                    <FaCalendarAlt />
                                  </div>
                                  <div>
                                    <span className="font-medium">{slot.day}</span>
                                    <span className="mx-2 text-gray-400">|</span>
                                    <span>{slot.time}</span>
                                  </div>
                                </div>
                              </motion.div>
                            ))
                          ) : (
                            <div className="p-3 bg-gray-100 border rounded-lg text-gray-500">
                              {formData.courseType ? (
                                <>Aucun horaire disponible pour ce type de cours</>
                              ) : (
                                <>Veuillez sélectionner un type de cours</>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                    
                    <div className="pt-4">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting || !formData.club || !formData.courseType || !formData.time}
                        className={`w-full bg-secondary text-white py-3 rounded-lg transition-colors ${
                          isSubmitting || !formData.club || !formData.courseType || !formData.time
                            ? 'opacity-50 cursor-not-allowed bg-gray-400' 
                            : 'hover:bg-secondary/90'
                        }`}
                        whileHover={!isSubmitting && formData.club && formData.courseType ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting && formData.club && formData.courseType ? { scale: 0.98 } : {}}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Réservation en cours...
                          </span>
                        ) : (
                          'Réserver mon cours d\'essai'
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <FaCheckCircle className="text-green-500 text-3xl" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Réservation confirmée!</h3>
                    <p className="text-gray-600 mb-4">
                      Merci {formData.name}! Votre cours d'essai a été réservé avec succès. Un email de confirmation a été envoyé à {formData.email}.
                    </p>
                    <div className="text-sm text-secondary mb-6 p-3 bg-secondary/10 rounded-lg">
                      Vérifiez votre boîte de réception (et éventuellement vos spams) pour retrouver toutes les informations concernant votre cours d'essai gratuit.
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left">
                      <h4 className="font-medium mb-2">Détails de la réservation:</h4>
                      <p className="flex items-center text-sm mb-1">
                        <FaMapMarkerAlt className="mr-2 text-secondary" />
                        {clubs.find(c => c.id === formData.club)?.name}
                      </p>
                      <p className="flex items-center text-sm mb-1">
                        <FaUserAlt className="mr-2 text-secondary" />
                        {courseTypes.find(c => c.id === formData.courseType)?.name}
                      </p>
                      <p className="flex items-center text-sm mb-1">
                        <FaCalendarAlt className="mr-2 text-secondary" />
                        {new Date(formData.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                      <p className="text-sm ml-6">à {formData.time}</p>
                    </div>
                    <motion.button
                      className="text-secondary hover:underline"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          birthDate: '',
                          club: '',
                          date: '',
                          time: '',
                          courseType: ''
                        });
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      Faire une nouvelle réservation
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrialSection;
