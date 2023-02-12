import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md';

import type { IEventTask } from 'src/interfaces';

type Props = {
  task: IEventTask;
  completed: boolean;
};

const TaskItem: React.FC<Props> = ({ task, completed }) => {
  const { assignment, assignmentModel } = task;

  if (typeof assignment === 'string') {
    return null;
  }

  const { subject, topic } = assignment;

  if (typeof subject === 'string') {
    return null;
  }

  return (
    <div
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
          {`${assignmentModel === 'Lesson' ? '🔵' : '🟡'} ${assignmentModel}:`}
        </p>
        <p>{`${subject.title} - ${topic}`}</p>
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
};

export default TaskItem;
