import { useState } from 'react';
import { MdSend } from 'react-icons/md';

import { Modal, Button, TextField } from 'components/ui';

const BroadcastModal: React.FC = () => {
  const [headline, setHeadline] = useState('');
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState('');

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { messageHeader: headline, messageBody: message };

    try {
      const call = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/classroom/broadcast-message`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
      const response = await call.json();
      if (call.ok) {
        setHeadline('');
        setMessage('');
        setAlert('Sent!');
      } else {
        setAlert(response.message);
      }
    } catch (error) {
      setAlert('error');
    }
  };
  return (
    <Modal
      title="Broadcast Message To Classroom"
      width="95%"
      height="90vh"
      btn={<Button variant="outlined">Broadcast Message</Button>}
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
          <TextField
            sx={{ pb: 20 }}
            id="message"
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            multiline
          />
          <Button
            sx={{ width: '100%' }}
            type="submit"
            rounded={false}
            icon={<MdSend />}
          >
            Send Message
          </Button>
          <h3>{alert}</h3>
        </form>
      </div>
    </Modal>
  );
};

export default BroadcastModal;
