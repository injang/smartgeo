import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {MapFunctionProps} from '../types/components';

const MapFunction: React.FC<MapFunctionProps> = ({
  isTraking,
  handleGetNowGeolocation,
  handleTraking,
  handleZoomIn,
  handleZoomOut,
  handleCalendarOpen,
  handleLogOpen,
  handleLogDelete,
}) => (
  <View style={styles.container}>
    <Button title="현재위치" onPress={handleGetNowGeolocation} />
    <Button title={isTraking ? '추적종료' : '추적'} onPress={handleTraking} />
    <Button title="확대" onPress={handleZoomIn} />
    <Button title="축소" onPress={handleZoomOut} />
    <Button title="달력" onPress={handleCalendarOpen} />
    <Button title="로그" onPress={handleLogOpen} />
    <Button title="로그삭제" onPress={handleLogDelete} />
  </View>
);

export default MapFunction;

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
