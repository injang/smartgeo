import {GeolocationResponse} from '@react-native-community/geolocation';

export type TGeolocation = {
  initialPosition?: GeolocationResponse;
  lastPosition?: GeolocationResponse;
};

export type TGeoData = {
  coords: {
    accuracy: number;
    altitude: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  };
  mocked: boolean;
  timestamp: number;
};

export type TLineData = {
  latitude: number;
  longitude: number;
};

export type TRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export type TLogData = {
  time: string;
  latitude: string;
  longitude: string;
};
