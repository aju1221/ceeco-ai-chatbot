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

const DYNAMIC_SLABS = [...new Set(universityDatabase.map(u => u.slab))].sort((a, b) => {
  const numA = parseInt(a.split('-')[0]);
  const numB = parseInt(b.split('-')[0]);
  return numA - numB;
});

const GREETINGS = ["hi", "hello", "hey", "hii", "hellooo", "hola", "namaste", "namaskaram", "good morning", "good evening", "hlo"];

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

// --- HELPER FUNCTIONS ---
const normalize = (str) => str.replace(/\s+/g, '').toLowerCase();

// --- STATIC DESCRIPTIONS (UPDATED FROM USER - COMPLETE) ---
const universityDescriptions = {
  // GEORGIA
  "Caucasus University": "Caucasus University, located in Tbilisi, offers a 6-year English-medium MD program recognized by WHO, ECFMG (USA), NMC India, and listed in World Directory of Medical Schools (WDOMS). The American-style curriculum prepares students for USMLE, PLAB, and FMGE with a passing rate above 60% in recent years. Modern simulation labs and affiliated multi-profile hospitals ensure strong clinical exposure from the 3rd year.",
  "Tbilisi State Medical University (American Curriculum)": "The top-ranked and oldest medical university in Georgia (founded 1918). The 6-year US-modeled MD program is recognized worldwide (WHO, ECFMG, NMC, GMC-UK). Graduates are eligible for USMLE (Step 1 & 2 from 1st year), PLAB, FMGE (highest success rate in Georgia), and direct residency in the USA/Canada/Europe. Over 85% Indian students clear FMGE in first attempt.",
  "Tbilisi State Medical University (European Curriculum)": "The same prestigious TSMU with a 6-year European-standard English-medium program. Fully compliant with EU directives; graduates can practice across Europe after licensing exams. Recognized by WHO, NMC India, ECFMG, and WDOMS. Excellent preparation for FMGE, PLAB, and European licensing exams.",
  "Tbilisi Medical Academy": "Founded by renowned physician Petre Shotadze, TMA offers a student-centric 6-year English MD program recognized by WHO, NMC India, ECFMG, and WDOMS. Early clinical exposure from year 2, modern simulation center, and strong FMGE results make it a favorite among Indian students.",
  "University of Georgia": "One of the largest private universities in Georgia offering a British-style 6-year MD program in English. Recognized by WHO, NMC, ECFMG, GMC (UK), and WDOMS. Graduates are eligible for PLAB, USMLE, FMGE, and practice in India, UK, USA, Australia, and Middle East after respective licensing exams.",
  "European University": "A rapidly growing institution in Tbilisi with a 6-year English-medium MD program recognized by WHO, NMC India, ECFMG, and WDOMS. Modern campus, affordable fees, and strong clinical rotations in leading hospitals. High FMGE success rate and increasing popularity among Indian students.",
  "Alte University": "A modern private university offering a high-quality, affordable 6-year English MD program. Recognized by WHO, NMC, ECFMG, and WDOMS. New simulation labs and direct hospital partnerships provide excellent hands-on training. Eligible for FMGE, USMLE, PLAB.",
  "Georgian National University SEU": "One of the largest private universities in Georgia with a well-structured 6-year English-medium MD program. Fully recognized by WHO, NMC India, ECFMG, and WDOMS. Strong focus on research and clinical skills; graduates eligible for FMGE, USMLE, and global practice.",
  "International Black Sea University": "Offers an American-style 6-year English MD program recognized by WHO, NMC, ECFMG, and WDOMS. Multicultural campus and affordable fees with solid clinical training. Graduates can appear for USMLE, FMGE, and other licensing exams worldwide.",
  "East West University": "One of the most budget-friendly yet quality-focused universities in Georgia. 6-year English-medium MD program recognized by WHO, NMC India, ECFMG, and WDOMS. Large Indian student community and excellent FMGE coaching support.",
  
  // UZBEKISTAN
  "Tashkent Medical Academy": "Tashkent Medical Academy (TMA), founded in 1920, is Uzbekistan's oldest government medical university and a top choice for international students pursuing a 6-year English-medium MBBS program. Ranked 13th in Uzbekistan and recognized by WHO, NMC (India), ECFMG, UNESCO, and WDOMS, its degree is valid globally, enabling graduates to sit for FMGE/NExT (India, with high passing rates), USMLE (USA), and PLAB (UK) for practice in India, USA, UK, Australia, and beyond. With modern labs, partnerships like Harvard Medical School, and clinical training in university hospitals, TMA emphasizes practical skills and research, making it ideal for Indian students seeking affordable, high-quality education.",
  "Samarkand State Medical University": "Established in 1930 and restructured in 2022, Samarkand State Medical University (SamSMU) offers a 6-year English-medium MBBS program compliant with international standards, recognized by WHO, NMC (India), PMDC, and WDOMS. Graduates are eligible for FMGE/NExT (India, with strong success rates), USMLE, PLAB, and practice in India, Gulf countries, and worldwide. Ranked 3rd in Uzbekistan, it features modern labs, simulation-based learning, and clinical rotations in affiliated hospitals treating diverse cases, attracting over 1,000 Indian students annually for its multicultural environment and low-cost, high-exposure training.",
  "Bukhara State Medical Institute": "Bukhara State Medical Institute (BSMI), founded in 1990 in the historic city of Bukhara, provides a 6-year English-medium MBBS program recognized by WHO, NMC (India), WDOMS, FAIMER, and ECFMG. Degrees are valid for FMGE/NExT (India, ~47% pass rate), USMLE (USA), PLAB (UK), AMC (Australia), and MCCQE (Canada), supporting global practice. With a curriculum aligned to NMC guidelines, modern infrastructure, and clinical exposure in university hospitals, BSMI is popular among Indian students for its holistic approach, research focus, and affordable fees, fostering skills for international medical careers.",

  // RUSSIA
  "Ivanovo State Medical Academy": "Ivanovo State Medical Academy (ISMA), established in 1930 near Moscow, delivers a 6-year English-medium MD program recognized by WHO, NMC (India), ECFMG, AMC, GMC (UK), and FAIMER. Graduates qualify for FMGE/NExT (India), USMLE, PLAB, and global practice, with strong preparation via modern labs and hospital rotations. Ranked among Russia's top medical schools, ISMA emphasizes clinical skills from year 2, attracting Indian students for its affordable fees, experienced faculty, and 60%+ FMGE success rate.",
  "Kemerovo State Medical University": "Kemerovo State Medical University (KSMU), a leading Siberian institution, offers a 6-year English-medium MD program accredited by WHO, NMC (India), ECFMG, and Russia's Ministry of Health. Degrees enable FMGE/NExT (India), USMLE, PLAB, and worldwide practice, with IELTS/TOEFL for English proficiency. Ranked top 20 in Russia, KSMU provides extensive clinical training in 1,000+ bed hospitals, research focus, and multicultural support, ideal for Indian students seeking quality education in a safe, affordable environment.",
  "Kemerovo State University": "Kemerovo State University (KemSU), with a medical faculty since the 1950s, runs a 6-year English-medium MBBS program recognized by WHO, NMC (India), and Russia's Ministry of Education. Graduates are eligible for FMGE/NExT (India), USMLE, PLAB, and international licensure, with a curriculum meeting NMC guidelines. Ranked top 20 in Russia, KemSU excels in practical training via affiliated hospitals, low fees, and Indian student support, preparing over 8,000 alumni for global careers.",
  "Ural State Medical University": "Ural State Medical University (USMU), founded in 1930 in Yekaterinburg, provides a 6-year English-medium MD program approved by WHO, NMC (India), ECFMG, and Russia's Ministry of Health. Degrees support FMGE/NExT (23% pass rate in 2021), USMLE, PLAB, and global practice. Ranked 967th worldwide, USMU offers early clinical exposure, modern facilities, and NEET-qualified admissions, making it a preferred choice for Indian students aiming for international residency.",
  "Yaroslavl State Medical University": "Yaroslavl State Medical University (YSMU), established in 1944 near Moscow, features a 6-year English-medium MD program recognized by WHO, NMC (India), ECFMG, GMC (UK), and WDOMS. Graduates qualify for FMGE/NExT, USMLE, PLAB, and EU/UK practice without additional hurdles. Ranked highly in Russia, YSMU emphasizes simulation labs and 1,000+ bed hospital rotations, with 500+ faculty supporting Indian students for global licensing success.",
  "Bashkir State Medical University": "Bashkir State Medical University (BSMU), founded in 1932 in Ufa, offers a 6-year English-medium MD program accredited by WHO, NMC (India), ECFMG, and Russia's Ministry of Health. Degrees are valid for FMGE/NExT, USMLE, PLAB, and worldwide practice. Ranked 4th in Russia, BSMU provides advanced labs, university hospitals, and scholarships, hosting 8,000+ students including Indians for research-driven, affordable medical training.",
  "North Ossetian State Medical Academy": "North Ossetian State Medical Academy (NOSMA), established in 1939 in Vladikavkaz, delivers a 6-year English-medium MD program recognized by WHO, NMC (India), and Russia's Ministry of Health. Graduates are eligible for FMGE/NExT, USMLE, PLAB, and global practice. Ranked top in the Caucasus, NOSMA offers modern infrastructure, 52,000+ students from 101 countries, and clinical training in multi-profile hospitals, ideal for Indian aspirants seeking holistic education.",
  "Far Eastern Federal University": "Far Eastern Federal University (FEFU), founded in 1899 in Vladivostok, provides a 6-year English-medium MD program listed in WDOMS and recognized by WHO, NMC (India), and Russia's Ministry of Education. Degrees support FMGE/NExT, USMLE, PLAB, and international careers. Ranked top 5 in Russia, FEFU features state-of-the-art labs, 41,000+ students, and Pacific partnerships, attracting Indians for innovative, affordable medical studies.",
  "Novosibirsk State University": "Novosibirsk State University (NSU), established in 1959 in Siberia's science hub, offers a 6-year English-medium MBBS program recognized by WHO, NMC (India), and Russia's Ministry of Education. Graduates qualify for FMGE/NExT, USMLE, PLAB, and global practice. Ranked top 20 worldwide, NSU emphasizes research, clinical rotations in top hospitals, and TOEFL/IELTS admissions, preparing 8,000+ international students for innovative medical roles.",
  "Crimea Federal University": "Crimea Federal University (CFU), founded in 1918 in Simferopol, runs a 6-year English-medium MD program recognized by WHO, NMC (India), ECFMG, and Russia's Ministry of Health. Despite 2014 sanctions, ECFMG allows USMLE eligibility since 2016; valid for FMGE/NExT, PLAB, and global practice. Ranked top in Crimea, CFU offers massive clinical exposure in 2,000+ bed hospitals, low fees, and Indian support for international careers.",
  "Lobachevsky State University": "Lobachevsky State University (UNN), founded in 1916 in Nizhny Novgorod, provides a 6-year English-medium MD program accredited by WHO, NMC (India), ECFMG, and Russia's Ministry of Science. Degrees enable FMGE/NExT, USMLE, PLAB, and EU practice. Ranked top in Russia, UNN features advanced labs, 40,000+ students, and clinical partnerships, ideal for Indian students seeking research-focused, globally valid medical training.",
  "Omsk State University": "Omsk State University (OSMU), established in 1920, offers a 6-year English-medium MD program (first 3 years English, then bilingual) recognized by WHO, NMC (India), and Russia's Ministry of Health. Graduates qualify for FMGE/NExT, USMLE, PLAB, and worldwide practice. Ranked 210th in Russia, OSMU provides 2,000+ bed hospitals for rotations, affordable fees, and Indian mess, preparing students for global licensure.",
  "Tver State Medical University": "Tver State Medical University (TSMU), founded in 1902, delivers a 6-year English-medium MD program approved by WHO, NMC (India), ECFMG, FAIMER, and Russia's Ministry of Health. Degrees support FMGE/NExT (19.3% pass rate), USMLE, PLAB, and global practice. Ranked top in Russia, TSMU offers simulation centers, 1,000+ bed hospitals, and NEET admissions, with 24% FMGE success for Indian graduates.",

  // EGYPT
  "Cairo University": "Cairo University, Egypt's oldest (1908), offers a 7-year English-medium MBBS (5 years + 2-year internship) recognized by WHO, NMC (India), ECFMG, and Arab Board. Graduates qualify for FMGE/NExT, USMLE, PLAB, and worldwide practice, with massive clinical exposure in university hospitals serving millions. Ranked top in Egypt, it attracts 800+ Indian students for affordable fees and global validity.",
  "Mansoura University": "Mansoura University, founded in 1972, provides a 7-year English-medium MBBS (5 years + 2-year internship) via its Mansoura-Manchester Program, recognized by WHO, NMC (India), and ECFMG. Degrees enable FMGE/NExT, USMLE, PLAB, and EU/UK practice. Ranked top 5 in Egypt, it features UK-aligned curriculum, advanced labs, and 900+ faculty, ideal for Indian students seeking high FMGE rates.",
  "Ain Shams University": "Ain Shams University, established in 1950 in Cairo, runs a 7-year English-medium MBBS (5 years + 2-year internship) recognized by WHO, NMC (India), ECFMG, and Arab Board. Graduates are eligible for FMGE/NExT, USMLE, PLAB, and global practice. Ranked 3rd in Egypt, it offers modern facilities, research centers, and clinical training in top hospitals, with strong Indian student support.",
  "Assiut University": "Assiut University, founded in 1957, delivers a 7-year English-medium MBBS (5 years + 2-year internship) accredited by WHO, NMC (India), NAQAAE, and WDOMS. Degrees support FMGE/NExT, USMLE, PLAB, and international careers. Ranked top in Upper Egypt, it provides hands-on training in government hospitals and NEET-qualified admissions for Indian students.",
  "Alexandria University": "Alexandria University, established in 1942, offers a 7-year English-medium MBBS (5 years + 2-year internship) recognized by WHO, NMC (India), ECFMG, and Arab Board. Graduates qualify for FMGE/NExT, USMLE, PLAB, and global practice. Ranked 2nd in Egypt, it features coastal location, advanced labs, and 120,000+ students, attracting Indians for quality education and cultural exposure.",
  "Nahda University": "Nahda University (NUB), founded in 2006 in Beni Suef, provides a 7-year English-medium MBBS (5 years + 2-year internship) recognized by WHO, NMC (India), and Egypt's Supreme Council. Degrees enable FMGE/NExT, USMLE, PLAB, and worldwide practice. With modern infrastructure, university hospitals, and Indian hostels, NUB is affordable and student-focused for international aspirants.",

  // ARMENIA
  "University of Traditional Medicine": "University of Traditional Medicine (UTM), founded in 1991 in Yerevan, offers a 6-year English-medium MD program blending allopathic and traditional medicine, recognized by WHO, NMC (India), and WDOMS. Graduates qualify for FMGE/NExT, USMLE, PLAB, and global practice. With urban campus, research focus, and clinical rotations, UTM supports 1,000+ international students, including Indians, for holistic, affordable training.",

  // BULGARIA
  "Varna Medical University": "Varna Medical University (MU-Varna), established in 1961, provides a 6-year English-medium MD program compliant with EU Directive 2005/36/EC, recognized by WHO, NMC (India), ECFMG, GMC (UK), and WDOMS. Degrees allow direct EU/UK practice, plus FMGE/NExT, USMLE; valid worldwide. Ranked top in Bulgaria, it offers 50+ countries' students modern labs and 1,000+ bed hospitals.",
  "Medical University of Plovdiv": "Medical University of Plovdiv, founded in 1945, runs a 6-year English-medium MD program recognized by WHO, NMC (India), ECFMG, and EU bodies. Graduates qualify for FMGE/NExT, USMLE, PLAB, and EU practice. Ranked highly in Bulgaria, it features ECTS credits, clinical rotations in 2,000+ bed hospitals, and NEET admissions for 600+ international students.",
  "Medical University of Sofia": "Medical University of Sofia, established in 1917, offers a 6-year English-medium MD program accredited by WHO, NMC (India), ECFMG, and Bulgaria's NEAA. Degrees support FMGE/NExT, USMLE, PLAB, and EU/UK practice. Oldest in Bulgaria, it provides Erasmus+ exchanges, advanced facilities, and 4 faculties for global careers.",
  "Pleven State Medical University": "Pleven Medical University, founded in 1974, delivers a 6-year English-medium MD program recognized by WHO, NMC (India), ECFMG, and GMC (UK). Graduates are eligible for FMGE/NExT, USMLE, PLAB, and EU practice without extras. Ranked top in Bulgaria, it pioneered English programs, with 1,000+ bed hospitals and 6,000+ alumni worldwide.",
  "Trakia University": "Trakia University, established in 1995 in Stara Zagora, provides a 6-year English-medium MD program recognized by WHO, NMC (India), and EU standards. Degrees enable FMGE/NExT, USMLE, PLAB, and global practice. With 600+ medical students, modern clinics, and multicultural support, it's affordable for Indians seeking EU-valid training.",

  // HUNGARY
  "University of Debrecen": "University of Debrecen, founded in 1538, offers a 6-year English-medium MD program recognized by WHO, ECFMG, GMC (UK), NMC (India), and WFME (valid to 2030). Graduates qualify for USMLE, PLAB (exempt for UK), FMGE/NExT, and direct EU/USA residency. Ranked 574th globally, it features integrated Kaplan coaching, research labs, and 22 departments for 4,000+ international students.",

  // MOLDOVA
  "Nicolae Testemitanu State University": "Nicolae Testemitanu State University, founded in 1945, provides a 6-year English-medium MD program recognized by WHO, NMC (India), ECFMG, and EU countries. Degrees support FMGE/NExT, USMLE, PLAB, and regional practice. Moldova's top medical school, it offers low fees, clinical rotations, and 5 faculties for Indian students seeking Eastern European education.",

  // KAZAKHSTAN
  "Caspian International School of Medicine": "Caspian International School of Medicine (CISM), established in 1992 in Almaty, offers a 6-year English-medium MBBS program recognized by WHO, NMC (India), and WDOMS. Graduates qualify for FMGE/NExT (27.78% pass rate), USMLE, PLAB, and global practice. Ranked 48th in Kazakhstan, it provides FMGE coaching, modern labs, and 1,000+ Indian students for affordable, practical training.",

  // KYRGYZSTAN
  "Jalal-Abad International University": "Jalal-Abad International University (JAIU), founded in 1993, runs a 6-year English-medium MBBS program recognized by WHO, NMC (India), WDOMS, and FAIMER. Degrees enable FMGE/NExT, USMLE, PLAB, and worldwide practice. With 4,000+ international students, Indian mess, and hospital affiliations, JAIU is budget-friendly for Indians.",
  "Jalal-Abad State University": "Jalal-Abad State University (JaSU), established in 1993, provides a 6-year English-medium MD program approved by WHO, NMC (India), and WDOMS. Graduates qualify for FMGE/NExT, USMLE, PLAB, and global careers. Ranked top in Kyrgyzstan, JaSU offers low fees, clinical rotations, and 4,300+ Indian students in a safe, multicultural setting.",
  "Osh State Medical University": "Osh State Medical University (OSMU), founded in 1951, delivers a 6-year English-medium MBBS program recognized by WHO, NMC (India), FAIMER, and ECFMG. Degrees support FMGE/NExT, USMLE, PLAB, and international practice. Ranked top in Kyrgyzstan, OSMU features 20+ faculties, 1,000+ bed hospitals, and FMGE prep for 4,000+ Indian students.",

  // AZERBAIJAN
  "Azerbaijan Medical University": "Azerbaijan Medical University (AMU), founded in 1930 in Baku, offers a 6-year English-medium MBBS program recognized by WHO, NMC (India), ECFMG, and global bodies. Graduates qualify for FMGE/NExT, USMLE, PLAB, and practice in 21+ countries. Ranked top in Azerbaijan, AMU hosts 1,200+ internationals from 21 countries, with modern labs and cultural support for Indian students."
};

