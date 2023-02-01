import { useState, useContext } from 'react';

import { Button } from 'src/components/ui';
import type { IUserCredentials } from 'src/interfaces';
import { AuthContext } from 'src/store/auth';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
  const authCtx = useContext(AuthContext);

  const [isStudent, setIsStudent] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<string | null>(null);

  const userRole = isStudent ? 'student' : 'teacher';

  const toggleUserRoleHandler = () => {
    setIsStudent((prevState) => !prevState);
  };

  const submitHandler = async (credentials: IUserCredentials) => {
    try {
      // Submit form data
      const msg = await authCtx!.onLogin(credentials, userRole);
      // Update alert with api response message
      setAlert(msg);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }

      setError(`Unexpected error ${err}`);
    }
  };

  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'primary',
        bg: 'muted',
      }}
    >
      <h2 sx={{ variant: 'text.h2', mt: 0 }}>
        {`Ready to ${isStudent ? 'learn' : 'aspire'}!`}
      </h2>
      <div sx={{ display: 'flex', mb: 3 }}>
        <Button
          variant={isStudent ? 'filled' : 'outlined'}
          rounded={false}
          onClick={toggleUserRoleHandler}
        >
          Student
        </Button>
        <Button
          variant={isStudent ? 'outlined' : 'filled'}
          rounded={false}
          onClick={toggleUserRoleHandler}
        >
          Teacher
        </Button>
      </div>
      <LoginForm userRole={userRole} error={error} onSubmit={submitHandler} />
      {alert && (
        <p sx={{ variant: 'text.h4', color: 'info', textAlign: 'center' }}>
          {alert}
        </p>
      )}
    </div>
  );
};

export default Login;
