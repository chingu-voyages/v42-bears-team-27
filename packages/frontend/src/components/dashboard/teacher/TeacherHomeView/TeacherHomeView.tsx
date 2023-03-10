import { useContext } from 'react';

import {
  BroadcastModal,
  ClassroomModal,
} from 'src/components/dashboard/modals';
import TeacherCalendar from 'src/components/dashboard/teacher/TeacherCalendar';
import StudentTable from 'src/components/dashboard/teacher/StudentTable';
import type { ITeacher } from 'src/interfaces';
import { AuthContext } from 'src/store/auth';

const TeacherHomeView = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div sx={{ py: 4, px: 5 }}>
      {authCtx?.user && (
        <p sx={{ variant: 'text.h3', textAlign: 'center' }}>
          {`Good Morning, ${(authCtx.user as ITeacher).title}.${
            (authCtx.user as ITeacher).surname
          }`}
        </p>
      )}
      <div
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 3,
          flexWrap: 'wrap',
          mb: [4, null, 0],
        }}
      >
        <BroadcastModal />
        <ClassroomModal />
      </div>
      <div
        sx={{
          display: 'flex',
          flexDirection: ['column', 'row', 'row'],
          alignItems: 'center',
          justifyContent: 'center',
          gap: [0, 20, '10%'],
          mt: [3, null, 4],
          mx: [0, 20, 20],
        }}
      >
        <TeacherCalendar />
        <StudentTable />
      </div>
    </div>
  );
};

export default TeacherHomeView;
