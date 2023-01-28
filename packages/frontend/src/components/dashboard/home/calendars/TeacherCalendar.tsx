/* eslint-disable no-nested-ternary */
import { useState, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import { isSameDay, format } from 'date-fns';
import { MdAdd } from 'react-icons/md';

import { Calendar, type CalendarProps, Modal, IconButton } from 'components/ui';
import type { IEvent, ISubject } from 'interfaces';
import { titleCase } from 'src/utils';
import {
  getClassroomEvents,
  postClassroomEvent,
  putClassroomEvent,
} from 'src/services';

import CreateEventForm from './CreateEventForm';

// const DUMMY_EVENTS_DATA: IEvent[] = [
//   {
//     id: 0,
//     dueDate: new Date().toISOString(),
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
    // Check if there is an event that exists for that day
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

  const createEventHandler = (
    newEvent: Omit<IEvent, 'id' | 'dueDate' | 'setAt'>,
  ) => {
    const currEvents = eventsData ? [...eventsData] : [];

    const transformedEvent = {
      ...newEvent,
      dueDate: (activeDay as Date).toISOString(),
      setAt: (activeDay as Date).toISOString(),
    };
    // Check if similar event exists already
    const foundExistingEventIdx = currEvents.findIndex((event) =>
      isSameDay(new Date(transformedEvent.setAt), new Date(event.setAt)),
    );

    // If similar event does exit, then update similar event with new form data
    if (foundExistingEventIdx !== -1) {
      const updatedEvent = {
        ...currEvents[foundExistingEventIdx],
        tasks: [
          ...currEvents[foundExistingEventIdx].tasks,
          ...transformedEvent.tasks,
        ],
      };
      putClassroomEvent(updatedEvent);
    } else {
      // Or otherwise, add a new event using the form data
      postClassroomEvent(transformedEvent);
    }
    // Re-fetch for updated events
    setShouldFetch(true);
  };

  return (
    <div
      sx={{
        display: ['block', null, 'inline-block'],
        maxWidth: '95%',
        width: [480, 544, 576, 640],
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
          title="Create New Task"
          width="min(90%, 640px)"
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
          <div sx={{ height: '60%', mx: 5, overflowY: 'auto' }}>
            {activeDayEvent.tasks.map(({ id, type, subject, topic }) => (
              <div
                key={id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  columnGap: 1,
                }}
              >
                <p sx={{ width: 128 }}>
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
