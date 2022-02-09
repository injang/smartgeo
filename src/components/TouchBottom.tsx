import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

interface Props {
  isInfo: boolean;
  isMarker: boolean;
  infoClicked: () => void;
  logClicked: () => void;
  markerClicked: () => void;
}

const TouchBottom: React.FC<Props> = ({
  isInfo,
  isMarker,
  infoClicked,
  logClicked,
  markerClicked,
}) => {
  return (
    <>
      <View style={styles.logButtonView}>
        <Pressable
          style={[
            styles.controlButton,
            isMarker ? { backgroundColor: '#8e8e93' } : { backgroundColor: '#2578ff' },
          ]}
          onPress={markerClicked}>
          <Text style={styles.controlButtonText}>
            {isMarker ? '마크 숨김' : '마크 보기'}
          </Text>
        </Pressable>
        <View style={{ padding: 2 }} />
        <Pressable
          style={[
            styles.controlButton,
            isInfo ? { backgroundColor: '#8e8e93' } : { backgroundColor: '#2578ff' },
          ]}
          onPress={infoClicked}>
          <Text style={styles.controlButtonText}>
            {isInfo ? '정보 닫기' : '정보 보기'}
          </Text>
        </Pressable>
        <View style={{ padding: 2 }} />
        <Pressable
          style={[styles.controlButton, { backgroundColor: '#2578ff' }]}
          onPress={logClicked}>
          <Text style={styles.controlButtonText}>{'로그 보기'}</Text>
        </Pressable>
      </View>
    </>
  );
};

export default TouchBottom;

const styles = StyleSheet.create({
  controlButton: {
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
  logButtonView: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
  },
});
