import React from 'react';
import {Modal, ScrollView, View, Button, Text, StyleSheet} from 'react-native';
import {LogModalProps} from '../types/components';

export const LogModal: React.FC<LogModalProps> = ({
  visible,
  logData,
  onPress,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <ScrollView style={{backgroundColor: '#b9b9b9'}}>
        <View>
          <Button title="닫기" onPress={onPress} />
        </View>
        <View style={styles.modalView}>
          {logData.map((log, i) => (
            <View key={i} style={styles.modalItem}>
              <Text style={styles.modalText}>{log.time}</Text>
              <Text style={styles.modalText}>
                위도 : {log.latitude} {'      '} 경도 : {log.longitude}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Modal>
  );
};

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
