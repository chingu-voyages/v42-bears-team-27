import { useState } from 'react';

import { Button, TextField } from 'components/ui';
import type { IEvent, ISubject } from 'interfaces';

type Props = {
  subjects: ISubject[];
  onSubmit: (data: Omit<IEvent, 'id' | 'dueDate' | 'setAt'>) => void;
};

// NOTE: File name to be renamed to CreateEventForm -> CreateTaskForm once refactored
// All event-specific (not task related) changes would be made elsewhere

const CreateEventForm: React.FC<Props> = ({ subjects, onSubmit }) => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [type, setType] = useState<'lesson' | 'exercise' | 'test'>('lesson');
  const [alert, setAlert] = useState<string | null>(null);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert(null);
    // Sanitize inputs
    const sanitizedEnteredSubject = subject.toLowerCase();
    const sanitizedEnteredTopic = topic.toLowerCase();
    // Check if entered subject exists
    const foundSubjectIdx = subjects.findIndex(
      (item) => item.title === sanitizedEnteredSubject,
    );

    if (foundSubjectIdx === -1) {
      setAlert('Warning: subject does not exist in your classroom');
      return;
    }
    // Check if entered topic exists
    const foundTopicIdx = subjects[foundSubjectIdx].topics.findIndex(
      (item) => item.title === sanitizedEnteredTopic,
    );

    if (foundTopicIdx === -1) {
      setAlert(`Warning: topic does not exist in ${subject}`);
      return;
    }
    // Check if type of task exists for topic
    const foundTypeIdx = subjects[foundSubjectIdx].topics[
      foundTopicIdx
    ].types.findIndex((item) => item.title === type);

    if (foundTopicIdx === -1) {
      setAlert(`Warning: topic does not exist in ${subject}`);
      return;
    }

    const { id, url } =
      subjects[foundSubjectIdx].topics[foundTopicIdx].types[foundTypeIdx];

    const submissionData = {
      tasks: [
        {
          id,
          type,
          subject: sanitizedEnteredSubject,
          topic: sanitizedEnteredTopic,
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
      <Button sx={{ width: '100%', mt: 3 }} rounded={false} type="submit">
        Add Event
      </Button>
      <p sx={{ variant: 'text.h4', textAlign: 'center' }}>{alert}</p>
    </form>
  );
};

export default CreateEventForm;
