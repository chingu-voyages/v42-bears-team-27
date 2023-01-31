import { useState } from 'react';
import useSWR from 'swr';

import { Button, TextField, Checkbox } from 'src/components/ui';
import type { ISubject } from 'src/interfaces';
import { fetcher, putClassroom } from 'src/services';
import { titleCase } from 'src/utils';

interface Boxes {
  [title: string]: boolean;
}

// TODO: Add validators for input fields
// nameValidator = (value: string) => value.trim().length > 0;

const ClassroomCreation: React.FC = () => {
  const { data: subjectsData } = useSWR<ISubject[]>(
    '/api/v0/classroom/subjects',
    fetcher,
  );

  const [name, setName] = useState('');
  const [boxes, setBoxes] = useState<Boxes>(() => {
    if (!subjectsData) {
      return [];
    }

    return Object.keys(subjectsData).reduce(
      (obj, key) => ({
        ...obj,
        [key]: false,
      }),
      {},
    );
  });

  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<string | null>(null);

  const handleOnChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const { id } = e.currentTarget;
    setBoxes((prevBoxes) => ({ ...prevBoxes, [id]: !prevBoxes[id] }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // TODO: Add sanitization for input fields
    // const sanitizedName = name;

    // Extract selected subject ids
    const subjectIds = Object.keys(boxes).filter((s) => boxes[s]);

    const data = {
      name,
      subjects: subjectIds,
    };

    try {
      // Submit form data
      const msg = await putClassroom(data);
      // Update alert with api response message
      setAlert(msg);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }

      setError(`Unexpected error ${err}`);
    }
  };

  return (
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'primary',
      }}
    >
      <h1 sx={{ variant: 'text.h2', fontWeight: 'medium' }}>
        Create your classroom
      </h1>
      <form sx={{ minWidth: '40%' }} onSubmit={handleSubmit}>
        <div>
          <TextField
            placeholder="Your classroom name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            label="Name"
            type="text"
            required
          />
        </div>
        <div
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            border: '1px solid',
            borderColor: 'gray',
            mt: 4,
          }}
        >
          <h4 sx={{ variant: 'text.h4', mt: 4, mb: 0 }}>Subjects</h4>
          <div
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              width: '100%',
              gap: 2,
              p: 4,
            }}
          >
            {subjectsData &&
              subjectsData.map(({ id, title }) => (
                <Checkbox
                  key={id}
                  id={id}
                  label={titleCase(title)}
                  checked={boxes[title]}
                  onClick={handleOnChange}
                />
              ))}
          </div>
        </div>
        <div
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
            mb: 5,
          }}
        >
          <Button sx={{ width: '100%' }} type="submit" rounded={false}>
            Confirm
          </Button>
        </div>
        {error && (
          <p sx={{ variant: 'text.h4', color: 'error', textAlign: 'center' }}>
            {error}
          </p>
        )}
      </form>
      {alert && (
        <p sx={{ variant: 'text.h4', color: 'info', textAlign: 'center' }}>
          {alert}
        </p>
      )}
    </div>
  );
};

export default ClassroomCreation;
