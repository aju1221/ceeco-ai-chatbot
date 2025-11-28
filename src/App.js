import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, MapPin, DollarSign, School, ArrowLeft, RefreshCcw, Briefcase, GraduationCap, Edit2, Wallet, Phone, MessageCircle, Star, Sparkles, X } from 'lucide-react';

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

// --- STATIC DESCRIPTIONS (UPDATED FROM USER) ---
const universityDescriptions = {
  "Caucasus University": "Caucasus University, located in Tbilisi, offers a 6-year English-medium MD program recognized by WHO, ECFMG (USA), NMC India, and listed in World Directory of Medical Schools (WDMS). The American-style curriculum prepares students for USMLE, PLAB, and FMGE with a passing rate above 60% in recent years. Modern simulation labs and affiliated multi-profile hospitals ensure strong clinical exposure from the 3rd year.",
  "Tbilisi State Medical University (American Curriculum)": "The top-ranked and oldest medical university in Georgia (founded 1918). The 6-year US-modeled MD program is recognized worldwide (WHO, ECFMG, NMC, GMC-UK). Graduates are eligible for USMLE (Step 1 & 2 from 1st year), PLAB, FMGE (highest success rate in Georgia), and direct residency in the USA/Canada/Europe. Over 85% Indian students clear FMGE in first attempt.",
  "Tbilisi State Medical University (European Curriculum)": "The same prestigious TSMU with a 6-year European-standard English-medium program. Fully compliant with EU directives; graduates can practice across Europe after licensing exams. Recognized by WHO, NMC India, ECFMG, and WDMS. Excellent preparation for FMGE, PLAB, and European licensing exams.",
  "Tbilisi Medical Academy": "Founded by renowned physician Petre Shotadze, TMA offers a student-centric 6-year English MD program recognized by WHO, NMC India, ECFMG, and WDMS. Early clinical exposure from year 2, modern simulation center, and strong FMGE results make it a favorite among Indian students.",
  "University of Georgia": "One of the largest private universities in Georgia offering a British-style 6-year MD program in English. Recognized by WHO, NMC, ECFMG, GMC (UK), and WDMS. Graduates are eligible for PLAB, USMLE, FMGE, and practice in India, UK, USA, Australia, and Middle East after respective licensing exams.",
  "European University": "A rapidly growing institution in Tbilisi with a 6-year English-medium MD program recognized by WHO, NMC India, ECFMG, and WDMS. Modern campus, affordable fees, and strong clinical rotations in leading hospitals. High FMGE success rate and increasing popularity among Indian students.",
  "Alte University": "A modern private university offering a high-quality, affordable 6-year English MD program. Recognized by WHO, NMC, ECFMG, and WDMS. New simulation labs and direct hospital partnerships provide excellent hands-on training. Eligible for FMGE, USMLE, PLAB.",
  "Georgian National University SEU": "One of the largest private universities in Georgia with a well-structured 6-year English-medium MD program. Fully recognized by WHO, NMC India, ECFMG, and WDMS. Strong focus on research and clinical skills; graduates eligible for FMGE, USMLE, and global practice.",
  "International Black Sea University": "Offers an American-style 6-year English MD program recognized by WHO, NMC, ECFMG, and WDMS. Multicultural campus and affordable fees with solid clinical training. Graduates can appear for USMLE, FMGE, and other licensing exams worldwide.",
  "East West University": "One of the most budget-friendly yet quality-focused universities in Georgia. 6-year English-medium MD program recognized by WHO, NMC India, ECFMG, and WDMS. Large Indian student community and excellent FMGE coaching support.",
  "University of Traditional Medicine": "Government-recognized university in Armenia offering a unique 6-year English-medium MD program combining allopathic and traditional medicine. Recognized by WHO, NMC India, and WDMS. Affordable fees and strong clinical base.",
  "University of Debrecen": "One of Europe’s oldest (1538) and highest-ranked medical universities in Hungary. 6-year English-medium MD program recognized by WHO, ECFMG, GMC (UK), NMC India, and all EU countries. Excellent preparation for USMLE, PLAB, and European exams.",
  "Nicolae Testemitanu State University": "The leading medical university of Moldova offering 6-year English-medium programs. Recognized by WHO, NMC India, ECFMG, and European countries. Low fees with solid clinical training.",
  "Caspian International School of Medicine": "Modern private university in Almaty, Kazakhstan offering affordable 6-year English-medium MBBS. Recognized by WHO, NMC India, and WDMS. Growing Indian student base.",
  "Azerbaijan Medical University": "The premier government medical university in Baku, Azerbaijan. 6-year English-medium program recognized by WHO, NMC India, ECFMG, and WDMS. Modern infrastructure and strong clinical training."
};

