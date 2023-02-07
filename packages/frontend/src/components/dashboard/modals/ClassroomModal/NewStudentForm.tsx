import validator from 'validator';

import { Button, TextField } from 'src/components/ui';
import type { INewStudentCredentials } from 'src/interfaces';

import useInput from 'src/hooks/use-input';

const fullNameValidator = (value: string) => {
  const trimmed = value.trim();
  return (
    !validator.isEmpty(trimmed) &&
    validator.isLength(trimmed, { min: 3, max: 60 })
  );
};

const emailValidator = (value: string) => {
  const trimmed = value.trim();
  return !validator.isEmpty(trimmed) && validator.isEmail(trimmed);
};

type Props = {
  error: string | null;
  onSubmit: (data: INewStudentCredentials) => void;
};

const NewStudentForm: React.FC<Props> = ({ error, onSubmit }) => {
  const {
    value: enteredFullName,
    hasErrors: enteredFullNameHasErrors,
    inputChangeHandler: fullNameChangedHandler,
    inputBlurHandler: fullNameBlurHandler,
    inputResetHandler: fullNameResetHandler,
  } = useInput(fullNameValidator, '');

  const {
    value: enteredEmail,
    hasErrors: enteredEmailHasErrors,
    inputChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    inputResetHandler: emailResetHandler,
  } = useInput(emailValidator, '');

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const sanitizedFullName = validator.escape(enteredFullName);
    const sanitizedEmail = validator.escape(enteredEmail);

    const data = { fullName: sanitizedFullName, email: sanitizedEmail };
    // Reset form values
    fullNameResetHandler();
    emailResetHandler();
    // Submit form data
    onSubmit(data);
  };

  return (
    <form sx={{ minWidth: '40%' }} onSubmit={submitHandler}>
      <div sx={{ py: 3 }}>
        <TextField
          sx={{
            borderColor: enteredFullNameHasErrors ? 'red' : 'gray',
          }}
          placeholder="Forename, Surname"
          value={enteredFullName}
          onChange={(e) => fullNameChangedHandler(e.currentTarget.value)}
          onBlur={fullNameBlurHandler}
          label="Student’s Full Name"
          type="text"
          autoFocus
        />
      </div>
      <div sx={{ py: 3 }}>
        <TextField
          sx={{
            borderColor: enteredEmailHasErrors ? 'red' : 'gray',
          }}
          placeholder="student@mail.com"
          value={enteredEmail}
          onChange={(e) => emailChangedHandler(e.currentTarget.value)}
          onBlur={emailBlurHandler}
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
