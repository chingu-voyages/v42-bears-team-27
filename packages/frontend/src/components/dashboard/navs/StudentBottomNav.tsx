/* eslint-disable arrow-body-style */
import type { ThemeUIStyleObject } from 'theme-ui';
import { TbBooks } from 'react-icons/tb';
import { GrHomeRounded } from 'react-icons/gr';
import { VscAccount } from 'react-icons/vsc';

import { ButtonLink } from 'src/components/ui';

const buttonLinkStyles: ThemeUIStyleObject = {
  flexDirection: 'column-reverse',
  height: 'min-content',
  bg: 'transparent',
  border: 'none',
  borderRadius: 3,
  py: 2,
  px: 3,
  rowGap: 1,
};

const StudentBottomNav: React.FC = () => {
  return (
    <footer sx={{ bg: 'muted' }}>
      <nav>
        <ul
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: '6.25rem',
            listStyle: 'none',
            m: 2,
            p: 0,
          }}
        >
          <li>
            <ButtonLink
              sx={buttonLinkStyles}
              href="./learn"
              variant="outlined"
              icon={<TbBooks size={32} />}
            >
              Learn
            </ButtonLink>
          </li>
          <li>
            <ButtonLink
              sx={buttonLinkStyles}
              href="./home"
              variant="outlined"
              icon={<GrHomeRounded size={32} />}
            >
              Home
            </ButtonLink>
          </li>
          <li>
            <ButtonLink
              sx={buttonLinkStyles}
              href="./profile"
              variant="outlined"
              icon={<VscAccount size={32} />}
            >
              Profile
            </ButtonLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default StudentBottomNav;
