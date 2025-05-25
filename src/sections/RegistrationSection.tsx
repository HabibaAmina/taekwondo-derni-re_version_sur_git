import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaUserAlt, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaIdCard, FaFileMedical, FaHome, FaMoneyBillWave } from 'react-icons/fa';

const RegistrationSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    club: '',
    courseType: '',
  });

  const [formStep, setFormStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formStep < 2) {
      setFormStep(formStep + 1);
    } else {
      setIsSubmitting(true);
      const selectedClubObj = clubs.find(club => club.id === formState.club);
      const selectedCourseObj = courseTypes.find(course => course.id === formState.courseType);
      
      try {
        // Envoi du message à l'administrateur avec un template utilisant le rendu conditionnel
        await emailjs.send('service_id_gmail',
                'admin',
          {
            from_name: `${formState.firstName} ${formState.lastName}`,
            from_email: formState.email,
            phone: formState.phone,
            birth_date: formState.birthDate,
            club: selectedClubObj ? selectedClubObj.name : formState.club,
            course_type: selectedCourseObj ? selectedCourseObj.name : formState.courseType,
            to_email: 'zineb2019achraf@gmail.com',
            type_inscription: true,
            type_cours_essai: false,
            type_contact: false,
            fiche_html: generateFicheHtml()
          },
          'QccHq6PD1Uo3jsZHm'
        );
        
        // Envoi de la confirmation au client avec un template utilisant le rendu conditionnel
        await emailjs.send('service_id_gmail',
                'user',
          {
            to_name: `${formState.firstName} ${formState.lastName}`,
            to_email: formState.email,
            club: selectedClubObj ? selectedClubObj.name : formState.club,
            course_type: selectedCourseObj ? selectedCourseObj.name : formState.courseType,
            type_inscription: true,
            type_cours_essai: false,
            type_contact: false,
            fiche_html: generateFicheHtml()
          },
          'QccHq6PD1Uo3jsZHm'
        );

        setSubmitted(true);
      } catch (error) {
        console.error('Failed to send email:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Go back to previous step
  const handleBack = () => {
    if (formStep > 0) {
      setFormStep(formStep - 1);
    }
  };

  // Club options
  const clubs = [
    { id: 'villebon', name: 'ATP Villebon-sur-Yvette', pdfFile: 'bulletin-adhesion-coming-soon.pdf', docxFile: 'bulletin-adhesion-coming-soon.docx' },
    { id: 'palaiseau', name: 'ATP Palaiseau', pdfFile: 'bulletin-adhesion-coming-soon.pdf', docxFile: 'bulletin-adhesion-coming-soon.docx' },
    { id: 'longjumeau', name: 'ATP Longjumeau', pdfFile: 'bulletin-adhesion-coming-soon.pdf', docxFile: 'bulletin-adhesion-coming-soon.docx' },
    { id: 'saint-remy', name: 'ATP Saint-Rémy-lès-Chevreuse', pdfFile: 'bulletin-adhesion-coming-soon.pdf', docxFile: 'bulletin-adhesion-coming-soon.docx' },
    { id: 'magny', name: 'ATP Magny-les-Hameaux', pdfFile: 'bulletin-adhesion-coming-soon.pdf', docxFile: 'bulletin-adhesion-coming-soon.docx' },
    { id: 'ulis', name: 'ATP Les Ulis', pdfFile: 'fiche d\'inscription cou taekwondo 2024 2025.pdf', docxFile: 'fiche d\'inscription cou taekwondo 2024 2025.docx' },
  ];

  // Course type options
  const courseTypes = [
    { id: 'baby', name: 'Baby Taekwondo (3-6 ans)', color: 'baby' },
    { id: 'enfants', name: 'Enfants (7-12 ans)', color: 'enfants' },
    { id: 'ados', name: 'Adolescents (13-17 ans)', color: 'ados' },
    { id: 'adultes', name: 'Adultes (18 ans et +)', color: 'adultes' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const generateFicheHtml = () => {
    const currentYear = new Date().getFullYear();
    const startSeasonYear = currentYear;
    const endSeasonYear = currentYear + 1;
    const seasonYear = `${startSeasonYear}-${endSeasonYear}`;

    return `
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Fiche d'inscription ATP</title>
          <style>
            @media print {
              body { background: #fff !important; }
              .main { box-shadow: none !important; }
              .print-btn { display: none !important; }
            }
            body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; color: #222; background: #f7f9fa; }
            .header { background: linear-gradient(90deg, #3498DB 60%, #e63946 100%); color: #fff; padding: 32px 0 24px 0; text-align: center; }
            .logo-atp { display: inline-block; vertical-align: middle; margin-bottom: 8px; }
            .main { background: #fff; max-width: 700px; margin: 32px auto; border-radius: 12px; box-shadow: 0 2px 12px #0001; padding: 32px 40px; }
            h2 { color: #3498DB; margin-top: 0; }
            .section { margin-bottom: 28px; }
            .label { font-weight: bold; color: #3498DB; }
            ul { margin: 0; padding-left: 20px; }
            .signature { margin-top: 40px; }
            .footer { text-align: center; color: #888; font-size: 0.95em; margin-top: 32px; }
            .print-btn { display: block; margin: 24px auto 0 auto; background: #3498DB; color: #fff; border: none; border-radius: 6px; padding: 10px 28px; font-size: 1.1em; cursor: pointer; box-shadow: 0 2px 8px #0002; transition: background 0.2s; }
            .print-btn:hover { background: #217dbb; }
          </style>
        </head>
        <body>
          <div class="header">
            <span class="logo-atp">
              <img src="https://i.ibb.co/k2MdCpxp/Logo-ATP.png" alt="Logo ATP" style="width: 70px; vertical-align: middle; border-radius: 50%; box-shadow: 0 2px 8px #0003; background: #fff;" />
            </span>
            <div style="font-size:1.7em; font-weight:bold; letter-spacing:2px;">Académie Taekwondo Pluriel</div>
            <div style="font-size:1.1em; margin-top:4px;">Fiche de Pré-inscription - Saison ${seasonYear}</div>
          </div>
          <div class="main">
            <h2>Informations du pratiquant</h2>
            <div class="section">
              <span class="label">Nom :</span> ${formState.lastName}<br/>
              <span class="label">Prénom :</span> ${formState.firstName}<br/>
              <span class="label">Date de naissance :</span> ${formState.birthDate}<br/>
              <span class="label">Email :</span> ${formState.email}<br/>
              <span class="label">Téléphone :</span> ${formState.phone}<br/>
              <span class="label">Club choisi :</span> ${clubs.find(c => c.id === formState.club)?.name || ''}<br/>
              <span class="label">Type de cours :</span> ${courseTypes.find(c => c.id === formState.courseType)?.name || ''}<br/>
              <span class="label">Date de la demande :</span> ${new Date().toLocaleDateString('fr-FR')}
            </div>
            <h2>Documents à fournir</h2>
            <div class="section">
              <ul>
                <li>Pièce d'identité</li>
                <li>Certificat médical (moins de 3 mois, apte au Taekwondo)</li>
                <li>Justificatif de domicile</li>
                <li>Photo d'identité</li>
                <li>Règlement (chèque, espèces, CB)</li>
              </ul>
            </div>
            <div class="signature">
              <span class="label">Signature du responsable légal :</span>
              <div style="height:60px; border-bottom:1px solid #888; width:300px; margin-top:16px;"></div>
            </div>
            <button class="print-btn" onclick="window.print()">Imprimer cette fiche</button>
          </div>
          <div class="footer">
            Merci d'apporter cette fiche complétée et les documents au club lors de votre inscription définitive.<br/>
            <span style="color:#e63946; font-weight:bold;">ATP</span> – Académie Taekwondo Pluriel
          </div>
        </body>
      </html>
    `;
  };

  return (
    <section className="py-20 bg-primary text-white" id="registration">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Pré-inscription</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Bloquez votre place en vous pré-inscrivant en ligne. Une fois votre pré-inscription validée, vous pourrez télécharger le dossier complet à nous remettre.
          </p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {!submitted ? (
                <motion.div
                  className="bg-white text-primary rounded-lg shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 h-2">
                    <div 
                      className="bg-secondary h-2 transition-all duration-300"
                      style={{ width: `${(formStep + 1) * 33.33}%` }}
                    ></div>
                  </div>
                  
                  {/* Form header */}
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-xl font-semibold">
                      {formStep === 0 && "Informations personnelles"}
                      {formStep === 1 && "Choix du club"}
                      {formStep === 2 && "Type de cours"}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Étape {formStep + 1} sur 3
                    </p>
                  </div>
                  
                  {/* Form content */}
                  <form onSubmit={handleSubmit}>
                    <div className="p-6">
                      {/* Step 1: Personal Information */}
                      {formStep === 0 && (
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-4"
                        >
                          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                  <FaUserAlt />
                                </span>
                                <input
                                  type="text"
                                  id="firstName"
                                  name="firstName"
                                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
                                  placeholder="Votre prénom"
                                  value={formState.firstName}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                  <FaUserAlt />
                                </span>
                                <input
                                  type="text"
                                  id="lastName"
                                  name="lastName"
                                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
                                  placeholder="Votre nom"
                                  value={formState.lastName}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            </div>
                          </motion.div>
                          
                          <motion.div variants={itemVariants}>
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
                                value={formState.email}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </motion.div>
                          
                          <motion.div variants={itemVariants}>
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
                                placeholder="Votre numéro de téléphone"
                                value={formState.phone}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </motion.div>
                          
                          <motion.div variants={itemVariants}>
                            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                <FaCalendarAlt />
                              </span>
                              <input
                                type="date"
                                id="birthDate"
                                name="birthDate"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
                                value={formState.birthDate}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                      
                      {/* Step 2: Club Selection */}
                      {formStep === 1 && (
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-4"
                        >
                          <motion.p variants={itemVariants} className="text-gray-600 mb-4">
                            Sélectionnez le club que vous souhaitez rejoindre:
                          </motion.p>
                          
                          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {clubs.map((club) => (
                              <div 
                                key={club.id}
                                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                  formState.club === club.id 
                                    ? 'border-secondary bg-secondary/10' 
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                                onClick={() => setFormState({...formState, club: club.id})}
                              >
                                <div className="flex items-center">
                                  <div className={`mr-3 ${formState.club === club.id ? 'text-secondary' : 'text-gray-400'}`}>
                                    <FaMapMarkerAlt className="text-xl" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">{club.name}</h4>
                                  </div>
                                  {formState.club === club.id && (
                                    <FaCheckCircle className="ml-auto text-secondary" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        </motion.div>
                      )}
                      
                      {/* Step 3: Course Type */}
                      {formStep === 2 && (
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-4"
                        >
                          <motion.p variants={itemVariants} className="text-gray-600 mb-4">
                            Choisissez le type de cours qui vous convient:
                          </motion.p>
                          
                          <motion.div variants={itemVariants} className="space-y-3">
                            {courseTypes.map((course) => (
                              <div 
                                key={course.id}
                                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                  formState.courseType === course.id 
                                    ? `border-${course.color} bg-${course.color}/10` 
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                                onClick={() => setFormState({...formState, courseType: course.id})}
                              >
                                <div className="flex items-center">
                                  <div className={`w-4 h-4 rounded-full mr-3 bg-${course.color}`}></div>
                                  <div>
                                    <h4 className="font-medium">{course.name}</h4>
                                  </div>
                                  {formState.courseType === course.id && (
                                    <FaCheckCircle className={`ml-auto text-${course.color}`} />
                                  )}
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Form footer */}
                    <div className="px-6 py-4 bg-gray-50 flex justify-between">
                      {formStep > 0 ? (
                        <button
                          type="button"
                          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={handleBack}
                        >
                          Retour
                        </button>
                      ) : (
                        <div></div>
                      )}
                      
                      <button
                        type="submit"
                        disabled={
                          isSubmitting || 
                          (formStep === 0 && (!formState.firstName || !formState.lastName || !formState.email || !formState.phone || !formState.birthDate)) ||
                          (formStep === 1 && !formState.club) ||
                          (formStep === 2 && !formState.courseType)
                        }
                        className={`px-6 py-2 text-white rounded-lg transition-colors ${
                          isSubmitting || 
                          (formStep === 0 && (!formState.firstName || !formState.lastName || !formState.email || !formState.phone || !formState.birthDate)) ||
                          (formStep === 1 && !formState.club) ||
                          (formStep === 2 && !formState.courseType)
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-secondary hover:bg-secondary/90'
                        }`}
                      >
                        {formStep < 2 ? "Continuer" : isSubmitting ? "Inscription en cours..." : "S'inscrire"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  className="text-center bg-white text-primary rounded-lg shadow-lg p-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <FaCheckCircle className="text-green-500 text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Pré-inscription réussie!</h3>
                  <p className="text-gray-600 mb-4">
                    Merci {formState.firstName} pour votre pré-inscription. Nous avons réservé votre place et envoyé un email de confirmation à {formState.email}.
                    Vous trouverez ci-dessous le dossier d'inscription complet à télécharger pour finaliser votre inscription.
                  </p>

                  {/* Phrases motivantes */}
                  <p className="text-gray-700 mb-6 font-semibold">
                    Nous sommes heureux de vous voir motivé à rejoindre nos rangs !<br/>
                    Suivez bien toutes les étapes du formulaire, vous n'êtes plus très loin de faire partie des nôtres !
                  </p>

                  <div className="text-sm text-secondary mb-6 p-3 bg-secondary/10 rounded-lg">
                    Vérifiez votre boîte de réception (et éventuellement vos spams) pour retrouver l'email de confirmation de votre pré-inscription.
                  </div>

                  {/* Nouvelle section pour le téléchargement du dossier */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-xl font-semibold mb-4">Dossier d'adhésion complet à télécharger</h4>
                    <p className="text-gray-700 mb-4">
                      Veuillez télécharger le bulletin d'adhésion complet ci-dessous. Remplissez-le et remettez-le au club pour valider définitivement votre inscription. Vous pouvez l'envoyer par email ou le déposer en personne lors des heures de cours.
                    </p>
                    {/* Conteneur pour les boutons de téléchargement */}
                    <div className="flex flex-col items-center space-y-4">
                      <a
                        href={`/documents/${clubs.find(c => c.id === formState.club)?.pdfFile}`}
                        download
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center w-full justify-center md:w-auto"
                      >
                        <FaFileMedical className="mr-2" /> Télécharger bulletin d'adhesion (PDF)
                      </a>
                      <a
                        href={`/documents/${clubs.find(c => c.id === formState.club)?.docxFile}`}
                        download
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center w-full justify-center md:w-auto"
                      >
                        <FaFileMedical className="mr-2" /> Télécharger bulletin d'adhesion (Word)
                      </a>
                    </div>
                  </div>

                  {/* Boutons d'action principaux */}
                  <div className="flex flex-col items-center space-y-4 mt-6">
                    <button
                      className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors w-full justify-center md:w-auto"
                      onClick={() => {
                        // Générer la fiche d'inscription imprimable (justificatif de pré-inscription)
                        const ficheWindow = window.open('', '_blank');
                        if (ficheWindow) {
                          const ficheHtmlContent = generateFicheHtml();
                          ficheWindow.document.open();
                          ficheWindow.document.write(ficheHtmlContent);
                          ficheWindow.document.close();
                        }
                      }}
                    >
                      Consulter ma fiche de pré-inscription
                    </button>

                    <button
                      className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors w-full justify-center md:w-auto"
                      onClick={() => {
                        setSubmitted(false);
                        setFormStep(0);
                        setFormState({
                          firstName: '',
                          lastName: '',
                          email: '',
                          phone: '',
                          birthDate: '',
                          club: '',
                          courseType: '',
                        });
                      }}
                    >
                      Nouvelle pré-inscription
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Required Documents Information Block */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-gradient-to-br from-secondary/90 to-secondary rounded-lg shadow-lg p-6 text-white h-full"
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-4">À l'issue de votre cours d'essai</h3>
                <p className="mb-6 text-white/90">
                  Pour finaliser votre inscription après votre cours d'essai, merci de préparer les documents suivants:
                </p>
                
                <motion.ul
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <motion.li variants={itemVariants} className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      <FaIdCard className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-medium">Pièce d'identité</h4>
                      <p className="text-sm text-white/80">Carte d'identité, passeport ou livret de famille pour les mineurs</p>
                    </div>
                  </motion.li>
                  
                  <motion.li variants={itemVariants} className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      <FaFileMedical className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-medium">Certificat médical</h4>
                      <p className="text-sm text-white/80">De moins de 3 mois mentionnant l'aptitude à la pratique du Taekwondo</p>
                    </div>
                  </motion.li>
                  
                  <motion.li variants={itemVariants} className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      <FaHome className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-medium">Justificatif de domicile</h4>
                      <p className="text-sm text-white/80">Facture d'électricité, de gaz ou quittance de loyer</p>
                    </div>
                  </motion.li>
                  
                  <motion.li variants={itemVariants} className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      <FaMoneyBillWave className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-medium">Règlement</h4>
                      <p className="text-sm text-white/80">Par chèque, espèces ou carte bancaire</p>
                    </div>
                  </motion.li>
                </motion.ul>
                
                <motion.div 
                  className="mt-8 p-4 bg-white/10 rounded-lg border border-white/20"
                  variants={itemVariants}
                >
                  <p className="text-sm font-medium">
                    ⚠️ Important: Pour les mineurs, la présence d'un parent ou tuteur légal est obligatoire lors de l'inscription.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
