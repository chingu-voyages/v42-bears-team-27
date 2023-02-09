/* eslint-disable @typescript-eslint/no-unused-vars */
import useSWR from 'swr';
import { BsEraser } from 'react-icons/bs';

import { IconButton } from 'src/components/ui';
import { IEventTask, IExercise, ILesson } from 'src/interfaces';
import { fetcher } from 'src/services';

type Props = {
  taskId: string;
  type: string;
  isEditMode: boolean;
  onRemoveTask: (taskId: string) => void;
};

const TaskItem: React.FC<Props> = ({
  taskId,
  type,
  isEditMode,
  onRemoveTask,
}) => {
  const { data: taskData } = useSWR<IEventTask>(
    `/api/v0/classroom/task/${taskId}`,
    fetcher,
  );

  if (!taskData) {
    return null;
  }

  const { subject, topic } = taskData.assignment as ILesson | IExercise;

  if (typeof subject === 'string') {
    return null;
  }

  return (
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        columnGap: 1,
        maxWidth: '95%',
        width: 400,
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
          {`${type === 'Lesson' ? '🔵' : '🟡'} ${type}:`}
        </p>
        <p>{`${subject.title} - ${topic}`}</p>
      </div>
      {isEditMode && (
        <IconButton onClick={() => onRemoveTask(taskId)}>
          <BsEraser size={24} />
        </IconButton>
      )}
    </div>
  );
};

export default TaskItem;