const SHARED_DESCRIPTIONS = {
  "Uzbekistan": "Government universities offering highly affordable 6-year English-medium MBBS programs. Recognized by WHO, NMC India, PMDC, and WDMS. Graduates eligible for FMGE, USMLE, PLAB, and practice in India, Gulf countries, and worldwide. Very high FMGE passing percentage.",
  "Russia": "Prestigious Russian government medical universities offering 6-year English-medium MD programs. Recognized by WHO, NMC India, ECFMG, and WDMS. Graduates can practice in India (after FMGE), USA (USMLE), UK (PLAB), Australia, and Europe. Strong clinical training in large university hospitals and excellent FMGE results.",
  "Egypt": "Among the oldest and most reputed medical universities in the Middle East. 7-year English-medium programs (including internship) recognized by WHO, NMC India, ECFMG, and Arab Board. Massive patient flow ensures unmatched clinical exposure. Graduates eligible for FMGE, USMLE, PLAB, and practice worldwide.",
  "Bulgaria": "Top European medical universities offering 6-year English-medium MD programs fully recognized across the EU, UK, USA (after USMLE), India (after FMGE), and worldwide. Graduates receive an EU degree valid in all European countries.",
  "Kyrgyzstan": "Government universities offering low-cost, WHO & NMC-recognized 6-year English-medium MBBS programs. Large Indian communities and dedicated FMGE coaching."
};

const DYNAMIC_SLABS = [...new Set(universityDatabase.map(u => u.slab))].sort((a, b) => {
    const numA = parseInt(a.split('-')[0]);
    const numB = parseInt(b.split('-')[0]);
    return numA - numB;
});

const GREETINGS = ["hi", "hello", "hey", "hii", "hellooo", "hola", "namaste", "namaskaram", "good morning", "good evening", "hlo"];

// --- HELPER FUNCTIONS ---
const normalize = (str) => str.replace(/\s+/g, '').toLowerCase();

