import { Button } from 'components/ui';

type Props = {
  message: string;
  errorCallback: () => void;
};

const ErrorFallback: React.FC<Props> = ({ message, errorCallback }) => (
  <div
    sx={{
      position: 'absolute',
      top: '40%',
      left: '50%',
      translate: '-50% -50%',
      p: 4,
      border: '1px solid currentColor',
    }}
  >
    <h2 sx={{ variant: 'text.h3' }}>Oops, there is an error!</h2>
    <p sx={{ variant: 'text.h4' }}>{message}</p>
    <Button sx={{ mx: 'auto' }} rounded={false} onClick={errorCallback}>
      Try again?
    </Button>
  </div>
);

export default ErrorFallback;
