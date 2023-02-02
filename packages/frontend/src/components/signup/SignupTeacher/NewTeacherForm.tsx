import validator from 'validator';

import { Button, TextField } from 'src/components/ui';
import type { INewTeacherCredentials } from 'src/interfaces';
import useInput from 'src/hooks/use-input';

type Props = {
  error: string | null;
  onSubmit: (data: INewTeacherCredentials) => void;
};

const titleValidator = (value: string) => {
  const trimmed = value.trim();
  return (
    !validator.isEmpty(trimmed) && validator.isLength(trimmed, { max: 10 })
  );
};

const fullNameValidator = (value: string) => {
  const trimmed = value.trim();
  return (
    !validator.isEmpty(trimmed) &&
    validator.isLength(trimmed, { min: 3, max: 25 })
  );
};

const emailValidator = (value: string) => {
  const trimmed = value.trim();
  return !validator.isEmpty(trimmed) && validator.isEmail(trimmed);
};

const passwordValidator = (value: string) => {
  const trimmed = value.trim();
  return !validator.isEmpty(trimmed) && validator.isLength(trimmed, { min: 6 });
};

const confirmPasswordValidator = (
  value: string,
  { passwordToCompare }: { passwordToCompare: string },
) => {
  const confirmPassword = value.trim();
  return (
    confirmPassword === passwordToCompare && passwordValidator(confirmPassword)
  );
};

const NewTeacherForm: React.FC<Props> = ({ error, onSubmit }) => {
  const {
    value: enteredTitle,
    hasErrors: enteredTitleHasErrors,
    inputChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
    inputResetHandler: titleResetHandler,
  } = useInput(titleValidator, '');

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

  const {
    value: enteredPassword,
    hasErrors: enteredPasswordHasErrors,
    inputChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    inputResetHandler: passwordResetHandler,
  } = useInput(passwordValidator, '');

  const {
    value: enteredConfirmPassword,
    hasErrors: enteredConfirmPasswordHasErrors,
    inputChangeHandler: confirmPasswordChangedHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    inputResetHandler: confirmPasswordResetHandler,
  } = useInput(confirmPasswordValidator, '', {
    passwordToCompare: enteredPassword,
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sanitizedTitle = validator.escape(enteredTitle);
    const sanitizedFullName = validator.escape(enteredFullName);
    const sanitizedEmail = validator.escape(enteredEmail);
    const sanitizedPassword = validator.escape(enteredPassword);
    const sanitizedConfirmPassword = validator.escape(enteredConfirmPassword);

    const data = {
      title: sanitizedTitle,
      fullName: sanitizedFullName,
      email: sanitizedEmail,
      password: sanitizedPassword,
      confirmPassword: sanitizedConfirmPassword,
    };
    try {
      // Submit form data
      onSubmit(data);

      titleResetHandler();
      fullNameResetHandler();
      emailResetHandler();
      passwordResetHandler();
      confirmPasswordResetHandler();
    } catch (err) {
      // Parent handles error
    }
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
          borderColor: enteredTitleHasErrors ? 'red' : 'gray',
        }}
        id="title"
        type="text"
        label="Title"
        placeholder="Mr/Mrs."
        value={enteredTitle}
        onChange={(e) => titleChangedHandler(e.currentTarget.value)}
        onBlur={titleBlurHandler}
      />
      <TextField
        sx={{
          borderColor: enteredFullNameHasErrors ? 'red' : 'gray',
        }}
        id="full-name"
        type="text"
        label="Full Name"
        placeholder="Firstname, Lastname"
        value={enteredFullName}
        onChange={(e) => fullNameChangedHandler(e.currentTarget.value)}
        onBlur={fullNameBlurHandler}
      />
      <TextField
        sx={{
          borderColor: enteredEmailHasErrors ? 'red' : 'gray',
        }}
        id="email"
        type="email"
        label="E-mail:"
        placeholder="yourmail@mail.com"
        value={enteredEmail}
        onChange={(e) => emailChangedHandler(e.currentTarget.value)}
        onBlur={emailBlurHandler}
      />
      <TextField
        sx={{
          borderColor: enteredPasswordHasErrors ? 'red' : 'gray',
        }}
        id="new-password"
        type="password"
        label="New Password"
        placeholder="••••••"
        value={enteredPassword}
        onChange={(e) => passwordChangedHandler(e.currentTarget.value)}
        onBlur={passwordBlurHandler}
      />
      <TextField
        sx={{
          borderColor: enteredConfirmPasswordHasErrors ? 'red' : 'gray',
        }}
        id="confirm-password"
        type="password"
        label="Confirm Password"
        placeholder="••••••"
        value={enteredConfirmPassword}
        onChange={(e) => confirmPasswordChangedHandler(e.currentTarget.value)}
        onBlur={confirmPasswordBlurHandler}
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
