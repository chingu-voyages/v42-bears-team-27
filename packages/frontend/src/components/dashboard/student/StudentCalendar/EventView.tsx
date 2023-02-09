import useSWR from 'swr';
import type { ThemeUIStyleObject } from 'theme-ui';

import Loader from 'src/components/common/Loader';
import type { IStudentTask, IEventTask } from 'src/interfaces';
import { fetcher } from 'src/services';
import TaskItem from './TaskItem';

// TODO: Refactor IStudentTask interface so this is not needed
interface IPopulatedStudentTask extends Omit<IStudentTask, 'taskID'> {
  _id: string;
  taskID: string | IEventTask;
}

const containerStyles: ThemeUIStyleObject = {
  variant: 'text.label',
  position: 'relative',
  height: 288,
  color: 'primary',
  border: '1px solid',
  borderColor: 'gray',
  p: 3,
};

type Props = {
  eventId: string | null;
};

const EventView: React.FC<Props> = ({ eventId }) => {
  const { data: tasksData, isLoading } = useSWR<IPopulatedStudentTask[]>(
    eventId ? `/api/v0/student/tasks?eventID=${eventId}` : null,
    fetcher,
  );

  if (isLoading) {
    return (
      <div sx={containerStyles}>
        <Loader>Loading Tasks...</Loader>
      </div>
    );
  }

  return (
    <div sx={containerStyles}>
      <h2 sx={{ variant: 'text.h4', textAlign: 'center' }}>Your Tasks:</h2>

      <div sx={{ height: '60%', overflowY: 'auto' }}>
        {tasksData ? (
          tasksData.map(({ _id, taskID: task, completed }) => (
            <TaskItem
              key={_id}
              task={task as IEventTask}
              completed={completed}
            />
          ))
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
