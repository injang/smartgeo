import React from 'react';
import { StyleSheet, View } from 'react-native';
import NaverMapView, { Marker, Polyline } from 'react-native-nmap';
import { NaverMapProps } from '../types/components';
import { Coord } from '../types/models';

const MARKER_SIZE = 8;

const NaverMap: React.FC<NaverMapProps> = ({ mapRef, markerData, setMapData }) => {
  // 화면이동 시 mapData 갱신
  const onCameraChange = (e: {
    latitude: number;
    longitude: number;
    zoom: number;
    contentsRegion: [Coord, Coord, Coord, Coord, Coord];
    coveringRegion: [Coord, Coord, Coord, Coord, Coord];
  }) => {
    setMapData({ latitude: e.latitude, longitude: e.longitude });
  };

  return (
    <NaverMapView
      ref={mapRef}
      style={styles.map}
      showsMyLocationButton={true}
      onCameraChange={onCameraChange}>
      {markerData &&
        markerData.map(({ gps, map }, i) => (
          <View key={i}>
            <Marker coordinate={gps} width={MARKER_SIZE} height={MARKER_SIZE}>
              <View style={styles.gpsMarker} />
            </Marker>
            <Marker coordinate={map} width={MARKER_SIZE} height={MARKER_SIZE}>
              <View style={styles.mapMarker} />
            </Marker>
            {gps && map && (
              <Polyline coordinates={[gps, map]} strokeColor="#000" strokeWidth={1} />
            )}
          </View>
        ))}
    </NaverMapView>
  );
};

export default NaverMap;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  gpsMarker: {
    width: MARKER_SIZE,
    height: MARKER_SIZE,
    borderRadius: 100,
    backgroundColor: '#00f',
  },
  mapMarker: {
    width: MARKER_SIZE,
    height: MARKER_SIZE,
    borderRadius: 100,
    backgroundColor: '#f00',
  },
});
