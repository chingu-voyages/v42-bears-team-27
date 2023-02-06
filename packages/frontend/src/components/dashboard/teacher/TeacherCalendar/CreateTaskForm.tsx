import { useState, useMemo } from 'react';
import useSWR from 'swr';

import Loader from 'src/components/common/Loader';
import { Button, Radio, RadioGroup } from 'src/components/ui';
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
      type: title as 'lesson' | 'exercise',
    };
    onSubmit(data);
  };

  if (isLoading) {
    return <Loader>Loading Form...</Loader>;
  }

  return (
    <form
      sx={{
        maxWidth: 480,
        width: '95%',
        mx: 'auto',
        '& > label, & > p': {
          variant: 'text.label',
          my: 3,
        },
      }}
      onSubmit={submitHandler}
    >
      <label htmlFor="subject-select">
        Select the subject
        <RadioGroup
          id="subject-select"
          sx={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            columnGap: 3,
            my: 3,
            width: '100%',
          }}
          onValueChange={(value) => {
            setSubject(value);
            setTopic('');
          }}
        >
          {(subjectsData as ISubject[]).map(({ _id: id, title }) => (
            <Radio key={id} id={id} label={titleCase(title)} value={title} />
          ))}
        </RadioGroup>
      </label>
      {selectedSubject ? (
        <label htmlFor="topic-select">
          Select the topic
          <RadioGroup
            id="topic-select"
            sx={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              columnGap: 3,
              my: 3,
              width: '100%',
            }}
            onValueChange={(value) => {
              setTopic(value);
              setType('');
            }}
          >
            {selectedSubject.topics.map(({ _id: id, title }) => (
              <Radio
                key={id}
                id={id}
                label={titleCase(title)}
                value={title}
                checked={title === topic}
              />
            ))}
          </RadioGroup>
        </label>
      ) : (
        <p>Select a subject to show a list of topics</p>
      )}
      {selectedTopic ? (
        <label htmlFor="task-select">
          Choose the type of task
          <RadioGroup
            id="task-select"
            sx={{ my: 3 }}
            onValueChange={(value) => setType(value)}
          >
            {selectedTopic.types.map((taskType, idx) => (
              <Radio
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                id={String(idx)}
                label={titleCase(taskType)}
                value={taskType}
                checked={taskType === type}
              />
            ))}
          </RadioGroup>
        </label>
      ) : (
        <p>Select a topic to show a list of types</p>
      )}
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
