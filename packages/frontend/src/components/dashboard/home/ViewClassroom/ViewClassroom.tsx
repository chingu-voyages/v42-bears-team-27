import { MdAdd } from 'react-icons/md';

import { IconButton } from '../../../UI';
import type { ITeacherCredentials } from '../../../../interfaces';

type Props = {
  teacher: ITeacherCredentials;
};

const ViewClassroom: React.FC<Props> = ({ teacher }) => (
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
          {/* TODO: username should be replaced with last name (e.g. Mr.Jonathan) */}
          <p sx={{ variant: 'text.h4' }}>{teacher.username}</p>
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
        <IconButton>
          <MdAdd size="inherit" />
        </IconButton>
      </div>
    </div>
  </div>
);

export default ViewClassroom;
