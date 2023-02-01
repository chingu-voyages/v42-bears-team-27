import { useState } from 'react';

import { Button, TextField } from 'src/components/ui';
import type { INewTeacherCredentials } from 'src/interfaces';

type Props = {
  error: string | null;
  onSubmit: (data: INewTeacherCredentials) => void;
};

// TODO: Add validators for input fields
// titleValidator = (value: string) => value.trim().length > 0;
// fullNameValidator = (value: string) => value.trim().length > 0;
// emailValidator = (value: string) => value.trim().length > 0;
// passwordValidator = (value: string) => value.trim().length > 0;
// confirmPasswordValidator = (value: string) => value.trim().length > 0;

const NewTeacherForm: React.FC<Props> = ({ error, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Add sanitization for input fields
    // const sanitizedTitle = title;
    // const sanitizedFullName = fullName;
    // const sanitizedEmail = email;
    // const sanitizedPassword = password;
    // const sanitizedConfirmPassword = confirmPassword;

    // Submit form data
    const data = { title, fullName, email, password, confirmPassword };
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
        id="title"
        type="text"
        label="Title"
        placeholder="Mr/Mrs."
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <TextField
        id="full-name"
        type="text"
        label="Full Name"
        placeholder="Firstname, Lastname"
        value={fullName}
        onChange={(e) => setFullName(e.currentTarget.value)}
      />
      <TextField
        id="email"
        type="email"
        label="E-mail:"
        placeholder="yourmail@mail.com"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <TextField
        id="new-password"
        type="password"
        label="New Password"
        placeholder="••••••"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <TextField
        id="confirm-password"
        type="password"
        label="Confirm Password"
        placeholder="••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.currentTarget.value)}
      />
      <Button sx={{ width: '100%', fontSize: 3 }} type="submit" rounded={false}>
        Join
      </Button>
      {error && (
        <p sx={{ variant: 'text.h4', color: 'error', textAlign: 'center' }}>
          {error}
        </p>
      )}
    </form>
  );
};

export default NewTeacherForm;
