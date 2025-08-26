import 'src/global.css';

import { useEffect } from 'react';

import { usePathname } from 'src/hooks';

import { themeConfig, ThemeProvider } from 'src/theme';

import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';


import { useParams } from 'react-router';
import i18n from './i18n/config';
import { useTranslation } from 'react-i18next';
import { AuthProvider } from './backOffice/auth/context/jwt';
import { useScrollToTop } from './hooks/useScrollToTop';

type AppProps = {
  children: React.ReactNode;
};

function App({ children }: AppProps) {
  useScrollToTop();
  const { lng } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    if (lng && i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng]);

  useEffect(() => {
    document.title = t('PAGETITLE');

    const handleLanguageChange = () => {
      document.title = t('PAGETITLE');
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [t]);

  return (
    <AuthProvider>
      <SettingsProvider defaultSettings={defaultSettings}>
        <ThemeProvider
          noSsr
          defaultMode={themeConfig.defaultMode}
          modeStorageKey={themeConfig.modeStorageKey}
        >
          <MotionLazy>
            <ProgressBar />
            <SettingsDrawer defaultSettings={defaultSettings} />
            {children}
          </MotionLazy>
        </ThemeProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
