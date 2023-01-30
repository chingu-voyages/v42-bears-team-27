import React, { useState } from 'react';
import useSWR from 'swr';

import { Button, TextField, Checkbox } from 'components/ui';

import type { ISubject } from 'interfaces';
import { fetcher, putClassroom } from 'src/services';
import { titleCase } from 'src/utils';

interface Boxes {
  [name: string]: boolean;
}

const ClassroomCreation: React.FC = () => {
  // const [shouldFetch, setShouldFetch] = useState(false);
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

  const [alert, setAlert] = useState('');

  const handleOnChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const { id } = e.currentTarget;
    setBoxes((prevBoxes) => ({ ...prevBoxes, [id]: !prevBoxes[id] }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const subjectIds = Object.keys(boxes).filter((s) => boxes[s]);

    try {
      await putClassroom({ name, subjects: subjectIds });
      setName('');
      setAlert('Created!');
    } catch (error) {
      setAlert('error');
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
      <h1
        sx={{
          variant: 'text.h2',
          fontWeight: 'medium',
        }}
      >
        Create your classroom
      </h1>
      <form
        sx={{
          minWidth: '40%',
        }}
        onSubmit={handleSubmit}
      >
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
          <h4
            sx={{
              variant: 'text.h4',
              mt: 4,
              mb: 0,
            }}
          >
            Subjects
          </h4>
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
                  id={String(id)}
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
          <Button
            sx={{
              width: '100%',
            }}
            rounded={false}
            type="submit"
          >
            Confirm
          </Button>
        </div>
        <h3>{alert}</h3>
      </form>
    </div>
  );
};

export default ClassroomCreation;
