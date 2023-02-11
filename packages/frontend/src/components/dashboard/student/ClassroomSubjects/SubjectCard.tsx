import Image from 'next/image';
import { useMemo } from 'react';
import useSWR from 'swr';
import stc from 'string-to-color';

import { fetcher } from 'src/services';
import { ButtonLink } from 'src/components/ui';
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
    data,
    // isLoading,
    // error,
    // } = useSWR<IStudentTask[]>('/api/v0/student/tasks', fetcher,);
  } = useSWR<PropsData[]>('/api/v0/student/tasks', fetcher);

  const percentageProgress = useMemo(() => {
    const filterData = data?.filter(
      (task) => task.taskID.assignment.subject.slug === slug,
    );
    const completed = filterData?.filter((task) => task.completed).length;
    const total = filterData?.length;
    const percentageString =
      completed && total ? `${(completed / total) * 100}%` : '0%';
    return percentageString;
  }, [data, slug]);

  return (
    <div
      sx={{
        display: 'grid',
        gridTemplateRows: '1fr 1fr',
        width: '26rem',
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
          mt: 5,
          p: 5,
        }}
      >
        <div
          sx={{
            display: 'flex',
            bg: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            mb: 4,
          }}
        >
          <div
            sx={{
              bg: stc(subject),
              height: '100%',
              width: percentageProgress,
            }}
          >
            <p>&nbsp;</p>
          </div>
        </div>
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
