import { ReactElement, useContext } from 'react';
import useSWR from 'swr';
import { MdLogout } from 'react-icons/md';

import { fetcher } from 'src/services';
import AuthLayout from 'src/layouts/AuthLayout';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  Button,
} from 'src/components/ui';
import { StudentAppBar, StudentBottomNav } from 'src/components/dashboard/navs';
import BarChart from 'src/components/dashboard/student/Profile';
import ClassroomModal from 'src/components/dashboard/modals/ClassroomModal';
import { AuthContext } from 'src/store/auth';
import { IStudentProfile } from 'src/interfaces';
import type { NextPageWithLayout } from '../../_app';

const Profile: NextPageWithLayout = () => {
  const authCtx = useContext(AuthContext);
  const { data } = useSWR<IStudentProfile>(
    `/api/v0/student/profile/${authCtx?.user?._id}`,
    fetcher,
  );

  const timeSpent: {
    [key: string]: number;
  } = {};

  if (data?.timeSpent) {
    Object.keys(data?.timeSpent).forEach((subject) => {
      timeSpent[subject] = data.timeSpent[subject] / 60000;
    });
  }

  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
      }}
    >
      <StudentAppBar />
      <div sx={{ overflowY: 'auto' }}>
        <div
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            rowGap: 3,
          }}
        >
          {data && (
            <div
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4,
                color: 'primary',
                width: '400px',
                height: '400px',
              }}
            >
              <BarChart
                chartLabel="Time Spent in Minutes on each Subject"
                dataFromAPI={timeSpent}
              />
              <BarChart
                chartLabel="Points Gained in each Subject"
                dataFromAPI={data.points}
              />
            </div>
          )}
          <AlertDialog>
            <AlertDialogTrigger sx={{ color: 'text' }} asChild>
              <Button icon={<MdLogout />}>Logout</Button>
            </AlertDialogTrigger>
            <AlertDialogContent
              sx={{
                textAlign: 'center',
                py: 4,
                '& button': {
                  mt: 4,
                },
                '& div': {
                  justifyContent: 'center !important',
                },
              }}
              title="Are you sure you want to logout?"
              description=""
              width="32rem"
              height="min-content"
              onConfirm={() => authCtx?.onLogout()}
            />
          </AlertDialog>
          <ClassroomModal />
        </div>
      </div>
      <StudentBottomNav />
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      title="Profile"
      description="An overview of your stats as a student in your classroom"
    >
      {page}
    </AuthLayout>
  );
};

export default Profile;
