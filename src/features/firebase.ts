import { firebase } from '@react-native-firebase/database';
import dayjs from 'dayjs';

export let type = '';

if (__DEV__) {
  type = 'debug';
} else {
  type = 'release';
}

const databaseUrl = 'https://smartgeo-42ba6-default-rtdb.firebaseio.com/';
export const database = firebase.app().database(databaseUrl);

// 위치 저장(지도)
export const saveDatabaseMarker = (data: any) => {
  // console.log('save : ', geolocation.lastPosition);
  const databasePath = `naver/${type}/check/${dayjs().year()}/${
    dayjs().month() + 1
  }/${dayjs().date()}/${dayjs().format('HH:mm:ss')}`;

  database.ref(databasePath).set(data);
};

// 위치 저장(지도)
export const saveDatabaseNaverMap = (map: any) => {
  // console.log('save : ', geolocation.lastPosition);
  const databasePath = `naver/${type}/map/${dayjs().year()}/${
    dayjs().month() + 1
  }/${dayjs().date()}/${dayjs().format('HH:mm:ss')}`;

  database.ref(databasePath).set(map);
};

// 위치 저장(GPS)
export const saveDatabaseMobileGps = (gps: any) => {
  // console.log('save : ', geolocation.lastPosition);
  const databasePath = `naver/${type}/gps/${dayjs().year()}/${
    dayjs().month() + 1
  }/${dayjs().date()}/${dayjs().format('HH:mm:ss')}`;

  database.ref(databasePath).set(gps);
};

// 위치 불러오기(지도)
export const getDatabaseMarker = () => {
  const databasePath = `naver/${type}/check/${dayjs().year()}/${
    dayjs().month() + 1
  }/${dayjs().date()}`;

  database
    .ref(databasePath)
    .once('value')
    .then((snapshot) => {
      console.log('data: ', snapshot.val());
      // data = snapshot.val();
    });
};

// 지도 위치 삭제
export const deleteDatabase = () => {
  const databasePath = `naver/${type}`;

  database.ref(databasePath).remove();
};
