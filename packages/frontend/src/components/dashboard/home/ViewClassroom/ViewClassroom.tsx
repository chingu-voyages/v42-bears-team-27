import { MdAdd } from 'react-icons/md';

import { IconButton } from 'src/components/ui';
import type { IUserData } from 'src/interfaces';

type Props = {
  user: IUserData;
};

const ViewClassroom: React.FC<Props> = ({ user }) => (
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
          <p sx={{ variant: 'text.h4' }}>{`${user.title}.${user.fullName
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
);

export default ViewClassroom;
