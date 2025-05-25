import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrash, FaPlus, FaMinus, FaArrowLeft, FaCheck } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CustomerInfo {
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  club: string;
}

interface ShoppingCartProps {
  isOpen: boolean;
  toggleCart: () => void;
  updateCartItemCount: (count: number) => void;
}

// Club options
const CLUBS = [
  { id: 'villebon', name: 'ATP Villebon-sur-Yvette' },
  { id: 'palaiseau', name: 'ATP Palaiseau' },
  { id: 'longjumeau', name: 'ATP Longjumeau' },
  { id: 'saint-remy', name: 'ATP Saint-Rémy-lès-Chevreuse' },
  { id: 'magny', name: 'ATP Magny-les-Hameaux' },
  { id: 'ulis', name: 'ATP Les Ulis' },
];

const ShoppingCart = ({ isOpen, toggleCart, updateCartItemCount }: ShoppingCartProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    birthDate: '',
    phone: '',
    email: '',
    club: '',
  });
  const [orderCompleted, setOrderCompleted] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  
  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find((i: CartItem) => i.id === item.id);
      
      if (existingItem) {
        return prevItems.map((i: CartItem) => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter((item: CartItem) => item.id !== id));
  };
  
  // Update item quantity
  const updateQuantity = (id: string, change: number) => {
    setCartItems(prevItems => 
      prevItems.map((item: CartItem) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };
  
  // Load cart items from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(savedCart);
        setCartItems(parsedCart);
        
        const count = parsedCart.reduce((total: number, item: CartItem) => total + item.quantity, 0);
        updateCartItemCount(count);
      } catch (error) {
        console.error('Error parsing cart data:', error);
      }
    }
  }, [updateCartItemCount]);
  
  // Save cart items to localStorage and update count whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    const count = cartItems.reduce((total: number, item: CartItem) => total + item.quantity, 0);
    updateCartItemCount(count);
  }, [cartItems, updateCartItemCount]);
  
  // Handle clicks outside cart to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node) && isOpen) {
        toggleCart();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleCart]);
  
  // Add item to cart (event listener)
  useEffect(() => {
    const handleAddToCart = (event: Event) => {
      const customEvent = event as CustomEvent;
      const item = customEvent.detail;
      
      if (item && item.id) {
        addToCart(item);
        toggleCart();
      }
    };
    
    window.addEventListener('add-to-cart', handleAddToCart);
    return () => {
      window.removeEventListener('add-to-cart', handleAddToCart);
    };
  }, [addToCart, toggleCart]);
  
  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0);
  };

  const totalPrice = calculateTotal();
  
  // Handle customer info input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Go to next step
  const goToNextStep = () => {
    setCheckoutStep(prev => prev + 1);
  };

  // Validate customer info form
  const validateCustomerInfo = () => {
    return (
      customerInfo.fullName.trim() !== '' &&
      customerInfo.birthDate.trim() !== '' &&
      customerInfo.phone.trim() !== '' &&
      customerInfo.email.trim() !== '' &&
      customerInfo.club.trim() !== ''
    );
  };

  // Complete order and send email
  const completeOrder = async () => {
    // Get selected club name
    const selectedClub = CLUBS.find(club => club.id === customerInfo.club);
    const clubName = selectedClub ? selectedClub.name : customerInfo.club;
    
    // Prepare email template parameters
    
    const commonParams = {
      // Informations client
      from_name: customerInfo.fullName,
      from_email: customerInfo.email,
      to_name: customerInfo.fullName,
      to_email: customerInfo.email,
      phone: customerInfo.phone,
      birth_date: customerInfo.birthDate,
      club: clubName,

      // Détails de la commande
      order_total: totalPrice.toFixed(2),
      total: totalPrice.toFixed(2),
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price.toFixed(2),
        total: (item.price * item.quantity).toFixed(2),
        image: item.image || ''
      })),
      products: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price.toFixed(2),
        total: (item.price * item.quantity).toFixed(2),
        image: item.image || ''
      })),
      
      // Autres paramètres
      type_demande: 'Commande',
      subject: `Confirmation de commande - ${clubName}`,
      pickup_location: clubName,
      payment_method: 'À régler au club',
      payment_status: 'En attente',
      
      // Flags
      isContact: false,
      isTrialClass: false,
      isRegistration: false,
      isShop: true,
      type_commande: true,
      order_number: 'N/A',
      current_year: new Date().getFullYear()
    };

    try {
      await emailjs.send('service_id_gmail',
                'admin',
        { ...commonParams, to_email: 'zineb2019achraf@gmail.com' },
        'QccHq6PD1Uo3jsZHm'
      );
      
      await emailjs.send('service_id_gmail',
                'user',
        { ...commonParams, to_name: customerInfo.fullName, to_email: customerInfo.email },
        'QccHq6PD1Uo3jsZHm'
      );

      console.log('Emails sent successfully!');
      setOrderCompleted(true);
      setCartItems([]);
      localStorage.removeItem('cart');

      setTimeout(() => {
        setCheckoutStep(1);
        setCustomerInfo({
          fullName: '',
          birthDate: '',
          phone: '',
          email: '',
          club: '',
        });
        toggleCart();
      }, 5000);

    } catch (error) {
      console.error('Error sending email:', error);
      alert('Une erreur est survenue lors de l\'envoi de la commande.');
    }
  };
  
  const resetCheckout = () => {
    setCartItems([]);
    setCheckoutStep(1);
    setCustomerInfo({
      fullName: '',
      birthDate: '',
      phone: '',
      email: '',
      club: '',
    });
    setOrderCompleted(false);
    localStorage.removeItem('cart');
    toggleCart();
  };

  const renderCartItems = () => {
    if (cartItems.length === 0) {
      return <p>Votre panier est vide.</p>;
    }
    
    return (
      <div className="space-y-4" key={cartItems.length}>
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center border-b pb-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
            <div className="flex-grow">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">{(item.price * item.quantity).toFixed(2)} €</p>
              <div className="flex items-center mt-2">
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-2 py-1 border rounded-l hover:bg-gray-100"
                >
                  <FaMinus />
                </button>
                <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-2 py-1 border rounded-r hover:bg-gray-100"
                >
                  <FaPlus />
                </button>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                  aria-label="Remove item"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCustomerInfoForm = () => {
    return (
      <form className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nom complet</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={customerInfo.fullName}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
          />
        </div>
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Date de naissance</label>
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            value={customerInfo.birthDate}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={customerInfo.phone}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={customerInfo.email}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
          />
        </div>
        <div>
          <label htmlFor="club" className="block text-sm font-medium text-gray-700">Club</label>
          <select
            name="club"
            id="club"
            value={customerInfo.club}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
          >
            <option value="">Sélectionner un club</option>
            {CLUBS.map(club => (
              <option key={club.id} value={club.id}>{club.name}</option>
            ))}
          </select>
        </div>
      </form>
    );
  };

  const renderOrderSummary = () => {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Informations client :</h3>
          <p><strong>Nom :</strong> {customerInfo.fullName}</p>
          <p><strong>Date de naissance :</strong> {customerInfo.birthDate}</p>
          <p><strong>Téléphone :</strong> {customerInfo.phone}</p>
          <p><strong>Email :</strong> {customerInfo.email}</p>
          <p><strong>Club :</strong> {CLUBS.find(c => c.id === customerInfo.club)?.name}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Articles commandés :</h3>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between py-1">
              <span>{item.name} ({item.quantity})</span>
              <span>{(item.price * item.quantity).toFixed(2)} €</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between font-bold text-lg border-t pt-4">
          <span>Total :</span>
          <span>{totalPrice.toFixed(2)} €</span>
        </div>
      </div>
    );
  };

  const renderOrderComplete = () => {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full">
        <FaCheck className="text-green-500 text-6xl mb-4" />
        <h3 className="text-2xl font-semibold mb-2">Commande Confirmée !</h3>
        <p className="text-gray-600 mb-4">Merci pour votre commande. Un email de confirmation a été envoyé.</p>
        <button 
          onClick={resetCheckout}
          className="bg-secondary text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-secondary/90 transition-colors"
        >
          Fermer
        </button>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          ref={cartRef} 
          className="fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-lg z-[100] flex flex-col"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3 }}
        >
          {/* Cart Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <button onClick={toggleCart}>
              {checkoutStep === 1 ? <FaTimes className="text-xl" /> : <FaArrowLeft className="text-xl" />}
            </button>
            <h2 className="text-xl font-semibold">{checkoutStep === 1 ? 'Panier' : checkoutStep === 2 ? 'Vos Informations' : 'Résumé de la Commande'}</h2>
            {checkoutStep === 1 && <div className="w-6"></div> /* Spacer */}
          </div>

          {/* Cart Content (Steps) */}
          <div className="flex-grow overflow-y-auto p-4">
            {checkoutStep === 1 && renderCartItems()}
            {checkoutStep === 2 && renderCustomerInfoForm()}
            {checkoutStep === 3 && renderOrderSummary()}
            {orderCompleted && renderOrderComplete()}
          </div>

          {/* Cart Footer (Actions) */}
          {!orderCompleted && (
            <div className="p-4 border-t">
              {checkoutStep === 1 && (
                <button 
                  onClick={goToNextStep} 
                  className="w-full bg-secondary text-white py-3 rounded-md text-lg font-semibold disabled:opacity-50"
                  disabled={cartItems.length === 0}
                >
                  Passer la commande ({totalPrice.toFixed(2)} €)
                </button>
              )}
              {checkoutStep === 2 && (
                <button 
                  onClick={goToNextStep} 
                  className="w-full bg-secondary text-white py-3 rounded-md text-lg font-semibold disabled:opacity-50"
                  disabled={!validateCustomerInfo()}
                >
                  Continuer
                </button>
              )}
              {checkoutStep === 3 && (
                <button 
                  onClick={completeOrder} 
                  className="w-full bg-green-500 text-white py-3 rounded-md text-lg font-semibold"
                >
                  Confirmer et Payer au Club
                </button>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
