import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, Region } from 'react-native-maps';

import { TLineData, TRegion } from '@/Types/models';

interface Props {
  region: TRegion;
  lineData: TLineData[];
  mapLineData: TLineData[];
  markerData: TLineData;
  onRegionChange: (region: Region) => void;
  onRegionChangeComplete: (region: Region) => void;
}

const GoogleMap: React.FC<Props> = ({
  region,
  lineData,
  mapLineData,
  markerData,
  onRegionChange,
  onRegionChangeComplete,
}) => (
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
      <Polyline coordinates={mapLineData} strokeColor="#f00" strokeWidth={1} />
    )}
  </MapView>
);

export default GoogleMap;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  marker: {
    zIndex: 10,
  },
});
