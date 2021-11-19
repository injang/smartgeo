import React from 'react';
import {StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {GoogleMapProps} from '../types/components';

const GoogleMap: React.FC<GoogleMapProps> = ({
  region,
  lineData,
  mapLineData,
  markerData,
  onRegionChange,
  onRegionChangeComplete,
}) => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={region}
      onRegionChange={onRegionChange}
      onRegionChangeComplete={onRegionChangeComplete}>
      {markerData && <Marker coordinate={markerData} style={styles.marker} />}
      {lineData && lineData.length > 0 && (
        <Polyline coordinates={lineData} strokeColor="#000" strokeWidth={1} />
      )}
      {mapLineData && mapLineData.length > 0 && (
        <Polyline
          coordinates={mapLineData}
          strokeColor="#f00"
          strokeWidth={1}
        />
      )}
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
