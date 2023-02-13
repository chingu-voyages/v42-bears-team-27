import { useEffect, useState, useContext } from 'react';
import { MdSend } from 'react-icons/md';
import validator from 'validator';

import useInput from 'src/hooks/use-input';

import { AuthContext } from 'src/store/auth/auth-context';
import { SocketContext } from 'src/store/socket/socket-context';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  TextField,
  TextFieldArea,
} from 'src/components/ui';
import { postBroadcastMessageToStudents } from 'src/services';

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

const BroadcastModal: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const socketCtx = useContext(SocketContext);

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

  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [alert]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sanitizedHeadline = validator.escape(enteredHeadline);
    const sanitizedMessage = validator.escape(enteredMessage);

    const data = {
      messageHeader: sanitizedHeadline,
      messageBody: sanitizedMessage,
    };

    try {
      // Submit form data
      const msg = await postBroadcastMessageToStudents(data);
      // Update alert with api response message
      socketCtx?.socket?.emit('new-message-sent', true, authCtx?.user?._id);
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setError(null);
            setAlert(null);
          }}
          variant="outlined"
        >
          Broadcast Message
        </Button>
      </DialogTrigger>
      <DialogContent
        title="Send Message to your Classroom"
        width="95%"
        height="90vh"
      >
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
              sx={{
                mb: 20,
                borderColor: enteredHeadlineHasErrors && 'warning',
              }}
              id="headline"
              label="Headline"
              value={enteredHeadline}
              required
              onChange={(e) => {
                setAlert(null);
                headlineChangedHandler(e.currentTarget.value);
              }}
              onBlur={headlineBlurHandler}
            />
            <TextFieldArea
              sx={{
                mb: 20,
                borderColor: enteredMessageHasErrors && 'warning',
              }}
              id="message"
              label="Message"
              value={enteredMessage}
              required
              onChange={(e) => {
                setAlert(null);
                messageChangedHandler(e.currentTarget.value);
              }}
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
              <p
                sx={{ variant: 'text.h4', color: 'error', textAlign: 'center' }}
              >
                {error}
              </p>
            )}
          </form>
          <div>
            {alert && (
              <p
                sx={{ variant: 'text.h4', color: 'info', textAlign: 'center' }}
              >
                {alert}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BroadcastModal;
