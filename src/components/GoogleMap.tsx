import React from 'react';
import {StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {GoogleMapProps} from '../types/components';

const GoogleMap: React.FC<GoogleMapProps> = ({
  region,
  lineData,
  markerData,
  onRegionChange,
}) => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={region}
      onRegionChangeComplete={onRegionChange}>
      {markerData && <Marker coordinate={markerData} style={styles.marker} />}
      <Polyline coordinates={lineData} strokeColor="#000" strokeWidth={4} />
    </MapView>
  );
};

export default GoogleMap;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    zIndex: 10,
  },
});
