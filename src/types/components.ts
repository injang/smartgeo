import {Region} from 'react-native-maps';
import {TRegion, TLineData, TLogData} from './models';

export type GoogleMapProps = {
  region: TRegion;
  lineData: TLineData[];
  mapLineData: TLineData[];
  markerData: TLineData;
  onRegionChange: (region: Region) => void;
  onRegionChangeComplete: (region: Region) => void;
};

export type LogModalProps = {
  visible: boolean;
  logData: TLogData[];
  mapLogData: TLogData[];
  onPress: () => void;
  handleLogDelete: () => void;
  handleMapDataDelete: () => void;
};

export type CalendarModalProps = {
  selectedDate: string;
  visible: boolean;
  onPress: () => void;
  handleSelectedDate: (day: any) => void;
};

export type MapFunctionProps = {
  isTraking: boolean;
  handleGetNowGeolocation: () => void;
  handleTraking: () => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleCalendarOpen: () => void;
  handleLogOpen: () => void;
};

export type MapInfoProps = {
  selectedDate: string;
  distance: number | string;
  lastPosition: TLineData;
  region: TRegion;
};
