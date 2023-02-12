import { useMemo } from 'react';
import Image from 'next/image';
import type { ThemeUIStyleObject } from 'theme-ui';
import useSWR from 'swr';
import stc from 'string-to-color';

import Loader from 'src/components/common/Loader';
import { ButtonLink, Progress } from 'src/components/ui';
import type { IStudentTask, ISubject } from 'src/interfaces';
import { fetcher } from 'src/services';

const containerStyles: ThemeUIStyleObject = {
  display: 'grid',
  gridTemplateRows: '1fr 1fr',
  width: '28rem',
  bg: 'muted',
  borderRadius: 7,
};

type Props = {
  subject: Omit<ISubject, '_id'>;
};

const SubjectCard: React.FC<Props> = ({ subject }) => {
  const { slug, title, imageUrl } = subject;

  const { data: tasksData, isLoading } = useSWR<IStudentTask[]>(
    '/api/v0/student/tasks',
    fetcher,
  );

  const percentageProgress = useMemo(() => {
    if (!tasksData) {
      return null;
    }

    const filterData = tasksData.filter((task) => {
      if (typeof task.taskID === 'string') {
        return task;
      }

      // NOTE: Bad typing for taskID so doesn't recognise if it's
      // possible to be something other than 'ID'
      // @ts-ignore
      return task.taskID.assignment.subject.slug === slug;
    });
    const completed = filterData.filter((task) => task.completed).length;
    const total = filterData.length;

    return completed && total ? (completed / total) * 100 : 0;
  }, [tasksData, slug]);

  if (isLoading) {
    return (
      <div
        sx={{
          position: 'relative',
          height: '24rem',
          opacity: 0.6,
          ...containerStyles,
        }}
      >
        <Loader>Loading...</Loader>
      </div>
    );
  }

  return (
    <div sx={containerStyles}>
      <div sx={{ position: 'relative', height: '16rem' }}>
        <Image
          sx={{
            maxWidth: '100%',
            height: 'auto',
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
          }}
          src={imageUrl}
          alt={title}
          fill
          priority
        />
        <h2
          sx={{
            variant: 'text.h4',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            color: 'text',
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
