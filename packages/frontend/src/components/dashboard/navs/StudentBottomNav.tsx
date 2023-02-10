/* eslint-disable arrow-body-style */
import type { ThemeUIStyleObject } from 'theme-ui';
import { TbBooks } from 'react-icons/tb';
import { GrHomeRounded } from 'react-icons/gr';
import { VscAccount } from 'react-icons/vsc';

import { ButtonLink } from 'src/components/ui';

const navButtonStyles: ThemeUIStyleObject = {
  flexWrap: 'wrap-reverse',
  '& p': {
    display: ['none', 'initial'],
  },
};

const StudentBottomNav: React.FC = () => {
  return (
    <footer sx={{ py: 3, px: 4, bg: 'muted' }}>
      <nav
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          columnGap: '6.25rem',
          height: 48,
        }}
      >
        <div>
          <ButtonLink
            sx={navButtonStyles}
            href="./learn"
            variant="outlined"
            icon={<TbBooks size={32} />}
          >
            Learn
          </ButtonLink>
        </div>
        <div>
          <ButtonLink
            sx={navButtonStyles}
            href="./home"
            variant="outlined"
            icon={<GrHomeRounded size={32} />}
          >
            Home
          </ButtonLink>
        </div>
        <div>
          <ButtonLink
            sx={navButtonStyles}
            href="./profile"
            variant="outlined"
            icon={<VscAccount size={32} />}
          >
            Profile
          </ButtonLink>
        </div>
      </nav>
    </footer>
  );
};

export default StudentBottomNav;
