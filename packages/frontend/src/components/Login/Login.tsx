import { useState } from 'react';

import { Button } from '../UI';
import StudentLogin from './StudentLogin';
import TeacherLogin from './TeacherLogin';

const Login: React.FC = () => {
  const [studentForm, setStudentForm] = useState(true);

  return (
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'primary',
        backgroundColor: 'muted',
        fontFamily: 'body',
      }}
    >
      {studentForm && (
        <StudentLogin>
          <div
            sx={{
              display: 'flex',
            }}
          >
            <Button variant="filled" rounded={false}>
              Student
            </Button>
            <Button
              variant="outlined"
              rounded={false}
              onClick={() => setStudentForm(false)}
            >
              Teacher
            </Button>
          </div>
        </StudentLogin>
      )}

      {!studentForm && (
        <TeacherLogin>
          <div
            sx={{
              display: 'flex',
            }}
          >
            <Button
              variant="outlined"
              rounded={false}
              onClick={() => setStudentForm(true)}
            >
              Student
            </Button>
            <Button variant="filled" rounded={false}>
              Teacher
            </Button>
          </div>
        </TeacherLogin>
      )}
    </div>
  );
};

export default Login;
