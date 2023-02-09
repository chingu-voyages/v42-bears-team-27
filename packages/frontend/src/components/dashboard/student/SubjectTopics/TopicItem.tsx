import Link from 'next/link';
import { useRouter } from 'next/router';

import type { ITopic, ITopicType } from 'src/interfaces';

type Props = {
  topic: ITopic;
};

const TopicItem: React.FC<Props> = ({ topic }) => {
  const { query } = useRouter();

  const { title, types } = topic;

  const foundMaterial = (types as ITopicType[]).find(
    (type) => type.materialModel === 'Lesson',
  );

  if (!foundMaterial) {
    return null;
  }

  return (
    <li sx={{ display: 'flex' }}>
      <Link
        sx={{ variant: 'text.label' }}
        href={{
          pathname: `./lessons/${foundMaterial.material as string}`,
          query: {
            subject: query.subject,
          },
        }}
      >
        {title}
      </Link>
    </li>
  );
};

export default TopicItem;
