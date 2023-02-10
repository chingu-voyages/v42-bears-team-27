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
import { AuthContext } from 'src/store/auth';
import { IStudentProfile } from 'src/interfaces';
import type { NextPageWithLayout } from '../../_app';

const Profile: NextPageWithLayout = () => {
  const authCtx = useContext(AuthContext);
  const { data } = useSWR<IStudentProfile>(
    `/api/v0/student/profile/${authCtx?.user?._id}`,
    fetcher,
  );

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
      <div>
        <h1>Check out your awesome profile stats 🚀</h1>
        {data && (
          <div>
            <div
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4,
                color: 'primary',
                bg: 'muted',
                minHeight: '100vh',
              }}
            >
              <BarChart
                chartLabel="Time Spent in Minutes on each Subject"
                dataFromAPI={data.timeSpent}
              />
              <BarChart
                chartLabel="Points Gained in each Subject"
                dataFromAPI={data.points}
              />
            </div>
          </div>
        )}
      </div>
      <div sx={{ overflowY: 'auto' }}>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button sx={{ mx: 'auto' }} icon={<MdLogout />}>
              Logout
            </Button>
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
