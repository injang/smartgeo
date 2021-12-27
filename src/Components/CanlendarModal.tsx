import React from 'react';
import { Button, Modal, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface Props {
  selectedDate: string;
  visible: boolean;
  onPress: () => void;
  handleSelectedDate: (day: any) => void;
}

const CalendarModal: React.FC<Props> = ({
  selectedDate,
  visible,
  onPress,
  handleSelectedDate,
}) => (
  <>
    <Modal animationType="slide" visible={visible}>
      <View style={{ backgroundColor: '#b9b9b9' }}>
        <Button title="닫기" onPress={onPress} />
        <Calendar
          current={selectedDate}
          onDayPress={handleSelectedDate}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: '#F1EFFE',
              selectedTextColor: '#7954FA',
            },
          }}
          // markingType={'period'}
          // markedDates={{
          //   selectedDate: {
          //     selected: true,
          //     endingDay: true,
          //     color: 'green',
          //   },
          // }}
        />
      </View>
    </Modal>
  </>
);

export default CalendarModal;
