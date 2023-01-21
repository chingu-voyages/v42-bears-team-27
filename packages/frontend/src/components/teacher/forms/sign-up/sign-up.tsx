import { FormEvent, useState } from 'react';
import { Button, TextField } from '../../../UI';

const FORM_SUBMIT_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/teachers/create`;

const TeacherSignUp: React.FC = () => {
  const [title, setTitle] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { title, fullname, email, password, confirmPassword };

    try {
      const call = await fetch(FORM_SUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const response = await call.json();

      return response;
    } catch (err) {
      // TODO: more robust logging
    }

    return null;
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
          variant: 'text.h1',
          fontWeight: 'medium',
        }}
      >
        Sign Up For Teachers
      </h1>
      <form
        sx={{
          minWidth: '40%',
          maxWidth: '100%',
        }}
        onSubmit={handleSubmit}
      >
        <div
          sx={{
            py: '3',
          }}
        >
          <TextField
            placeholder="Mr/Mrs."
            value={title}
            onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
            label="Title"
            type="text"
          />
        </div>
        <div
          sx={{
            py: '3',
          }}
        >
          <TextField
            placeholder="Firstname, Lastname"
            value={fullname}
            onChange={(e) => setFullname((e.target as HTMLInputElement).value)}
            label="Full Name"
            type="text"
          />
        </div>

        {/* Email */}
        <div
          sx={{
            py: '3',
          }}
        >
          <TextField
            placeholder="yourmail@mail.com"
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            label="E-mail:"
            type="email"
          />
        </div>

        {/* Password */}
        <div
          sx={{
            py: '3',
          }}
        >
          <TextField
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
            label="New Password"
            type="password"
          />
        </div>

        {/* Confirm Password */}
        <div
          sx={{
            py: '3',
          }}
        >
          <TextField
            placeholder="••••••"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword((e.target as HTMLInputElement).value)
            }
            label="Confirm Password"
            type="password"
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
            Join
          </Button>
        </div>
      </form>
    </div>
  );
};
export default TeacherSignUp;
