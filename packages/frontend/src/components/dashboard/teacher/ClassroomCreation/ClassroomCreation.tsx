import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import validator from 'validator';

import { Button, TextField, Checkbox } from 'src/components/ui';
import type { ISubject } from 'src/interfaces';
import { fetcher, putClassroom } from 'src/services';
import { titleCase } from 'src/utils';
import useInput from 'src/hooks/use-input';

interface Boxes {
  [title: string]: boolean;
}

const nameValidator = (value: string) => {
  const trimmed = value.trim();
  return (
    !validator.isEmpty(trimmed) &&
    validator.isLength(trimmed, { min: 3, max: 20 })
  );
};

const ClassroomCreation: React.FC = () => {
  const { mutate } = useSWRConfig();

  const { data: subjectsData } = useSWR<ISubject[]>(
    '/api/v0/classroom/subjects',
    fetcher,
  );

  const {
    value: enteredName,
    hasErrors: enteredNameHasErrors,
    inputChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    inputResetHandler: nameResetHandler,
  } = useInput(nameValidator, '');

  // TODO: Validation - at least one subject should be selected?
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

    const sanitizedName = validator.escape(enteredName);

    // Extract selected subject ids
    const subjectIds = Object.keys(boxes).filter((s) => boxes[s]);

    const data = {
      name: sanitizedName,
      subjects: subjectIds,
    };

    try {
      // Submit form data
      const msg = await putClassroom(data);
      // Update alert with api response message
      setAlert(JSON.stringify(msg));
      nameResetHandler();
      mutate('/api/v0/classroom');
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
            sx={{
              borderColor: enteredNameHasErrors ? 'red' : 'gray',
            }}
            placeholder="Your classroom name"
            value={enteredName}
            onChange={(e) => {
              setAlert(null);
              nameChangedHandler(e.currentTarget.value);
            }}
            onBlur={nameBlurHandler}
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
            borderColor: 'primary',
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
              subjectsData.map(({ _id: id, title }) => (
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
            mt: 4,
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
