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
      }}
    >
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 3fr 1fr',
          alignItems: 'center',
          columnGap: 1,
          maxWidth: '95%',
          width: '30rem',
          mx: 'auto',
        }}
      >
        <p>
          {`${assignmentModel === 'Lesson' ? '🔵' : '🟡'} ${assignmentModel}:`}
        </p>
        <p>{`${subject.title} - ${topic}`}</p>
        <div sx={{ textAlign: 'center' }}>
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
