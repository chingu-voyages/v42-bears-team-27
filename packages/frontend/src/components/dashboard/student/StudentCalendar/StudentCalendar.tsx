/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from 'react';
import { endOfWeek, isSameDay, startOfWeek } from 'date-fns';

import Loader from 'src/components/common/Loader';
import { Calendar } from 'src/components/ui';
import type { IEvent } from 'src/interfaces';
import EventView from './EventView';

// const DUMMY_EVENTS_DATA: IEvent[] = [
//   {
//     _id: '0',
//     dueDate: new Date().toISOString(),
//     setAt: new Date().toISOString(),
//     tasks: [
//       {
//         _id: '0',
//         event: '1234',
//         subject: 'english',
//         topic: 'punctuation',
//         type: 'lesson',
//       },
//     ],
//   },
// ];

const StudentCalendar = () => {
  const [eventsData] = useState<IEvent[]>([]);
  const [activeDay, setActiveDay] = useState<Date>(new Date());

  const activeDayEvent = useMemo(() => {
    if (!eventsData) {
      return null;
    }
    // Check if there is an event that exists for that day
    const foundEventIdx = eventsData.findIndex((event) =>
      isSameDay(activeDay as Date, new Date(event.setAt)),
    );

    if (foundEventIdx !== -1) {
      return eventsData[foundEventIdx];
    }

    return null;
  }, [activeDay, eventsData]);

  const changedActiveDayHandler = (date: Date) => {
    setActiveDay(date);
  };

  return (
    <div sx={{ maxWidth: '95%', width: [480, 544, 576, 640], mx: 'auto' }}>
      <Calendar
        sx={{
          width: '100%',
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
      {activeDayEvent ? (
        <EventView />
      ) : (
        <div sx={{ position: 'relative', bottom: -6 }}>
          <Loader sx={{ position: 'absolute' }}>Loading Tasks...</Loader>
        </div>
      )}
    </div>
  );
};

export default StudentCalendar;
