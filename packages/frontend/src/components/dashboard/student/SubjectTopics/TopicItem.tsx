import Link from 'next/link';
import { useRouter } from 'next/router';

import type { ITopic } from 'src/interfaces';

type Props = {
  topic: ITopic;
};

const TopicItem: React.FC<Props> = ({ topic }) => {
  const { query } = useRouter();

  const { slug, title } = topic;

  return (
    <li sx={{ display: 'flex' }}>
      <Link
        sx={{ variant: 'text.label' }}
        href={{
          pathname: `./lessons/${slug}`,
          query: { subject: query.subject },
        }}
      >
        {title}
      </Link>
    </li>
  );
};

export default TopicItem;
