import { useState } from 'react';

import { Button, TextField } from 'src/components/ui';
import type { IUserCredentials } from 'src/interfaces';

type Props = {
  userRole: 'student' | 'teacher';
  error: string | null;
  onSubmit: (data: IUserCredentials) => void;
};

// TODO: Add validators for input fields
// emailValidator = (value: string) => value.trim().length > 0;
// passwordValidator = (value: string) => value.trim().length > 0;

const ExistingUserForm: React.FC<Props> = ({ userRole, error, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Add sanitization for input fields
    // const sanitizedEmail = email;
    // const sanitizedPassword = password;

    // Submit form data
    const data = { email, password };
    onSubmit(data);
  };

  return (
    <form
      sx={{
        maxWidth: 416,
        width: '95%',
        '& > div': {
          mb: 4,
        },
      }}
      onSubmit={submitHandler}
    >
      <TextField
        placeholder={
          userRole === 'student' ? 'student@mail.com' : 'teacher@mail.com'
        }
        id="email"
        type="email"
        label="E-mail"
        value={email}
        required
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <TextField
        id="password"
        type="password"
        label="Password"
        placeholder="••••••"
        value={password}
        required
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <Button sx={{ width: '100%' }} type="submit" rounded={false}>
        Login
      </Button>
      {error && (
        <p sx={{ variant: 'text.h4', color: 'error', textAlign: 'center' }}>
          {error}
        </p>
      )}
    </form>
  );
};

export default ExistingUserForm;
