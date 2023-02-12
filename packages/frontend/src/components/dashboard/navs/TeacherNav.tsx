import { useState, useContext } from 'react';
import { useColorMode } from 'theme-ui';
import {
  MdOutlineNotifications,
  MdOutlineAccountCircle,
  MdOutlineSettings,
  MdOutlineMenu,
  MdOutlineClose,
  MdDarkMode,
  MdLightMode,
  MdLogout,
} from 'react-icons/md';

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
import { AuthContext } from 'src/store/auth';

type Props = {
  heading?: string;
};

const TeacherNav: React.FC<Props> = ({ heading }) => {
  const authCtx = useContext(AuthContext);

  const [colorMode, setColorMode] = useColorMode();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebarHandler = () => {
    setShowSidebar((prevState) => !prevState);
  };

  const toggleColorModeHandler = () => {
    setColorMode((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <header sx={{ py: 3, px: 4, bg: 'muted' }}>
        <nav
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: !heading ? 'flex-end' : 'space-between',
            minHeight: 48,
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
            <Menu
              ariaLabel="Notifications"
              icon={<MdOutlineNotifications size={32} />}
            >
              {/* TODO: Add display of notifications for teacher */}
              <MenuContent />
            </Menu>
            <Menu ariaLabel="User" icon={<MdOutlineAccountCircle size={32} />}>
              <MenuContent>
                <MenuItem
                  sx={{ display: 'flex', alignItems: 'center', columnGap: 3 }}
                  onClick={() => authCtx?.onLogout()}
                >
                  Logout
                  <MdLogout />
                </MenuItem>
              </MenuContent>
            </Menu>
            <Menu
              ariaLabel="Configuration"
              icon={<MdOutlineSettings size={32} />}
            >
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
            <IconButton aria-label="Open menu" onClick={toggleSidebarHandler}>
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
            zIndex: 101,
            maxWidth: '75%',
            width: 320,
            height: '100vh',
            bg: 'secondary',
          }}
        >
          <div sx={{ position: 'absolute', top: 3, right: 3 }}>
            <IconButton aria-label="Close menu" onClick={toggleSidebarHandler}>
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
                '& > li': { width: '95%', m: 2 },
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
                  {/* TODO: Add display of notifications for teacher */}
                  <DialogContent
                    title="Notifications"
                    width={560}
                    height="min-content"
                  />
                </Dialog>
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
                      <p>Profile</p>
                      <IconButton>
                        <MdOutlineAccountCircle size={32} />
                      </IconButton>
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    title="Profile"
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
                    <Button onClick={() => authCtx?.onLogout()}>Logout</Button>
                  </DialogContent>
                </Dialog>
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

export default TeacherNav;
