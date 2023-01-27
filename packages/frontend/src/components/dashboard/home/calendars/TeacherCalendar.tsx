/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useMemo } from 'react';
import { isSameDay, format } from 'date-fns';
import { MdAdd } from 'react-icons/md';

import { Calendar, type CalendarProps, Modal, IconButton } from 'components/ui';
import type { IEvent, ISubject } from 'interfaces';
import { titleCase } from 'src/utils';

import CreateEventForm from './CreateEventForm';

interface Props extends CalendarProps {
  events: IEvent[];
  subjects: ISubject[];
  onCreateEvent: (newEvent: IEvent) => void;
}

const TeacherCalendar: React.FC<Props> = ({
  sx,
  value,
  events,
  subjects,
  onCreateEvent,
  ...props
}) => {
  const activeDayEvent = useMemo<IEvent | null>(() => {
    const foundEventIdx = events.findIndex((event) =>
      isSameDay(value as Date, new Date(event.setAt)),
    );

    if (foundEventIdx === -1) {
      return null;
    }

    return { ...events[foundEventIdx] };
  }, [value, events]);

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
      <Calendar sx={{ width: '100%' }} value={value} {...props} />
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
          <CreateEventForm
            subjects={subjects}
            onSubmit={(data) =>
              onCreateEvent({ ...data, setAt: (value as Date).toISOString() })
            }
          />
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
