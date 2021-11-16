import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MapInfoProps} from '../types/components';

const MapInfo: React.FC<MapInfoProps> = ({
  selectedDate,
  distance,
  lastPosition,
  region,
}) => (
  <View>
    <View style={styles.function}>
      <View style={styles.infoView}>
        <Text style={styles.title}>현재위치</Text>
        <View style={{minWidth: '50%'}}>
          <View style={styles.content}>
            <Text style={styles.contentText}>경도</Text>
            <Text style={styles.contentText}>
              {lastPosition.longitude.toFixed(5)}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentText}>위도</Text>
            <Text style={styles.contentText}>
              {lastPosition.latitude.toFixed(5)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.infoView}>
        <Text style={styles.title}>지도위치</Text>
        <View style={{minWidth: '50%'}}>
          <View style={styles.content}>
            <Text style={styles.contentText}>경도</Text>
            <Text style={styles.contentText}>
              {region.longitude.toFixed(5)}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentText}>위도</Text>
            <Text style={styles.contentText}>{region.latitude.toFixed(5)}</Text>
          </View>
        </View>
      </View>
    </View>
    <View style={styles.dateView}>
      <Text style={styles.title}>날짜</Text>
      <View style={{minWidth: '50%'}}>
        <View style={styles.content}>
          <Text style={styles.contentText}>{selectedDate}</Text>
        </View>
      </View>
    </View>
  </View>
);

export default MapInfo;

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
    border: '1px solid #b9b9b9',
  },
  infoView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {fontSize: 18, fontWeight: 'bold'},
  content: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '50%',
  },
  contentText: {
    paddingHorizontal: 8,
  },
  dateView: {
    paddingTop: 8,
    display: 'flex',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
