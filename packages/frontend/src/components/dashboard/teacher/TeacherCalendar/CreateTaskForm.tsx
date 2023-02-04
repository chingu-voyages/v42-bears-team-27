import { useState, useMemo } from 'react';
import useSWR from 'swr';

import { Button } from 'src/components/ui';
import type { ISubject, ITask, ITopic } from 'src/interfaces';
import { fetcher } from 'src/services';
import { titleCase } from 'src/utils';

type Props = {
  error: string | null;
  onSubmit: (data: Omit<ITask, '_id' | 'event'>) => void;
};

// TODO: Add validators for input fields
// subjectValidator = (value: string) => value.trim().length > 0;
// topicValidator = (value: string) => value.trim().length > 0;
// typeValidator = (value: string) => value.trim().length > 0;

const CreateTaskForm: React.FC<Props> = ({ error, onSubmit }) => {
  const { data: subjectsData, isLoading } = useSWR<ISubject[]>(
    '/api/v0/classroom/subjects',
    fetcher,
  );

  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [type, setType] = useState('');

  const selectedSubject = useMemo<ISubject | null>(() => {
    if (!subjectsData) {
      return null;
    }

    const subjectIdx = subjectsData.findIndex((item) => item.title === subject);

    if (subjectIdx === -1) {
      return null;
    }

    return subjectsData[subjectIdx];
  }, [subject, subjectsData]);

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

  if (isLoading) {
    return (
      <p
        sx={{
          variant: 'text.h3',
          position: 'absolute',
          top: '40%',
          left: '50%',
          translate: '-50% -50%',
        }}
      >
        Loading Form...
      </p>
    );
  }

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
        {(subjectsData as ISubject[]).map(({ _id: id, title }) => (
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
        {selectedSubject?.topics.map(({ _id: id, title }) => (
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

export default CreateTaskForm;
