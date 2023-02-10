import { useContext, useState } from 'react';
import { useColorMode } from 'theme-ui';
import useSWR from 'swr';
import {
  MdOutlineNotifications,
  MdOutlineSettings,
  MdOutlineMenu,
  MdOutlineClose,
  MdDarkMode,
  MdLightMode,
} from 'react-icons/md';
import { SlGraduation } from 'react-icons/sl';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  IconButton,
  Menu,
  MenuContent,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
} from 'src/components/ui';
import type { IClassroom } from 'src/interfaces';
import { AuthContext } from 'src/store/auth';
import { fetcher } from 'src/services';
import { ClassroomModal } from '../modals';

const StudentAppBar: React.FC = () => {
  const authCtx = useContext(AuthContext);

  const { data: classroomData, error } = useSWR<IClassroom>(
    '/api/v0/classroom',
    fetcher,
  );

  const [colorMode, setColorMode] = useColorMode();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebarHandler = () => {
    setShowSidebar((prevState) => !prevState);
  };

  const toggleColorModeHandler = () => {
    setColorMode((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  };

  if (error) {
    // Assuming any error when fetching data means that user cookies have expired,
    // therefore logout the user from the app since they're not authenticated
    authCtx?.onLogout();
  }

  const heading = classroomData?.name ? `Classroom: ${classroomData.name}` : '';

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
            <Menu icon={<MdOutlineNotifications size={32} />}>
              {/* TODO: Add display of notifications for student */}
              <MenuContent />
            </Menu>
            <Menu icon={<SlGraduation size={32} />}>
              <MenuContent>
                <MenuItem
                  sx={{ display: 'flex', alignItems: 'center', columnGap: 3 }}
                  asChild
                >
                  <ClassroomModal />
                </MenuItem>
              </MenuContent>
            </Menu>
            <Menu icon={<MdOutlineSettings size={32} />}>
              <MenuContent>
                <MenuRadioGroup
                  value={colorMode}
                  onValueChange={toggleColorModeHandler}
                >
                  <MenuRadioItem value="dark">Dark Mode</MenuRadioItem>
                  <MenuRadioItem value="light">Light Mode</MenuRadioItem>
                </MenuRadioGroup>
              </MenuContent>
            </Menu>
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
                p: 0,
                listStyle: 'none',
                '& > li': {
                  width: '95%',
                  m: 2,
                  my: 4,
                },
              }}
            >
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2,
                        cursor: 'pointer',
                        borderRadius: 6,
                        '&:hover': {
                          bg: 'muted',
                        },
                      }}
                    >
                      <p>Notifications</p>
                      <IconButton>
                        <MdOutlineNotifications size={32} />
                      </IconButton>
                    </div>
                  </DialogTrigger>
                  {/* TODO: Add display of notifications for student */}
                  <DialogContent
                    title="Notifications"
                    width={560}
                    height="min-content"
                  />
                </Dialog>
              </li>
              <li sx={{ '& > button': { mx: 'auto' } }}>
                <ClassroomModal />
              </li>
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2,
                        cursor: 'pointer',
                        borderRadius: 6,
                        '&:hover': {
                          bg: 'muted',
                        },
                      }}
                    >
                      <p>Settings</p>
                      <IconButton>
                        <MdOutlineSettings size={32} />
                      </IconButton>
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    title="Settings"
                    width={480}
                    height="min-content"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      pt: 3,
                      pb: 5,
                    }}
                  >
                    <Button
                      onClick={toggleColorModeHandler}
                      icon={
                        colorMode === 'light' ? <MdDarkMode /> : <MdLightMode />
                      }
                    >
                      {`Toggle ${
                        colorMode === 'light' ? 'Dark' : 'Light'
                      } Mode`}
                    </Button>
                  </DialogContent>
                </Dialog>
              </li>
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
};

export default StudentAppBar;
