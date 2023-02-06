/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md';

import type { IStudentTask, ITask } from 'src/interfaces';
import { titleCase } from 'src/utils';

// TODO: Refactor IStudentTask interface so this is not needed
interface IPopulatedStudentTask extends Omit<IStudentTask, 'taskID'> {
  _id: string;
  task: ITask;
}

// const DUMMY_TASKS_DATA: IPopulatedStudentTask[] = [
//   {
//     _id: '0',
//     task: {
//       _id: '0',
//       event: '1234',
//       subject: 'english',
//       topic: 'punctuation',
//       type: 'lesson',
//     },
//     completed: true,
//     event: '1234',
//   },
// ];

const EventView: React.FC = () => {
  const [tasks] = useState<IPopulatedStudentTask[]>([]);

  return (
    <div
      sx={{
        variant: 'text.label',
        position: 'relative',
        height: 240,
        color: 'primary',
        border: '1px solid',
        borderColor: 'gray',
        p: 3,
      }}
    >
      <h2 sx={{ variant: 'text.h4', textAlign: 'center' }}>Your Tasks:</h2>

      <div sx={{ height: '40%', overflowY: 'auto' }}>
        {tasks.length > 0 ? (
          tasks.map(({ _id, task, completed }) => {
            if (typeof task === 'string') {
              return null;
            }

            const { subject, topic, type } = task;

            return (
              <div
                key={_id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  columnGap: 1,
                  width: '95%',
                  mx: 'auto',
                }}
              >
                <div
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: 1,
                  }}
                >
                  <p sx={{ width: 128 }}>
                    {`${type === 'lesson' ? '🔵' : '🟡'} ${titleCase(type)}:`}
                  </p>
                  <p>{titleCase(`${subject} - ${topic}`)}</p>
                  <div sx={{ width: 160, textAlign: 'center' }}>
                    {!completed ? (
                      <MdOutlineCheckBoxOutlineBlank size={24} />
                    ) : (
                      <MdOutlineCheckBox size={24} />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p sx={{ textAlign: 'center', py: 3, m: 0 }}>
            No tasks for today :¬)
          </p>
        )}
      </div>
    </div>
  );
};

export default EventView;
