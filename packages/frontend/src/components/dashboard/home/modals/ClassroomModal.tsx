import { Modal, Button } from 'components/ui';

type Props = {
  children: React.ReactNode;
};

const ClassroomModal: React.FC<Props> = ({ children }) => (
  <Modal
    title="Classroom"
    width="95%"
    height="90vh"
    btn={<Button variant="outlined">View Classroom</Button>}
  >
    {children}
  </Modal>
);

export default ClassroomModal;
