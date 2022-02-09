import Geolocation, {
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import React, { useEffect } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';

interface Props {
  watchID: number | null;
  setWatchID: React.Dispatch<number | null>;
  setGpsData: React.Dispatch<GeolocationResponse>;
}

const AppGeolocation: React.FC<Props> = ({ watchID, setGpsData, setWatchID }) => {
  useEffect(() => {
    requestLocationPermission();
    handleGeolocationSetting();
    getInitGeolocation();
    getNowGeolocation();
    getWatchGeolocation();

    return () => {
      clearGeolocation();
    };
  }, []);

  // Location 권한 부여
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '위치 권한',
          message: '이 앱은 사용자의 위치를 액세스해야 합니다',
          buttonPositive: '허용',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use locations ');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  // 초기 설정값
  const handleGeolocationSetting = () => {
    Geolocation.setRNConfiguration({
      authorizationLevel: 'always',
      skipPermissionRequests: true,
    });
  };

  // 위치 추적 종료
  const clearGeolocation = () => {
    watchID != null && Geolocation.clearWatch(watchID);
    Geolocation.clearWatch(0);
  };

  // 첫 위치정보 호출
  const getInitGeolocation = () => {
    Geolocation.getCurrentPosition(
      (position: GeolocationResponse) => {
        // console.log('첫 호출', position);
        setGpsData(position);
      },
      (error: GeolocationError) => Alert.alert('Error', JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  // 현재 위치정보 호출
  const getNowGeolocation = () => {
    Geolocation.getCurrentPosition(
      (position: GeolocationResponse) => {
        // console.log('현재위치 호출', position);
        setGpsData(position);
      },
      (error: GeolocationError) => Alert.alert('Error', JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  // 위치 계속 추적
  const getWatchGeolocation = () => {
    const watchId = Geolocation.watchPosition(
      (position: GeolocationResponse) => {
        // console.log('추적 호출', position);
        setGpsData(position);
      },
      (error: GeolocationError) => Alert.alert('Error', JSON.stringify(error)),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 1,
      },
    );
    setWatchID(watchId);
  };

  return <></>;
};

export default AppGeolocation;
