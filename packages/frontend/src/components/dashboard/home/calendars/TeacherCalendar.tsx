/* eslint-disable no-nested-ternary */
import { useState, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import { isSameDay, format } from 'date-fns';
import { MdAdd } from 'react-icons/md';

import { Calendar, type CalendarProps, Modal, IconButton } from 'components/ui';
import type { IEvent, ISubject } from 'interfaces';
import { titleCase } from 'src/utils';
import { putClassroom, getClassroomEvents } from 'src/services';

import CreateEventForm from './CreateEventForm';

// const DUMMY_EVENTS_DATA: IEvent[] = [
//   {
//     dueDate: new Date('December 21, 2023').toISOString(),
//     setAt: new Date().toISOString(),
//     tasks: [
//       {
//         id: 0,
//         subject: 'english',
//         topic: 'punctuation',
//         type: 'lesson',
//         sourceUrl: '/',
//       },
//       {
//         id: 2,
//         subject: 'history',
//         topic: 'cold war',
//         type: 'test',
//         sourceUrl: '/',
//       },
//     ],
//   },
// ];

interface Props extends CalendarProps {
  subjects: ISubject[];
}

const TeacherCalendar: React.FC<Props> = ({ sx, subjects }) => {
  const [shouldFetch, setShouldFetch] = useState(true);
  const [activeDay, setActiveDay] = useState<Date>(new Date());

  const { data: eventsData } = useSWR(
    shouldFetch ? '/api/v0/classroom/events' : null,
    getClassroomEvents,
  );

  useEffect(() => {
    if (eventsData) {
      setShouldFetch(false);
    }
  }, [eventsData]);

  const activeDayEvent = useMemo<IEvent | null>(() => {
    if (!eventsData) {
      return null;
    }

    const foundEventIdx = eventsData.findIndex((event) =>
      isSameDay(activeDay as Date, new Date(event.setAt)),
    );

    if (foundEventIdx !== -1) {
      return { ...eventsData[foundEventIdx] };
    }

    return null;
  }, [activeDay, eventsData]);

  const changedActiveDayHandler = (date: Date) => {
    setActiveDay(date);
  };

  const createEventHandler = (newEvent: Omit<IEvent, 'setAt'>) => {
    const transformedEvent = {
      ...newEvent,
      setAt: (activeDay as Date).toISOString(),
    };
    const currEvents = eventsData ? [...eventsData] : [];

    const foundExistingEventIdx = currEvents.findIndex((event) =>
      isSameDay(new Date(transformedEvent.setAt), new Date(event.setAt)),
    );

    if (foundExistingEventIdx !== -1) {
      currEvents[foundExistingEventIdx] = {
        ...currEvents[foundExistingEventIdx],
        tasks: [
          ...currEvents[foundExistingEventIdx].tasks,
          ...transformedEvent.tasks,
        ],
      };

      putClassroom(currEvents);
    } else {
      putClassroom([...currEvents, transformedEvent]);
    }

    setShouldFetch(true);
  };

  return (
    <div
      sx={{
        display: ['block', null, 'inline-block'],
        width: [448, null, null, 520],
        ml: [null, null, 4],
        mx: 'auto',
        ...sx,
      }}
    >
      <Calendar
        sx={{ width: '100%' }}
        value={activeDay}
        onClickDay={changedActiveDayHandler}
      />
      <div
        sx={{
          variant: 'text.label',
          position: 'relative',
          height: 320,
          color: 'primary',
          border: '1px solid',
          borderColor: 'gray',
          p: 3,
        }}
      >
        <Modal
          title="Create New Event"
          width="50%"
          height="80vh"
          btn={
            <IconButton sx={{ position: 'absolute', top: 3, right: 3 }}>
              <MdAdd size="inherit" />
            </IconButton>
          }
        >
          <CreateEventForm subjects={subjects} onSubmit={createEventHandler} />
        </Modal>

        <h2 sx={{ variant: 'text.h4', textAlign: 'center' }}>
          Tasks Assigned:
        </h2>
        <p sx={{ textAlign: 'center' }}>{`${
          activeDayEvent
            ? `Due Date: ${format(new Date(activeDayEvent.dueDate), 'PP')}`
            : 'No tasks'
        }`}</p>

        {activeDayEvent && (
          <div sx={{ height: '60%', mt: 3, mx: 5, overflowY: 'auto' }}>
            {activeDayEvent.tasks.map(({ id, type, subject, topic }) => (
              <div
                key={id}
                sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}
              >
                <p sx={{ width: '40%' }}>
                  {`
                  ${
                    type === 'lesson' ? '🔵' : type === 'exercise' ? '🟡' : '🟣'
                  } ${titleCase(type)}:
                  `}
                </p>
                <p>{titleCase(`${subject} - ${topic}`)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCalendar;
