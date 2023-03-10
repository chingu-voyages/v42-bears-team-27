import { useState, useEffect } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';
import { useSWRConfig } from 'swr';
import useSWRImmutable from 'swr/immutable';
import { format, isSameDay } from 'date-fns';
import { MdAdd, MdCheck, MdEdit } from 'react-icons/md';

import Loader from 'src/components/common/Loader';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  IconButton,
} from 'src/components/ui';
import type { IEvent, IEventTask } from 'src/interfaces';
import {
  fetcher,
  postClassroomEvent,
  postClassroomTask,
  deleteClassroomEvent,
  deleteClassroomTask,
  putClassroomEvent,
} from 'src/services';
import CreateTaskForm from './CreateTaskForm';
import TaskItem from './TaskItem';

// eslint-disable-next-line no-promise-executor-return
const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const containerStyles: ThemeUIStyleObject = {
  variant: 'text.label',
  position: 'relative',
  minHeight: '20rem',
  color: 'text',
  p: 4,
  bg: 'secondary',
  borderTop: '3px solid',
  borderColor: 'primary',
  borderBottomRightRadius: 7,
  borderBottomLeftRadius: 7,
};

type Props = {
  eventId: string | null;
  currentDay: Date;
};

const EventView: React.FC<Props> = ({ eventId, currentDay }) => {
  const { mutate } = useSWRConfig();
  const {
    data: eventData,
    isLoading,
    mutate: mutateEventData,
  } = useSWRImmutable<IEvent>(
    eventId ? `/api/v0/classroom/event/${eventId}` : null,
    fetcher,
  );

  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [alert]);

  useEffect(() => {
    const timer = setTimeout(() => setError(null), 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const addTaskHandler = async (newTask: Omit<IEventTask, '_id' | 'event'>) => {
    try {
      if (eventData) {
        // If there is already an event on the active
        // then update that existing classroom event with the new data
        // Submit data to create new task
        const { message } = await postClassroomTask({
          event: eventData._id,
          ...newTask,
        });
        // Update alert with api response message
        setAlert(message);
        // Fetch updated event
        mutateEventData();
        // NOTE: StudentTable component relies on classroom endpoint
        // for student tasks and therefore need to revalidate classroom
        mutate('/api/v0/classroom');
      } else {
        // Or otherwise, add a new classroom event with the data
        const newEvent = {
          dueDate: new Date(currentDay.setHours(0, 0, 0, 0)).toISOString(),
          setAt: new Date(currentDay.setHours(0, 0, 0, 0)).toISOString(),
        };
        // Submit data to create new event
        const { _id: newEventId } = await postClassroomEvent(newEvent);
        // Use new event id to add new task
        const { message } = await postClassroomTask({
          event: newEventId,
          ...newTask,
        });
        // Update alert with api response message
        setAlert(message);
        // Revalidate classroom events
        mutate('/api/v0/classroom/events');
        // NOTE: See line 96
        mutate('/api/v0/classroom');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }

      setError(`Unexpected error ${err}`);
    }
  };

  const removeTaskHandler = async (taskId: string) => {
    try {
      // Remove task from event
      const { message } = await deleteClassroomTask(taskId);
      // Update alert with api response message
      setAlert(message);
      // Fetch updated event
      mutateEventData();
      // NOTE: See line 96
      mutate('/api/v0/classroom');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }

      setError(`Unexpected error ${err}`);
    }
  };

  const editEventHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedDueDate = e.currentTarget.dueDate.value;
    if (!eventData) {
      return;
    }

    if (isSameDay(new Date(eventData?.dueDate), new Date(updatedDueDate))) {
      // If due-date was not updated, then don't update event
      setIsEditMode(false);
      return;
    }

    try {
      // If there is already an event on the active
      // then update that existing classroom event with the new data
      const updateEvent = {
        _id: eventData._id,
        dueDate: updatedDueDate,
      };
      // Submit data to update event
      const { message } = await putClassroomEvent(updateEvent);
      // Update alert with api response message
      setAlert(message);
      // Update the local data immediately and revalidate (refetch)
      mutateEventData({ ...eventData, dueDate: updatedDueDate });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }

      setError(`Unexpected error ${err}`);
    }

    setIsEditMode(false);
  };

  const removeEventHandler = async () => {
    try {
      if (eventData) {
        // If there is already an event on the active
        // then delete that existing classroom event
        // Remove event from classroom
        const { message } = await deleteClassroomEvent(eventData._id);
        // Update alert with api response message
        setAlert(message);
        // Revalidate classroom events
        mutate('/api/v0/classroom/events');
        // NOTE: See line 96
        mutate('/api/v0/classroom');
        // Wait and close modal afterwards
        wait().then(() => setOpen(false));
        // Turn off edit mode
        setIsEditMode(false);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }

      setError(`Unexpected error ${err}`);
    }
  };

  if (isLoading) {
    return (
      <div sx={containerStyles}>
        <Loader>Loading Event...</Loader>
      </div>
    );
  }

  return (
    <div sx={containerStyles}>
      <Dialog>
        <DialogTrigger asChild>
          <IconButton
            aria-label="Create task"
            onClick={() => {
              setError(null);
              setAlert(null);
            }}
            sx={{ position: 'absolute', top: 3, right: 5 }}
          >
            <MdAdd size={32} />
          </IconButton>
        </DialogTrigger>
        <DialogContent
          title="Create New Task"
          width="min(90%, 640px)"
          height="80vh"
        >
          <CreateTaskForm error={error} onSubmit={addTaskHandler} />
          {alert && (
            <p
              sx={{
                variant: 'text.h4',
                color: 'info',
                textAlign: 'center',
              }}
            >
              {alert}
            </p>
          )}
        </DialogContent>
      </Dialog>

      <div
        sx={{
          display: 'inline',
        }}
      >
        {eventData && !isEditMode && (
          <IconButton
            aria-label="Edit event"
            sx={{ position: 'absolute', top: '20px', right: 3 }}
            onClick={() => setIsEditMode(true)}
          >
            <MdEdit size={24} />
          </IconButton>
        )}

        <h2 sx={{ variant: 'text.h4', textAlign: 'center' }}>
          Tasks Assigned:
        </h2>

        <div
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {eventData &&
            (!isEditMode ? (
              <p sx={{ textAlign: 'center', flexGrow: 1 }}>{`Due Date: ${format(
                new Date(eventData.dueDate),
                'PP',
              )}`}</p>
            ) : (
              <form sx={{ my: 3 }} onSubmit={editEventHandler}>
                <label htmlFor="due-date">
                  Update Due Date:
                  <input
                    sx={{ ml: 3 }}
                    id="due-date"
                    type="date"
                    name="dueDate"
                    defaultValue={format(
                      new Date(eventData.dueDate),
                      'yyyy-MM-dd',
                    )}
                  />
                </label>
                <IconButton
                  aria-label="Update event"
                  sx={{ position: 'absolute', top: '20px', right: 3 }}
                  // @ts-ignore
                  type="submit"
                >
                  <MdCheck size={24} />
                </IconButton>
              </form>
            ))}
        </div>

        <div sx={{ overflowY: 'auto' }}>
          {eventData?.tasks && eventData.tasks.length > 0 ? (
            eventData.tasks.map(({ _id, assignmentModel }) => (
              <TaskItem
                key={_id}
                taskId={_id}
                type={assignmentModel}
                isEditMode={isEditMode}
                onRemoveTask={removeTaskHandler}
              />
            ))
          ) : (
            <p sx={{ textAlign: 'center', py: 3, m: 0 }}>No tasks</p>
          )}
        </div>

        {isEditMode && (
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button
                sx={{ variant: 'buttons.danger', mx: 'auto' }}
                rounded={false}
              >
                Delete Event
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent
              sx={{ p: 4 }}
              title="Are you sure you want to delete this event?"
              description="Once this event is deleted, all students progress for this event would be lost"
              width={480}
              height="min-content"
              onConfirm={removeEventHandler}
            />
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default EventView;
