import { useState, useMemo } from 'react';

import { Button } from 'components/ui';
import type { IEvent, ISubject, ITopic, IType } from 'interfaces';
import { titleCase } from 'src/utils';

type Props = {
  subjects: ISubject[];
  onSubmit: (data: Omit<IEvent, 'id' | 'dueDate' | 'setAt'>) => void;
};

// NOTE: File name to be renamed to CreateEventForm -> CreateTaskForm once refactored
// All event-specific (not task related) changes would be made elsewhere

const CreateEventForm: React.FC<Props> = ({ subjects, onSubmit }) => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [type, setType] = useState('');
  const [alert, setAlert] = useState<string | null>(null);

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
    setAlert(null);
    // Check if subject is selected
    if (!subject) {
      setAlert('WARNING: Subject is not selected');
    }
    // Check if topic is selected
    if (!topic) {
      setAlert(`WARNING: Topic is not selected for ${subject}`);
      return;
    }
    // Check if type is selected
    if (!type) {
      setAlert(`WARNING: Type is not selected for ${topic}`);
      return;
    }

    const { id, url } = (selectedTopic as ITopic).types.find(
      (item) => item.title === type,
    ) as IType;

    const submissionData = {
      tasks: [
        {
          id,
          type: type as 'lesson' | 'exercise' | 'test',
          subject,
          topic,
          sourceUrl: url,
        },
      ],
    };
    onSubmit(submissionData);
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
          <label key={id} sx={{ display: 'block' }} htmlFor={String(id)}>
            {titleCase(title)}
            <input
              id={String(id)}
              type="radio"
              name="subject"
              value={title}
              checked={subject === title}
              onChange={(e) => {
                setAlert(null);
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
          <label key={id} sx={{ display: 'block' }} htmlFor={String(id)}>
            {titleCase(title)}
            <input
              id={String(id)}
              type="radio"
              name="topic"
              value={title}
              checked={topic === title}
              onChange={(e) => {
                setAlert(null);
                setTopic(e.currentTarget.value);
                setType('');
              }}
            />
          </label>
        )) ?? <p>Select a subject to show a list of topics</p>}
      </fieldset>
      <fieldset>
        <legend>Choose the type of task</legend>
        {selectedTopic?.types.map(({ id, title }) => (
          <label key={id} sx={{ display: 'block' }} htmlFor={String(id)}>
            {titleCase(title)}
            <input
              id={String(id)}
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
      <p sx={{ variant: 'text.h4', color: 'warning', textAlign: 'center' }}>
        {alert}
      </p>
    </form>
  );
};

export default CreateEventForm;
