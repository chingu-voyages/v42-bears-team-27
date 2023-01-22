import { MdSend } from 'react-icons/md';

import { Modal, Button, TextField } from 'components/ui';

const BroadcastModal: React.FC = () => (
  <Modal
    title="Broadcast Message To Classroom"
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
      >
        <TextField sx={{ mb: 20 }} label="Headline" />
        <TextField sx={{ pb: 20 }} label="Message" multiline />
        <Button
          sx={{ width: '100%' }}
          type="submit"
          rounded={false}
          icon={<MdSend />}
        >
          Send Message
        </Button>
      </form>
    </div>
  </Modal>
);

export default BroadcastModal;
