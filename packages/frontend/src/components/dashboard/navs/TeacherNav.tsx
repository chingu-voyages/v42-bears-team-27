import {
  MdOutlineNotifications,
  MdOutlineAccountCircle,
  MdOutlineSettings,
} from 'react-icons/md';

import { IconButton } from '../../UI';

type Props = {
  heading: string;
};

const TeacherNav: React.FC<Props> = ({ heading }) => (
  <nav
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <p sx={{ variant: 'text.h2', m: 0 }}>{heading}</p>
    <div sx={{ display: 'flex', columnGap: 3 }}>
      <IconButton>
        <MdOutlineNotifications size="inherit" />
      </IconButton>
      <IconButton>
        <MdOutlineAccountCircle size="inherit" />
      </IconButton>
      <IconButton>
        <MdOutlineSettings size="inherit" />
      </IconButton>
    </div>
  </nav>
);

export default TeacherNav;
