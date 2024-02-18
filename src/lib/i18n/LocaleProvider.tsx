'use client';
import { I18nextProvider } from 'react-i18next';
import i18n from './index';
import { ReactNode } from 'react';

const LocaleProvider = ({ children }: { children: ReactNode }) => {
  return (
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      {children}
    </I18nextProvider>
  );
};

export default LocaleProvider;
