import React from 'react';
import {Button, Modal, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {CalendarModalProps} from '../types/components';

const CalendarModal: React.FC<CalendarModalProps> = ({
  selectedDate,
  visible,
  onPress,
  handleSelectedDate,
}) => {
  return (
    <>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={{height: '100%', backgroundColor: '#b9b9b9'}}>
          <Button title="닫기" onPress={onPress} />
          <Calendar
            current={selectedDate}
            onDayPress={handleSelectedDate}
            // markingType={'period'}
            markedDates={{
              selectedDate: {
                selected: true,
                endingDay: true,
                color: 'green',
              },
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default CalendarModal;
