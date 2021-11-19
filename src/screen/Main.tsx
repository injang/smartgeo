import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, StyleSheet, View, PermissionsAndroid} from 'react-native';

import Geolocation, {
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';

import {firebase} from '@react-native-firebase/database';
import dayjs from 'dayjs';
import GoogleMap from '../components/GoogleMap';
import {LogModal} from '../components/LogModal';
import {TGeolocation, TRegion, TGeoData, TLineData} from '../types/models';
import {initGeolocation, initRegion} from '../utils/constants';
import CalendarModal from '../components/CanlendarModal';
import haversine from 'haversine';
import {Region} from 'react-native-maps';
import MapFunction from '../components/MapFunction';
import MapInfo from '../components/MapInfo';

const zoomValue = 0.01;

const Main = () => {
  // 작업하면 위에꺼 배포할때 아래꺼 사용
  // const developDbRef = '${developDbRef}';
  const developDbRef = '';

  const database = firebase
    .app()
    .database('https://smartgeo-42ba6-default-rtdb.firebaseio.com/');
  // GPS 값
  const [geolocation, setGeolocation] = useState<TGeolocation>(initGeolocation);
  // GPS 수신 ID
  const [watchID, setWatchID] = useState<number | null>(null);
  // 지도 좌표 값
  const [region, setRegion] = useState<TRegion>(initRegion);

  // Modal
  const [isLogModal, setIsLogModal] = useState(false);
  const [isCalendarModal, setIsCalendarModal] = useState(false);
  // DB 저장 값
  const [geoData, setGeoData] = useState<TGeoData[]>([]);
  // Map DB 저장값
  const [mapData, setMapData] = useState<TRegion[]>([]);
  // 추적
  const [isTraking, setIsTraking] = useState(false);
  // 달력 값
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD'),
  );
  // 마지막 측정된 위치(현재위치)
  const lastPosition = useMemo(() => {
    if (geolocation.lastPosition && geolocation.lastPosition.coords) {
      const {longitude, latitude} = geolocation.lastPosition.coords;
      return {longitude, latitude};
    }
    return {longitude: 0, latitude: 0};
  }, [geolocation]);

  // 선 그리기 Data
  const lineData: TLineData[] = useMemo(() => {
    if (geoData) {
      const tempList = [];

      const orderedGeoData = Object.keys(geoData)
        .sort()
        .reduce((obj, key) => {
          obj[key] = geoData[key];
          return obj;
        }, {});

      Object.values(orderedGeoData).map(data =>
        tempList.push({
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
        }),
      );
      return tempList;
    }
    return [];
  }, [geoData]);

  // 선 그리기 Data (Map)
  const mapLineData: TLineData[] = useMemo(() => {
    if (mapData) {
      const tempList = [];

      const orderedGeoData = Object.keys(mapData)
        .sort()
        .reduce((obj, key) => {
          obj[key] = mapData[key];
          return obj;
        }, {});

      Object.values(orderedGeoData).map(data =>
        tempList.push({
          latitude: data.latitude,
          longitude: data.longitude,
        }),
      );
      return tempList;
    }
    return [];
  }, [mapData]);

  // 로그 Data
  const modalLogDataList = useMemo(() => {
    if (geoData) {
      const orderedGeoData = Object.keys(geoData)
        .sort()
        .reduce((obj, key) => {
          obj[key] = geoData[key];
          return obj;
        }, {});

      const formatData = Object.values(orderedGeoData).map((data, i) => ({
        time: dayjs(data.timestamp).format('YYYY-MM-DD HH:mm:ss'),
        latitude: data.coords.latitude.toFixed(5),
        longitude: data.coords.longitude.toFixed(5),
      }));

      return formatData;
    }
    return [];
  }, [geoData]);

  // 로그 Data (Map)
  const modalMapLogDataList = useMemo(() => {
    if (mapData) {
      const orderedMapData = Object.keys(mapData)
        .sort()
        .reduce((obj, key) => {
          obj[key] = mapData[key];
          return obj;
        }, {});

      const formatData = Object.entries(orderedMapData).map((data, i) => ({
        time: dayjs(`${selectedDate} ${data[0]}`).format('YYYY-MM-DD HH:mm:ss'),
        latitude: data[1].latitude.toFixed(5),
        longitude: data[1].longitude.toFixed(5),
      }));

      return formatData;
    }
    return [];
  }, [mapData, selectedDate]);

  const distance = useMemo(() => {
    if (lineData.length > 0) {
      const start = lineData[0];
      const end = lineData[lineData.length - 1];
      return haversine(start, end, {unit: 'km'}).toFixed(2);
    }
    return 0;
  }, [lineData]);

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '위치 권한',
          message:
            '이 앱은 사용자의 위치에 액세스해야 합니다' +
            '그래야 위치를 알 수 있습니다',
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

  useEffect(() => {
    initState();
    handleGetDB();
    requestLocationPermission();
    handleGeolocationSetting();
    handleGetInitGeolocation();
    handleGetWatchGeolocation();

    return () => {
      clearGeolocation();
    };
  }, []);

  useEffect(() => {
    if (geolocation.lastPosition && geolocation.lastPosition.coords) {
      const {latitude, longitude} = geolocation.lastPosition.coords;
      // console.log(latitude, longitude);
      if (isTraking) {
        setRegion(prev => ({
          ...prev,
          latitude,
          longitude,
        }));
        handleGPSSaveDB();
        handleSaveDB();
      }
    }
  }, [geolocation, isTraking]);

  useEffect(() => {
    handleGetDB();
  }, [lastPosition.latitude, lastPosition.longitude]);

  useEffect(() => {
    handleGetDB();
  }, [selectedDate]);

  const initState = () => {
    setGeolocation(initGeolocation);
    setWatchID(null);
    setRegion(initRegion);
    setIsLogModal(false);
    setGeoData([]);
    setIsTraking(false);
  };

  // 위치  저장
  const handleGPSSaveDB = useCallback(() => {
    // console.log('save : ', geolocation.lastPosition);
    database
      .ref(
        `${developDbRef}gps/${dayjs().year()}/${
          dayjs().month() + 1
        }/${dayjs().date()}/${dayjs().format('HH:mm:ss')}`,
      )
      .set(geolocation.lastPosition);
  }, [geolocation.lastPosition]);

  // 위치 로그 저장
  const handleSaveDB = useCallback(() => {
    // console.log('save : ', geolocation.lastPosition);
    database
      .ref(
        `${developDbRef}geolocation/${dayjs().year()}/${
          dayjs().month() + 1
        }/${dayjs().date()}/${dayjs().format('HH:mm:ss')}`,
      )
      .set(geolocation.lastPosition);
  }, [geolocation.lastPosition]);

  // 지도 위치 저장
  const handleGoogleMapSaveDB = (newRegion: TRegion) => {
    console.log('region : ', newRegion);
    database
      .ref(
        `${developDbRef}map_geolocation/${dayjs().year()}/${
          dayjs().month() + 1
        }/${dayjs().date()}/${dayjs().format('HH:mm:ss')}`,
      )
      .set(newRegion);
  };

  // 위치 불러오기
  const handleGetDB = useCallback(() => {
    database
      .ref(
        `${developDbRef}geolocation/${dayjs(selectedDate).year()}/${
          dayjs(selectedDate).month() + 1
        }/${dayjs(selectedDate).date()}`,
      )
      .once('value')
      .then(snapshot => {
        // console.log('data: ', snapshot.val());
        setGeoData(snapshot.val());
      });
    database
      .ref(
        `${developDbRef}map_geolocation/${dayjs(selectedDate).year()}/${
          dayjs(selectedDate).month() + 1
        }/${dayjs(selectedDate).date()}`,
      )
      .once('value')
      .then(snapshot => {
        // console.log('data: ', snapshot.val());
        setMapData(snapshot.val());
      });
  }, [selectedDate, geolocation.lastPosition]);

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
  };

  // 첫 위치정보 호출
  const handleGetInitGeolocation = () => {
    Geolocation.getCurrentPosition(
      (position: GeolocationResponse) => {
        const initialPosition = position;
        setGeolocation(prev => ({...prev, initialPosition}));
      },
      (error: GeolocationError) => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  // 현재 위치정보 호출
  const handleGetNowGeolocation = () => {
    Geolocation.getCurrentPosition(
      (position: GeolocationResponse) => {
        const lastPosition = position;
        setGeolocation(prev => ({...prev, lastPosition}));
        setRegion(prev => ({
          ...prev,
          longitude: lastPosition.coords.longitude,
          latitude: lastPosition.coords.latitude,
        }));
      },
      (error: GeolocationError) => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  // 위치 계속 추적
  const handleGetWatchGeolocation = () => {
    setWatchID(
      Geolocation.watchPosition(
        (position: GeolocationResponse) => {
          const lastPosition = position;
          setGeolocation(prev => ({...prev, lastPosition}));
        },
        (error: GeolocationError) =>
          Alert.alert('Error', JSON.stringify(error)),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 10,
        },
      ),
    );
  };

  const handleSelectedDate = (day: any) => {
    // console.log(day);
    setSelectedDate(day.dateString);
  };

  const handleZoomIn = () => {
    if (region.longitudeDelta > zoomValue && region.latitudeDelta > zoomValue) {
      setRegion(prev => ({
        ...prev,
        longitudeDelta: region.longitudeDelta - zoomValue,
        latitudeDelta: region.latitudeDelta - zoomValue,
      }));
    }
  };

  const handleZoomOut = () => {
    if (region.longitudeDelta < 1 && region.latitudeDelta < 1)
      setRegion(prev => ({
        ...prev,
        longitudeDelta: region.longitudeDelta + zoomValue,
        latitudeDelta: region.latitudeDelta + zoomValue,
      }));
  };

  const handleTraking = () => {
    setIsTraking(!isTraking);
  };

  const handleCalendarOpen = () => {
    setIsCalendarModal(true);
  };

  const handleCalendarClose = () => {
    setIsCalendarModal(false);
  };

  const handleLogOpen = () => {
    setIsLogModal(true);
  };

  const handleLogClose = () => {
    setIsLogModal(false);
  };

  // GPS 위치 삭제
  const handleLogDelete = () => {
    database
      .ref(
        `${developDbRef}geolocation/${dayjs(selectedDate).year()}/${
          dayjs(selectedDate).month() + 1
        }/${dayjs(selectedDate).date()}`,
      )
      .remove();
    setGeoData([]);
  };

  // 지도 위치 삭제
  const handleMapDataDelete = () => {
    database
      .ref(
        `${developDbRef}map_geolocation/${dayjs(selectedDate).year()}/${
          dayjs(selectedDate).month() + 1
        }/${dayjs(selectedDate).date()}`,
      )
      .remove();
    setMapData([]);
  };

  // 지도에서 나온 데이터(실시간)
  const onRegionChange = (newRegion: Region) => {
    if (isTraking) {
      handleGoogleMapSaveDB(newRegion);
    }
  };

  // 지도에서 나온 데이터(드래그 마지막)
  const onRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
    if (isTraking) {
      handleGoogleMapSaveDB(newRegion);
    }
  };

  return (
    <>
      <View>
        <View style={styles.container}>
          <GoogleMap
            region={region}
            lineData={lineData}
            mapLineData={mapLineData}
            markerData={lastPosition}
            onRegionChange={onRegionChange}
            onRegionChangeComplete={onRegionChangeComplete}
          />
        </View>
        <View style={styles.info}>
          <MapFunction
            isTraking={isTraking}
            handleGetNowGeolocation={handleGetNowGeolocation}
            handleTraking={handleTraking}
            handleZoomIn={handleZoomIn}
            handleZoomOut={handleZoomOut}
            handleCalendarOpen={handleCalendarOpen}
            handleLogOpen={handleLogOpen}
          />
          <MapInfo
            selectedDate={selectedDate}
            distance={distance}
            lastPosition={lastPosition}
            region={region}
          />
        </View>
      </View>
      <LogModal
        visible={isLogModal}
        logData={modalLogDataList}
        mapLogData={modalMapLogDataList}
        onPress={handleLogClose}
        handleLogDelete={handleLogDelete}
        handleMapDataDelete={handleMapDataDelete}
      />
      <CalendarModal
        selectedDate={selectedDate}
        visible={isCalendarModal}
        onPress={handleCalendarClose}
        handleSelectedDate={handleSelectedDate}
      />
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    height: '70%',
  },
  info: {
    height: '30%',
  },
  function: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  infoView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
