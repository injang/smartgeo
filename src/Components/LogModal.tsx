import React, { useState } from 'react';
import { Button, FlatList, Modal, StyleSheet, Text, View } from 'react-native';

import { TLogData } from '@/Types/models';

interface Props {
  visible: boolean;
  logData: TLogData[];
  mapLogData: TLogData[];
  onPress: () => void;
  handleLogDelete: () => void;
  handleMapDataDelete: () => void;
}

const LogModal: React.FC<Props> = ({
  visible,
  logData,
  mapLogData,
  onPress,
  handleLogDelete,
  handleMapDataDelete,
}) => {
  const [isState, setIsState] = useState<'log' | 'map'>('log');

  const handleDelete = () => {
    if (isState === 'log') {
      handleLogDelete();
    }
    if (isState === 'map') {
      handleMapDataDelete();
    }
  };

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={{ backgroundColor: '#b9b9b9', flex: 1 }}>
        <View>
          <Button title="닫기" onPress={onPress} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 8,
              justifyContent: 'space-around',
            }}>
            <Button
              color={isState === 'log' ? '#0050FD' : ''}
              title="GPS 로그"
              onPress={() => setIsState('log')}
            />
            <Button
              color={isState === 'map' ? '#0050FD' : ''}
              title="지도 로그"
              onPress={() => setIsState('map')}
            />
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFF',
                paddingHorizontal: 8,
              }}>
              <Text>로그개수</Text>
              {isState === 'log' && <Text>{logData.length}</Text>}
              {isState === 'map' && <Text>{mapLogData.length}</Text>}
            </View>
            <Button color="#FF0000" title="로그삭제" onPress={handleDelete} />
          </View>
        </View>
        <View>
          {isState === 'log' && (
            <FlatList
              data={logData}
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
          {isState === 'map' && (
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
        </View>
      </View>
    </Modal>
  );
};

export default LogModal;

const styles = StyleSheet.create({
  modalView: {
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 8,
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
  modalItem: {
    width: '100%',
    margin: 2,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 2,
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
