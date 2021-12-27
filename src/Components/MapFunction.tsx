import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

interface Props {
  isTraking: boolean;
  handleGetNowGeolocation: () => void;
  handleTraking: () => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleCalendarOpen: () => void;
  handleLogOpen: () => void;
}

const MapFunction: React.FC<Props> = ({
  isTraking,
  handleGetNowGeolocation,
  handleTraking,
  handleZoomIn,
  handleZoomOut,
  handleCalendarOpen,
  handleLogOpen,
}) => (
  <View style={styles.container}>
    <Button title="현재위치" onPress={handleGetNowGeolocation} />
    <Button title={isTraking ? '추적종료' : '추적'} onPress={handleTraking} />
    <Button title="확대" onPress={handleZoomIn} />
    <Button title="축소" onPress={handleZoomOut} />
    <Button title="달력" onPress={handleCalendarOpen} />
    <Button title="로그" onPress={handleLogOpen} />
  </View>
);

export default MapFunction;

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
