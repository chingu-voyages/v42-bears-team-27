import { useEffect, useState } from 'react';
import { MdSend } from 'react-icons/md';
import validator from 'validator';

import useInput from 'src/hooks/use-input';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  TextField,
  TextFieldArea,
} from 'src/components/ui';
import { postDirectMessageToStudent } from 'src/services';

const studentValidator = (value: string) =>
  !validator.isEmpty(value) && validator.isLength(value, { min: 6, max: 60 });

const headlineValidator = (value: string) =>
  !validator.isEmpty(value) && validator.isLength(value, { min: 5, max: 30 });

const messageValidator = (value: string) =>
  !validator.isEmpty(value) && validator.isLength(value, { min: 20, max: 500 });

const DirectMessageModal: React.FC = () => {
  const {
    value: enteredStudent,
    hasErrors: enteredStudentHasErrors,
    inputChangeHandler: studentChangedHandler,
    inputBlurHandler: studentBlurHandler,
    inputResetHandler: studentResetHandler,
  } = useInput(studentValidator, '');

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

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sanitizedStudent = validator.escape(enteredStudent);
    const sanitizedHeadline = validator.escape(enteredHeadline);
    const sanitizedMessage = validator.escape(enteredMessage);

    const data = {
      studentID: sanitizedStudent,
      messageHeader: sanitizedHeadline,
      messageBody: sanitizedMessage,
    };

    try {
      // Submit form data
      const msg = await postDirectMessageToStudent(data);
      // Update alert with api response message
      setAlert(msg);
      // Reset form values
      studentResetHandler();
      headlineResetHandler();
      messageResetHandler();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }

      setError(`Unexpected error ${err}`);
    }
  };

  // TODO: The following warnings are not very helpful because they appear only once
  useEffect(() => {
    if (enteredStudentHasErrors) {
      setAlert('WARNING: Student input has errors');
    }
  }, [enteredStudentHasErrors]);

  useEffect(() => {
    if (enteredHeadlineHasErrors) {
      setAlert('WARNING: Headline input has errors');
    }
  }, [enteredHeadlineHasErrors]);

  useEffect(() => {
    if (enteredMessageHasErrors) {
      setAlert('WARNING: Message input has errors');
    }
  }, [enteredMessageHasErrors]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outlined">Direct Message</Button>
      </DialogTrigger>
      <DialogContent
        title="Send Message to a Student"
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
              // TODO fetch list of classroom students and convert to a selector listing fullNames, then send ID of selected student
              sx={{
                mb: 20,
                borderColor: enteredStudentHasErrors ? 'red' : 'gray',
              }}
              id="student"
              label="Student"
              value={enteredStudent}
              onChange={(e) => {
                setAlert(null);
                studentChangedHandler(e.currentTarget.value);
              }}
              onBlur={studentBlurHandler}
            />
            <TextField
              sx={{
                mb: 20,
                borderColor: enteredHeadlineHasErrors ? 'red' : 'gray',
              }}
              id="headline"
              label="Headline"
              value={enteredHeadline}
              onChange={(e) => {
                setAlert(null);
                headlineChangedHandler(e.currentTarget.value);
              }}
              onBlur={headlineBlurHandler}
            />
            <TextFieldArea
              sx={{
                mb: 20,
                borderColor: enteredMessageHasErrors ? 'red' : 'gray',
              }}
              id="message"
              label="Message"
              value={enteredMessage}
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

export default DirectMessageModal;
