import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
} from 'src/components/ui';

type Props = {
  children: React.ReactNode;
};

const ClassroomModal: React.FC<Props> = ({ children }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outlined">View Classroom</Button>
    </DialogTrigger>
    <DialogContent title="Classroom" width="95%" height="90vh">
      {children}
    </DialogContent>
  </Dialog>
);

export default ClassroomModal;
