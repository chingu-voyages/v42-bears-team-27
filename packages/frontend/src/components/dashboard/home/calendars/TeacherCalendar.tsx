/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useMemo } from 'react';
import { isSameDay, format } from 'date-fns';

import { Calendar, type CalendarProps } from 'components/ui';
import type { IEvent } from 'interfaces';
import { titleCase } from 'src/utils';

interface Props extends CalendarProps {
  events: IEvent[];
}

const TeacherCalendar: React.FC<Props> = ({ sx, value, events, ...props }) => {
  const activeDayEvent = useMemo<IEvent | null>(() => {
    const foundEventIdx = events.findIndex((event) =>
      isSameDay(value as Date, event.createdAt),
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
          height: 320,
          color: 'primary',
          border: '1px solid',
          borderColor: 'gray',
          p: 3,
        }}
      >
        <h2 sx={{ variant: 'text.h4', textAlign: 'center' }}>
          Tasks Assigned:
        </h2>
        <p sx={{ textAlign: 'center' }}>{`${
          activeDayEvent
            ? `Due Date: ${format(activeDayEvent.dueDate, 'PP')}`
            : 'No tasks'
        }`}</p>
        {activeDayEvent && (
          <div sx={{ height: '60%', mt: 3, mx: 5, overflowY: 'auto' }}>
            {activeDayEvent.tasks.map(({ id, type, subject, topic }) => (
              <div key={id} sx={{ display: 'flex', columnGap: 1 }}>
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
