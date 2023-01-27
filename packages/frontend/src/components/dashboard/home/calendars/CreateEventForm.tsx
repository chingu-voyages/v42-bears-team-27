import { useState } from 'react';
import { format } from 'date-fns';

import { Button, TextField } from 'components/ui';
import type { IEvent, ISubject } from 'interfaces';

type Props = {
  subjects: ISubject[];
  onSubmit: (data: Omit<IEvent, 'setAt'>) => void;
};

const CreateEventForm: React.FC<Props> = ({ subjects, onSubmit }) => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [type, setType] = useState<'lesson' | 'exercise' | 'test'>('lesson');
  const [dueDate, setDueDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [alert, setAlert] = useState<string | null>(null);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert(null);

    const sanitizedSubjectInput = subject.toLowerCase();
    const sanitizedTopicInput = topic.toLowerCase();

    const foundSubjectIdx = subjects.findIndex(
      (item) => item.title === sanitizedSubjectInput,
    );

    if (foundSubjectIdx === -1) {
      setAlert('Warning: subject does not exist in your classroom');
      return;
    }

    const foundTopicIdx = subjects[foundSubjectIdx].topics.findIndex(
      (item) => item.title === sanitizedTopicInput,
    );

    if (foundTopicIdx === -1) {
      setAlert(`Warning: topic does not exist in ${subject}`);
      return;
    }

    const foundTypeIdx = subjects[foundSubjectIdx].topics[
      foundTopicIdx
    ].types.findIndex((item) => item.title === type);

    if (foundTopicIdx === -1) {
      setAlert(`Warning: topic does not exist in ${subject}`);
      return;
    }

    const { id, url } =
      subjects[foundSubjectIdx].topics[foundTopicIdx].types[foundTypeIdx];

    const data = {
      dueDate: new Date(dueDate).toISOString(),
      tasks: [
        {
          id,
          type,
          subject: sanitizedSubjectInput,
          topic: sanitizedTopicInput,
          sourceUrl: url,
        },
      ],
    };
    onSubmit(data);
  };

  return (
    <form
      sx={{
        maxWidth: 480,
        width: '95%',
        mx: 'auto',
        '& > div': {
          mb: 4,
        },
      }}
      onSubmit={submitHandler}
    >
      <TextField
        id="subject"
        label="Subject"
        value={subject}
        required
        onChange={(e) => setSubject(e.currentTarget.value)}
      />
      <TextField
        id="topic"
        label="Topic"
        value={topic}
        required
        onChange={(e) => setTopic(e.currentTarget.value)}
      />
      <fieldset>
        <legend>Choose the type of task</legend>
        <label htmlFor="lesson">
          Lesson
          <input
            type="radio"
            id="lesson"
            name="type"
            value="lesson"
            checked={type === 'lesson'}
            onChange={(e) => setType(e.currentTarget.value as typeof type)}
          />
        </label>
        <br />
        <label htmlFor="exercise">
          Exercise
          <input
            type="radio"
            id="exercise"
            name="type"
            value="exercise"
            checked={type === 'exercise'}
            onChange={(e) => setType(e.currentTarget.value as typeof type)}
          />
        </label>
        <br />
        <label htmlFor="test">
          Test
          <input
            type="radio"
            id="test"
            name="type"
            value="test"
            checked={type === 'test'}
            onChange={(e) => setType(e.currentTarget.value as typeof type)}
          />
        </label>
      </fieldset>
      <label htmlFor="due-date">
        <p sx={{ variant: 'text.label', mb: 1 }}>Due Date</p>
        <input
          type="date"
          id="due-date"
          value={dueDate}
          required
          onChange={(e) => setDueDate(e.currentTarget.value)}
        />
      </label>
      <Button sx={{ width: '100%', mt: 3 }} rounded={false} type="submit">
        Add Event
      </Button>
      <p sx={{ variant: 'text.h4', textAlign: 'center' }}>{alert}</p>
    </form>
  );
};

export default CreateEventForm;
