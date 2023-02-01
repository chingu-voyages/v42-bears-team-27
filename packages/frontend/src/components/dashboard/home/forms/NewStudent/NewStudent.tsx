import { useState } from 'react';

import { Button, TextField } from 'src/components/ui';
import { postCreateNewStudent } from 'src/services/student';

// TODO: Add validators for input fields
// fullNameValidator = (value: string) => value.trim().length > 0;
// emailValidator = (value: string) => value.trim().length > 0;

const NewStudent: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = { fullName, email };

    // TODO: Add sanitization for input fields
    // const sanitizedFullName = fullName;
    // const sanitizedEmail = email;

    try {
      // Submit form data
      const msg = await postCreateNewStudent(data);
      // Update alert with api response message
      setAlert(msg);
      // Reset form values
      setFullName('');
      setEmail('');
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
        backgroundColor: 'muted',
      }}
    >
      <h1 sx={{ variant: 'text.h2', fontWeight: 'medium' }}>
        Invite a Student
      </h1>
      <form sx={{ minWidth: '40%' }} onSubmit={handleSubmit}>
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
      {alert && (
        <p sx={{ variant: 'text.h4', color: 'info', textAlign: 'center' }}>
          {alert}
        </p>
      )}
    </div>
  );
};

export default NewStudent;
