import Image from 'next/image';

import { ButtonLink } from 'src/components/ui';
import type { ISubject } from 'src/interfaces';

type Props = {
  subject: Omit<ISubject, '_id'>;
};

const SubjectCard: React.FC<Props> = ({ subject }) => {
  const { slug, title, imageUrl } = subject;

  return (
    <div sx={{ width: 336, height: 400 }}>
      <div sx={{ position: 'relative', height: '50%' }}>
        <Image
          sx={{ maxWidth: '100%', height: 'inherit' }}
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
      <div sx={{ height: '50%', p: 3, bg: 'muted' }}>
        <ButtonLink
          sx={{ width: 144, mt: 5, mx: 'auto' }}
          href={`./learn/${slug}/lessons`}
          rounded={false}
        >
          Lessons
        </ButtonLink>
      </div>
    </div>
  );
};

export default SubjectCard;
