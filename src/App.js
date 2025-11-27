import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, MapPin, DollarSign, School, ArrowLeft, RefreshCcw, Briefcase, GraduationCap, Edit2, Wallet } from 'lucide-react';

// --- DATA FROM UPLOADED EXCEL SHEET (Complete List) ---
const universityDatabase = [
  // Georgia (6 years)
  { id: 'g1', country: "Georgia", name: "Caucasus University", fees: "6000", currency: "USD", duration: "6", medium: "English", slab: "30-35 Lakhs" },
  { id: 'g2', country: "Georgia", name: "Tbilisi State Medical University (American Curriculum)", fees: "13500", currency: "USD", duration: "6", medium: "English", slab: "70-75 Lakhs" },
  { id: 'g3', country: "Georgia", name: "Tbilisi State Medical University (European Curriculum)", fees: "8000", currency: "USD", duration: "6", medium: "English", slab: "40-45 Lakhs" },
  { id: 'g4', country: "Georgia", name: "International Black Sea University", fees: "4500+400", currency: "USD", duration: "6", medium: "English", slab: "25-30 Lakhs" },
  { id: 'g5', country: "Georgia", name: "East West University", fees: "3900+400", currency: "USD", duration: "6", medium: "English", slab: "20-25 Lakhs" },
  { id: 'g6', country: "Georgia", name: "Tbilisi Medical Academy", fees: "7000", currency: "USD", duration: "6", medium: "English", slab: "35-40 Lakhs" },
  { id: 'g7', country: "Georgia", name: "University of Georgia", fees: "6500", currency: "USD", duration: "6", medium: "English", slab: "30-35 Lakhs" },
  { id: 'g8', country: "Georgia", name: "European University", fees: "5500", currency: "USD", duration: "6", medium: "English", slab: "25-30 Lakhs" },
  { id: 'g9', country: "Georgia", name: "Georgian National University SEU", fees: "5900+400", currency: "USD", duration: "6", medium: "English", slab: "30-35 Lakhs" },
  { id: 'g10', country: "Georgia", name: "Alte University", fees: "5500", currency: "USD", duration: "6", medium: "English", slab: "25-30 Lakhs" },

  // Uzbekistan (6 years)
  { id: 'u1', country: "Uzbekistan", name: "Tashkent Medical Academy", fees: "3500", currency: "USD", duration: "6", medium: "English", slab: "15-20 Lakhs" },
  { id: 'u2', country: "Uzbekistan", name: "Samarkand State Medical University", fees: "3850", currency: "USD", duration: "6", medium: "English", slab: "20-25 Lakhs" },
  { id: 'u3', country: "Uzbekistan", name: "Bukhara State Medical Institute", fees: "3200", currency: "USD", duration: "6", medium: "English", slab: "15-20 Lakhs" },

  // Russia (6 years)
  { id: 'r1', country: "Russia", name: "Ivanovo State Medical Academy", fees: "285000", currency: "RUB", duration: "6", medium: "English", slab: "15-20 Lakhs" },
  { id: 'r2', country: "Russia", name: "Kemerovo State Medical University", fees: "295000", currency: "RUB", duration: "6", medium: "English", slab: "20-25 Lakhs" },
  { id: 'r3', country: "Russia", name: "Kemerovo State University", fees: "277000", currency: "RUB", duration: "6", medium: "English", slab: "15-20 Lakhs" },
  { id: 'r4', country: "Russia", name: "Ural State Medical University", fees: "300000", currency: "RUB", duration: "6", medium: "English", slab: "20-25 Lakhs" },
  { id: 'r5', country: "Russia", name: "Yaroslavl State Medical University", fees: "350000", currency: "RUB", duration: "6", medium: "English", slab: "20-25 Lakhs" },
  { id: 'r6', country: "Russia", name: "Bashkir State Medical University", fees: "399120", currency: "RUB", duration: "6", medium: "English", slab: "25-30 Lakhs" },
  { id: 'r7', country: "Russia", name: "North Ossetian State Medical Academy", fees: "310000", currency: "RUB", duration: "6", medium: "English", slab: "20-25 Lakhs" },
  { id: 'r8', country: "Russia", name: "Far Eastern Federal University", fees: "495000", currency: "RUB", duration: "6", medium: "English", slab: "30-35 Lakhs" },
  { id: 'r9', country: "Russia", name: "Novosibirsk State University", fees: "539500", currency: "RUB", duration: "6", medium: "English", slab: "35-40 Lakhs" },
  { id: 'r10', country: "Russia", name: "Crimea Federal University", fees: "330000", currency: "RUB", duration: "6", medium: "English", slab: "20-25 Lakhs" },
  { id: 'r11', country: "Russia", name: "Lobachevsky State University", fees: "410000", currency: "RUB", duration: "6", medium: "English", slab: "25-30 Lakhs" },
  { id: 'r12', country: "Russia", name: "Omsk State University", fees: "330000", currency: "RUB", duration: "6", medium: "English", slab: "20-25 Lakhs" },
  { id: 'r13', country: "Russia", name: "Tver State Medical University", fees: "430000", currency: "RUB", duration: "6", medium: "English", slab: "25-30 Lakhs" },

  // Egypt (7 years)
  { id: 'e1', country: "Egypt", name: "Cairo University", fees: "8000", currency: "USD", duration: "7", medium: "English", slab: "50-55 Lakhs" },
  { id: 'e2', country: "Egypt", name: "Mansoura University", fees: "8000", currency: "USD", duration: "7", medium: "English", slab: "50-55 Lakhs" },
  { id: 'e3', country: "Egypt", name: "Ain Shams University", fees: "8000", currency: "USD", duration: "7", medium: "English", slab: "50-55 Lakhs" },
  { id: 'e4', country: "Egypt", name: "Assiut University", fees: "8000", currency: "USD", duration: "7", medium: "English", slab: "50-55 Lakhs" },
  { id: 'e5', country: "Egypt", name: "Alexandria University", fees: "8000", currency: "USD", duration: "7", medium: "English", slab: "50-55 Lakhs" },
  { id: 'e6', country: "Egypt", name: "Nahda University", fees: "5000", currency: "USD", duration: "7", medium: "English", slab: "30-35 Lakhs" },

  // Armenia (6 years)
  { id: 'a1', country: "Armenia", name: "University of Traditional Medicine", fees: "4500", currency: "USD", duration: "6", medium: "English", slab: "20-25 Lakhs" },

  // Bulgaria (6 years)
  { id: 'b1', country: "Bulgaria", name: "Varna Medical University", fees: "10000", currency: "Euro", duration: "6", medium: "English", slab: "60-65 Lakhs" },
  { id: 'b2', country: "Bulgaria", name: "Medical University of Plovdiv", fees: "10000", currency: "Euro", duration: "6", medium: "English", slab: "60-65 Lakhs" },
  { id: 'b3', country: "Bulgaria", name: "Medical University of Sofia", fees: "10000", currency: "Euro", duration: "6", medium: "English", slab: "60-65 Lakhs" },
  { id: 'b4', country: "Bulgaria", name: "Pleven State Medical University", fees: "9000", currency: "Euro", duration: "6", medium: "English", slab: "50-55 Lakhs" },
  { id: 'b5', country: "Bulgaria", name: "Trakia University", fees: "8000", currency: "Euro", duration: "6", medium: "English", slab: "45-50 Lakhs" },

  // Hungary (6 years)
  { id: 'h1', country: "Hungary", name: "University of Debrecen", fees: "16900", currency: "USD", duration: "6", medium: "English", slab: "90-95 Lakhs" },

  // Moldova (7 years)
  { id: 'm1', country: "Moldova", name: "Nicolae Testemitanu State University", fees: "6000", currency: "Euro", duration: "7", medium: "English", slab: "40-45 Lakhs" },

  // Kazakhstan (6 years)
  { id: 'k1', country: "Kazakhstan", name: "Caspian International School of Medicine", fees: "4500", currency: "USD", duration: "6", medium: "English", slab: "20-25 Lakhs" },

  // Kyrgyzstan (6 years)
  { id: 'ky1', country: "Kyrgyzstan", name: "Jalal-Abad International University", fees: "3200", currency: "USD", duration: "6", medium: "English", slab: "15-20 Lakhs" },
  { id: 'ky2', country: "Kyrgyzstan", name: "Jalal-Abad State University", fees: "4500", currency: "USD", duration: "6", medium: "English", slab: "20-25 Lakhs" },
  { id: 'ky3', country: "Kyrgyzstan", name: "Osh State Medical University", fees: "4000", currency: "USD", duration: "6", medium: "English", slab: "20-25 Lakhs" },

  // Azerbaijan (6 years)
  { id: 'az1', country: "Azerbaijan", name: "Azerbaijan Medical University", fees: "6750", currency: "USD", duration: "6", medium: "English", slab: "35-40 Lakhs" },
];

