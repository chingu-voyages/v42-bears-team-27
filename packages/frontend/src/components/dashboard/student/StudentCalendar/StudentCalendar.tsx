import { useState } from 'react';
import { endOfWeek, startOfWeek } from 'date-fns';

import { Calendar } from 'src/components/ui';

const StudentCalendar = () => {
  const [activeDay, setActiveDay] = useState<Date>(new Date());

  const changedActiveDayHandler = (date: Date) => {
    setActiveDay(date);
  };

  return (
    <Calendar
      sx={{
        maxWidth: '95%',
        width: [544, 576, 640, 800],
        height: 160,
        mx: 'auto',
        '.react-calendar__viewContainer, .react-calendar__month-view, .react-calendar__month-view > div':
          {
            height: 'inherit',
          },
        '.react-calendar__month-view > div > div': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 'inherit',
          p: 4,
        },
        '.react-calendar__tile:disabled': {
          display: 'none',
        },
      }}
      view="month"
      showNavigation={false}
      minDate={startOfWeek(new Date(), { weekStartsOn: 1 })}
      maxDate={endOfWeek(new Date(), { weekStartsOn: 1 })}
      value={activeDay}
      onClickDay={changedActiveDayHandler}
    />
  );
};

export default StudentCalendar;
