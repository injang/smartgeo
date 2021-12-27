import { ThemeImages, ThemeVariables } from '@/Theme/theme.type';

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({}: ThemeVariables): ThemeImages {
  return {
    logo: require('@/Assets/Images/TOM.png'),
    google: require('@/Assets/Images/google.png'),
    kakao: require('@/Assets/Images/kakao.png'),
    naver: require('@/Assets/Images/naver.png'),
  };
}
