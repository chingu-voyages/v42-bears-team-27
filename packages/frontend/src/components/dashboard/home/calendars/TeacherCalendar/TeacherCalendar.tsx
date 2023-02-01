/* eslint-disable no-nested-ternary */
import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { isSameDay, format } from 'date-fns';
import { MdAdd } from 'react-icons/md';

import {
  Calendar,
  Dialog,
  DialogContent,
  DialogTrigger,
  IconButton,
} from 'src/components/ui';
import type { IEvent, ISubject, ITask } from 'src/interfaces';
import { fetcher, postClassroomEvent, putClassroomEvent } from 'src/services';
import { titleCase } from 'src/utils';
import CreateTaskForm from './CreateTaskForm';

// const DUMMY_EVENTS_DATA: IEvent[] = [
//   {
//     id: '0',
//     dueDate: new Date().toISOString(),
//     setAt: new Date().toISOString(),
//     tasks: [
//       {
//         id: '0',
//         subject: 'english',
//         topic: 'punctuation',
//         type: 'lesson',
//       },
//       {
//         id: '1',
//         subject: 'history',
//         topic: 'cold war',
//         type: 'test',
//       },
//     ],
//   },
// ];

const TeacherCalendar: React.FC = () => {
  const { data: eventsData } = useSWR<IEvent[]>(
    '/api/v0/classroom/events',
    fetcher,
  );
  const { data: subjectsData } = useSWR<ISubject[]>(
    '/api/v0/classroom/subjects',
    fetcher,
  );

  const [activeDay, setActiveDay] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<string | null>(null);

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

  const addTaskHandler = async (newTask: Omit<ITask, 'id'>) => {
    try {
      if (activeDayEvent) {
        // If there is already an event on the active
        // then update that existing classroom event with the new data
        const msg = await putClassroomEvent({
          id: activeDayEvent.id,
          tasks: [...activeDayEvent.tasks, newTask] as ITask[],
        });
        // Update alert with api response message
        setAlert(msg);
      } else {
        // Or otherwise, add a new classroom event with the data
        const newEvent = {
          tasks: [newTask],
          dueDate: new Date(activeDay.setHours(0, 0, 0, 0)).toISOString(),
          setAt: new Date(activeDay.setHours(0, 0, 0, 0)).toISOString(),
        };
        // Submit form data
        const msg = await postClassroomEvent(newEvent as IEvent);
        // Update alert with api response message
        setAlert(msg);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }

      setError(`Unexpected error ${err}`);
    }
  };

  return (
    <div
      sx={{
        display: ['block', null, 'inline-block'],
        maxWidth: '95%',
        width: [480, 544, 576, 640],
        ml: [null, null, 4],
        mx: 'auto',
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
        <Dialog>
          <DialogTrigger asChild>
            <IconButton sx={{ position: 'absolute', top: 3, right: 3 }}>
              <MdAdd size={32} />
            </IconButton>
          </DialogTrigger>
          <DialogContent
            title="Create New Task"
            width="min(90%, 640px)"
            height="80vh"
          >
            <CreateTaskForm
              subjects={subjectsData as ISubject[]}
              error={error}
              onSubmit={addTaskHandler}
            />
            {alert && (
              <p
                sx={{ variant: 'text.h4', color: 'info', textAlign: 'center' }}
              >
                {alert}
              </p>
            )}
          </DialogContent>
        </Dialog>

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
            {activeDayEvent.tasks.map(({ type, subject, topic }, idx) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
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
