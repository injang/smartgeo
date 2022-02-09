import { Coord } from './models';

export type NaverMapProps = {
  mapRef: React.MutableRefObject<null>;
  markerData: { gps: Coord; map: Coord }[];
  setMapData: React.Dispatch<Coord>;
};

export type LogModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type CalendarModalProps = {
  selectedDate: string;
  visible: boolean;
  onPress: () => void;
  handleSelectedDate: (day: any) => void;
};

export type MapInfoProps = {
  lastPosition?: { gps: Coord; map: Coord };
};
