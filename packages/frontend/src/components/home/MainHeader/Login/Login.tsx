import { useState } from 'react';

import { Button } from '../../../UI';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
  const [showStudentForm, setShowStudentForm] = useState(true);

  const toggleUserHandler = () => {
    setShowStudentForm((prevState) => !prevState);
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
        {`Ready to ${showStudentForm ? 'learn' : 'aspire'}!`}
      </h2>
      <div sx={{ display: 'flex', mb: 3 }}>
        <Button
          variant={showStudentForm ? 'filled' : 'outlined'}
          rounded={false}
          onClick={toggleUserHandler}
        >
          Student
        </Button>
        <Button
          variant={showStudentForm ? 'outlined' : 'filled'}
          rounded={false}
          onClick={toggleUserHandler}
        >
          Teacher
        </Button>
      </div>
      <LoginForm userRole={showStudentForm ? 'student' : 'teacher'} />
    </div>
  );
};

export default Login;
