import Image from 'next/image';
import { useMemo } from 'react';
import useSWR from 'swr';
import stc from 'string-to-color';

import { fetcher } from 'src/services';
import { ButtonLink, Progress } from 'src/components/ui';
import type { ISubject } from 'src/interfaces';

type Props = {
  subject: Omit<ISubject, '_id'>;
};

type PropsData = {
  _id: string;
  completed: boolean;
  event: string;
  taskID: any;
};

const SubjectCard: React.FC<Props> = ({ subject }) => {
  const { slug, title, imageUrl } = subject;

  const {
    data: tasksData,
    // isLoading,
    // error,
    // } = useSWR<IStudentTask[]>('/api/v0/student/tasks', fetcher,);
  } = useSWR<PropsData[]>('/api/v0/student/tasks', fetcher);

  const percentageProgress = useMemo(() => {
    if (!tasksData) {
      return null;
    }

    const filterData = tasksData.filter(
      (task) => task.taskID.assignment.subject.slug === slug,
    );
    const completed = filterData.filter((task) => task.completed).length;
    const total = filterData.length;

    return completed && total ? (completed / total) * 100 : 0;
  }, [tasksData, slug]);

  return (
    <div
      sx={{
        display: 'grid',
        gridTemplateRows: '1fr 1fr',
        width: '28rem',
        bg: 'muted',
      }}
    >
      <div sx={{ position: 'relative', height: '16rem' }}>
        <Image
          sx={{ maxWidth: '100%', height: 'auto' }}
          src={imageUrl}
          alt={title}
          fill
        />
        <h2
          sx={{
            variant: 'text.h4',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            color: 'white',
            textAlign: 'center',
            bg: 'primary',
            p: 1,
          }}
        >
          {title}
        </h2>
      </div>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 5,
        }}
      >
        <Progress
          sx={{
            mb: 4,
            mx: 'auto',
            '& div': {
              bg: stc(subject),
            },
          }}
          value={percentageProgress}
        />
        <div sx={{ display: 'flex', justifyContent: 'center', columnGap: 3 }}>
          <ButtonLink href={`./learn/${slug}/lessons`} rounded={false}>
            Lessons
          </ButtonLink>
          <ButtonLink href={`./learn/${slug}/exercises`} rounded={false}>
            Exercises
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
