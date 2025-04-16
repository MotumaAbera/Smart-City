import { createContext, useContext, useState, useEffect } from 'react';

// Define translations for the website
const translations = {
  en: {
    // Metadata
    websiteName: "Boku Shanan",
    subTitle: "Sub-City Administration",
    
    // Header
    home: "Home",
    aboutUs: "About Us",
    services: "Services",
    news: "News",
    resources: "Resources",
    tourism: "Tourism",
    contact: "Contact",
    staffPortal: "Staff Portal",
    language: "Language",
    documents: "Documents",
    
    // About section
    aboutTitle: "About Boku Shanan Sub-City",
    aboutDescription: "Discover our vision, mission, leadership, and the transformative initiatives that are shaping our community's future.",
    vision: "Vision",
    mission: "Mission",
    visionText: "To become a model sub-city with transparent, accountable, and efficient governance that empowers citizens and promotes sustainable development.",
    missionText: "We are committed to providing accessible, reliable, and effective public services through innovative digital solutions and citizen engagement, ensuring inclusive growth and improved quality of life for all residents.",
    learnMore: "Learn More About Us",
    ourLeadership: "Our Leadership",
    viewProfile: "View Profile",
    viewAllLeadership: "View All Leadership",
    
    // Services section
    servicesTitle: "Our Services",
    servicesDescription: "Explore the range of services we provide to support our community and improve quality of life for all residents.",
    viewService: "View Service",
    viewAllServices: "View All Services",
    
    // News section
    newsTitle: "News & Announcements",
    newsDescription: "Stay updated with the latest news, events, and announcements from Boku Shanan Sub-City Administration.",
    readMore: "Read More",
    viewAllNews: "View All News",
    
    // Tourism section
    tourismTitle: "Tourism & Cultural Heritage",
    tourismDescription: "Discover the rich cultural heritage, historical sites, and natural beauty of Boku Shanan Sub-City.",
    exploreMore: "Explore More",
    viewAllAttractions: "View All Attractions",
    
    // Project section
    projects: "Projects",
    roadConstruction: "Road Construction",
    waterSupply: "Water Supply",
    schoolBuildings: "School Buildings",
    communityCenters: "Community Centers",
    greenSpaces: "Green Spaces",
    
    // Contact section
    contactTitle: "Contact Us",
    contactDescription: "Get in touch with us for any inquiries, feedback, or assistance you may need.",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    send: "Send Message",
    address: "Address",
    phone: "Phone",
    emailAddress: "Email",
    officeHours: "Office Hours",
    
    // Footer
    quickLinks: "Quick Links",
    governmentServices: "Government Services",
    contactInformation: "Contact Information",
    allRightsReserved: "All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    accessibility: "Accessibility",
    sitemap: "Sitemap",
  },
  am: {
    // Header
    home: "መነሻ",
    aboutUs: "ስለ እኛ",
    services: "አገልግሎቶች",
    news: "ዜና",
    resources: "ሀብቶች",
    tourism: "ቱሪዝም",
    contact: "ያግኙን",
    staffPortal: "የሰራተኞች ፖርታል",
    language: "ቋንቋ",
    documents: "ሃብቶች",
    
    // About section
    aboutTitle: "ስለ ቦኩ ሻናን ክፍለ ከተማ",
    aboutDescription: "የእኛን ራዕይ፣ ተልዕኮ፣ አመራር እና የማህበረሰባችንን መጻኢ የሚቀርጹ ለውጥ አምጪ ተባባሪዎችን ይወቁ።",
    vision: "ራዕይ",
    mission: "ተልዕኮ",
    visionText: "ግልጽ፣ ተጠያቂ እና ውጤታማ አስተዳደር ባላት፣ ዜጎችን የምታበረታታ እና ዘላቂ ልማትን የምታሳድግ ሞዴል ክፍለ ከተማ መሆን።",
    missionText: "ለሁሉም ነዋሪዎች አካታች ዕድገትና የተሻለ የኑሮ ጥራት ለማረጋገጥ፣ ተደራሽ፣ አስተማማኝ እና ውጤታማ የሕዝብ አገልግሎቶችን በአዳዲስ ዲጂታል መፍትሄዎችና በዜጎች ተሳትፎ ለመስጠት ቁርጠኞች ነን።",
    learnMore: "ተጨማሪ ይወቁ",
    ourLeadership: "የእኛ አመራር",
    viewProfile: "መገለጫውን ይመልከቱ",
    viewAllLeadership: "ሁሉንም አመራሮች ይመልከቱ",
    
    // Services section
    servicesTitle: "አገልግሎቶቻችን",
    servicesDescription: "ማህበረሰባችንን ለመደገፍ እና ለሁሉም ነዋሪዎች የኑሮ ጥራትን ለማሻሻል የምናቀርባቸውን አገልግሎቶች ይመልከቱ።",
    viewService: "አገልግሎቱን ይመልከቱ",
    viewAllServices: "ሁሉንም አገልግሎቶች ይመልከቱ",
    
    // News section
    newsTitle: "ዜናዎች እና ማስታወቂያዎች",
    newsDescription: "ከቦኩ ሻናን ክፍለ ከተማ አስተዳደር የቅርብ ጊዜ ዜናዎችን፣ ዝግጅቶችን እና ማስታወቂያዎችን ይከታተሉ።",
    readMore: "ተጨማሪ ያንብቡ",
    viewAllNews: "ሁሉንም ዜናዎች ይመልከቱ",
    
    // Project section
    projects: "ፕሮጀክቶች",
    roadConstruction: "የመንገድ ሥራዎች",
    waterSupply: "የውሃ አቅርቦት",
    schoolBuildings: "የትምህርት ቤቶች",
    communityCenters: "የማህበረሰብ ማዕከላት",
    greenSpaces: "አረንጓዴ ቦታዎች",
    
    // Tourism section
    tourismTitle: "ቱሪዝም እና ባህላዊ ቅርስ",
    tourismDescription: "የቦኩ ሻናን ክፍለ ከተማን ሀብታም የባህል ቅርስ፣ ታሪካዊ ቦታዎች እና የተፈጥሮ ውበት ይመልከቱ።",
    exploreMore: "ተጨማሪ ይመልከቱ",
    viewAllAttractions: "ሁሉንም መስህቦች ይመልከቱ",
    
    // Contact section
    contactTitle: "ያግኙን",
    contactDescription: "ለማንኛውም ጥያቄዎች፣ አስተያየቶች ወይም እርዳታ ከእኛ ጋር ይገናኙ።",
    name: "ስም",
    email: "ኢሜይል",
    subject: "ርዕሰ ጉዳይ",
    message: "መልዕክት",
    send: "መልዕክት ይላኩ",
    address: "አድራሻ",
    phone: "ስልክ",
    emailAddress: "ኢሜይል አድራሻ",
    officeHours: "የቢሮ ሰዓታት",
    
    // Footer
    quickLinks: "ፈጣን ማስፈንጠሪያዎች",
    governmentServices: "የመንግስት አገልግሎቶች",
    contactInformation: "የመገኛ መረጃ",
    allRightsReserved: "መብቱ በሕግ የተጠበቀ ነው።",
    privacyPolicy: "የግል መብት ፖሊሲ",
    termsOfService: "የአገልግሎት ውሎች",
    accessibility: "ተደራሽነት",
    sitemap: "የሳይት ካርታ",
  },
  or: {
    // Metadata
    websiteName: "Bokkuu Shanan",
    subTitle: "Magaalaa Adaamaattii Kutaa Magaalaa",
    
    // Header
    home: "Seensa",
    aboutUs: "Waa'ee Keenya",
    services: "Tajaajila",
    news: "Oduu",
    resources: "Qabeenya",
    tourism: "Turizimii",
    contact: "Quunnamtii",
    staffPortal: "Portaalii Hojjattootaa",
    language: "Afaan",
    
    // About section
    aboutTitle: "Waa'ee Bulchiinsa Magaalaa Adaamaa Kutaa Magaalaa Bokkuu Shanan",
    aboutDescription: "Mul'ata keenya, ergama, hogganummaa, fi tarsiimoo gara fuulduraatti hawaasa keenya ijaaruu baraa.",
    vision: "Mul'ata",
    mission: "Ergama",
    visionText: "Kutaa Magaalaa haala ifaa, itti gaafatamamummaa qabu, fi bulchiinsa gaarii qabuun lammiilee dandeessisu fi misooma dhaabbataa jajjabeessu ta'uu.",
    missionText: "Tajaajila hawaasaa wal qixa ta'e, amanamaa, fi bu'a qabeessa kanneen furmaata dijitaalaa fi hirmaannaa lammiitiin kennamu itti gaafatamummaadhaan kennuuf kutannoo qabna.",
    learnMore: "Waa'ee Keenya Caalaatti Baradhu",
    ourLeadership: "Hoggantoota Keenya",
    viewProfile: "Piroofaayilii Ilaali",
    viewAllLeadership: "Hoggantoota Hunda Ilaali",
    
    // Services section
    servicesTitle: "Tajaajilawwan Keenya",
    servicesDescription: "Tajaajilawwan hawaasa keenyaaf kennu fi qulqullina jireenya jiraattota hunda fooyyessuu keenya ilaali.",
    viewService: "Tajaajila Ilaali",
    viewAllServices: "Tajaajilawwan Hunda Ilaali",
    
    // News section
    newsTitle: "Oduu fi Beeksisawwan",
    newsDescription: "Oduu, waan dhufaa jiru, fi beeksisawwan haaraa Bulchiinsa Magaalattii Xiqqoo Boku Shanan irraa hordofi.",
    readMore: "Caalaatti Dubbisi",
    viewAllNews: "Oduu Hunda Ilaali",
    
    // Project section
    projects: "Pirojektiiwwan",
    roadConstruction: "Ijaarsa Daandii",
    waterSupply: "Saffisa Bishaanii",
    schoolBuildings: "Mana Barnootaa",
    communityCenters: "Garee Hawaasaa",
    greenSpaces: "Bakki Magariisaa",
    
    // Tourism section
    tourismTitle: "Turizimii fi Aadaa Dhaala",
    tourismDescription: "Dhaala aadaa, bakka seenaa, fi bareedina uumamaa Magaalattii Xiqqoo Boku Shanan keessatti argamu ilaali.",
    exploreMore: "Caalaatti Sakatta'i",
    viewAllAttractions: "Hawwata Hunda Ilaali",
    
    // Contact section
    contactTitle: "Nu Quunnamaa",
    contactDescription: "Gaaffii, yaada, ykn gargaarsa barbaaddan kamiyyuu yoo qabaattan nu quunnamaa.",
    name: "Maqaa",
    email: "Imeelii",
    subject: "Mata Duree",
    message: "Ergaa",
    send: "Ergaa Ergi",
    address: "Teessoo",
    phone: "Bilbila",
    emailAddress: "Teessoo Imeelii",
    officeHours: "Sa'aatii Waajjiraa",
    
    // Footer
    quickLinks: "Geessituu Dafaa",
    governmentServices: "Tajaajilawwan Mootummaa",
    contactInformation: "Odeeffannoo Quunnamtii",
    allRightsReserved: "Mirgi hundi seeraan kan eegame.",
    privacyPolicy: "Imaammata Dhuunfaa",
    termsOfService: "Haala Tajaajilaa",
    accessibility: "Argamummaa",
    sitemap: "Kaartaa Marsariitii",
  }
};

// Create a context for language
const LanguageContext = createContext();

// Create a provider component
export function LanguageProvider({ children }) {
  // Get initial language preference from localStorage or use English
  const getInitialLanguage = () => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      return savedLanguage || 'en';
    }
    return 'en';
  };

  const [language, setLanguage] = useState(getInitialLanguage);

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Update HTML lang attribute
    document.documentElement.lang = language;
    
    // Update direction for RTL languages if needed
    // Amharic is not RTL, but if you add Arabic or Hebrew in future, uncomment this
    // document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Function to change language
  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  // Function to get a translated string
  const t = (key) => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    // Fallback to English if translation not found
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    // Return the key itself if no translation found
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}