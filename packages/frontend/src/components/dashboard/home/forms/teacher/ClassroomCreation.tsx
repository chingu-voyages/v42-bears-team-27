import React, { useState } from 'react';

import { Button, TextField, Checkbox } from 'components/ui';
import { putClassroom } from 'src/services';

type Boxes = {
  [name: string]: boolean;
};

const ClassroomCreation: React.FC = () => {
  const [name, setName] = useState('');
  const [boxes, setBoxes] = useState<Boxes>({
    mathematics: false,
    history: false,
    science: false,
    geography: false,
    english: false,
    computerScience: false,
  });
  const [alert, setAlert] = useState('');

  const handleOnChange = (e: any) => {
    // React.MouseEventHandler<HTMLInputElement> ?
    const { id } = e.target;
    setBoxes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const subjects = Object.keys(boxes).filter((s) => boxes[s]);
    const data = { name, subjects };

    try {
      await putClassroom(data);
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
        backgroundColor: 'muted',
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
            mt: '4',
          }}
        >
          <h4
            sx={{
              variant: 'text.h4',
              mt: '4',
              mb: '0',
            }}
          >
            Subjects
          </h4>
          <div
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              width: '100%',
              gap: '1.5rem',
              p: '4',
            }}
          >
            <Checkbox
              label="Mathematics"
              id="mathematics"
              checked={boxes.mathematics}
              onClick={(e) => handleOnChange(e)}
            />
            <Checkbox
              label="History"
              id="history"
              checked={boxes.history}
              onClick={(e) => handleOnChange(e)}
            />
            <Checkbox
              label="Science"
              id="science"
              checked={boxes.science}
              onClick={(e) => handleOnChange(e)}
            />
            <Checkbox
              label="Geography"
              id="geography"
              checked={boxes.geography}
              onClick={(e) => handleOnChange(e)}
            />
            <Checkbox
              label="English"
              id="english"
              checked={boxes.english}
              onClick={(e) => handleOnChange(e)}
            />
            <Checkbox
              label="Computer Science"
              id="computerScience"
              checked={boxes.computerScience}
              onClick={(e) => handleOnChange(e)}
            />
          </div>
        </div>
        <div
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: '2rem',
            mb: '10rem',
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
