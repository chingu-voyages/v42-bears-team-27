import type { ReactElement } from 'react';

import AuthLayout from 'src/layouts/AuthLayout';
import type { NextPageWithLayout } from 'src/pages/_app';
import ExerciseView from 'src/components/dashboard/student/ExerciseView';

const ExerciseId: NextPageWithLayout = () => <ExerciseView />;

ExerciseId.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      title="Exercise"
      description="Try out an exercise based on a topic to see how well you do"
    >
      {page}
    </AuthLayout>
  );
};

export default ExerciseId;
