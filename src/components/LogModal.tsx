import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { Modal, View, Button, StyleSheet, Text, FlatList } from 'react-native';
import { database, type } from '../features/firebase';
import { LogModalProps } from '../types/components';

export const LogModal: React.FC<LogModalProps> = ({ isOpen, onClose }) => {
  const [isState, setIsState] = useState<'all' | 'gps' | 'map'>('all');
  const [logData1, setLogData1] = useState({});
  const [logData2, setLogData2] = useState({});
  const [logData3, setLogData3] = useState({});

  // 전체 로그 Data
  const allLogData = useMemo(() => {
    if (isState === 'all' && logData1 && Object.keys(logData1).length > 0) {
      const orderedGeoData = Object.keys(logData1)
        .sort()
        .reduce((obj, key) => {
          obj[key] = logData1[key];
          return obj;
        }, {});

      const formatData = Object.values(orderedGeoData).map(({ map, gps }, i) => ({
        gps: {
          time: dayjs(map.timestamp).format('YYYY-MM-DD HH:mm:ss'),
          latitude: map.latitude.toFixed(5),
          longitude: map.longitude.toFixed(5),
        },
        map: {
          time: dayjs(gps.timestamp).format('YYYY-MM-DD HH:mm:ss'),
          latitude: gps.latitude.toFixed(5),
          longitude: gps.longitude.toFixed(5),
        },
      }));

      // console.log(formatData);

      return formatData;
    }
    return [];
  }, [isState, logData1]);

  // Map 로그 Data
  const mapLogData = useMemo(() => {
    if (isState === 'map' && logData2 && Object.keys(logData2).length > 0) {
      const orderedGeoData = Object.keys(logData2)
        .sort()
        .reduce((obj, key) => {
          obj[key] = logData2[key];
          return obj;
        }, {});

      const formatData = Object.values(orderedGeoData).map((data, i) => ({
        time: dayjs(data.timestamp).format('YYYY-MM-DD HH:mm:ss'),
        latitude: data.latitude.toFixed(5),
        longitude: data.longitude.toFixed(5),
      }));

      // console.log(formatData);

      return formatData;
    }
    return [];
  }, [isState, logData2]);

  // GPS 로그 Data
  const gpsLogData = useMemo(() => {
    if (isState === 'gps' && logData3 && Object.keys(logData3).length > 0) {
      const orderedGeoData = Object.keys(logData3)
        .sort()
        .reduce((obj, key) => {
          obj[key] = logData3[key];
          return obj;
        }, {});

      const formatData = Object.values(orderedGeoData).map((data, i) => ({
        time: dayjs(data.timestamp).format('YYYY-MM-DD HH:mm:ss'),
        latitude: data.latitude.toFixed(5),
        longitude: data.longitude.toFixed(5),
      }));

      // console.log(formatData);

      return formatData;
    }
    return [];
  }, [isState, logData3]);

  useEffect(() => {
    setTimeout(() => {
      if (isState === 'all') {
        getAllLogData();
      }
      if (isState === 'map') {
        getMapLogData();
      }
      if (isState === 'gps') {
        getGpsLogData();
      }
    }, 1000);
  }, [isState]);

  const getAllLogData = () => {
    const databasePath = `naver/${type}/check/${dayjs().year()}/${
      dayjs().month() + 1
    }/${dayjs().date()}`;

    database
      .ref(databasePath)
      .once('value')
      .then((snapshot) => {
        // console.log('data: ', snapshot.val());
        setLogData1(snapshot.val());
      });
  };

  const getMapLogData = () => {
    const databasePath = `naver/${type}/map/${dayjs().year()}/${
      dayjs().month() + 1
    }/${dayjs().date()}`;

    database
      .ref(databasePath)
      .once('value')
      .then((snapshot) => {
        // console.log('data: ', snapshot.val());
        setLogData2(snapshot.val());
      });
  };

  const getGpsLogData = () => {
    const databasePath = `naver/${type}/gps/${dayjs().year()}/${
      dayjs().month() + 1
    }/${dayjs().date()}`;

    database
      .ref(databasePath)
      .once('value')
      .then((snapshot) => {
        // console.log('data: ', snapshot.val());
        setLogData3(snapshot.val());
      });
  };

  return (
    <Modal animationType="slide" transparent visible={isOpen}>
      <View style={styles.modalOutView}>
        <View style={styles.modalView}>
          <View>
            <Button color="#b9b9b9" title="닫기" onPress={onClose} />
            <View style={styles.modalButtonView}>
              <Button
                color={isState === 'all' ? '#0050FD' : ''}
                title="전체 로그"
                onPress={() => setIsState('all')}
              />
              <Button
                color={isState === 'map' ? '#0050FD' : ''}
                title="지도 로그"
                onPress={() => setIsState('map')}
              />
              <Button
                color={isState === 'gps' ? '#0050FD' : ''}
                title="GPS 로그"
                onPress={() => setIsState('gps')}
              />
              <View style={styles.logCountView}>
                <Text>
                  {isState === 'all' &&
                    `${allLogData && allLogData.length > 0 ? allLogData.length : 0}개`}
                  {isState === 'map' &&
                    `${mapLogData && mapLogData.length > 0 ? mapLogData.length : 0}개`}
                  {isState === 'gps' &&
                    `${gpsLogData && gpsLogData.length > 0 ? gpsLogData.length : 0}개`}
                </Text>
              </View>
            </View>
          </View>
          <View>
            {isState === 'all' && allLogData?.length > 0 && (
              <FlatList
                data={allLogData}
                renderItem={({ item }) => (
                  <>
                    <View style={styles.modalItem}>
                      <Text style={styles.modalText}>{item.map.time}</Text>
                      <View style={styles.allLogItemView1}>
                        <View style={styles.allLogItemView2}>
                          <View style={styles.allLogItemView3_1}>
                            <Text />
                          </View>
                          <View style={styles.allLogItemView3_2}>
                            <Text>MAP</Text>
                          </View>
                          <View style={styles.allLogItemView3_2}>
                            <Text>GPS</Text>
                          </View>
                        </View>
                        <View style={styles.allLogItemView2}>
                          <View style={styles.allLogItemView3_1}>
                            <Text>위도</Text>
                          </View>
                          <View style={styles.allLogItemView3_2}>
                            <Text style={styles.modalText}>{item.map.latitude}</Text>
                          </View>
                          <View style={styles.allLogItemView3_2}>
                            <Text style={styles.modalText}>{item.gps.latitude}</Text>
                          </View>
                        </View>
                        <View style={styles.allLogItemView2}>
                          <View style={styles.allLogItemView3_1}>
                            <Text>경도</Text>
                          </View>
                          <View style={styles.allLogItemView3_2}>
                            <Text style={styles.modalText}>{item.map.longitude}</Text>
                          </View>
                          <View style={styles.allLogItemView3_2}>
                            <Text style={styles.modalText}>{item.gps.longitude}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </>
                )}
              />
            )}
            {isState === 'map' && mapLogData?.length > 0 && (
              <FlatList
                data={mapLogData}
                renderItem={({ item }) => (
                  <View style={styles.modalItem}>
                    <Text style={styles.modalText}>{item.time}</Text>
                    <Text style={styles.modalText}>
                      위도 : {item.latitude} {'      '} 경도 : {item.longitude}
                    </Text>
                  </View>
                )}
              />
            )}
            {isState === 'gps' && (
              <FlatList
                data={gpsLogData}
                renderItem={({ item }) => (
                  <View style={styles.modalItem}>
                    <Text style={styles.modalText}>{item.time}</Text>
                    <Text style={styles.modalText}>
                      위도 : {item.latitude} {'      '} 경도 : {item.longitude}
                    </Text>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOutView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: 30,
  },
  modalView: {
    width: '80%',
    height: '80%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#b0b0b0',
    borderRadius: 8,
  },
  modalButtonView: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-around',
  },
  logCountView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
  },
  allLogItemView1: { justifyContent: 'space-between', alignItems: 'center' },
  allLogItemView2: {
    display: 'flex',
    flexDirection: 'row',
  },
  allLogItemView3_1: {
    flex: 1,
    alignItems: 'center',
  },
  allLogItemView3_2: {
    flex: 3,
    alignItems: 'center',
  },
  modalItem: {
    width: '100%',
    margin: 2,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 4,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 0,
    textAlign: 'center',
  },
});
