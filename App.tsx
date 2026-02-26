
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { City, User, Step, View, LostItemReport, MatchResult, Language } from './types';
import { FOUND_ITEMS_DATABASE } from './constants';
import { translations } from './translations';
import { performSemanticMatch } from './services/geminiService';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import SearchSection from './components/SearchSection';
import LostItemForm from './components/LostItemForm';
import ProfileSection from './components/ProfileSection';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import MatchResults from './components/MatchResults';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [step, setStep] = useState<Step>('AUTH');
  const [activeView, setActiveView] = useState<View>('HOME');
  const [user, setUser] = useState<User | null>(null);
  const [selectedCity, setSelectedCity] = useState<City>(City.MECCA);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const t = useMemo(() => translations[lang], [lang]);
  const isRTL = lang === 'ar';

  // Apply theme to document root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'ar' : 'en');
  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const handleVerified = (verifiedUser: User) => {
    setUser(verifiedUser);
    setStep('MAIN');
  };

  const handleReport = async (report: LostItemReport) => {
    setIsSearching(true);
    setShowResults(false);
    try {
      const results = await performSemanticMatch(report, FOUND_ITEMS_DATABASE);
      setMatches(results);
      setShowResults(true);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const resetApp = useCallback(() => {
    setStep('AUTH');
    setUser(null);
    setActiveView('HOME');
    setMatches([]);
    setShowResults(false);
  }, []);

  const renderView = () => {
    if (showResults) {
      return (
        <MatchResults 
          matches={matches} 
          database={FOUND_ITEMS_DATABASE} 
          onBack={() => setShowResults(false)}
          lang={lang}
        />
      );
    }

    switch (activeView) {
      case 'HOME':
        return <Dashboard 
                  user={user!} 
                  city={selectedCity} 
                  onCityToggle={() => setSelectedCity(selectedCity === City.MECCA ? City.MADINA : City.MECCA)}
                  onAction={(view) => setActiveView(view)} 
                  lang={lang}
                />;
      case 'SEARCH':
        return <SearchSection city={selectedCity} onMatch={handleReport} lang={lang} />;
      case 'REPORT':
        return <LostItemForm city={selectedCity} onReport={handleReport} onBack={() => setActiveView('HOME')} lang={lang} />;
      case 'PROFILE':
        return <ProfileSection user={user!} onLogout={resetApp} lang={lang} />;
      default:
        return <Dashboard user={user!} city={selectedCity} onCityToggle={() => {}} onAction={() => {}} lang={lang} />;
    }
  };

  const TopControls = () => (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <button 
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className="p-2 w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700"
      >
        <i className={`fas ${isDarkMode ? 'fa-sun text-amber-400' : 'fa-moon text-indigo-600'}`}></i>
      </button>
      <button 
        onClick={toggleLang}
        className="px-4 py-2 h-10 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm transition-all flex items-center space-x-2 rtl:space-x-reverse shadow-sm border border-slate-200 dark:border-slate-700"
      >
        <i className="fas fa-globe text-emerald-600"></i>
        <span>{lang === 'en' ? 'العربية' : 'English'}</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row overflow-hidden transition-colors duration-300" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {step === 'AUTH' ? (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative">
          <div className="absolute top-6 right-6 rtl:left-6 rtl:right-auto z-50">
            <TopControls />
          </div>
          <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
            <div className="text-center mb-8">
               <div className="inline-block bg-emerald-700 p-4 rounded-3xl shadow-xl mb-4">
                 <i className="fas fa-mosque text-3xl text-white"></i>
               </div>
               <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">{t.appName}</h1>
               <p className="text-slate-500 dark:text-slate-400 font-medium">{t.appSubName}</p>
            </div>
            <AuthForm onVerified={handleVerified} lang={lang} />
          </div>
          <div className="mt-8 text-center text-xs text-slate-400 dark:text-slate-600 uppercase tracking-widest font-semibold">
            Supported by AI Semantic Matching Technology
          </div>
        </div>
      ) : (
        <>
          <Sidebar activeView={activeView} onViewChange={setActiveView} lang={lang} />

          <main className="flex-grow relative overflow-y-auto pb-24 md:pb-0 h-screen custom-scrollbar">
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/50 dark:border-slate-800 px-6 h-16 flex items-center justify-between transition-colors duration-300">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="md:hidden font-bold text-emerald-900 dark:text-emerald-500 tracking-tighter">H.SANAD</span>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${selectedCity === City.MECCA ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'}`}>
                  {selectedCity === City.MECCA ? t.mecca : t.madina}
                </div>
              </div>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <TopControls />
                <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-emerald-700/20">
                  {user?.fullName.charAt(0)}
                </div>
              </div>
            </header>

            <div className="max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderView()}
            </div>

            {activeView !== 'REPORT' && !showResults && (
              <button 
                onClick={() => setActiveView('REPORT')}
                className={`md:hidden fixed bottom-24 ${isRTL ? 'left-6' : 'right-6'} w-14 h-14 bg-emerald-700 text-white rounded-full shadow-2xl flex items-center justify-center text-xl z-50 hover:scale-110 active:scale-95 transition-all shadow-emerald-700/40`}
              >
                <i className="fas fa-plus"></i>
              </button>
            )}

            {isSearching && (
              <div className="fixed inset-0 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md z-[100] flex flex-col items-center justify-center animate-in fade-in duration-300">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 border-4 border-emerald-100 dark:border-emerald-900 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-emerald-700 dark:border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-6">{t.searching}</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm animate-pulse">{t.scanning}</p>
              </div>
            )}
          </main>

          <BottomNav activeView={activeView} onViewChange={setActiveView} lang={lang} />
        </>
      )}
    </div>
  );
};

export default App;
