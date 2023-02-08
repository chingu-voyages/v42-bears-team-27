import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { endOfWeek, isSameDay, startOfWeek } from 'date-fns';

import { Calendar } from 'src/components/ui';
import type { IEvent } from 'src/interfaces';
import { fetcher } from 'src/services';
import EventView from './EventView';

const StudentCalendar = () => {
  const { data: eventsData } = useSWR<IEvent[]>(
    '/api/v0/classroom/events',
    fetcher,
  );

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
      <EventView eventId={activeDayEvent?._id ?? null} />
    </div>
  );
};

export default StudentCalendar;