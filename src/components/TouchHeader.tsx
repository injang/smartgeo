import React from 'react';
import { TouchableOpacity, View, Pressable, Text, StyleSheet } from 'react-native';

interface Props {
  isTracking: boolean;
  mapClicked: any;
  trackingClicked: any;
}

const TouchHeader: React.FC<Props> = ({ isTracking, mapClicked, trackingClicked }) => {
  return (
    <>
      {isTracking && (
        <TouchableOpacity style={styles.checkTouchableOpacity} onPress={mapClicked} />
      )}
      <View style={styles.ControlButtonView}>
        <Pressable
          style={[
            styles.ControlButton,
            isTracking ? { backgroundColor: '#8e8e93' } : { backgroundColor: '#2578ff' },
          ]}
          onPress={trackingClicked}>
          <Text style={styles.controlButtonText}>{isTracking ? 'OFF' : 'ON'}</Text>
        </Pressable>
        <View style={{ flex: 1 }} />
        {isTracking && (
          <View>
            <Text style={styles.trackText}>터치기능 실행중</Text>
          </View>
        )}
      </View>
    </>
  );
};

export default TouchHeader;

const styles = StyleSheet.create({
  checkTouchableOpacity: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  ControlButtonView: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ControlButton: {
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  controlButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  trackText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
});
