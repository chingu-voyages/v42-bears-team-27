import { useContext } from 'react';
import { MdAdd } from 'react-icons/md';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  IconButton,
} from 'src/components/ui';
import type { ITeacher } from 'src/interfaces';
import { AuthContext } from 'src/store/auth';

const ClassroomModal: React.FC = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx) {
    return (
      <p
        sx={{
          variant: 'text.h3',
          position: 'absolute',
          top: '40%',
          left: '50%',
          translate: '-50% -50%',
        }}
      >
        Loading Classroom...
      </p>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outlined">View Classroom</Button>
      </DialogTrigger>
      <DialogContent title="Classroom" width="95%" height="90vh">
        <div sx={{ color: 'primary', textAlign: 'center' }}>
          <div>
            <p sx={{ variant: 'text.h3', mt: 0, mb: 2 }}>Teacher</p>
            <div
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  sx={{
                    width: 64,
                    height: 64,
                    p: 3,
                    bg: 'gray',
                    borderRadius: '50%',
                  }}
                />
                <p sx={{ variant: 'text.h4' }}>{`${
                  (authCtx.user as ITeacher).title
                }.${(authCtx.user as ITeacher).fullName
                  .split(',')[1]
                  .trim()}`}</p>
              </div>
            </div>
          </div>
          <div>
            <p sx={{ variant: 'text.h3', mt: 1, mb: 3 }}>Students</p>
            <div
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                columnGap: 3,
              }}
            >
              {/* TODO: Add/Change/Switch Modal to add new student */}
              <IconButton>
                <MdAdd size={32} />
              </IconButton>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClassroomModal;
