import { useState } from 'react';
import { useColorMode } from 'theme-ui';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import {
  MdOutlineNotifications,
  MdOutlineSettings,
  MdOutlineMenu,
  MdOutlineClose,
  MdDarkMode,
  MdLightMode,
} from 'react-icons/md';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  IconButton,
  Menu,
  MenuContent,
  MenuRadioGroup,
  MenuRadioItem,
} from 'src/components/ui';
import type { IClassroom, IMessageData } from 'src/interfaces';
import { fetcher, postMarkMessageAsRead } from 'src/services';

const StudentAppBar: React.FC = () => {
  const { data: classroomData } = useSWRImmutable<IClassroom>(
    '/api/v0/classroom',
    fetcher,
  );

  const { data: inboxData, mutate } = useSWR<IMessageData[]>(
    '/api/v0/student/inbox',
    fetcher,
  );

  const newMessagesNumber = inboxData?.filter((msg) => !msg.hasBeenRead).length;

  const [colorMode, setColorMode] = useColorMode();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebarHandler = () => {
    setShowSidebar((prevState) => !prevState);
  };

  const toggleColorModeHandler = () => {
    setColorMode((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  };

  const handleMessageClick = async (messageID: string) => {
    await postMarkMessageAsRead(messageID);
    mutate();
  };

  const heading = classroomData?.name ? `Classroom: ${classroomData.name}` : '';

  return (
    <>
      <header sx={{ py: 3, px: 4, bg: 'secondary', color: 'text' }}>
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
          <div
            sx={{
              display: ['none', 'flex', null],
              columnGap: 3,
            }}
          >
            <Menu
              ariaLabel="Notifications"
              icon={
                <div
                  sx={{
                    '--alert': newMessagesNumber,
                    position: 'relative',
                    ...(newMessagesNumber && {
                      '&::after': {
                        variant: 'text.label',
                        fontSize: 0,
                        counterReset: 'alert var(--alert)',
                        content: 'counter(alert)',
                        display: 'block',
                        position: 'absolute',
                        top: '2px',
                        right: '0.5px',
                        width: 16,
                        height: 16,
                        bg: 'error',
                        color: 'black',
                        border: 'none',
                        borderRadius: '50%',
                      },
                    }),
                  }}
                >
                  <MdOutlineNotifications size={32} />
                </div>
              }
            >
              <MenuContent>
                {inboxData?.map((message) => (
                  <Dialog key={message._id}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => handleMessageClick(message._id)}
                        sx={{
                          background: 'transparent',
                          color: message.hasBeenRead ? 'transparent' : 'info',
                        }}
                      >
                        {message.messageHeader}
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      title="Message From Your Teacher"
                      width="60vw"
                      height="min-content"
                    >
                      <div>
                        <p
                          sx={{
                            variant: 'text.h3',
                            textAlign: 'center',
                            fontSize: 4,
                          }}
                        >
                          {message.messageHeader}
                        </p>
                      </div>
                      <div
                        sx={{
                          maxWidth: '55ch',
                          minHeight: '16rem',
                          m: 4,
                          mx: 'auto',
                          p: 4,
                          pb: 5,
                          border: '2px solid',
                          borderColor: 'accent',
                          borderRadius: 5,
                          bg: 'mutedShade',
                        }}
                      >
                        <p sx={{ variant: 'text.label' }}>
                          {message.messageBody}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
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
            maxWidth: '75%',
            width: 320,
            height: '100vh',
            bg: 'muted',
            zIndex: '10',
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
                          bg: 'mutedShade',
                        },
                      }}
                    >
                      <p>Notifications</p>
                      <IconButton>
                        <MdOutlineNotifications size={32} />
                      </IconButton>
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    title="Notifications"
                    width={560}
                    height="min-content"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      maxHeight: '95vh',
                      pt: 3,
                      pb: 5,
                      overflowY: 'auto',
                    }}
                  >
                    {inboxData?.map((message) => (
                      <div
                        key={message._id}
                        sx={{
                          width: '95%',
                          bg: 'info',
                          color: 'text',
                          borderRadius: 3,
                          p: 3,
                          my: 2,
                        }}
                      >
                        <p sx={{ variant: 'text.h4' }}>
                          {message.messageHeader}
                        </p>
                        <p sx={{ variant: 'text.label' }}>
                          {message.messageBody}
                        </p>
                      </div>
                    ))}
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
                          bg: 'mutedShade',
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
                      sx={{ color: 'text' }}
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