// Define country codes for flag lookups
const countryCodes = {
  "Georgia": "ge",
  "Uzbekistan": "uz",
  "Russia": "ru",
  "Egypt": "eg",
  "Armenia": "am",
  "Bulgaria": "bg",
  "Hungary": "hu",
  "Moldova": "md",
  "Kazakhstan": "kz",
  "Kyrgyzstan": "kg",
  "Azerbaijan": "az"
};

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
      <div className={`flex max-w-[95%] md:max-w-[85%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        
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
  const [isAiMode, setIsAiMode] = useState(false); 
  
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
    const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
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

  // --- GEMINI API INTEGRATION ---
  const callGemini = async (prompt) => {
    setIsTyping(true);
    try {
      const apiKey = ""; // Runtime provided
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Details currently unavailable.";
    } catch (e) {
      console.error(e);
      return "I'm having trouble connecting to the university database right now.";
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const text = userInput;
    setUserInput("");
    addUserMessage(text);

    if (isAiMode) {
        const response = await callGemini(`You are Ceeco AI, a friendly and expert study abroad counselor for Ceeco International in Kerala. 
        User Question: "${text}"
        Context: User is interested in MBBS abroad. Current selected country: ${userData.country || "Not selected yet"}.
        Answer briefly and helpfully.`);
        addBotMessage(response);
    } else {
        processUserResponse(text);
    }
  };

  const toggleAiMode = () => {
      if (isAiMode) {
          setIsAiMode(false);
          addBotMessage("Exiting AI Counselor mode. Let's continue with your application.");
      } else {
          setIsAiMode(true);
          addBotMessage("✨ AI Counselor Mode Activated!\n\nI am now connected to my advanced knowledge base. Ask me anything about studying MBBS abroad.");
      }
  };

  // Global Back Button Logic
  const handleBack = () => {
    if (step === 2) {
        setStep(1);
        addBotMessage("Okay, let's start over. May I know your name?");
    } else if (step === 3) { 
        triggerBudgetReset();
    } else if (step === 4) { 
        triggerCountryReset();
    } else if (step === 5) {
        addBotMessage("Going back to the university list...");
        handleCountrySelect(userData.country, userData.budgetSlab);
    } else if (step === 6) {
        setStep(5);
        addBotMessage("Okay, please re-enter your phone number.");
    } else if (step === 7) {
        setStep(6);
        addBotMessage("Going back to city selection.");
    }
  };

  const triggerBudgetReset = () => {
    setStep(2);
    addBotMessage("Sure! Let's update your budget preference.\n\nWhat is your approximate Total Course Budget in INR?");
  };

  const triggerCountryReset = (slabToUse) => {
    const slab = slabToUse || userData.budgetSlab; 
    setStep(3);
    
    const targetSlab = normalize(slab);
    const validCountries = Array.from(new Set(
        universityDatabase
          .filter(u => normalize(u.slab) === targetSlab)
          .map(u => u.country)
    ));

    addBotMessage("Okay, showing countries for your budget again:", 
        <div className="flex flex-wrap gap-2 mt-3">
          {validCountries.map(c => (
            <button 
              key={c} 
              onClick={() => handleCountrySelect(c, slab)}
              className="bg-red-100 border border-red-200 text-red-800 font-bold py-2 px-4 rounded-full shadow-sm hover:bg-red-200 transition-all flex items-center"
            >
              <img 
                src={`https://flagcdn.com/48x36/${countryCodes[c]}.png`} 
                alt={c} 
                className="w-6 h-4 object-cover rounded-sm shadow-sm mr-2"
              /> {c}
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
    const cleanedSlab = slab.trim(); 
    setUserData({ ...userData, budgetSlab: cleanedSlab });
    addUserMessage(cleanedSlab);
    setStep(3);

    const targetSlab = normalize(slab);
    const validCountries = Array.from(new Set(
        universityDatabase
          .filter(u => normalize(u.slab) === targetSlab) 
          .map(u => u.country)
    ));
    
    if (!validCountries || validCountries.length === 0) {
      addBotMessage(
        `I noticed there are no specific universities listed exactly for ${slab} in my current database, but we definitely have options!\n\nPlease try selecting a different budget range or contact our counselor directly.`,
        <div className="mt-3">
             <button 
                onClick={triggerBudgetReset} 
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center border border-gray-300 shadow-sm"
              >
                <Edit2 size={14} className="mr-2" /> Select Different Budget
              </button>
        </div>
      );
    } else {
      addBotMessage("Based on your budget, first select a country:", 
        <div className="flex flex-wrap gap-2 mt-3 w-full">
          {validCountries.map(c => (
            <button 
              key={c} 
              onClick={() => handleCountrySelect(c, cleanedSlab)}
              className="bg-red-100 border border-red-200 text-red-800 font-bold py-2 px-4 rounded-full shadow-sm hover:bg-red-200 transition-all flex items-center mb-2"
            >
              <img 
                src={`https://flagcdn.com/48x36/${countryCodes[c]}.png`} 
                alt={c} 
                className="w-6 h-4 object-cover rounded-sm shadow-sm mr-2"
              /> {c}
            </button>
          ))}
          <div className="w-full pt-2">
            <button 
                onClick={triggerBudgetReset} 
                className="w-full mt-2 bg-gray-100 text-gray-700 py-3 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center border border-gray-300 shadow-sm"
            >
                <Edit2 size={14} className="mr-2" /> Change Budget
            </button>
          </div>
        </div>
      );
    }
  };

  const handleCountrySelect = (country, slab) => {
    setUserData({ ...userData, country: country });
    setStep(4);
    
    const targetSlab = normalize(slab);
    const universities = universityDatabase.filter(u => u.country === country && normalize(u.slab) === targetSlab);
    
    setIsTyping(true);
    setTimeout(() => {
        setIsTyping(false);
        addBotMessage(
            <span className="font-semibold text-gray-800">
               Here are the <span className="text-red-600 font-bold">Top Recommended Universities</span> in {country}:
            </span>, 
            <div className="space-y-4 mt-4 w-full flex flex-col items-center">
                {universities.length > 0 ? universities.map(uni => (
                    <div key={uni.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden mb-3 w-full max-w-sm transform transition-all hover:scale-[1.02]">
                        {/* Header */}
                        <div className="bg-red-50 p-4 text-center border-b border-red-100 relative">
                            <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">{uni.name}</h3>
                            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                                <img 
                                    src={`https://flagcdn.com/48x36/${countryCodes[uni.country]}.png`} 
                                    alt={uni.country} 
                                    className="w-6 h-4 object-cover rounded-sm shadow-sm"
                                />
                                <span className="font-medium uppercase tracking-wide text-xs">{uni.country}</span>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="p-4 grid grid-cols-2 gap-4 text-sm bg-white">
                            <div className="flex flex-col items-center text-center">
                                <GraduationCap className="text-red-500 mb-1" size={20} />
                                <span className="text-[10px] text-gray-400 uppercase font-semibold">Duration</span>
                                <span className="font-bold text-gray-800">{uni.duration} Years</span>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <DollarSign className="text-red-500 mb-1" size={20} />
                                <span className="text-[10px] text-gray-400 uppercase font-semibold">Tuition Fee</span>
                                <span className="font-bold text-gray-800">{uni.fees} {uni.currency}/yr</span>
                            </div>
                            <div className="flex flex-col items-center text-center col-span-2">
                                <Briefcase className="text-red-500 mb-1" size={20} />
                                <span className="text-[10px] text-gray-400 uppercase font-semibold">Medium</span>
                                <span className="font-bold text-gray-800">{uni.medium}</span>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="p-4 pt-0">
                            <button
                                onClick={() => handleSelectUni(uni)}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center"
                            >
                                Get More Details
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="text-center p-4 bg-gray-100 rounded-xl text-gray-500 text-sm w-full">
                        No universities found matching exactly this criteria.
                    </div>
                )}
                
                <button 
                  onClick={() => triggerCountryReset(slab)}
                  className="w-full max-w-sm flex items-center justify-center py-3 text-gray-500 text-sm hover:text-gray-800 font-medium bg-gray-50 rounded-xl mt-2"
                >
                  <RefreshCcw size={14} className="mr-2" /> Search Different Country
                </button>
            </div>
        );
    }, 1000);
  };

  // --- SHOW DESCRIPTION FROM STATIC DATA ---
  const handleSelectUni = (uni) => {
    setUserData({ ...userData, selectedUni: uni });
    setStep(5);
    
    setIsTyping(true);
    
    setTimeout(() => {
        setIsTyping(false);
        // Look up the static description or fall back to shared/generated
        let description = universityDescriptions[uni.name] || SHARED_DESCRIPTIONS[uni.country];
        
        // If still no description (fallback logic), use a safe default
        if (!description) {
            description = `${uni.name} is a prestigious medical university in ${uni.country}. It offers a ${uni.duration}-year ${uni.medium}-medium program recognized by the WHO and NMC.`;
        }

        addBotMessage(description);
        
        // Follow up message after delay
        setTimeout(() => {
            addBotMessage("To check your eligibility and receive the official brochure, please share your **Phone Number**.");
        }, 1500);
    }, 800);
  };

  const handleEducationSelect = (status) => {
    setUserData({ ...userData, education: status });
    addUserMessage(status);
    
    setIsTyping(true);
    setTimeout(() => {
        setIsTyping(false);
        setStep(8);
        addBotMessage(
            "Thank you! 🌟\n\nYou are eligible for **FREE Counseling** from our experts.\n\nOur team will contact you shortly on your number to answer all your doubts regarding certificate value and admission process.\n\nHave a great day! ❤️",
            <div className="mt-3">
               <a 
                 href="https://wa.me/918137878027" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl text-sm font-bold transition-all shadow-sm w-full sm:w-auto"
               >
                 <MessageCircle size={18} /> Chat With US
               </a>
            </div>
        );
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
        
        <div className="flex items-center gap-3">
            <a href="tel:+918137878027" className="bg-white text-red-600 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center hover:bg-red-50 transition-colors">
                <Phone size={14} className="mr-1" /> Call Now
            </a>
            <div className="flex items-center gap-1 bg-red-800 bg-opacity-50 px-2 py-1 rounded text-[10px] font-medium">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
            </div>
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
        {step === 2 && !isAiMode && (
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

        {step === 7 && !isAiMode && (
          <div className="flex flex-wrap gap-2 mb-3 justify-center">
            {["10th", "11th", "12th pursuing", "Neet Preparation"].map(s => (
              <button key={s} onClick={() => handleEducationSelect(s)} 
                className="bg-red-50 text-red-700 border border-red-200 px-3 py-2 rounded-lg text-xs font-medium hover:bg-red-600 hover:text-white transition-all">
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2">
            <div className="flex justify-end">
                <button 
                    onClick={toggleAiMode}
                    className={`text-xs font-bold px-3 py-1 rounded-full flex items-center transition-all ${isAiMode ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600 border border-indigo-200'}`}
                >
                    {isAiMode ? <X size={12} className="mr-1" /> : <Sparkles size={12} className="mr-1" />}
                    {isAiMode ? "Exit AI Chat" : "Ask AI Counselor"}
                </button>
            </div>

            <div className="flex items-center gap-2">
                {step > 1 && step < 8 && step !== 3 && step !== 4 && !isAiMode && (
                    <button onClick={handleBack} className="p-3 text-gray-500 hover:bg-gray-100 rounded-full"><ArrowLeft size={20} /></button>
                )}

                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={isAiMode ? "✨ Ask me anything..." : (step === 5 ? "Enter Phone Number..." : (step === 6 ? "Enter City..." : "Type here..."))}
                    disabled={!isAiMode && (step === 2 || step === 3 || step === 4 || step === 7 || step === 8)} 
                    className={`flex-1 rounded-full px-5 py-3 focus:outline-none focus:ring-2 border-none text-sm transition-all ${isAiMode ? 'bg-indigo-50 focus:ring-indigo-500 text-indigo-900 placeholder-indigo-400' : 'bg-gray-100 text-gray-800 focus:ring-red-500'}`}
                />
                <button 
                    onClick={handleSendMessage}
                    disabled={!userInput.trim()}
                    className={`p-3 rounded-full text-white shadow-lg transition-transform transform active:scale-95 ${userInput.trim() ? (isAiMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-red-600 hover:bg-red-700') : 'bg-gray-300 cursor-not-allowed'}`}
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
        
        <div className="text-center mt-2">
          <p className="text-[10px] text-gray-400">Powered by Ceeco International</p>
        </div>
      </div>
    </div>
  );
}
