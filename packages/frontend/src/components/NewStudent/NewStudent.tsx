import { useState } from 'react';

import { Button, TextField } from '../UI';

const NewStudent: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // mockData classroom
    const classroom = '63c339704aa8be1b4851e7b5';
    const data = { fullName, email, classroom };

    try {
      const call = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/student/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
      const response = await call.json();
      if (call.ok) {
        setFullName('');
        setEmail('');
        setAlert('Created!');
      } else {
        setAlert(response.message);
      }
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
        Invite a Student
      </h1>
      <form
        sx={{
          minWidth: '40%',
        }}
        onSubmit={handleSubmit}
      >
        <div
          sx={{
            py: '3',
          }}
        >
          <TextField
            placeholder="Surname, Name"
            value={fullName}
            onChange={(e) => setFullName((e.target as HTMLInputElement).value)}
            label="Student’s Full Name:"
            type="text"
          />
        </div>
        <div
          sx={{
            py: '3',
          }}
        >
          <TextField
            placeholder="student@mail.com"
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            label="Student’s E-mail:"
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
          <Button
            sx={{
              width: '100%',
            }}
            rounded={false}
            type="submit"
          >
            Send Invite
          </Button>
        </div>
        <h3>{alert}</h3>
      </form>
    </div>
  );
};

export default NewStudent;
