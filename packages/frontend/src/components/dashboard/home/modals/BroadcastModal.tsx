import { useState } from 'react';
import { MdSend } from 'react-icons/md';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  TextField,
  TextFieldArea,
} from 'components/ui';
import { postBroadcastMessageToStudents } from 'src/services';

// TODO: Add validators for input fields
// headlineValidator = (value: string) => value.trim().length > 0;
// messageValidator = (value: string) => value.trim().length > 0;

const BroadcastModal: React.FC = () => {
  const [headline, setHeadline] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<string | null>(null);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Add sanitization for input fields
    // const sanitizedEmail = email;
    // const sanitizedPassword = password;

    const data = {
      messageHeader: headline,
      messageBody: message,
    };

    try {
      // Submit form data
      const msg = await postBroadcastMessageToStudents(data);
      // Update alert with api response message
      setAlert(msg);
      // Reset form values
      setHeadline('');
      setMessage('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }

      setError(`Unexpected error ${err}`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outlined">Broadcast Message</Button>
      </DialogTrigger>
      <DialogContent
        title="Send Message to your Classroom"
        width="95%"
        height="90vh"
      >
        <div sx={{ display: 'flex', justifyContent: 'center' }}>
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
              sx={{ mb: 20 }}
              id="headline"
              label="Headline"
              value={headline}
              onChange={(e) => setHeadline(e.currentTarget.value)}
            />
            <TextFieldArea
              sx={{ pb: 20 }}
              id="message"
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.currentTarget.value)}
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
          {alert && (
            <p sx={{ variant: 'text.h4', color: 'info', textAlign: 'center' }}>
              {alert}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BroadcastModal;
