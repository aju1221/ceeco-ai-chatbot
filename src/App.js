import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, MapPin, DollarSign, BookOpen, Phone, CheckCircle, ChevronRight, Star, Globe, Award, School, ArrowLeft, RefreshCcw } from 'lucide-react';

// --- MOCK DATA FOR UNIVERSITIES ---
const universityDatabase = {
  "Russia": [
    { id: 'r1', name: "Perm State Medical University", internationalStudents: "1500+", rank: "Top 10 in Russia", fees: "₹ 28 Lakhs (Total)", location: "Perm, Russia" },
    { id: 'r2', name: "Mari State University", internationalStudents: "3000+", rank: "Top 20 in Russia", fees: "₹ 26 Lakhs (Total)", location: "Yoshkar-Ola, Russia" },
    { id: 'r3', name: "Tver State Medical University", internationalStudents: "800+", rank: "Top 30 in Russia", fees: "₹ 18 Lakhs (Total)", location: "Tver, Russia" },
    { id: 'r4', name: "First Moscow State Medical University", internationalStudents: "2500+", rank: "#1 in Russia", fees: "₹ 60 Lakhs (Total)", location: "Moscow, Russia" },
  ],
  "Georgia": [
    { id: 'g1', name: "Tbilisi State Medical University", internationalStudents: "2500+", rank: "#1 in Georgia", fees: "$8000 / year", location: "Tbilisi, Georgia" },
    { id: 'g2', name: "Caucasus University", internationalStudents: "1200+", rank: "Top 5 in Georgia", fees: "$6000 / year", location: "Tbilisi, Georgia" },
    { id: 'g3', name: "East European University", internationalStudents: "900+", rank: "Fastest Growing", fees: "$5000 / year", location: "Tbilisi, Georgia" },
  ],
  "Kazakhstan": [
    { id: 'k1', name: "Semey Medical University", internationalStudents: "1000+", rank: "Top 5 in Kazakhstan", fees: "$3800 / year", location: "Semey, Kazakhstan" },
    { id: 'k2', name: "Al-Farabi Kazakh National University", internationalStudents: "1500+", rank: "Global Top 200", fees: "$4900 / year", location: "Almaty, Kazakhstan" },
  ],
  "Philippines": [
    { id: 'p1', name: "Davao Medical School Foundation", internationalStudents: "2000+ (mostly Indians)", rank: "Top for USMLE", fees: "₹ 22 Lakhs (Total)", location: "Davao, Philippines" },
    { id: 'p2', name: "University of Perpetual Help", internationalStudents: "1800+", rank: "Top Tier", fees: "₹ 20 Lakhs (Total)", location: "Las Piñas, Philippines" },
  ],
  "Uzbekistan": [
    { id: 'u1', name: "Samarkand State Medical University", internationalStudents: "1200+", rank: "Historic Top", fees: "$3000 / year", location: "Samarkand, Uzbekistan" },
  ]
};

// --- HELPER COMPONENTS ---

const TypingIndicator = () => (
  <div className="flex space-x-1 p-2 bg-red-50 rounded-xl rounded-tl-none w-fit items-center">
    <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
    <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
    <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
  </div>
);

