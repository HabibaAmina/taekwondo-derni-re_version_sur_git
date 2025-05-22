import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const ContactSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ ...status, submitting: true });

    try {
        // Envoi du message à l'administrateur avec un template utilisant le rendu conditionnel
        await emailjs.send('service_id_gmail',
                'admin',
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: 'zineb2019achraf@gmail.com',
            type_contact: true,
            type_cours_essai: false,
            type_inscription: false
          },
          'QccHq6PD1Uo3jsZHm'
        );
        
        // Envoi de la confirmation au client avec un template utilisant le rendu conditionnel
        await emailjs.send('service_id_gmail',
                'user',
          {
            to_name: formData.name,
            to_email: formData.email,
            subject: `Re: ${formData.subject}`,
            original_message: formData.message,
            type_contact: true,
            type_cours_essai: false,
            type_inscription: false
          },
          'QccHq6PD1Uo3jsZHm'
        );

      setStatus({
        submitting: false,
        submitted: true,
        success: true,
        message: 'Votre message a été envoyé avec succès !'
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus({
        submitting: false,
        submitted: true,
        success: false,
        message: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.'
      });
    }
  };

  return (
    <section className="py-20 bg-background" id="contact">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Contact Information */}
          <motion.div 
            className="bg-primary text-white p-4 sm:p-6 rounded-lg shadow-md"
            variants={itemVariants}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Contactez-nous</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="text-secondary text-xl mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Adresse</h4>
                  <p className="text-gray-300 text-sm sm:text-base">12 Avenue des Sports, 75001 Paris</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaPhone className="text-secondary text-xl mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Téléphone</h4>
                  <p className="text-gray-300 text-sm sm:text-base">01 23 45 67 89</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaEnvelope className="text-secondary text-xl mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-gray-300 text-sm sm:text-base">contact@atp-taekwondo.fr</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Horaires d'ouverture</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-300">
                <li>Lundi - Vendredi: 10h - 19h</li>
                <li>Samedi: 10h - 18h</li>
                <li>Dimanche: Fermé</li>
              </ul>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="bg-white p-4 sm:p-6 rounded-lg shadow-md"
            variants={itemVariants}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Envoyez-nous un message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="subject">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base resize-none"
                  rows={4}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status.submitting}
                className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors ${status.submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'}`}
              >
                {status.submitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>

              {status.submitted && (
                <div className={`mt-4 p-4 rounded-lg flex items-center ${status.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {status.success ? (
                    <FaCheckCircle className="flex-shrink-0 mr-2" />
                  ) : (
                    <FaExclamationCircle className="flex-shrink-0 mr-2" />
                  )}
                  <p>{status.message}</p>
                </div>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;