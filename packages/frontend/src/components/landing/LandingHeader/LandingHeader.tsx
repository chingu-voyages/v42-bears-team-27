import {
  Button,
  ButtonLink,
  Dialog,
  DialogTrigger,
  DialogContent,
} from 'src/components/ui';
import Login from './Login';

const LandingHeader: React.FC = () => (
  <header sx={{ py: 3, px: 4, bg: 'muted' }}>
    <nav
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        columnGap: 4,
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

      <div
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button>Login</Button>
          </DialogTrigger>
          <DialogContent title="Login" width="95%" height="90vh">
            <Login />
          </DialogContent>
        </Dialog>
        <ButtonLink href="/signup" variant="outlined">
          Sign up
        </ButtonLink>
      </div>
    </nav>
  </header>
);

export default LandingHeader;
