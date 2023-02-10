import { useState, useMemo } from 'react';
import useSWR from 'swr';

import Loader from 'src/components/common/Loader';
import { Button, Radio, RadioGroup } from 'src/components/ui';
import type { ISubject, IEventTask, ITopic, ITopicType } from 'src/interfaces';
import { fetcher } from 'src/services';

type Props = {
  error: string | null;
  onSubmit: (data: Omit<IEventTask, '_id' | 'event'>) => void;
};

const CreateTaskForm: React.FC<Props> = ({ error, onSubmit }) => {
  const { data: subjectsData, isLoading } = useSWR<ISubject[]>(
    '/api/v0/classroom/subjects',
    fetcher,
  );

  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const subject = useMemo<ISubject | null>(() => {
    if (!subjectsData) {
      return null;
    }

    const subjectIdx = subjectsData.findIndex(
      (item) => item.title === selectedSubject,
    );

    if (subjectIdx === -1) {
      return null;
    }

    return subjectsData[subjectIdx];
  }, [selectedSubject, subjectsData]);

  const topic = useMemo<ITopic | null>(() => {
    const topicIdx =
      subject?.topics.findIndex((item) => item.slug === selectedTopic) ?? -1;

    if (topicIdx === -1) {
      return null;
    }

    return (subject as ISubject).topics[topicIdx];
  }, [subject, selectedTopic]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!topic) {
      return null;
    }
    // Look in material for task of topic
    const foundMaterialIdx = topic.types.findIndex((type) => {
      const { materialModel } = type as ITopicType;
      return materialModel === selectedType;
    });
    if (foundMaterialIdx === -1) {
      return null;
    }
    // Extract the id of that material
    const { material: assignmentId, materialModel } = topic.types[
      foundMaterialIdx
    ] as ITopicType;
    // Submit new task data
    const data = {
      assignment: assignmentId,
      assignmentModel: materialModel,
    };
    setSelectedSubject('');
    setSelectedTopic('');
    setSelectedType('');
    return onSubmit(data);
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
            setSelectedSubject(value);
            setSelectedTopic('');
          }}
        >
          {(subjectsData as ISubject[]).map(({ _id: id, title }) => (
            <Radio
              key={id}
              id={id}
              label={title}
              value={title}
              checked={title === selectedSubject}
            />
          ))}
        </RadioGroup>
      </label>
      {subject ? (
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
              setSelectedTopic(value);
              setSelectedType('');
            }}
          >
            {subject.topics.map(({ _id: id, slug, title }) => (
              <Radio
                key={id}
                id={id}
                label={title}
                value={slug}
                checked={slug === selectedTopic}
              />
            ))}
          </RadioGroup>
        </label>
      ) : (
        <p>Select a subject to show a list of topics</p>
      )}
      {topic ? (
        <label htmlFor="task-select">
          Choose the type of task
          <RadioGroup
            id="task-select"
            sx={{ my: 3 }}
            onValueChange={(value) => setSelectedType(value)}
          >
            {topic.types.map((type, idx) => {
              if (typeof type === 'string') {
                return null;
              }

              return (
                <Radio
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  id={String(idx)}
                  label={type.materialModel}
                  value={type.materialModel}
                />
              );
            })}
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
