import { useState, useContext } from 'react';

import type { INewTeacherCredentials } from 'src/interfaces';
import { AuthContext } from 'src/store/auth';
import NewTeacherForm from './NewTeacherForm';

const SignupTeacher: React.FC = () => {
  const authCtx = useContext(AuthContext);

  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<string | null>(null);

  const submitHandler = async (teacherCredentials: INewTeacherCredentials) => {
    try {
      // Submit form data
      const msg = await authCtx!.onSignup(teacherCredentials);
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
    <>
      <NewTeacherForm error={error} onSubmit={submitHandler} />
      {alert && (
        <p
          sx={{
            variant: 'text.h4',
            color: 'info',
            textAlign: 'center',
          }}
        >
          {alert}
        </p>
      )}
    </>
  );
};
export default SignupTeacher;
