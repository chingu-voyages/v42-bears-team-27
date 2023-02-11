import { useState } from 'react';
import { MdSend } from 'react-icons/md';
import validator from 'validator';

import useInput from 'src/hooks/use-input';

import type { IStudent } from 'src/interfaces';

import { Button, TextField, TextFieldArea } from 'src/components/ui';
import { postDirectMessageToStudent } from 'src/services';

const headlineValidator = (value: string) => {
  const trimmed = value.trim();
  return (
    !validator.isEmpty(trimmed) &&
    validator.isLength(trimmed, { min: 5, max: 30 })
  );
};

const messageValidator = (value: string) => {
  const trimmed = value.trim();
  return (
    !validator.isEmpty(trimmed) &&
    validator.isLength(trimmed, { min: 20, max: 500 })
  );
};

type Props = {
  student: IStudent | null;
};

const DirectMessageModal: React.FC<Props> = ({ student }) => {
  const {
    value: enteredHeadline,
    hasErrors: enteredHeadlineHasErrors,
    inputChangeHandler: headlineChangedHandler,
    inputBlurHandler: headlineBlurHandler,
    inputResetHandler: headlineResetHandler,
  } = useInput(headlineValidator, '');

  const {
    value: enteredMessage,
    hasErrors: enteredMessageHasErrors,
    inputChangeHandler: messageChangedHandler,
    inputBlurHandler: messageBlurHandler,
    inputResetHandler: messageResetHandler,
  } = useInput(messageValidator, '');
  // TODO use error & alert from ClassroomModal.tsx
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<string | null>(null);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sanitizedHeadline = validator.escape(enteredHeadline);
    const sanitizedMessage = validator.escape(enteredMessage);

    const data = {
      studentID: student?._id,
      messageHeader: sanitizedHeadline,
      messageBody: sanitizedMessage,
    };

    try {
      // Submit form data
      const msg = await postDirectMessageToStudent(data);
      // Update alert with api response message
      setAlert(msg);
      // Reset form values
      headlineResetHandler();
      messageResetHandler();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }

      setError(`Unexpected error ${err}`);
    }
  };

  const formHasErrors = enteredHeadlineHasErrors || enteredMessageHasErrors;

  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2em',
      }}
    >
      <form
        sx={{
          width: '50%',
          '& div': {
            mb: 1,
          },
        }}
        onSubmit={submitHandler}
      >
        <TextField
          sx={{ mb: 20, borderColor: enteredHeadlineHasErrors && 'warning' }}
          id="headline"
          label="Headline"
          value={enteredHeadline}
          autoFocus
          required
          onChange={(e) => headlineChangedHandler(e.currentTarget.value)}
          onBlur={headlineBlurHandler}
        />
        <TextFieldArea
          sx={{ mb: 20, borderColor: enteredMessageHasErrors && 'warning' }}
          id="message"
          label="Message"
          value={enteredMessage}
          required
          onChange={(e) => messageChangedHandler(e.currentTarget.value)}
          onBlur={messageBlurHandler}
        />
        <Button
          sx={{ width: '100%' }}
          type="submit"
          rounded={false}
          icon={<MdSend />}
          // @ts-ignore
          disabled={formHasErrors}
        >
          Send Message
        </Button>
        {error && (
          <p sx={{ variant: 'text.h4', color: 'error', textAlign: 'center' }}>
            {error}
          </p>
        )}
      </form>
      <div>
        {alert && (
          <p sx={{ variant: 'text.h4', color: 'info', textAlign: 'center' }}>
            {alert}
          </p>
        )}
      </div>
    </div>
  );
};

export default DirectMessageModal;
