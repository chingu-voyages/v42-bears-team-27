import { useState } from 'react';

import { Button, TextField } from 'src/components/ui';
import type { INewStudentCredentials } from 'src/interfaces';

// TODO: Add validators for input fields
// fullNameValidator = (value: string) => value.trim().length > 0;
// emailValidator = (value: string) => value.trim().length > 0;

type Props = {
  error: string | null;
  onSubmit: (data: INewStudentCredentials) => void;
};

const NewStudentForm: React.FC<Props> = ({ error, onSubmit }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // TODO: Add sanitization for input fields
    // const sanitizedFullName = fullName;
    // const sanitizedEmail = email;

    const data = { fullName, email };
    // Reset form values
    setFullName('');
    setEmail('');
    // Submit form data
    onSubmit(data);
  };

  return (
    <form sx={{ minWidth: '40%' }} onSubmit={submitHandler}>
      <div sx={{ py: 3 }}>
        <TextField
          placeholder="Forename, Surname"
          value={fullName}
          onChange={(e) => setFullName(e.currentTarget.value)}
          label="Student’s Full Name"
          type="text"
        />
      </div>
      <div sx={{ py: 3 }}>
        <TextField
          placeholder="student@mail.com"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          label="Student’s E-mail"
          type="email"
        />
      </div>
      <div
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: '2rem',
          mb: '10rem',
        }}
      >
        <Button sx={{ width: '100%' }} type="submit" rounded={false}>
          Send Invite
        </Button>
      </div>
      {error && (
        <p sx={{ variant: 'text.h4', color: 'error', textAlign: 'center' }}>
          {error}
        </p>
      )}
    </form>
  );
};

export default NewStudentForm;
