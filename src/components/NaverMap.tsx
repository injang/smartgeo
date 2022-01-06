import React from 'react';
import { StyleSheet } from 'react-native';
import NaverMapView, { Marker, Polyline } from 'react-native-nmap';
import { NaverMapProps } from '../types/components';

const NaverMap: React.FC<NaverMapProps> = ({
  region,
  lineData,
  mapLineData,
  markerData,
  onRegionChange,
  onRegionChangeComplete,
}) => {
  return (
    <NaverMapView
      style={styles.map}
      showsMyLocationButton={true}
      center={{ ...region, zoom: 16 }}
      //   onTouch={(e) => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
      onCameraChange={onRegionChange}
      //   onMapClick={(e) => console.warn('onMapClick', JSON.stringify(e))}
    >
      {markerData && <Marker coordinate={markerData} style={styles.marker} />}
      {lineData && lineData.length > 2 && (
        <Polyline coordinates={lineData} strokeColor="#000" strokeWidth={1} />
      )}
      {mapLineData && mapLineData.length > 2 && (
        <Polyline coordinates={mapLineData} strokeColor="#f00" strokeWidth={1} />
      )}
    </NaverMapView>
  );
};

export default NaverMap;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    zIndex: 10,
  },
});
