import { useState } from 'react';
import {
  MdOutlineNotifications,
  MdOutlineAccountCircle,
  MdOutlineSettings,
  MdOutlineMenu,
  MdOutlineClose,
} from 'react-icons/md';

import { IconButton } from 'src/components/ui';

type Props = {
  heading?: string;
};

const TeacherNav: React.FC<Props> = ({ heading }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebarHandler = () => {
    setShowSidebar((prevState) => !prevState);
  };

  return (
    <>
      <header sx={{ py: 3, px: 4, bg: 'muted' }}>
        <nav
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: !heading ? 'flex-end' : 'space-between',
            height: 48,
          }}
        >
          <p
            sx={{
              variant: 'text.h2',
              display: !heading && 'none',
              m: 0,
              textAlign: ['center', null, 'start'],
            }}
          >
            {heading}
          </p>
          <div sx={{ display: ['none', 'flex', null], columnGap: 3 }}>
            <IconButton>
              <MdOutlineNotifications size={32} />
            </IconButton>
            <IconButton>
              <MdOutlineAccountCircle size={32} />
            </IconButton>
            <IconButton>
              <MdOutlineSettings size={32} />
            </IconButton>
          </div>
          <div sx={{ display: [null, 'none', null], columnGap: 3 }}>
            <IconButton onClick={toggleSidebarHandler}>
              <MdOutlineMenu size={32} />
            </IconButton>
          </div>
        </nav>
      </header>
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
              <MdOutlineClose size={32} />
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
                {/* TODO: Wrap children using Menu/Modal component (responsive) */}
                <p>Notifications</p>
                <IconButton>
                  <MdOutlineNotifications size={32} />
                </IconButton>
              </li>
              <li>
                {/* TODO: Wrap children using Menu/Modal component (responsive) */}
                <p>Profile</p>
                <IconButton>
                  <MdOutlineAccountCircle size={32} />
                </IconButton>
              </li>
              <li>
                {/* TODO: Wrap children using Menu/Modal component (responsive) */}
                <p>Settings</p>
                <IconButton>
                  <MdOutlineSettings size={32} />
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
