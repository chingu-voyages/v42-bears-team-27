/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import { useState, useContext } from 'react';

import { Button, TextField } from 'components/ui';
import { AuthContext } from 'store/auth';

type Props = {
  userRole: 'student' | 'teacher';
};

const LoginForm: React.FC<Props> = ({ userRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState<string | null>(null);

  const authCtx = useContext(AuthContext);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = { email, password };
    const msg = await authCtx!.onLogin(credentials, userRole);
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
        placeholder={
          userRole === 'student' ? 'student@mail.com' : 'teacher@mail.com'
        }
        id="email"
        type="email"
        label="E-mail"
        value={email}
        onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
        {...({ required: true } as any)}
      />
      <TextField
        id="password"
        type="password"
        label="Password"
        placeholder="••••••"
        value={password}
        onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
        {...({ required: true } as any)}
      />
      <Button sx={{ width: '100%' }} rounded={false} type="submit">
        Login
      </Button>
      <p sx={{ variant: 'text.h4', textAlign: 'center' }}>{alert}</p>
    </form>
  );
};

export default LoginForm;
