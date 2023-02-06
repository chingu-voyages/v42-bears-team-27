import type { ThemeUIStyleObject } from 'theme-ui';

import Spinner from './Spinner';

type Props = {
  children?: React.ReactNode;
  sx?: ThemeUIStyleObject;
};

const Loader: React.FC<Props> = ({ children, sx }) => (
  <div
    sx={{
      variant: 'text.h3',
      position: 'absolute',
      top: children ? '45%' : '50%',
      left: '50%',
      translate: '-50% -50%',
      height: 192,
      ...(children && {
        display: 'flex',
        flexDirection: children ? 'column' : 'row',
        alignItems: 'center',
      }),
      ...sx,
    }}
  >
    {children && <p>{children}</p>}
    <Spinner svgProps={{ width: 64, height: 64 }} />
  </div>
);

export default Loader;
