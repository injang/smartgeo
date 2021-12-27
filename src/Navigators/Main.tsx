import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';

import { GoogleContainer, KakaoContainer, NaverContainer } from '@/Containers';
import { useTheme } from '@/Hooks';

const Tab = createBottomTabNavigator();

// @refresh reset
const MainNavigator = () => {
  const { t } = useTranslation();
  const { Images } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ focused, color, size }) => (
          // You can return any component that you like here!
          <Image
            source={
              route.name === 'Google'
                ? Images.google
                : route.name === 'Kakao'
                ? Images.kakao
                : route.name === 'Naver'
                ? Images.naver
                : ''
            }
          />
        ),
        tabBarActiveTintColor: 'black',
        headerShown: false,
      })}>
      <Tab.Screen name="Google" component={GoogleContainer} />
      <Tab.Screen name="Kakao" component={KakaoContainer} />
      <Tab.Screen name="Naver" component={NaverContainer} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
