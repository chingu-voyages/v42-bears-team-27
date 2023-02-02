import validator from 'validator';

import { Button, TextField } from 'src/components/ui';
import type { IUserCredentials } from 'src/interfaces';
import useInput from 'src/hooks/use-input';

type Props = {
  userRole: 'student' | 'teacher';
  error: string | null;
  onSubmit: (data: IUserCredentials) => void;
};

const emailValidator = (value: string) => {
  const trimmed = value.trim();
  return !validator.isEmpty(trimmed) && validator.isEmail(trimmed);
};

const passwordValidator = (value: string) => {
  const trimmed = value.trim();
  return !validator.isEmpty(trimmed) && validator.isLength(trimmed, { min: 6 });
};

const ExistingUserForm: React.FC<Props> = ({ userRole, error, onSubmit }) => {
  const {
    value: enteredEmail,
    hasErrors: enteredEmailHasErrors,
    inputChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    inputResetHandler: emailResetHandler,
  } = useInput(emailValidator, '');

  const {
    value: enteredPassword,
    hasErrors: enteredPasswordHasErrors,
    inputChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    inputResetHandler: passwordResetHandler,
  } = useInput(passwordValidator, '');

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sanitizedEmail = validator.escape(enteredEmail);
    const sanitizedPassword = validator.escape(enteredPassword);

    // Submit form data
    const data = { email: sanitizedEmail, password: sanitizedPassword };
    onSubmit(data);

    emailResetHandler();
    passwordResetHandler();
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
        sx={{
          borderColor: enteredEmailHasErrors ? 'red' : 'gray',
        }}
        placeholder={
          userRole === 'student' ? 'student@mail.com' : 'teacher@mail.com'
        }
        id="email"
        type="email"
        label="E-mail"
        value={enteredEmail}
        onChange={(e) => emailChangedHandler(e.currentTarget.value)}
        onBlur={emailBlurHandler}
        required
      />
      <TextField
        sx={{
          borderColor: enteredPasswordHasErrors ? 'red' : 'gray',
        }}
        id="password"
        type="password"
        label="Password"
        placeholder="••••••"
        value={enteredPassword}
        onChange={(e) => passwordChangedHandler(e.currentTarget.value)}
        onBlur={passwordBlurHandler}
        required
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