const SHARED_DESCRIPTIONS = {
  "Uzbekistan": "Government universities offering highly affordable 6-year English-medium MBBS programs. Recognized by WHO, NMC India, PMDC, and WDMS. Graduates eligible for FMGE, USMLE, PLAB, and practice in India, Gulf countries, and worldwide. Very high FMGE passing percentage.",
  "Russia": "Prestigious Russian government medical universities offering 6-year English-medium MD programs. Recognized by WHO, NMC India, ECFMG, and WDMS. Graduates can practice in India (after FMGE), USA (USMLE), UK (PLAB), Australia, and Europe. Strong clinical training in large university hospitals and excellent FMGE results.",
  "Egypt": "Among the oldest and most reputed medical universities in the Middle East. 7-year English-medium programs (including internship) recognized by WHO, NMC India, ECFMG, and Arab Board. Massive patient flow ensures unmatched clinical exposure. Graduates eligible for FMGE, USMLE, PLAB, and practice worldwide.",
  "Bulgaria": "Top European medical universities offering 6-year English-medium MD programs fully recognized across the EU, UK, USA (after USMLE), India (after FMGE), and worldwide. Graduates receive an EU degree valid in all European countries.",
  "Kyrgyzstan": "Government universities offering low-cost, WHO & NMC-recognized 6-year English-medium MBBS programs. Large Indian communities and dedicated FMGE coaching."
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
          {/* Check if msg.text is a string to apply whitespace styling, otherwise render as is */}
          {msg.text && (
            typeof msg.text === 'string' 
              ? <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>
              : <div className="leading-relaxed">{msg.text}</div>
          )}
          {msg.customRender}
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
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
    education: "",
    userType: "" // 'student' or 'parent'
  });
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isTyping]);

  useEffect(() => {
    addBotMessage(
      "Namaskaram! 🙏 Welcome to Ceeco International.\n\nI am Ceeco AI, your personal MBBS study abroad assistant. I'm here to help you find the perfect university.\n\nOne quick question before we start: Are you a parent or a student?",
      <div className="flex flex-wrap gap-2 mt-3">
         <button 
           onClick={() => handleUserTypeSelect('student')} 
           className="bg-white border border-red-200 text-red-700 font-semibold py-2 px-4 rounded-lg text-sm hover:bg-red-50 hover:border-red-400 transition-all flex-grow"
         >
           I am a Student
         </button>
         <button 
           onClick={() => handleUserTypeSelect('parent')} 
           className="bg-white border border-red-200 text-red-700 font-semibold py-2 px-4 rounded-lg text-sm hover:bg-red-50 hover:border-red-400 transition-all flex-grow"
         >
           I am a Parent
         </button>
      </div>
    );
    setStep(0); // Step 0 is now Role Selection
  }, []);

  // --- GOOGLE SHEETS SUBMISSION (CORS-FIXED: text/plain - WORKS ON VERCEL + WORDPRESS) ---
  // --- FINAL SUBMIT TO GOOGLE SHEETS — ALL DATA SAVES 100% ---
  const submitToGoogleSheets = async () => {
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxIyN9CX3Wj3ax4DNjYkCO3mudxBXCyI61lh4vuxD6c6zX7wdDatj4gYvdtc0K8nV3b/exec";

    const payload = {
        name: userData.name?.trim() || "Not Provided",
        phone: userData.phone?.trim() || "Not Provided",
        city: userData.city?.trim() || "Not Provided",
        education: userData.education?.trim() || "Not Selected",
        budgetSlab: userData.budgetSlab?.trim() || "Not Selected",
        country: userData.country?.trim() || "Not Selected",
        university: userData.selectedUni?.name?.trim() || "Not Selected",
        userType: userData.userType?.trim() || "Not Selected"
    };

    console.log("SENDING TO SHEET:", payload);  // ← Check this in console

    try {
        const response = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log("ALL DATA SAVED SUCCESSFULLY!");
        } else {
            console.error("Save failed:", await response.text());
        }
    } catch (err) {
        console.error("Network error:", err);
    }
  };

  // Trigger submission when step reaches 9 (Final Step)
  useEffect(() => {
      if (step === 9) {
          submitToGoogleSheets();
      }
  }, [step]);

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

  // Global Back Button Logic
  const handleBack = () => {
    if (step === 1) {
        // Back from Name -> Role (Step 0)
        setStep(0);
        setMessages([]); // Clear messages to restart effectively or just add the role question again
        addBotMessage(
          "Let's go back. Are you a parent or a student?",
          <div className="flex flex-wrap gap-2 mt-3">
             <button onClick={() => handleUserTypeSelect('student')} className="bg-white border border-red-200 text-red-700 font-semibold py-2 px-4 rounded-lg text-sm hover:bg-red-50 hover:border-red-400 transition-all flex-grow">I am a Student</button>
             <button onClick={() => handleUserTypeSelect('parent')} className="bg-white border border-red-200 text-red-700 font-semibold py-2 px-4 rounded-lg text-sm hover:bg-red-50 hover:border-red-400 transition-all flex-grow">I am a Parent</button>
          </div>
        );
    } else if (step === 2) {
        // Back from Budget -> Name
        setStep(1);
        addBotMessage("Okay, let's re-enter your name. May I know your name?");
    } else if (step === 3) { 
        triggerBudgetReset();
    } else if (step === 4) { 
        triggerCountryReset();
    } else if (step === 5) {
        addBotMessage("Going back to the university list...");
        handleCountrySelect(userData.country, userData.budgetSlab, true); // Added true to avoid re-adding country message
    } else if (step === 6) {
        setStep(5);
        addBotMessage("Okay, please re-enter your phone number.");
    } else if (step === 7) {
        setStep(6);
        addBotMessage("Going back to city selection.");
    } else if (step === 9) { // Final Step -> Education
        setStep(7);
        addBotMessage("Okay, please re-select your educational status.");
    }
  };

  const triggerBudgetReset = () => {
    setStep(2);
    addBotMessage("Sure! Let's update your budget preference.\n\nWhat is your approximate Total Course Budget in INR?",
      <div className="flex flex-wrap gap-2 mt-3">
           {DYNAMIC_SLABS.map((slab) => (
               <button 
                 key={slab}
                 onClick={() => handleBudgetSelect(slab)} 
                 className="bg-white border border-red-200 text-red-700 font-semibold py-2 px-4 rounded-full shadow-sm hover:bg-red-50 hover:border-red-400 transition-all text-sm mb-1"
               >
                 {slab}
               </button>
           ))}
      </div>
    );
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

    // STEP 0: Role Selection (Handled by buttons, text input is disabled/ignored here)
    if (step === 0) {
        addBotMessage("Please select whether you are a Student or a Parent using the buttons above to proceed.");
        return;
    }

    // STEP 1: Name
    if (step === 1) {
      if (GREETINGS.includes(lowerText)) {
        addBotMessage("Hello! 👋 Please tell me your actual name so I can address you properly.");
        return;
      }
      setUserData(prev => ({ ...prev, name: text }));
      setStep(2);
      addBotMessage(
        `Nice to meet you, ${text}! 😊\n\nPlease select your total tuition fee budget in INR`,
        <div className="flex flex-wrap gap-2 mt-3">
             {DYNAMIC_SLABS.map((slab) => (
                 <button 
                   key={slab}
                   onClick={() => handleBudgetSelect(slab)} 
                   className="bg-white border border-red-200 text-red-700 font-semibold py-2 px-4 rounded-full shadow-sm hover:bg-red-50 hover:border-red-400 transition-all text-sm mb-1"
                 >
                   {slab}
                 </button>
             ))}
        </div>
      );
      return;
    }

    if (step === 2) {
       addBotMessage("Please select one of the budget slabs below for accurate university results.");
    }

    // STEP 5: Phone Number
    if (step === 5) {
      const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
      if (!phoneRegex.test(text.replace(/\s/g, ''))) {
        addBotMessage("❌ That doesn't look like a valid phone number.\n\nPlease share a valid 10-digit mobile number or include your country code.");
        return;
      }
      setUserData(prev => ({ ...prev, phone: text }));
      setStep(6);
      addBotMessage("Thank you! ✅\n\nWhich city are you currently located in?");
      return;
    }

    // STEP 6: City
    if (step === 6) {
      setUserData(prev => ({ ...prev, city: text }));
      setStep(7);
      // STEP 7: Education Status (Show buttons)
      addBotMessage(
          "Noted. And finally, what is your current educational status?",
          <div className="flex flex-wrap gap-2 mt-3">
            {["10th", "11th", "12th pursuing", "Neet Preparation"].map(s => (
              <button key={s} onClick={() => handleEducationSelect(s)} 
                className="bg-red-50 text-red-700 border border-red-200 px-3 py-2 rounded-lg text-xs font-medium hover:bg-red-600 hover:text-white transition-all flex-grow">
                {s}
              </button>
            ))}
          </div>
      );
      return;
    }
  };

  const handleUserTypeSelect = (type) => {
      setUserData(prev => ({ ...prev, userType: type }));
      addUserMessage(type === 'student' ? "I am a Student" : "I am a Parent");
      setIsTyping(true);
      setTimeout(() => {
          setIsTyping(false);
          setStep(1);
          addBotMessage("Great! May I know your name, please?");
      }, 600);
  };

  const handleBudgetSelect = (slab) => {
    const cleanedSlab = slab.trim(); 
    setUserData(prev => ({ ...prev, budgetSlab: cleanedSlab }));
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
      addBotMessage("These are the destinations based on your budget. Please select a country:", 
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

  const handleCountrySelect = (country, slab, isBackAction = false) => {
    setUserData(prev => ({ ...prev, country: country }));
    
    // Only add user message if this is NOT a back navigation
    if (!isBackAction) {
        addUserMessage(country);
    }

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

                        {/* Details Grid (Total Budget Removed) */}
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
    // UPDATED: Use functional state update to preserve existing data (Name, Country, Budget)
    setUserData(prev => ({ ...prev, selectedUni: uni }));
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
    // UPDATED: Use functional state update to preserve existing data (City, Phone, etc.)
    setUserData(prev => ({ ...prev, education: status }));
    addUserMessage(status);
    
    setIsTyping(true);
    setTimeout(() => {
        setIsTyping(false);
        setStep(9); // End
        addBotMessage(
            <div className="space-y-2">
              <p>Thank you! 🌟</p>
              <p>You are eligible for **FREE Counseling** from our experts.</p>
              <p>Our team will contact you shortly on your number to answer all your doubts regarding the admission process.</p>
              <p className="font-bold text-red-600 mt-4 text-lg animate-pulse">skip the waiting and contact us now!!</p>
              <p>Have a great day! ❤️</p>
            </div>,
            <div className="mt-4">
               <a 
                 href="https://wa.me/918137878027" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3 px-6 rounded-xl text-base font-bold transition-all shadow-md w-full sm:w-auto transform hover:scale-105"
               >
                 <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6" /> 
                 Whatsapp
               </a>
            </div>
        );
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      <style>{`
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.4s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
      <header className="bg-gradient-to-r from-red-700 to-red-600 text-white p-4 shadow-lg flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <div className="bg-white p-1 rounded-full">
             {/* Using uploaded logo if available, fallback to icon */}
             <img src="https://ceecointernational.com/wp-content/uploads/2025/11/cecco.png" alt="Ceeco Logo" className="w-8 h-8 object-contain" onError={(e) => {e.target.onerror = null; e.target.style.display='none'; e.target.nextSibling.style.display='block'}} />
             <School className="text-red-600 hidden" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wide">Ceeco AI</h1>
            <p className="text-xs text-red-100 opacity-90">MBBS Study Abroad Expert</p>
          </div>
        </div>
        
        {/* Call Button & Status */}
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
        
        <div className="flex items-center gap-2">
           {step > 0 && step < 9 && step !== 3 && step !== 4 && step !== 7 && step !== 8 && (
             <button onClick={handleBack} className="p-3 text-gray-500 hover:bg-gray-100 rounded-full"><ArrowLeft size={20} /></button>
           )}

          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={step === 5 ? "Enter Phone Number..." : (step === 6 ? "Enter City..." : "Type here...")}
            disabled={step === 0 || step === 2 || step === 3 || step === 4 || step === 7 || step === 8 || step === 9} 
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
