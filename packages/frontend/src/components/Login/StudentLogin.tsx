import { useState } from 'react';

import { Button, TextField } from '../UI';

type Props = {
  children: React.ReactNode;
};

const StudentLogin: React.FC<Props> = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const call = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/student/login`,
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
        setEmail('');
        setPassword('');
        setAlert('Logged in!');
        // response ---> { email, token }
        // TODO save JWT
      } else {
        setAlert(response.message);
      }
    } catch (error) {
      setAlert('error');
    }
  };

  return (
    <>
      <h2
        sx={{
          variant: 'text.h2',
        }}
      >
        Ready to learn!
      </h2>
      {children}
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
            placeholder="student@mail.com"
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            label="E-mail"
            type="email"
          />
        </div>
        <div
          sx={{
            py: '3',
          }}
        >
          <TextField
            value={password}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
            label="Password"
            type="password"
          />
        </div>
        <div
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            mt: '2rem',
            mb: '3rem',
            width: '100%',
          }}
        >
          <Button
            sx={{
              width: '100%',
            }}
            rounded={false}
            type="submit"
          >
            Login
          </Button>
          <p
            sx={{
              variant: 'text.h4',
              color: 'warning',
            }}
          >
            {alert}
          </p>
        </div>
      </form>
    </>
  );
};

export default StudentLogin;
