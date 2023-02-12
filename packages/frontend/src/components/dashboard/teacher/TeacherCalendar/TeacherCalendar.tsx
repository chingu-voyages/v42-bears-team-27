import { useState, useMemo } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';
import useSWR from 'swr';
import { isSameDay } from 'date-fns';

import { Calendar } from 'src/components/ui';
import type { IEvent } from 'src/interfaces';
import { fetcher } from 'src/services';
import EventView from './EventView';

const containerStyles: ThemeUIStyleObject = {
  display: ['block', null, 'inline-block'],
  maxWidth: '95%',
  width: [480, 544, 576, 640],
  ml: [null, null, 4],
  mx: 'auto',
};

const TeacherCalendar: React.FC = () => {
  const { data: eventsData } = useSWR<IEvent[]>(
    '/api/v0/classroom/events',
    fetcher,
  );

  const [activeDay, setActiveDay] = useState<Date>(new Date());

  const activeDayEventId = useMemo(() => {
    if (!eventsData) {
      return null;
    }
    // Check if there is an event that exists for that day
    const foundEventIdx = eventsData.findIndex((event) =>
      isSameDay(activeDay as Date, new Date(event.setAt)),
    );

    if (foundEventIdx !== -1) {
      return eventsData[foundEventIdx]._id;
    }

    return null;
  }, [activeDay, eventsData]);

  const changedActiveDayHandler = (date: Date) => {
    setActiveDay(date);
  };

  return (
    <div sx={containerStyles}>
      <Calendar
        sx={{ width: '100%' }}
        value={activeDay}
        onClickDay={changedActiveDayHandler}
      />
      <EventView eventId={activeDayEventId} currentDay={activeDay} />
    </div>
  );
};

export default TeacherCalendar;