const DYNAMIC_SLABS = [...new Set(universityDatabase.map(u => u.slab))].sort((a, b) => {
    const numA = parseInt(a.split('-')[0]);
    const numB = parseInt(b.split('-')[0]);
    return numA - numB;
});

const GREETINGS = ["hi", "hello", "hey", "hii", "hellooo", "hola", "namaste", "namaskaram", "good morning", "good evening", "hlo"];

// --- HELPER COMPONENTS ---

const TypingIndicator = () => (
  <div className="flex space-x-1 p-2 bg-red-50 rounded-xl rounded-tl-none w-fit items-center mb-2">
    <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
    <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
    <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
  </div>
);

const ChatMessage = ({ msg }) => {
  const isBot = msg.sender === 'bot';
  return (
    <div className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'} mb-4 animate-fade-in-up`}>
      <div className={`flex max-w-[90%] md:max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mt-1 ${isBot ? 'bg-red-600 text-white mr-2' : 'bg-gray-200 ml-2'}`}>
          {isBot ? <Bot size={18} /> : <User size={18} />}
        </div>

        {/* Bubble */}
        <div className={`p-3 rounded-2xl text-sm md:text-base shadow-sm ${
          isBot 
            ? 'bg-white border border-red-100 text-gray-800 rounded-tl-none' 
            : 'bg-red-600 text-white rounded-tr-none'
        }`}>
          {msg.text && <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>}
          {msg.customRender}
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function CeecoChatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0); 
  
  const [userData, setUserData] = useState({
    name: "",
    budgetSlab: "", 
    country: "",
    selectedUni: null,
    phone: "",
    city: "",
    education: ""
  });
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    addBotMessage("Namaskaram! 🙏 Welcome to Ceeco International.\n\nI am Ceeco AI, your personal MBBS study abroad assistant. I'm here to help you find the perfect university.\n\nMay I know your name, please?");
    setStep(1);
  }, []);

  const addBotMessage = (text, customRender = null) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text, customRender }]);
      setIsTyping(false);
    }, 800 + Math.random() * 500);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { sender: 'user', text }]);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    const text = userInput;
    setUserInput("");
    addUserMessage(text);
    processUserResponse(text);
  };

  // Global Back Button (in input area)
  const handleBack = () => {
    if (step === 3) { 
        triggerBudgetReset();
    } else if (step === 4) { 
        triggerCountryReset();
    } else if (step === 5) {
        setStep(4);
        addBotMessage("Going back to the university list.");
    }
  };

  const triggerBudgetReset = () => {
    setStep(2);
    addBotMessage("Sure! Let's update your budget preference.\n\nWhat is your approximate Total Course Budget in INR?");
  };

  const triggerCountryReset = (slabToUse) => {
    const slab = slabToUse || userData.budgetSlab; 
    setStep(3);
    
    const validCountries = Array.from(new Set(
        universityDatabase
          .filter(u => u.slab === slab)
          .map(u => u.country)
    ));

    addBotMessage("Okay, showing countries for your budget again:", 
        <div className="flex flex-wrap gap-2 mt-3">
          {validCountries.map(c => (
            <button 
              key={c} 
              onClick={() => handleCountrySelect(c, slab)}
              className="bg-white border border-red-200 text-red-700 font-semibold py-2 px-4 rounded-full shadow-sm hover:bg-red-50 hover:border-red-400 transition-all flex items-center"
            >
              <MapPin size={14} className="mr-1" /> {c}
            </button>
          ))}
          <button 
            onClick={triggerBudgetReset} 
            className="w-full mt-4 bg-gray-100 text-gray-700 py-3 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center border border-gray-300 shadow-sm"
          >
            <Edit2 size={14} className="mr-2" /> Change Budget
          </button>
        </div>
    );
  };

  const processUserResponse = (text) => {
    const lowerText = text.toLowerCase().trim();

    if (step === 1) {
      if (GREETINGS.includes(lowerText)) {
        addBotMessage("Hello! 👋 Please tell me your actual name so I can address you properly.");
        return;
      }
      setUserData({ ...userData, name: text });
      setStep(2);
      addBotMessage(`Nice to meet you, ${text}! 😊\n\nWhat is your approximate Total Course Budget in INR?`);
      return;
    }

    if (step === 2) {
       addBotMessage("Please select one of the budget slabs below for accurate university results.");
    }

    if (step === 5) {
      const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
      if (!phoneRegex.test(text.replace(/\s/g, ''))) {
        addBotMessage("❌ That doesn't look like a valid phone number.\n\nPlease share a valid 10-digit mobile number or include your country code.");
        return;
      }
      setUserData({ ...userData, phone: text });
      setStep(6);
      addBotMessage("Thank you! ✅\n\nWhich city are you currently located in?");
      return;
    }

    if (step === 6) {
      setUserData({ ...userData, city: text });
      setStep(7);
      addBotMessage("Noted. And finally, what is your current educational status?");
      return;
    }
  };

  const handleBudgetSelect = (slab) => {
    setUserData({ ...userData, budgetSlab: slab });
    addUserMessage(slab);
    setStep(3);

    const validCountries = Array.from(new Set(
        universityDatabase
          .filter(u => u.slab === slab)
          .map(u => u.country)
    ));
    
    if (validCountries.length === 0) {
      addBotMessage(`I currently don't have specific universities listed for the exact budget of ${slab}.`);
      setStep(2);
    } else {
      addBotMessage("Based on your budget, here are the best countries for you:", 
        <div className="flex flex-wrap gap-2 mt-3">
          {validCountries.map(c => (
            <button 
              key={c} 
              onClick={() => handleCountrySelect(c, slab)}
              className="bg-white border border-red-200 text-red-700 font-semibold py-2 px-4 rounded-full shadow-sm hover:bg-red-50 hover:border-red-400 transition-all flex items-center"
            >
              <MapPin size={14} className="mr-1" /> {c}
            </button>
          ))}
          <button 
            onClick={triggerBudgetReset} 
            className="w-full mt-4 bg-gray-100 text-gray-700 py-3 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center border border-gray-300 shadow-sm"
          >
            <Edit2 size={14} className="mr-2" /> Change Budget
          </button>
        </div>
      );
    }
  };

  const handleCountrySelect = (country, slab) => {
    setUserData({ ...userData, country: country });
    setStep(4);
    
    const universities = universityDatabase.filter(u => u.country === country && u.slab === slab);
    
    setIsTyping(true);
    setTimeout(() => {
        setIsTyping(false);
        addBotMessage(`Here are the top universities in ${country} for the budget ${slab}:`, 
            <div className="space-y-4 mt-3 w-full">
                {universities.map(uni => (
                    <div key={uni.id} className="bg-white border-l-4 border-red-600 rounded-r-xl shadow-md p-4 text-left relative overflow-hidden">
                        <h3 className="font-bold text-lg text-gray-800 mb-2">{uni.name}</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p className="flex items-center"><MapPin size={14} className="mr-2 text-red-500" /> {uni.country}</p>
                            <p className="flex items-center">
                                <DollarSign size={14} className="mr-2 text-green-600" /> 
                                Tuition: {uni.fees} {uni.currency} / Year
                            </p>
                            <p className="flex items-center font-semibold text-gray-800">
                                <Wallet size={14} className="mr-2 text-orange-500" /> 
                                Total Budget: ₹{uni.slab}
                            </p>
                            <p className="flex items-center"><Briefcase size={14} className="mr-2 text-blue-500" /> Medium: {uni.medium}</p>
                            <p className="flex items-center"><GraduationCap size={14} className="mr-2 text-purple-500" /> Total Duration: {uni.duration} Years</p>
                        </div>
                        <button 
                           onClick={() => handleSelectUni(uni)}
                           className="mt-3 w-full bg-red-50 text-red-700 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 hover:text-white transition-colors"
                        >
                            Enquire Now
                        </button>
                    </div>
                ))}
                
                <button 
                  onClick={() => triggerCountryReset(slab)}
                  className="w-full flex items-center justify-center py-2 text-gray-500 text-sm hover:text-gray-800"
                >
                  <RefreshCcw size={14} className="mr-1" /> Search Different Country
                </button>
            </div>
        );
    }, 1000);
  };

  const handleSelectUni = (uni) => {
    setUserData({ ...userData, selectedUni: uni });
    setStep(5);
    addBotMessage(`Excellent choice! ${uni.name} is a prestigious institution.\n\nTo check your eligibility and send you the brochure, please share your phone number.`);
  };

  const handleEducationSelect = (status) => {
    setUserData({ ...userData, education: status });
    addUserMessage(status);
    
    setIsTyping(true);
    setTimeout(() => {
        setIsTyping(false);
        setStep(8);
        addBotMessage("Thank you! 🌟\n\nYou are eligible for **FREE Counseling** from our experts.\n\nOur team will contact you shortly on your number to answer all your doubts regarding certificate value and admission process.\n\nHave a great day! ❤️");
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      <header className="bg-gradient-to-r from-red-700 to-red-600 text-white p-4 shadow-lg flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <div className="bg-white p-1 rounded-full">
             <School className="text-red-600" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wide">Ceeco AI</h1>
            <p className="text-xs text-red-100 opacity-90">MBBS Study Abroad Expert</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-red-800 bg-opacity-50 px-2 py-1 rounded text-[10px] font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 pb-48 scrollbar-hide">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} msg={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg z-20">
        {step === 2 && (
          <div className="flex flex-wrap gap-2 mb-3 justify-center max-h-[30vh] overflow-y-auto">
             {DYNAMIC_SLABS.map((slab) => (
                 <button 
                   key={slab}
                   onClick={() => handleBudgetSelect(slab)} 
                   className="bg-red-50 border border-red-200 text-red-800 py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-100 flex-grow"
                 >
                   {slab}
                 </button>
             ))}
          </div>
        )}

        {step === 7 && (
          <div className="flex flex-wrap gap-2 mb-3 justify-center">
            {["10th", "11th", "12th pursuing", "Neet Preparation"].map(s => (
              <button key={s} onClick={() => handleEducationSelect(s)} 
                className="bg-red-50 text-red-700 border border-red-200 px-3 py-2 rounded-lg text-xs font-medium hover:bg-red-600 hover:text-white transition-all">
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
           {step > 1 && step < 8 && step !== 3 && step !== 4 && (
             <button onClick={handleBack} className="p-3 text-gray-500 hover:bg-gray-100 rounded-full"><ArrowLeft size={20} /></button>
           )}

          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={step === 5 ? "Enter Phone Number..." : (step === 6 ? "Enter City..." : "Type here...")}
            disabled={step === 2 || step === 3 || step === 4 || step === 7 || step === 8} 
            className="flex-1 bg-gray-100 text-gray-800 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 border-none text-sm"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!userInput.trim()}
            className={`p-3 rounded-full text-white shadow-lg transition-transform transform active:scale-95 ${userInput.trim() ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-300 cursor-not-allowed'}`}
          >
            <Send size={20} />
          </button>
        </div>
        
        <div className="text-center mt-2">
          <p className="text-[10px] text-gray-400">Powered by Ceeco International</p>
        </div>
      </div>
    </div>
  );
}
