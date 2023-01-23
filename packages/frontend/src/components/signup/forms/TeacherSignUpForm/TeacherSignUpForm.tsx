import { useState, useContext } from 'react';

import { Button, TextField } from 'components/ui';
import { AuthContext } from 'store/auth';

const TeacherSignUp: React.FC = () => {
  const [title, setTitle] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState<string | null>(null);

  const authCtx = useContext(AuthContext);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = { title, fullName, email, password, confirmPassword };
    const msg = await authCtx!.onSignup(credentials);
    setAlert(msg);
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
        onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
      />
      <TextField
        id="full-name"
        type="text"
        label="Full Name"
        placeholder="Firstname, Lastname"
        value={fullName}
        onChange={(e) => setFullName((e.target as HTMLInputElement).value)}
      />
      <TextField
        id="email"
        type="email"
        label="E-mail:"
        placeholder="yourmail@mail.com"
        value={email}
        onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
      />
      <TextField
        id="new-password"
        type="password"
        label="New Password"
        placeholder="••••••"
        value={password}
        onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
      />
      <TextField
        id="confirm-password"
        type="password"
        label="Confirm Password"
        placeholder="••••••"
        value={confirmPassword}
        onChange={(e) =>
          setConfirmPassword((e.target as HTMLInputElement).value)
        }
      />
      <Button sx={{ width: '100%', fontSize: 3 }} type="submit" rounded={false}>
        Join
      </Button>
      <p sx={{ variant: 'text.h4', textAlign: 'center' }}>{alert}</p>
    </form>
  );
};
export default TeacherSignUp;
