import Link from 'next/link';

import { Modal } from 'components/ui';
import Login from './Login';

const MainHeader: React.FC = () => (
  <header
    sx={{
      py: 3,
      px: 4,
      bg: 'muted',
    }}
  >
    <nav
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <h1
        sx={{
          variant: 'text.h2',
          m: 0,
          textAlign: ['center', null, 'start'],
        }}
      >
        RemoteClass
      </h1>
      <div sx={{ display: 'flex', columnGap: 3 }}>
        <Modal title="Login" width="95%" height="90vh">
          <Login />
        </Modal>
        <Link
          sx={{
            variant: 'text.label',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 10,
            height: 48,
            py: 2,
            px: 4,
            fontSize: 18,
            textDecoration: 'none',
            bg: 'white',
            color: 'primary',
            border: '2px solid currentColor ',
            borderRadius: 50,
            cursor: 'pointer',
            '&:hover': {
              bg: '#e6e6e6',
            },
          }}
          href="/signup"
        >
          Sign up
        </Link>
      </div>
    </nav>
  </header>
);

export default MainHeader;
