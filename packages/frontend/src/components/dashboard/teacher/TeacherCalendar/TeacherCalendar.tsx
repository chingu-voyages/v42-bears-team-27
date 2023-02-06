/* eslint-disable no-nested-ternary */
import { useState, useMemo, useContext } from 'react';
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
import useSocket from 'src/hooks/use-socket';
import type { IEvent, ISubject, ITask } from 'src/interfaces';
import { fetcher, postClassroomEvent, putClassroomEvent } from 'src/services';
import { titleCase } from 'src/utils';
import { AuthContext } from 'src/store/auth/auth-context';
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
  const { socket } = useSocket({
    uri: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    options: {},
  });

  const authCtx = useContext(AuthContext);

  const { data: eventsData, mutate: mutateEventsData } = useSWR<IEvent[]>(
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

  socket?.emit('user-logged-in', { ...authCtx?.user, role: authCtx?.role });

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

  const addTaskHandler = async (newTask: Omit<ITask, '_id'>) => {
    try {
      if (activeDayEvent) {
        // If there is already an event on the active
        // then update that existing classroom event with the new data
        const updateEvent = {
          _id: activeDayEvent._id,
          tasks: [...activeDayEvent.tasks, newTask],
        } as IEvent;
        // Submit form data
        const msg = await putClassroomEvent(updateEvent);
        // Fetch updated events
        mutateEventsData();
        // Update alert with api response message
        setAlert(msg);
      } else {
        // Or otherwise, add a new classroom event with the data
        const newEvent = {
          tasks: [newTask],
          dueDate: new Date(activeDay.setHours(0, 0, 0, 0)).toISOString(),
          setAt: new Date(activeDay.setHours(0, 0, 0, 0)).toISOString(),
        } as IEvent;
        // Submit form data
        const msg = await postClassroomEvent(newEvent);
        // Fetch updated events
        mutateEventsData();
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