const ChatMessage = ({ msg }) => {
  const isBot = msg.sender === 'bot';
  return (
    <div className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'} mb-4 animate-fade-in-up`}>
      <div className={`flex max-w-[85%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        
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
          
          {/* Optional: Render Custom UI inside bubble (like lists) */}
          {msg.customRender}
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function CeecoChatbot() {
  // State
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0); // 0:Greeting, 1:Name, 2:Country, 3:Budget, 4:ShowList, 5:Details, 6:Phone, 7:City, 8:EduStatus, 9:End
  const [userData, setUserData] = useState({
    name: "",
    country: "",
    budget: "",
    selectedUni: null,
    phone: "",
    city: "",
    education: ""
  });
  
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Initial Greeting
  useEffect(() => {
    addBotMessage("Namaskaram! 🙏 Welcome to Ceeco International.\n\nI am Ceeco AI, your personal MBBS study abroad assistant. I'm here to help you find the perfect university that matches your dreams and budget.\n\nMay I know your name, please?");
    setStep(1);
  }, []);

  // --- LOGIC HANDLERS ---

  const addBotMessage = (text, customRender = null) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text, customRender }]);
      setIsTyping(false);
    }, 800 + Math.random() * 500); // Natural delay
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

  // Logic for the global back button
  const handleGlobalGoBack = () => {
    if (step === 3) { // Back from Budget to Country
      setStep(2);
      addBotMessage("Okay, let's choose a different country.");
    } else if (step === 4) { // Back from List to Budget
      setStep(3);
      addBotMessage("Sure, let's adjust your budget preference.");
    } else if (step === 5) { // Back from Details to List
      setStep(4);
      addBotMessage("Going back to the university list. Please select another university.");
    } else if (step === 2) { // Back from Country to Name
      setStep(1);
      addBotMessage("Let's start over. May I know your name?");
    }
  };

  // Logic for specific "Go Back" buttons inside chat flow
  const handleChatGoBack = (targetStep, msg) => {
    setStep(targetStep);
    addBotMessage(msg);
  };

  const processUserResponse = (text) => {
    // Step 1: Name
    if (step === 1) {
      setUserData({ ...userData, name: text });
      addBotMessage(`Nice to meet you, ${text}! 😊\n\nAt Ceeco International, we have helped thousands of students from Kerala reach top medical universities.\n\nWhich country are you planning to study in?`);
      setStep(2);
    }
    // Step 2: Country (Handled by chips, but if typed manually)
    else if (step === 2) {
      // Normalize input roughly
      const c = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      setUserData({ ...userData, country: c });
      askBudget(c);
    }
    // Step 3: Budget (Handled by chips or text)
    else if (step === 3) {
      setUserData({ ...userData, budget: text });
      showUniversityList(userData.country, text);
    }
    // Step 6: Phone
    else if (step === 6) {
      setUserData({ ...userData, phone: text });
      addBotMessage("Thank you! \n\nCould you tell me which city you are from in Kerala? (e.g., Kochi, Calicut, Kannur)");
      setStep(7);
    }
    // Step 7: City
    else if (step === 7) {
      setUserData({ ...userData, city: text });
      addBotMessage("Noted. And finally, what is your current educational status?");
      setStep(8); // Trigger chips for education
    }
  };

  // --- SPECIFIC FLOW FUNCTIONS ---

  const askBudget = (country) => {
    setStep(3);
    addBotMessage(`Great choice! ${country} is a very popular destination for Indian students.\n\nWhat is your approximate budget for the tuition fees (per year or total)?`);
  };

  const showUniversityList = (country, budget) => {
    setStep(4);
    const list = universityDatabase[country] || universityDatabase["Russia"]; 
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addBotMessage(`I've analyzed the best universities in ${country} matching your requirements. \n\nHere are the top recommendations with high certificate value:`, 
        <div className="mt-3 space-y-3 w-full">
          {list.map((uni) => (
            <div key={uni.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-red-700 text-base">{uni.name}</h3>
                  <div className="text-xs text-gray-500 flex items-center mt-1">
                    <MapPin size={12} className="mr-1" /> {uni.location}
                  </div>
                </div>
                <div className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-lg">
                  {uni.rank}
                </div>
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div className="flex items-center">
                  <Globe size={12} className="mr-1 text-blue-500" />
                  <span>Intl. Students: <span className="font-medium text-gray-800">{uni.internationalStudents}</span></span>
                </div>
                <div className="flex items-center">
                  <DollarSign size={12} className="mr-1 text-green-600" />
                  <span>Fees: <span className="font-medium text-gray-800">{uni.fees}</span></span>
                </div>
              </div>

              <button 
                onClick={() => handleSelectUniversity(uni)}
                className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                View Details <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
          ))}
          
          {/* --- ADDED: Explicit Go Back Button for List View --- */}
          <button 
             onClick={() => handleChatGoBack(2, "Okay, let's look for universities in a different country.")}
             className="w-full mt-4 py-3 border border-red-200 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-50 transition-colors flex items-center justify-center"
          >
            <RefreshCcw size={14} className="mr-2" /> Search Different Country
          </button>
        </div>
      );
    }, 1500);
  };

  const handleSelectUniversity = (uni) => {
    setUserData({ ...userData, selectedUni: uni });
    setStep(5);
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'user', text: `Tell me more about ${uni.name}` }]);
      
      setIsTyping(true);
      setTimeout(() => {
         addBotMessage(
            `Let me fetch the latest details for **${uni.name}**... 🔍\n\nfound valid certificate data! ✅\n\n**University Insights:**\n• This university is fully recognized by WHO and NMC (India).\n• The medical certificate is valid globally, allowing you to practice in India, UK, USA, etc. after licensing exams.\n• High quality of education with English medium instruction.\n• Many students from Kerala are already studying here.`,
            <div className="mt-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                    <h4 className="text-sm font-bold text-red-800 mb-1">🎉 Good News!</h4>
                    <p className="text-xs text-red-700">Based on your profile, you are eligible for <strong>FREE Counseling</strong> from our senior experts at Ceeco International.</p>
                </div>
                
                {/* --- ADDED: Explicit Go Back Button for Details View --- */}
                <button 
                  onClick={() => handleChatGoBack(4, "Okay, showing the university list again.")}
                  className="w-full mb-2 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <ArrowLeft size={14} className="mr-1" /> View Other Universities
                </button>
            </div>
         );
         
         // Ask for phone number after a delay, only if they haven't clicked back
         setTimeout(() => {
            setStep(curr => {
               // Check if user is still on step 5 (Details) before advancing
               if(curr === 5) {
                   addBotMessage("To schedule your free session, please share your **WhatsApp Number** 📱.");
                   return 6;
               }
               return curr;
            });
         }, 2500); // Increased delay slightly to let them read and see the back button

      }, 1500);
    }, 500);
  };

  const handleEducationSelect = (status) => {
    setUserData({ ...userData, education: status });
    setMessages(prev => [...prev, { sender: 'user', text: status }]);
    finishChat();
  };

  const finishChat = () => {
    setStep(9);
    setIsTyping(true);
    setTimeout(() => {
      addBotMessage("Thank you so much! 🌟\n\nOur counselor will contact you shortly on your number to guide you further. \n\nDon't worry about the admission process; Ceeco International will handle everything for you. Have a great day! ❤️");
      setIsTyping(false);
    }, 1000);
  };

  // --- UI RENDERERS ---

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-red-700 to-red-600 text-white p-4 shadow-lg flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <div className="bg-white p-1 rounded-full">
             <School className="text-red-600" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wide">Ceeco AI</h1>
            <p className="text-xs text-red-100 opacity-90">Your Study Abroad Partner</p>
          </div>
        </div>
        <div className="text-xs bg-red-800 px-2 py-1 rounded-md bg-opacity-50">
          Online ●
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide pb-32">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} msg={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Interaction Area (Fixed Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        
        {/* Dynamic Chips based on Step */}
        {step === 2 && (
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-2">
            {["Russia", "Georgia", "Kazakhstan", "Philippines", "Uzbekistan", "Egypt"].map(c => (
              <button key={c} onClick={() => { addUserMessage(c); setUserData({...userData, country: c}); askBudget(c); }} 
                className="flex-shrink-0 bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600 hover:text-white transition-all">
                {c}
              </button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-2">
            {["15-20 Lakhs", "20-25 Lakhs", "25-30 Lakhs", "30 Lakhs+"].map(b => (
              <button key={b} onClick={() => { addUserMessage(b); setUserData({...userData, budget: b}); showUniversityList(userData.country, b); }} 
                className="flex-shrink-0 bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600 hover:text-white transition-all">
                {b}
              </button>
            ))}
          </div>
        )}

        {step === 8 && (
           <div className="flex flex-wrap gap-2 mb-2 justify-center">
             {["Plus Two Studying", "Plus Two Completed", "NEET Preparing", "NEET Completed"].map(s => (
               <button key={s} onClick={() => handleEducationSelect(s)} 
                 className="bg-red-50 text-red-700 border border-red-200 px-3 py-2 rounded-lg text-xs font-medium hover:bg-red-600 hover:text-white transition-all">
                 {s}
               </button>
             ))}
           </div>
        )}

        {/* Input Field */}
        <div className="flex items-center gap-2 relative">
          {/* Back Button - only shows if step > 1 and not finished */}
          {step > 1 && step < 9 && (
             <button 
               onClick={handleGlobalGoBack}
               className="p-3 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 shadow-sm transition-all"
               title="Go Back"
             >
               <ArrowLeft size={20} />
             </button>
          )}

          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={step === 6 ? "Enter Phone Number..." : "Type your message..."}
            disabled={step === 4 || step === 8} // Disable typing when strictly selecting
            className="flex-1 bg-gray-100 text-gray-800 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 border-none text-sm md:text-base"
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
          <p className="text-[10px] text-gray-400">Powered by Ceeco International Technology</p>
        </div>
      </div>

    </div>
  );
}
