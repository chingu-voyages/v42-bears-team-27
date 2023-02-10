import Image from 'next/image';

import { ButtonLink } from 'src/components/ui';
import type { ISubject } from 'src/interfaces';

type Props = {
  subject: Omit<ISubject, '_id'>;
};

const SubjectCard: React.FC<Props> = ({ subject }) => {
  const { slug, title, imageUrl } = subject;

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
        sx={{ display: 'flex', justifyContent: 'center', columnGap: 3, p: 5 }}
      >
        <ButtonLink href={`./learn/${slug}/lessons`} rounded={false}>
          Lessons
        </ButtonLink>
        <ButtonLink href={`./learn/${slug}/exercises`} rounded={false}>
          Exercises
        </ButtonLink>
      </div>
    </div>
  );
};

export default SubjectCard;
