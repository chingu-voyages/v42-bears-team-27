import { useState, useMemo } from 'react';

import { Button } from 'src/components/ui';
import type { ISubject, ITask, ITopic } from 'src/interfaces';
import { titleCase } from 'src/utils';

type Props = {
  subjects: ISubject[];
  error: string | null;
  onSubmit: (data: Omit<ITask, 'id'>) => void;
};

// NOTE: File name to be renamed to CreateEventForm -> CreateTaskForm once refactored
// All event-specific (not task related) changes would be made elsewhere

// TODO: Add validators for input fields
// subjectValidator = (value: string) => value.trim().length > 0;
// topicValidator = (value: string) => value.trim().length > 0;
// typeValidator = (value: string) => value.trim().length > 0;

const CreateEventForm: React.FC<Props> = ({ subjects, error, onSubmit }) => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [type, setType] = useState('');

  const selectedSubject = useMemo<ISubject | null>(() => {
    const subjectIdx = subjects.findIndex((item) => item.title === subject);

    if (subjectIdx === -1) {
      return null;
    }

    return subjects[subjectIdx];
  }, [subject, subjects]);

  const selectedTopic = useMemo<ITopic | null>(() => {
    const topicIdx =
      selectedSubject?.topics.findIndex((item) => item.title === topic) ?? -1;

    if (topicIdx === -1) {
      return null;
    }

    return (selectedSubject as ISubject).topics[topicIdx];
  }, [selectedSubject, topic]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Extract title of type of task
    const title = (selectedTopic as ITopic).types.find((item) => item === type);
    // Submit form data
    const data = {
      subject,
      topic,
      type: title as 'lesson' | 'exercise' | 'test',
    };
    onSubmit(data);
  };

  return (
    <form
      sx={{
        maxWidth: 480,
        width: '95%',
        mx: 'auto',
        '& > fieldset': {
          variant: 'text.label',
          mb: 3,
        },
      }}
      onSubmit={submitHandler}
    >
      <fieldset>
        <legend>Choose the subject</legend>
        {subjects.map(({ id, title }) => (
          <label key={id} sx={{ display: 'block' }} htmlFor={id}>
            {titleCase(title)}
            <input
              id={id}
              type="radio"
              name="subject"
              value={title}
              checked={subject === title}
              onChange={(e) => {
                setSubject(e.currentTarget.value);
                setTopic('');
              }}
            />
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Choose the topic</legend>
        {selectedSubject?.topics.map(({ id, title }) => (
          <label key={id} sx={{ display: 'block' }} htmlFor={id}>
            {titleCase(title)}
            <input
              id={id}
              type="radio"
              name="topic"
              value={title}
              checked={topic === title}
              onChange={(e) => {
                setTopic(e.currentTarget.value);
                setType('');
              }}
            />
          </label>
        )) ?? <p>Select a subject to show a list of topics</p>}
      </fieldset>
      <fieldset>
        <legend>Choose the type of task</legend>
        {selectedTopic?.types.map((title, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <label key={idx} sx={{ display: 'block' }} htmlFor={String(idx)}>
            {titleCase(title)}
            <input
              id={String(idx)}
              type="radio"
              name="type"
              value={title}
              checked={type === title}
              onChange={(e) => setType(e.currentTarget.value as typeof type)}
            />
          </label>
        )) ?? <p>Select a topic to show a list of types</p>}
      </fieldset>
      <Button sx={{ width: '100%' }} rounded={false} type="submit">
        Add Task
      </Button>
      {error && (
        <p sx={{ variant: 'text.h4', color: 'error', textAlign: 'center' }}>
          {error}
        </p>
      )}
    </form>
  );
};

export default CreateEventForm;
