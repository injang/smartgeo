import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';

import { Coord, TAllData } from '../types/models';
import MapInfo from '../components/MapInfo';
import NaverMap from '../components/NaverMap';
import AppGeolocation from '../features/AppGeolocation';
import useDisclosure from '../hooks/useDisclosure';
import { GeolocationResponse } from '@react-native-community/geolocation';
import {
  database,
  saveDatabaseMarker,
  saveDatabaseMobileGps,
  saveDatabaseNaverMap,
  type,
} from '../features/firebase';
import TouchHeader from '../components/TouchHeader';
import TouchBottom from '../components/TouchBottom';
import { LogModal } from '../components/LogModal';
import dayjs from 'dayjs';

const Main = () => {
  // GPS 수신 ID
  const [watchID, setWatchID] = useState<number | null>(null);
  // GPS 값
  const [gpsData, setGpsData] = useState<GeolocationResponse>();
  // 지도 좌표 값
  const [mapData, setMapData] = useState<Coord>();

  // 추적
  const [isTracking, setIsTracking] = useState(false);
  // 정보 보기
  const [isInfo, setIsInfo] = useState(false);
  // 마크 보기/숨김
  const [isMarker, setIsMarker] = useState(false);

  const [markerData, setMarkerData] = useState<{ gps: Coord; map: Coord }[]>([]);

  // 로그 보기
  const { isOpen: logIsOpen, onOpen: logOnOpen, onClose: logOnClose } = useDisclosure();

  const mapRef = useRef(null);

  // 마지막 측정된 위치(현재위치)
  const lastPosition = useMemo(() => {
    if (gpsData && gpsData.coords && mapData) {
      const gps = {
        longitude: gpsData.coords.longitude,
        latitude: gpsData.coords.latitude,
      };
      const map = {
        longitude: mapData.longitude,
        latitude: mapData.latitude,
      };
      return { gps, map };
    }
  }, [gpsData, mapData]);

  useEffect(() => {
    getMarkerData();
  }, []);

  useEffect(() => {
    if (isTracking) {
      mapRef.current.setLocationTrackingMode(2);
    } else {
      mapRef.current.setLocationTrackingMode(0);
    }
  }, [isTracking]);

  useEffect(() => {
    if (isMarker) {
      getMarkerData();
    } else {
      setMarkerData([]);
    }
  }, [isMarker]);

  // Marker 데이터 불러오기
  const getMarkerData = () => {
    const databasePath = `naver/${type}/check/${dayjs().year()}/${
      dayjs().month() + 1
    }/${dayjs().date()}`;

    database
      .ref(databasePath)
      .once('value')
      .then((snapshot) => {
        // console.log('data: ', snapshot.val());
        const snapshotData = snapshot.val();

        const orderedGeoData = Object.keys(snapshotData)
          .sort()
          .reduce((obj, key) => {
            obj[key] = snapshotData[key];
            return obj;
          }, {});

        const formatData = Object.values(orderedGeoData).map(
          ({ map, gps }: TAllData, i) => ({
            gps: {
              latitude: map.latitude,
              longitude: map.longitude,
            },
            map: {
              latitude: gps.latitude,
              longitude: gps.longitude,
            },
          }),
        );

        setMarkerData(formatData);
      });
  };

  // 추적 클릭
  const trackingClicked = () => {
    setIsTracking(!isTracking);
  };

  // 정보보기 클릭
  const infoClicked = () => {
    setIsInfo(!isInfo);
  };

  // 로그보기 클릭
  const logClicked = () => {
    if (logIsOpen) {
      logOnClose();
    } else {
      logOnOpen();
    }
  };

  const markerClicked = () => {
    setIsMarker(!isMarker);
  };

  // 맵 클릭 (체크ON일때만)
  const mapClicked = () => {
    // console.log(gpsData, mapData);
    if (gpsData && gpsData.coords && mapData) {
      const gps = {
        longitude: gpsData.coords.longitude,
        latitude: gpsData.coords.latitude,
        // timestamp: dayjs().valueOf(),
      };
      const gps2 = Object.assign(gps, gpsData);
      const map = {
        longitude: mapData.longitude,
        latitude: mapData.latitude,
        timestamp: dayjs().valueOf(),
      };

      const newMarkerData = { gps, map };
      setMarkerData((prev) => [...prev, newMarkerData]);

      saveDatabaseNaverMap(map);
      saveDatabaseMobileGps(gps2);
      saveDatabaseMarker(newMarkerData);
    }
  };

  return (
    <>
      <AppGeolocation watchID={watchID} setWatchID={setWatchID} setGpsData={setGpsData} />
      <View style={{ width: '100%', height: '100%' }}>
        <View style={{ height: isInfo ? '80%' : '100%' }}>
          <NaverMap
            mapRef={mapRef}
            // lineData={lineData}
            // mapLineData={mapLineData}
            markerData={markerData}
            setMapData={setMapData}
          />
        </View>
        <TouchHeader
          isTracking={isTracking}
          mapClicked={mapClicked}
          trackingClicked={trackingClicked}
        />
        <TouchBottom
          isMarker={isMarker}
          isInfo={isInfo}
          infoClicked={infoClicked}
          logClicked={logClicked}
          markerClicked={markerClicked}
        />
        <MapInfo lastPosition={lastPosition} />
      </View>
      <LogModal isOpen={logIsOpen} onClose={logOnClose} />
      {/*
      <CalendarModal
        selectedDate={selectedDate}
        visible={isCalendarModal}
        onPress={handleCalendarClose}
        handleSelectedDate={handleSelectedDate}
      /> */}
    </>
  );
};

export default Main;
