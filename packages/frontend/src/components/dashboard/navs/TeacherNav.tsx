import { useState } from 'react';
import {
  MdOutlineNotifications,
  MdOutlineAccountCircle,
  MdOutlineSettings,
  MdOutlineMenu,
  MdOutlineClose,
} from 'react-icons/md';

import { IconButton } from 'components/ui';

type Props = {
  heading: string;
};

const TeacherNav: React.FC<Props> = ({ heading }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebarHandler = () => {
    setShowSidebar((prevState) => !prevState);
  };

  return (
    <>
      <nav
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p
          sx={{
            variant: 'text.h2',
            m: 0,
            textAlign: ['center', null, 'start'],
          }}
        >
          {heading}
        </p>
        <div sx={{ display: ['none', 'flex', null], columnGap: 3 }}>
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
        <div sx={{ display: [null, 'none', null], columnGap: 3 }}>
          <IconButton onClick={toggleSidebarHandler}>
            <MdOutlineMenu size="inherit" />
          </IconButton>
        </div>
      </nav>
      {showSidebar && (
        <aside
          sx={{
            position: 'fixed',
            top: 0,
            right: 0,
            maxWidth: '75%',
            width: 320,
            height: '100vh',
            bg: 'secondary',
          }}
        >
          <div sx={{ position: 'absolute', top: 3, right: 3 }}>
            <IconButton onClick={toggleSidebarHandler}>
              <MdOutlineClose size="inherit" />
            </IconButton>
          </div>
          <nav sx={{ width: '95%', pt: 5, mx: 'auto' }}>
            <ul
              sx={{
                variant: 'text.link',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                p: 0,
                listStyle: 'none',
                '& > li': {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '90%',
                  p: 2,
                  cursor: 'pointer',
                  borderRadius: 6,
                  '&:hover': {
                    bg: 'muted',
                  },
                },
              }}
            >
              <li>
                <p>Notifications</p>
                <IconButton>
                  <MdOutlineNotifications size="inherit" />
                </IconButton>
              </li>
              <li>
                <p>Profile</p>
                <IconButton>
                  <MdOutlineAccountCircle size="inherit" />
                </IconButton>
              </li>
              <li>
                <p>Settings</p>
                <IconButton>
                  <MdOutlineSettings size="inherit" />
                </IconButton>
              </li>
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
};

export default TeacherNav;
