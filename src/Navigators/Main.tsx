import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { GoogleContainer, KakaoContainer, NaverContainer } from '@/Containers';

const Tab = createBottomTabNavigator();

// @refresh reset
const MainNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Google" component={GoogleContainer} />
    <Tab.Screen name="Kakao" component={KakaoContainer} />
    <Tab.Screen name="Naver" component={NaverContainer} />
  </Tab.Navigator>
);

export default MainNavigator;
