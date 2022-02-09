export type TAllData = {
  gps: TGpsData;
  map: TMapData;
}

export type TGpsData = {
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
  latitude: number;
  longitude: number;
};

export type TMapData = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

export type TLogData = {
  time: string;
  latitude: string;
  longitude: string;
};

export interface Coord {
  latitude: number;
  longitude: number;
}
export interface Region extends Coord {
  latitudeDelta: number;
  longitudeDelta: number;
}
export interface Rect {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
}
