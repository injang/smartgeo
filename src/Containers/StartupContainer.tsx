import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';

import { useTheme } from '@/Hooks';
import { navigateAndSimpleReset } from '@/Navigators/utils';
import { setDefaultTheme } from '@/Store/Theme';

const StartupContainer = () => {
  const { Layout, Gutters, Fonts } = useTheme();

  const { t } = useTranslation();

  const init = async () => {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(true);
      }, 2000),
    );
    await setDefaultTheme({ theme: 'default', darkMode: null });
    navigateAndSimpleReset('Main');
  };

  useEffect(() => {
    init();
  });

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <ActivityIndicator size="large" style={[Gutters.largeVMargin]} />
    </View>
  );
};

export default StartupContainer;
