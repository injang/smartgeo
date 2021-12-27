import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { useTheme } from '@/Hooks';

const GoogleContainer: React.FC = () => {
  const { t } = useTranslation();
  const { Common, Fonts, Gutters, Layout } = useTheme();

  return <View />;
};

export default GoogleContainer;
